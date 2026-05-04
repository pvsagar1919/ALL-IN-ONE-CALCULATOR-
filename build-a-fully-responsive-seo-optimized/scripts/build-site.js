const fs = require("fs");
const path = require("path");
const site = require("../assets/calculators.js");

const rootDir = path.resolve(__dirname, "..");
const siteUrl = (process.env.SITE_URL || "https://brightcalc-pvsagar-20260504.netlify.app").replace(/\/$/, "");

const articles = [
  {
    slug: "how-to-choose-the-right-loan-calculator",
    title: "How to Choose the Right Loan Calculator",
    description: "A practical guide to EMI, loan, mortgage, and compound interest calculators.",
    category: "Financial",
    related: ["emi-calculator", "loan-calculator", "mortgage-calculator", "compound-interest-calculator"],
    sections: [
      ["Start with the decision", "Use an EMI calculator when you already know the loan amount, interest rate, and tenure. Use a loan calculator when you want to compare payoff speed or test extra payments. Use a mortgage calculator when home costs such as taxes and insurance matter."],
      ["Compare total cost, not only payment", "A lower monthly payment can still cost more if the tenure is longer. Always compare monthly payment, total interest, and total repayment together."],
      ["Check assumptions", "Interest rate, compounding, fees, and payment timing can change the result. Treat calculator output as a planning estimate and confirm final terms with the lender."]
    ]
  },
  {
    slug: "understanding-bmi-and-calorie-estimates",
    title: "Understanding BMI and Calorie Estimates",
    description: "Learn what BMI and calorie calculators can tell you, and where their limits are.",
    category: "Health",
    related: ["bmi-calculator", "calorie-calculator", "ideal-weight-calculator"],
    sections: [
      ["BMI is a screening number", "BMI compares body weight with height. It is useful for broad ranges, but it does not directly measure body fat, muscle, or health markers."],
      ["Calories are estimates", "Maintenance calories are usually estimated from BMR and activity level. Real needs can vary, so track progress and adjust over time."],
      ["Use ranges", "Health planning works better with ranges than single perfect numbers. Combine calculator output with medical guidance when the stakes are personal or clinical."]
    ]
  },
  {
    slug: "compound-interest-explained-with-examples",
    title: "Compound Interest Explained With Examples",
    description: "See how time, rate, frequency, and monthly contributions shape long-term growth.",
    category: "Financial",
    related: ["compound-interest-calculator", "sip-calculator", "percentage-calculator"],
    sections: [
      ["Compounding rewards time", "Compound interest earns interest on previous interest. The longer money stays invested, the more growth comes from past growth instead of only new contributions."],
      ["Frequency matters, but rate matters more", "Monthly or daily compounding can improve returns slightly compared with annual compounding. The annual rate and time period usually have the bigger effect."],
      ["Contributions change the curve", "Regular monthly additions create a growing stream of deposits. Each deposit compounds for its own remaining period, which is why SIP and contribution formulas differ from a single lump sum."]
    ]
  }
];

function writeFile(relativePath, content) {
  const fullPath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function stripHtml(value) {
  return String(value).replace(/<[^>]+>/g, "");
}

function absoluteUrl(urlPath) {
  return siteUrl + urlPath;
}

function icon(name) {
  const common = 'aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const icons = {
    brand: '<svg ' + common + '><rect x="4" y="3" width="16" height="18" rx="3"></rect><path d="M8 7h8"></path><path d="M8 11h8"></path><path d="M8 15h2"></path><path d="M14 15h2"></path><path d="M8 18h2"></path><path d="M14 18h2"></path></svg>',
    search: '<svg ' + common + '><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>',
    menu: '<svg ' + common + '><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg>',
    arrow: '<svg ' + common + '><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>',
    spark: '<svg ' + common + '><path d="M12 2v5"></path><path d="M12 17v5"></path><path d="m4.93 4.93 3.54 3.54"></path><path d="m15.54 15.54 3.53 3.53"></path><path d="M2 12h5"></path><path d="M17 12h5"></path><path d="m4.93 19.07 3.54-3.53"></path><path d="m15.54 8.46 3.53-3.53"></path></svg>',
    reset: '<svg ' + common + '><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v6h6"></path></svg>',
    share: '<svg ' + common + '><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 10.6 6.8-4.2"></path><path d="m8.6 13.4 6.8 4.2"></path></svg>',
    finance: '<svg ' + common + '><path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 16v-5"></path><path d="M12 16V8"></path><path d="M16 16v-9"></path><path d="M7 5h10"></path></svg>',
    health: '<svg ' + common + '><path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.4Z"></path></svg>',
    math: '<svg ' + common + '><path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M7 4v6"></path><path d="M17 14v6"></path><path d="m8 14 3 3-3 3"></path><path d="m16 4-3 3 3 3"></path></svg>',
    date: '<svg ' + common + '><rect x="3" y="5" width="18" height="16" rx="3"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 11h18"></path><path d="M8 15h.01"></path><path d="M12 15h.01"></path><path d="M16 15h.01"></path></svg>',
    unit: '<svg ' + common + '><path d="M7 7h10"></path><path d="m14 4 3 3-3 3"></path><path d="M17 17H7"></path><path d="m10 14-3 3 3 3"></path></svg>'
  };
  return icons[name] || icons.spark;
}

function searchShell(className, placeholder) {
  return '<div class="search-shell ' + className + '" data-search-shell>' +
    '<div class="search-box">' +
    icon("search") +
    '<input class="search-input js-search" type="search" autocomplete="off" placeholder="' + escapeHtml(placeholder) + '" aria-label="Search calculators">' +
    '</div>' +
    '<div class="search-suggestions" hidden></div>' +
    '</div>';
}

function header(base) {
  const home = base || "./";
  return '<a class="skip-link" href="#main">Skip to content</a>' +
    '<header class="site-header">' +
    '<div class="container header-inner">' +
    '<a class="brand" href="' + home + '" aria-label="BrightCalc home">' +
    '<span class="brand-mark">' + icon("brand") + '</span>' +
    '<span class="brand-text"><span>BrightCalc</span><small>Smart calculator hub</small></span>' +
    '</a>' +
    searchShell("nav-search", "Search calculators") +
    '<nav class="site-nav" data-site-nav data-open="false" aria-label="Primary navigation">' +
    '<a href="' + (base ? base : "") + '#categories">Categories</a>' +
    '<a href="' + base + 'calculators/">All calculators</a>' +
    '<a href="' + base + 'articles/">Articles</a>' +
    '<a href="' + base + 'contact/">Contact</a>' +
    '</nav>' +
    '<button class="nav-toggle" type="button" data-nav-toggle aria-label="Toggle navigation" aria-expanded="false">' + icon("menu") + '</button>' +
    '</div>' +
    '</header>';
}

function footer(base) {
  return '<footer class="site-footer">' +
    '<div class="container footer-grid">' +
    '<div>' +
    '<a class="brand" href="' + (base || "./") + '"><span class="brand-mark">' + icon("brand") + '</span><span class="brand-text"><span>BrightCalc</span><small>Fast, clear calculators</small></span></a>' +
    '<p>BrightCalc brings financial, health, math, date, and unit calculators into a clean, fast, mobile-friendly website.</p>' +
    '</div>' +
    '<div class="footer-links"><strong>Company</strong><a href="' + base + 'about/">About</a><a href="' + base + 'contact/">Contact</a><a href="' + base + 'privacy-policy/">Privacy Policy</a></div>' +
    '<div class="footer-links"><strong>Calculators</strong><a href="' + calculatorUrl("emi-calculator", base) + '">EMI</a><a href="' + calculatorUrl("bmi-calculator", base) + '">BMI</a><a href="' + calculatorUrl("income-tax-calculator", base) + '">Income Tax</a></div>' +
    '<div class="footer-links"><strong>Explore</strong><a href="' + base + 'calculators/">All calculators</a><a href="' + base + 'articles/">Articles</a><a href="' + base + 'sitemap.xml">Sitemap</a></div>' +
    '</div>' +
    '</footer>';
}

function pageShell(options) {
  const base = options.base || "";
  const bodyAttrs = [
    'data-base-path="' + escapeHtml(base) + '"',
    options.calculator ? 'data-calculator="' + escapeHtml(options.calculator) + '"' : ""
  ].filter(Boolean).join(" ");
  const schema = options.schema ? '<script type="application/ld+json">' + JSON.stringify(options.schema) + '</script>' : "";
  const canonical = absoluteUrl(options.path);
  return '<!doctype html>' +
    '<html lang="en">' +
    '<head>' +
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' + escapeHtml(options.title) + '</title>' +
    '<meta name="description" content="' + escapeHtml(options.description) + '">' +
    '<link rel="canonical" href="' + escapeHtml(canonical) + '">' +
    '<meta name="theme-color" content="#4CAF50">' +
    '<meta property="og:title" content="' + escapeHtml(options.title) + '">' +
    '<meta property="og:description" content="' + escapeHtml(options.description) + '">' +
    '<meta property="og:type" content="' + escapeHtml(options.ogType || "website") + '">' +
    '<meta property="og:url" content="' + escapeHtml(canonical) + '">' +
    '<link rel="stylesheet" href="' + base + 'assets/styles.css">' +
    schema +
    '</head>' +
    '<body ' + bodyAttrs + '>' +
    header(base) +
    '<main id="main">' + options.content + '</main>' +
    footer(base) +
    '<script src="' + base + 'assets/calculators.js" defer></script>' +
    '<script src="' + base + 'assets/app.js" defer></script>' +
    '</body>' +
    '</html>';
}

function calculatorUrl(slug, base, direct) {
  const shouldJumpToCalculator = direct !== false;
  return (base || "") + slug + "/" + (shouldJumpToCalculator ? "#calculator" : "");
}

function renderCalculatorCard(calc, base, badge) {
  const category = site.getCategory(calc.categoryId);
  const iconClass = calc.categoryId === "health" || calc.categoryId === "unit" ? "blue" : calc.categoryId === "math" || calc.categoryId === "date" ? "orange" : "";
  return '<a class="card card-link" href="' + calculatorUrl(calc.slug, base) + '">' +
    '<div class="card-top"><span class="icon-badge ' + iconClass + '">' + icon(category.icon) + '</span>' + (badge ? '<span class="pill">' + escapeHtml(badge) + '</span>' : "") + '</div>' +
    '<div><h3>' + escapeHtml(calc.title) + '</h3><p>' + escapeHtml(calc.description) + '</p></div>' +
    '<span class="read-more">Open calculator</span>' +
    '</a>';
}

function renderHome() {
  const popular = site.calculators.filter(calc => calc.popular);
  const categoryCards = site.categories.map(category => {
    const count = site.calculators.filter(calc => calc.categoryId === category.id).length;
    const iconClass = category.id === "health" || category.id === "unit" ? "blue" : category.id === "math" || category.id === "date" ? "orange" : "";
    return '<a class="card card-link" href="#' + category.id + '">' +
      '<div class="card-top"><span class="icon-badge ' + iconClass + '">' + icon(category.icon) + '</span><span class="pill">' + count + ' tools</span></div>' +
      '<div><p class="eyebrow">' + escapeHtml(category.eyebrow) + '</p><h3>' + escapeHtml(category.title) + '</h3><p>' + escapeHtml(category.description) + '</p></div>' +
      '</a>';
  }).join("");

  const categorySections = site.categories.map(category => {
    const items = site.calculators.filter(calc => calc.categoryId === category.id).map(calc => {
      return '<a href="' + calculatorUrl(calc.slug, "") + '"><span>' + escapeHtml(calc.title) + '</span><span aria-hidden="true">+</span></a>';
    }).join("");
    return '<section class="section" id="' + category.id + '">' +
      '<div class="container">' +
      '<div class="section-head"><div><p class="eyebrow">' + escapeHtml(category.eyebrow) + '</p><h2>' + escapeHtml(category.title) + ' calculators</h2><p>' + escapeHtml(category.description) + '</p></div><a class="btn secondary" href="calculators/">View all</a></div>' +
      '<div class="calculator-list">' + items + '</div>' +
      '</div>' +
      '</section>';
  }).join("");

  const articleCards = articles.map(article => renderArticleCard(article, "")).join("");
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BrightCalc",
    url: absoluteUrl("/"),
    description: "A fast, responsive, SEO-friendly calculator website for finance, health, math, dates, and unit conversions.",
    potentialAction: {
      "@type": "SearchAction",
      target: absoluteUrl("/calculators/") + "?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const content = '<section class="home-hero">' +
    '<div class="container hero-grid">' +
    '<div>' +
    '<p class="eyebrow">Fast calculators, clear answers</p>' +
    '<h1>BrightCalc calculators for money, health, math, dates, and units.</h1>' +
    '<p class="hero-copy">Search once, calculate quickly, and understand every result with formulas, examples, FAQs, and step-by-step explanations.</p>' +
    searchShell("hero-search", "Search EMI, BMI, tax, percentage, age, units...") +
    '<div class="hero-actions"><a class="btn" href="#popular">' + icon("spark") + 'Popular calculators</a><a class="btn secondary" href="calculators/">Browse all tools</a></div>' +
    '</div>' +
    '<div class="hero-visual" aria-label="Calculator website highlights">' +
    '<div class="visual-row"><div class="visual-tile">' + icon("finance") + '<strong>21</strong><span>working calculators</span></div><div class="visual-tile">' + icon("search") + '<strong>0.2s</strong><span>instant search feel</span></div></div>' +
    '<div class="visual-tile wide">' + icon("spark") + '<div><strong>SEO pages</strong><span>Formula, examples, FAQ schema, and related tools included</span></div></div>' +
    '</div>' +
    '</div>' +
    '</section>' +
    '<section class="section" id="popular"><div class="container"><div class="section-head"><div><p class="eyebrow">Most used</p><h2>Popular calculators</h2><p>Quick access to the tools people use most for planning, wellness, and everyday math.</p></div></div><div class="grid popular-grid">' + popular.map(calc => renderCalculatorCard(calc, "", "Popular")).join("") + '</div></div></section>' +
    '<section class="section alt" id="categories"><div class="container"><div class="section-head"><div><p class="eyebrow">Explore by category</p><h2>Calculator categories</h2><p>Each category keeps the same bright, readable design system and consistent interaction pattern.</p></div></div><div class="grid category-grid">' + categoryCards + '</div></div></section>' +
    categorySections +
    '<section class="section alt"><div class="container content-grid"><div class="recent-panel"><h2>Recent calculations</h2><div data-recent-calculations><p class="muted">Your saved calculations will appear here after you calculate a result.</p></div></div><div class="recent-panel"><h2>Useful guides</h2><div class="grid">' + articleCards + '</div></div></div></section>';

  writeFile("index.html", pageShell({
    title: "BrightCalc - Fast Online Calculators for Finance, Health, Math and Units",
    description: "A fully responsive calculator website with search, financial calculators, health tools, math calculators, date calculators, unit converters, formulas, examples, and FAQs.",
    path: "/",
    base: "",
    content,
    schema
  }));
}

function renderCalculatorPage(calc) {
  const category = site.getCategory(calc.categoryId);
  const related = relatedCalculators(calc, 4);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: calc.title,
      url: absoluteUrl("/" + calc.slug + "/"),
      applicationCategory: "CalculatorApplication",
      operatingSystem: "Any",
      description: calc.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: calc.faq.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ];

  const content = '<section class="page-hero">' +
    '<div class="container">' +
    '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../">Home</a><span>/</span><a href="../calculators/">Calculators</a><span>/</span><span>' + escapeHtml(calc.title) + '</span></nav>' +
    '<p class="eyebrow">' + escapeHtml(category.title) + ' calculator</p>' +
    '<h1>' + escapeHtml(calc.title) + '</h1>' +
    '<p>' + escapeHtml(calc.description) + '</p>' +
    '<div class="meta-pills"><span class="pill">Free online tool</span><span class="pill">Formula included</span><span class="pill">Mobile friendly</span></div>' +
    '</div>' +
    '</section>' +
    '<section class="calculator-layout" id="calculator" tabindex="-1"><div class="container calc-workspace">' +
    renderForm(calc) +
    renderResultPanel() +
    '</div></section>' +
    '<section class="section alt"><div class="container content-grid">' +
    '<div class="content-stack">' +
    '<article class="content-panel"><h2>Step-by-step explanation</h2><ol>' + calc.explanation.map(step => '<li>' + escapeHtml(step) + '</li>').join("") + '</ol></article>' +
    '<article class="content-panel"><h2>Formula used</h2><div class="formula-box">' + escapeHtml(calc.formula) + '</div></article>' +
    '<article class="content-panel"><h2>Example calculation</h2><p>' + escapeHtml(calc.example) + '</p></article>' +
    '<article class="content-panel"><h2>Frequently asked questions</h2><div class="faq-list">' + calc.faq.map(renderFaq).join("") + '</div></article>' +
    '</div>' +
    '<aside class="related-panel"><h2>Related calculators</h2><div class="related-list">' + related.map(item => '<a href="../' + item.slug + '/#calculator"><span>' + escapeHtml(item.title) + '</span><small>' + escapeHtml(item.description) + '</small></a>').join("") + '</div></aside>' +
    '</div></section>';

  writeFile(calc.slug + "/index.html", pageShell({
    title: calc.metaTitle,
    description: calc.metaDescription,
    path: "/" + calc.slug + "/",
    base: "../",
    calculator: calc.slug,
    content,
    schema
  }));
}

function renderForm(calc) {
  return '<form class="calculator-form" data-calculator-form novalidate>' +
    '<h2>Enter details</h2>' +
    '<p class="muted">' + escapeHtml(calc.description) + '</p>' +
    '<div class="form-grid">' + calc.inputs.map(input => renderInput(calc.slug, input)).join("") + '</div>' +
    '<div class="form-actions">' +
    '<button class="btn" type="submit">' + icon("spark") + 'Calculate</button>' +
    '<button class="btn secondary" type="button" data-reset-form>' + icon("reset") + 'Reset</button>' +
    '</div>' +
    '</form>';
}

function renderInput(slug, input) {
  const id = slug + "-" + input.name;
  const full = input.type === "text" || input.type === "datetime-local" ? " full" : "";
  const required = input.required ? " required" : "";
  const label = '<label for="' + id + '">' + escapeHtml(input.label) + '</label>';
  let control = "";
  if (input.type === "select") {
    control = '<select id="' + id + '" name="' + input.name + '" data-label="' + escapeHtml(input.label) + '"' + required + '>' +
      input.options.map(option => '<option value="' + escapeHtml(option[0]) + '"' + (String(option[0]) === String(input.defaultValue) ? " selected" : "") + '>' + escapeHtml(option[1]) + '</option>').join("") +
      '</select>';
  } else {
    const attrs = [
      'id="' + id + '"',
      'name="' + input.name + '"',
      'type="' + input.type + '"',
      'data-label="' + escapeHtml(input.label) + '"',
      required.trim(),
      input.type === "number" && typeof input.min !== "undefined" ? 'min="' + input.min + '"' : "",
      input.type === "number" && typeof input.step !== "undefined" ? 'step="' + input.step + '"' : "",
      typeof input.defaultValue !== "undefined" && input.defaultValue !== false ? 'value="' + escapeHtml(input.defaultValue) + '"' : "",
      input.placeholder ? 'placeholder="' + escapeHtml(input.placeholder) + '"' : "",
      input.suffix ? 'data-has-suffix="true"' : ""
    ].filter(Boolean).join(" ");
    control = '<input ' + attrs + '>';
  }
  return '<div class="form-field' + full + '">' +
    label +
    '<div class="field-control">' + control + (input.suffix ? '<span class="field-suffix">' + escapeHtml(input.suffix) + '</span>' : "") + '</div>' +
    '<div class="field-error" aria-live="polite"></div>' +
    '</div>';
}

function renderResultPanel() {
  return '<aside class="result-panel" data-result-shell data-state="empty" aria-live="polite">' +
    '<h2>Result</h2>' +
    '<div class="result-summary" data-result-summary>Enter values and calculate to see results.</div>' +
    '<div class="result-list" data-result-list></div>' +
    '<ol class="result-steps" data-result-steps></ol>' +
    '<div class="form-actions"><button class="btn accent" type="button" data-share-result disabled>' + icon("share") + 'Share result</button></div>' +
    '<div class="result-status" data-result-status></div>' +
    '</aside>';
}

function renderFaq(item) {
  return '<details class="faq-item"><summary>' + escapeHtml(item.question) + '</summary><p>' + escapeHtml(item.answer) + '</p></details>';
}

function relatedCalculators(calc, count) {
  const sameCategory = site.calculators.filter(item => item.categoryId === calc.categoryId && item.slug !== calc.slug);
  const popular = site.calculators.filter(item => item.popular && item.slug !== calc.slug && item.categoryId !== calc.categoryId);
  return sameCategory.concat(popular).slice(0, count);
}

function renderAllCalculatorsPage() {
  const sections = site.categories.map(category => {
    const items = site.calculators.filter(calc => calc.categoryId === category.id).map(calc => renderCalculatorCard(calc, "../", category.title)).join("");
    return '<section class="section" id="' + category.id + '"><div class="container"><div class="section-head"><div><p class="eyebrow">' + escapeHtml(category.eyebrow) + '</p><h2>' + escapeHtml(category.title) + '</h2><p>' + escapeHtml(category.description) + '</p></div></div><div class="grid calculator-grid">' + items + '</div></div></section>';
  }).join("");

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All calculators",
    url: absoluteUrl("/calculators/"),
    description: "Browse all calculators by category.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: site.calculators.map((calc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl("/" + calc.slug + "/"),
        name: calc.title
      }))
    }
  };

  const content = '<section class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../">Home</a><span>/</span><span>All calculators</span></nav><p class="eyebrow">Complete index</p><h1>All calculators</h1><p>Browse every calculator by category or use search to jump directly to a tool.</p></div></section>' + sections;
  writeFile("calculators/index.html", pageShell({
    title: "All Calculators - Finance, Health, Math, Date and Unit Tools",
    description: "Browse all BrightCalc calculators across financial, health, math, date and time, and unit conversion categories.",
    path: "/calculators/",
    base: "../",
    content,
    schema
  }));
}

function renderArticleCard(article, base) {
  return '<a class="card card-link article-card" href="' + base + 'articles/' + article.slug + '/">' +
    '<span class="pill">' + escapeHtml(article.category) + '</span>' +
    '<h3>' + escapeHtml(article.title) + '</h3>' +
    '<p>' + escapeHtml(article.description) + '</p>' +
    '<span class="read-more">Read guide</span>' +
    '</a>';
}

function renderArticlesIndex() {
  const content = '<section class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../">Home</a><span>/</span><span>Articles</span></nav><p class="eyebrow">Calculator guides</p><h1>Articles</h1><p>Short guides that explain how to use calculators and read results with more confidence.</p></div></section>' +
    '<section class="section"><div class="container"><div class="grid article-grid">' + articles.map(article => renderArticleCard(article, "../")).join("") + '</div></div></section>';
  writeFile("articles/index.html", pageShell({
    title: "Calculator Articles - Guides for Loans, BMI, Calories and Interest",
    description: "Read practical guides that explain loan calculators, BMI and calorie estimates, compound interest, and related calculator concepts.",
    path: "/articles/",
    base: "../",
    content,
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "BrightCalc Articles",
      url: absoluteUrl("/articles/")
    }
  }));
}

function renderArticlePage(article) {
  const related = article.related.map(slug => site.getCalculator(slug)).filter(Boolean);
  const sections = article.sections.map(section => '<h2>' + escapeHtml(section[0]) + '</h2><p>' + escapeHtml(section[1]) + '</p>').join("");
  const content = '<section class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../../">Home</a><span>/</span><a href="../">Articles</a><span>/</span><span>' + escapeHtml(article.title) + '</span></nav><p class="eyebrow">' + escapeHtml(article.category) + ' guide</p><h1>' + escapeHtml(article.title) + '</h1><p>' + escapeHtml(article.description) + '</p></div></section>' +
    '<section class="section"><div class="container content-grid"><article class="content-panel article-content">' + sections + '</article><aside class="related-panel"><h2>Try these calculators</h2><div class="related-list">' + related.map(calc => '<a href="../../' + calc.slug + '/#calculator"><span>' + escapeHtml(calc.title) + '</span><small>' + escapeHtml(calc.description) + '</small></a>').join("") + '</div></aside></div></section>';
  writeFile("articles/" + article.slug + "/index.html", pageShell({
    title: article.title + " - BrightCalc",
    description: article.description,
    path: "/articles/" + article.slug + "/",
    base: "../../",
    ogType: "article",
    content,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      url: absoluteUrl("/articles/" + article.slug + "/"),
      author: {
        "@type": "Organization",
        name: "BrightCalc"
      }
    }
  }));
}

function renderInfoPages() {
  const aboutContent = '<section class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../">Home</a><span>/</span><span>About</span></nav><p class="eyebrow">About BrightCalc</p><h1>Simple calculators with clear formulas.</h1><p>BrightCalc is built for fast everyday decisions. Every calculator page includes inputs, results, formulas, examples, related calculators, and FAQs.</p></div></section>' +
    '<section class="section"><div class="container content-panel article-content"><h2>What we build for</h2><p>Accuracy, speed, readability, and mobile usability guide the platform. The calculators use transparent JavaScript formulas, and educational sections explain how each result is produced.</p><h2>Important note</h2><p>Calculator output is for planning and education. Financial, tax, health, and legal decisions can require professional advice and the latest local rules.</p></div></section>';

  writeFile("about/index.html", pageShell({
    title: "About BrightCalc - Fast, Clear Online Calculators",
    description: "Learn about BrightCalc, a fast and responsive calculator platform with formulas, examples, and clear explanations.",
    path: "/about/",
    base: "../",
    content: aboutContent,
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About BrightCalc",
      url: absoluteUrl("/about/")
    }
  }));

  const contactContent = '<section class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../">Home</a><span>/</span><span>Contact</span></nav><p class="eyebrow">Contact</p><h1>Contact BrightCalc</h1><p>Send feedback, calculator requests, or correction notes. The form opens your email app with a prepared message.</p></div></section>' +
    '<section class="section"><div class="container content-grid"><form class="calculator-form" data-contact-form><h2>Send a message</h2><div class="form-grid"><div class="form-field"><label for="contact-name">Name</label><div class="field-control"><input id="contact-name" name="name" type="text" required></div><div class="field-error"></div></div><div class="form-field"><label for="contact-email">Email</label><div class="field-control"><input id="contact-email" name="email" type="email" required></div><div class="field-error"></div></div><div class="form-field full"><label for="contact-message">Message</label><div class="field-control"><textarea id="contact-message" name="message" required></textarea></div><div class="field-error"></div></div></div><div class="form-actions"><button class="btn" type="submit">' + icon("share") + 'Send</button></div><div class="result-status" data-contact-status></div></form><aside class="content-panel"><h2>Good messages include</h2><ul><li>The calculator page you were using.</li><li>The inputs you entered.</li><li>The result you expected, if reporting an issue.</li></ul></aside></div></section>';

  writeFile("contact/index.html", pageShell({
    title: "Contact BrightCalc - Calculator Feedback and Requests",
    description: "Contact BrightCalc with calculator feedback, correction notes, or requests for new calculator tools.",
    path: "/contact/",
    base: "../",
    content: contactContent,
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact BrightCalc",
      url: absoluteUrl("/contact/")
    }
  }));

  const privacyContent = '<section class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../">Home</a><span>/</span><span>Privacy Policy</span></nav><p class="eyebrow">Privacy</p><h1>Privacy Policy</h1><p>BrightCalc is designed to be private by default. Calculations run in your browser and recent calculations are stored locally on your device.</p></div></section>' +
    '<section class="section"><div class="container content-panel article-content"><h2>Data we store</h2><ul class="privacy-list"><li>Calculator inputs are processed in your browser.</li><li>Recent calculations are saved in local storage only when you press Calculate.</li><li>Contact form content is sent through your own email app.</li></ul><h2>Analytics and cookies</h2><p>This generated build does not include analytics scripts or advertising cookies. If analytics are added later, disclose them here before launch.</p><h2>Control</h2><p>You can clear recent calculations by clearing browser site data for this website.</p></div></section>';

  writeFile("privacy-policy/index.html", pageShell({
    title: "Privacy Policy - BrightCalc",
    description: "Read the BrightCalc privacy policy covering browser-side calculations, local storage, contact messages, analytics, and cookies.",
    path: "/privacy-policy/",
    base: "../",
    content: privacyContent,
    schema: {
      "@context": "https://schema.org",
      "@type": "PrivacyPolicy",
      name: "Privacy Policy",
      url: absoluteUrl("/privacy-policy/")
    }
  }));
}

function renderSitemap() {
  const paths = ["/", "/calculators/", "/articles/", "/about/", "/contact/", "/privacy-policy/"]
    .concat(site.calculators.map(calc => "/" + calc.slug + "/"))
    .concat(articles.map(article => "/articles/" + article.slug + "/"));
  const today = new Date().toISOString().slice(0, 10);
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map(urlPath => '  <url><loc>' + absoluteUrl(urlPath) + '</loc><lastmod>' + today + '</lastmod></url>').join("\n") +
    '\n</urlset>\n';
  writeFile("sitemap.xml", xml);
  writeFile("robots.txt", "User-agent: *\nAllow: /\nSitemap: " + absoluteUrl("/sitemap.xml") + "\n");
}

function renderManifest() {
  const manifest = {
    name: "BrightCalc",
    short_name: "BrightCalc",
    description: "Fast online calculators for finance, health, math, date and unit conversions.",
    start_url: "/",
    display: "standalone",
    background_color: "#F9FBFD",
    theme_color: "#4CAF50"
  };
  writeFile("site.webmanifest", JSON.stringify(manifest, null, 2) + "\n");
}

function renderReadme() {
  const content = "# BrightCalc\n\n" +
    "A fast static calculator website with SEO-friendly directory URLs, shared calculator logic, search suggestions, recent calculations, shareable results, articles, sitemap, robots file, and responsive UI.\n\n" +
    "Calculator links include `#calculator`, so users land directly on the working calculator form after clicking a tool.\n\n" +
    "## Run locally\n\n" +
    "Serve the folder with the included static server so clean URLs like `/emi-calculator/` resolve correctly.\n\n" +
    "```bash\n" +
    "node scripts/serve.js\n" +
    "```\n\n" +
    "The server writes the local preview URL to `.server-port`.\n\n" +
    "## Rebuild pages\n\n" +
    "```bash\n" +
    "node scripts/build-site.js\n" +
    "```\n\n" +
    "Set `SITE_URL` before rebuilding if you want production canonical and sitemap URLs for a specific domain.\n\n" +
    "## Upload to Netlify\n\n" +
    "1. Go to `https://app.netlify.com/drop` and sign in.\n" +
    "2. Drag this whole project folder into the upload area.\n" +
    "3. Netlify will publish it at a `netlify.app` URL.\n" +
    "4. In Netlify, select `Customize` near the preview URL and choose `brightcalc-pvsagar-20260504` as the site name if it is available.\n" +
    "5. Your free website URL will be `https://brightcalc-pvsagar-20260504.netlify.app/`.\n" +
    "6. If Netlify says the name is taken, choose another unique name, then rebuild with `SITE_URL` set to that final URL before uploading again.\n";
  writeFile("README.md", content);
}

function build() {
  renderHome();
  site.calculators.forEach(renderCalculatorPage);
  renderAllCalculatorsPage();
  renderArticlesIndex();
  articles.forEach(renderArticlePage);
  renderInfoPages();
  renderSitemap();
  renderManifest();
  renderReadme();
  console.log("Built " + site.calculators.length + " calculator pages and " + articles.length + " article pages.");
}

build();
