const fs = require("fs");
const path = require("path");
const site = require("../assets/calculators.js");

const rootDir = path.resolve(__dirname, "..");
const requiredSections = [
  "Step-by-step explanation",
  "Formula used",
  "Example calculation",
  "Related calculators",
  "Frequently asked questions"
];

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function approx(actual, expected, tolerance, label) {
  if (Math.abs(actual - expected) > tolerance) {
    fail(label + " expected " + expected + " but got " + actual);
  }
}

function parseCurrency(value) {
  return Number(String(value).replace(/[^0-9.-]/g, ""));
}

function parseNumberText(value) {
  return Number(String(value).replace(/,/g, "").replace(/[^0-9.-]/g, ""));
}

function firstOutput(result, label) {
  const item = result.outputs.find(output => output.label === label);
  assert(item, "Missing output " + label);
  return item.value;
}

function verifyCalculations() {
  const emi = site.calculate("emi-calculator", {
    loanAmount: "1000000",
    annualRate: "8.5",
    tenureYears: "5"
  });
  approx(parseCurrency(firstOutput(emi, "Monthly EMI")), 20517, 2, "EMI monthly payment");

  const sip = site.calculate("sip-calculator", {
    monthlyInvestment: "10000",
    annualReturn: "12",
    years: "10"
  });
  approx(parseCurrency(firstOutput(sip, "Estimated maturity value")), 2323391, 25, "SIP maturity value");

  const tax = site.calculate("income-tax-calculator", {
    grossIncome: "1200000",
    deductions: "0",
    regime: "new",
    ageGroup: "below60",
    resident: "yes"
  });
  approx(parseCurrency(firstOutput(tax, "Estimated total tax")), 0, 1, "New regime rebate tax");

  const bmi = site.calculate("bmi-calculator", {
    weightKg: "70",
    heightCm: "170"
  });
  approx(parseNumberText(firstOutput(bmi, "BMI")), 24.2, 0.1, "BMI");

  const sci = site.calculate("scientific-calculator", {
    expression: "sqrt(144) + sin(30) + 2^3",
    angleMode: "deg"
  });
  approx(parseNumberText(firstOutput(sci, "Expression result")), 20.5, 0.00001, "Scientific expression");

  const fraction = site.calculate("fraction-calculator", {
    n1: "1",
    d1: "2",
    operator: "+",
    n2: "1",
    d2: "3"
  });
  assert(firstOutput(fraction, "Reduced fraction") === "5/6", "Fraction result should be 5/6");

  const length = site.calculate("length-converter", {
    value: "100",
    fromUnit: "meter",
    toUnit: "foot"
  });
  approx(parseNumberText(firstOutput(length, "Converted value")), 328.08399, 0.0001, "Length conversion");

  const temp = site.calculate("temperature-converter", {
    value: "37",
    fromUnit: "celsius",
    toUnit: "fahrenheit"
  });
  approx(parseNumberText(firstOutput(temp, "Converted temperature")), 98.6, 0.001, "Temperature conversion");
}

function verifyGeneratedPages() {
  assert(fs.existsSync(path.join(rootDir, "index.html")), "Homepage missing");
  site.calculators.forEach(calc => {
    const page = path.join(rootDir, calc.slug, "index.html");
    assert(fs.existsSync(page), "Missing calculator page " + calc.slug);
    const html = fs.readFileSync(page, "utf8");
    assert(html.includes("<h1>" + calc.title + "</h1>"), "Missing H1 for " + calc.slug);
    requiredSections.forEach(section => {
      assert(html.includes(section), "Missing section '" + section + "' for " + calc.slug);
    });
    assert(html.includes('application/ld+json'), "Missing schema for " + calc.slug);
  });
}

function verifyLinks() {
  const htmlFiles = [];
  walk(rootDir, file => {
    if (path.basename(file) === "index.html") htmlFiles.push(file);
  });

  const attrPattern = /\b(?:href|src)="([^"]+)"/g;
  htmlFiles.forEach(file => {
    const html = fs.readFileSync(file, "utf8");
    let match;
    while ((match = attrPattern.exec(html))) {
      const target = match[1];
      if (target.startsWith("http") || target.startsWith("mailto:") || target.startsWith("#")) continue;
      const cleaned = target.split("#")[0].split("?")[0];
      if (!cleaned) continue;
      const resolved = path.resolve(path.dirname(file), cleaned);
      const candidate = cleaned.endsWith("/") ? path.join(resolved, "index.html") : resolved;
      assert(fs.existsSync(candidate), "Broken link from " + path.relative(rootDir, file) + " to " + target);
    }
  });
}

function verifySeoFiles() {
  const sitemap = fs.readFileSync(path.join(rootDir, "sitemap.xml"), "utf8");
  site.calculators.forEach(calc => {
    assert(sitemap.includes("/" + calc.slug + "/"), "Sitemap missing " + calc.slug);
  });
  assert(fs.existsSync(path.join(rootDir, "robots.txt")), "robots.txt missing");
  assert(fs.existsSync(path.join(rootDir, "site.webmanifest")), "site.webmanifest missing");
}

function walk(directory, callback) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(full, callback);
    } else {
      callback(full);
    }
  });
}

verifyCalculations();
verifyGeneratedPages();
verifyLinks();
verifySeoFiles();

console.log("Verification passed: calculations, pages, links, and SEO files are valid.");
