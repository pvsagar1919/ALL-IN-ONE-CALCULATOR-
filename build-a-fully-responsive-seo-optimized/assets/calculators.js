(function (root, factory) {
  var site = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = site;
  }
  root.CalculatorSite = site;
})(typeof self !== "undefined" ? self : this, function () {
  var categories = [
    {
      id: "financial",
      title: "Financial",
      eyebrow: "Money planning",
      description: "Plan loans, investments, taxes, and long-term growth with clear formulas.",
      icon: "finance"
    },
    {
      id: "health",
      title: "Health",
      eyebrow: "Wellness tools",
      description: "Estimate body metrics, calories, ideal weight, and pregnancy dates.",
      icon: "health"
    },
    {
      id: "math",
      title: "Math",
      eyebrow: "Everyday math",
      description: "Solve percentages, fractions, ratios, and scientific expressions quickly.",
      icon: "math"
    },
    {
      id: "date",
      title: "Date & Time",
      eyebrow: "Calendar helpers",
      description: "Calculate ages, date gaps, and countdowns using calendar-aware logic.",
      icon: "date"
    },
    {
      id: "unit",
      title: "Unit Converters",
      eyebrow: "Conversions",
      description: "Convert common length, weight, temperature, and speed units instantly.",
      icon: "unit"
    }
  ];

  var calculators = [
    {
      slug: "emi-calculator",
      title: "EMI Calculator",
      shortTitle: "EMI",
      categoryId: "financial",
      popular: true,
      description: "Calculate monthly EMI, total interest, and total repayment for a loan.",
      metaTitle: "EMI Calculator - Monthly Loan EMI, Interest and Repayment",
      metaDescription: "Use the EMI calculator to estimate monthly loan EMI, total interest, and total repayment with a clear amortization formula.",
      inputs: [
        inputNumber("loanAmount", "Loan amount", 1000000, 1, 1000, "INR"),
        inputNumber("annualRate", "Annual interest rate", 8.5, 0, 0.01, "% p.a."),
        inputNumber("tenureYears", "Loan tenure", 5, 0.1, 0.1, "years")
      ],
      formula: "EMI = P x r x (1 + r)^n / ((1 + r)^n - 1), where r is monthly rate and n is total months.",
      example: "For INR 10,00,000 at 8.5% for 5 years, monthly EMI is about INR 20,516 and total interest is about INR 2,30,968.",
      explanation: [
        "Convert the annual interest rate into a monthly decimal rate.",
        "Convert tenure into total monthly installments.",
        "Apply the EMI formula to find the fixed monthly payment.",
        "Multiply EMI by months to get total repayment, then subtract principal for total interest."
      ],
      faq: [
        faq("What is EMI?", "EMI is the fixed monthly payment made toward a loan. It includes both principal and interest."),
        faq("Does EMI change during the loan?", "For a fixed-rate loan, EMI usually stays the same. Floating-rate loans can change when the rate changes."),
        faq("Is processing fee included?", "No. This calculator estimates principal and interest only unless fees are added to the loan amount.")
      ]
    },
    {
      slug: "sip-calculator",
      title: "SIP Calculator",
      shortTitle: "SIP",
      categoryId: "financial",
      popular: true,
      description: "Estimate the future value of monthly SIP investments using expected annual returns.",
      metaTitle: "SIP Calculator - Mutual Fund SIP Future Value",
      metaDescription: "Calculate SIP maturity value, invested amount, and estimated gains from monthly investments.",
      inputs: [
        inputNumber("monthlyInvestment", "Monthly investment", 10000, 1, 500, "INR"),
        inputNumber("annualReturn", "Expected annual return", 12, 0, 0.1, "% p.a."),
        inputNumber("years", "Investment period", 10, 0.1, 0.1, "years")
      ],
      formula: "FV = P x (((1 + i)^n - 1) / i) x (1 + i), where i is monthly return and n is months.",
      example: "Investing INR 10,000 monthly for 10 years at 12% may grow to about INR 23,23,391, with INR 12,00,000 invested.",
      explanation: [
        "Convert the expected annual return to a monthly return.",
        "Calculate the total number of monthly SIP contributions.",
        "Apply the future value formula for payments made at the beginning of each month.",
        "Subtract total invested amount from maturity value to estimate wealth gained."
      ],
      faq: [
        faq("Is SIP return guaranteed?", "No. SIP returns depend on market performance and the actual fund return."),
        faq("Why is the formula different from lump sum investing?", "SIP invests periodically, so each installment compounds for a different amount of time."),
        faq("Can I use this for step-up SIPs?", "This calculator uses a constant monthly SIP. For step-up SIPs, use a separate yearly increase model.")
      ]
    },
    {
      slug: "loan-calculator",
      title: "Loan Calculator",
      shortTitle: "Loan",
      categoryId: "financial",
      popular: true,
      description: "Plan personal or business loans with payment, interest, and payoff estimates.",
      metaTitle: "Loan Calculator - Payment, Interest and Payoff Estimate",
      metaDescription: "Estimate loan payment, total interest, total repayment, and payoff time with optional extra monthly payment.",
      inputs: [
        inputNumber("principal", "Loan principal", 500000, 1, 1000, "INR"),
        inputNumber("annualRate", "Annual interest rate", 10.5, 0, 0.01, "% p.a."),
        inputNumber("years", "Loan term", 4, 0.1, 0.1, "years"),
        inputNumber("extraPayment", "Extra monthly payment", 0, 0, 500, "INR", false)
      ],
      formula: "Payment = P x r x (1 + r)^n / ((1 + r)^n - 1). Extra payments reduce principal faster.",
      example: "A INR 5,00,000 loan at 10.5% for 4 years has a monthly payment near INR 12,803 before extra payments.",
      explanation: [
        "Find the scheduled monthly payment using the standard amortization formula.",
        "Add any extra monthly payment to the scheduled payment.",
        "For each month, interest is charged on the remaining balance.",
        "The rest of the payment reduces principal until the loan is paid off."
      ],
      faq: [
        faq("How does extra payment help?", "Extra payment reduces outstanding principal faster, which lowers future interest."),
        faq("Can this be used for personal loans?", "Yes. It works for most fixed-rate amortizing loans."),
        faq("Are fees included?", "No. Add fees to principal if they are financed into the loan.")
      ]
    },
    {
      slug: "mortgage-calculator",
      title: "Mortgage Calculator",
      shortTitle: "Mortgage",
      categoryId: "financial",
      popular: false,
      description: "Estimate a home loan payment with principal, interest, property tax, and insurance.",
      metaTitle: "Mortgage Calculator - Home Loan Monthly Payment",
      metaDescription: "Calculate mortgage principal and interest, estimated taxes, insurance, total monthly payment, and interest over the loan term.",
      inputs: [
        inputNumber("homePrice", "Home price", 5000000, 1, 10000, "INR"),
        inputNumber("downPayment", "Down payment", 1000000, 0, 10000, "INR"),
        inputNumber("annualRate", "Annual interest rate", 8, 0, 0.01, "% p.a."),
        inputNumber("years", "Loan term", 20, 1, 1, "years"),
        inputNumber("annualTaxes", "Annual property tax", 30000, 0, 1000, "INR", false),
        inputNumber("annualInsurance", "Annual insurance", 12000, 0, 1000, "INR", false)
      ],
      formula: "Monthly P&I = P x r x (1 + r)^n / ((1 + r)^n - 1). Total payment adds monthly taxes and insurance.",
      example: "A INR 40,00,000 mortgage at 8% for 20 years has principal and interest near INR 33,458 per month.",
      explanation: [
        "Subtract down payment from home price to get the mortgage principal.",
        "Calculate monthly principal and interest using the amortization formula.",
        "Divide annual property tax and insurance by 12.",
        "Add those monthly costs to estimate the total housing payment."
      ],
      faq: [
        faq("Is this the same as a home loan EMI?", "The principal and interest portion uses the same EMI formula."),
        faq("Does it include maintenance charges?", "No. Add maintenance separately to your monthly budget."),
        faq("What if my down payment is larger than home price?", "The calculator validates that down payment cannot exceed home price.")
      ]
    },
    {
      slug: "income-tax-calculator",
      title: "Income Tax Calculator",
      shortTitle: "Income Tax",
      categoryId: "financial",
      popular: true,
      description: "Estimate India income tax for AY 2026-27 under new or old regime slabs.",
      metaTitle: "Income Tax Calculator India - AY 2026-27 New and Old Regime",
      metaDescription: "Estimate India income tax under AY 2026-27 new and old regime slabs with rebate, surcharge, and 4% health and education cess.",
      inputs: [
        inputNumber("grossIncome", "Annual gross income", 1200000, 0, 10000, "INR"),
        inputNumber("deductions", "Eligible deductions and exemptions", 0, 0, 1000, "INR", false),
        inputSelect("regime", "Tax regime", "new", [
          ["new", "New regime u/s 115BAC"],
          ["old", "Old regime"]
        ]),
        inputSelect("ageGroup", "Age group", "below60", [
          ["below60", "Below 60 years"],
          ["60to79", "60 to 79 years"],
          ["80plus", "80 years or above"]
        ]),
        inputSelect("resident", "Residential status for rebate", "yes", [
          ["yes", "Resident individual"],
          ["no", "Non-resident individual"]
        ])
      ],
      formula: "Tax = slab tax - eligible rebate + surcharge + 4% health and education cess.",
      example: "Under AY 2026-27 new regime, taxable income up to INR 12,00,000 can get rebate up to INR 60,000 for resident individuals.",
      explanation: [
        "Subtract eligible deductions from gross income to get taxable income.",
        "Apply the selected regime slab rates to taxable income.",
        "Apply section 87A rebate when the resident taxpayer and income conditions are met.",
        "Add surcharge when income exceeds the threshold and then apply 4% cess."
      ],
      faq: [
        faq("Which India tax year is used?", "This calculator uses AY 2026-27 slab rates for individual taxpayers."),
        faq("Does this handle capital gains?", "No. Special-rate income, capital gains, and marginal relief require a detailed tax worksheet."),
        faq("Does it include cess?", "Yes. It adds 4% health and education cess after tax and surcharge.")
      ]
    },
    {
      slug: "compound-interest-calculator",
      title: "Compound Interest Calculator",
      shortTitle: "Compound Interest",
      categoryId: "financial",
      popular: true,
      description: "Calculate compound growth with optional monthly additions.",
      metaTitle: "Compound Interest Calculator - Future Value and Interest Earned",
      metaDescription: "Calculate future value, total contributions, and compound interest earned from principal, rate, time, and compounding frequency.",
      inputs: [
        inputNumber("principal", "Initial principal", 100000, 0, 1000, "INR"),
        inputNumber("annualRate", "Annual interest rate", 8, 0, 0.01, "% p.a."),
        inputNumber("years", "Time period", 10, 0.1, 0.1, "years"),
        inputSelect("frequency", "Compounding frequency", "12", [
          ["1", "Annually"],
          ["2", "Semi-annually"],
          ["4", "Quarterly"],
          ["12", "Monthly"],
          ["365", "Daily"]
        ]),
        inputNumber("monthlyContribution", "Monthly contribution", 0, 0, 500, "INR", false)
      ],
      formula: "A = P x (1 + r/n)^(n x t). Monthly contributions compound using the equivalent monthly rate.",
      example: "INR 1,00,000 at 8% compounded monthly for 10 years grows to about INR 2,21,964 before extra contributions.",
      explanation: [
        "Convert the annual rate to a decimal and divide by compounding frequency.",
        "Raise the growth factor to the number of compounding periods.",
        "Apply the factor to principal.",
        "If monthly contributions are provided, compound each contribution using the equivalent monthly rate."
      ],
      faq: [
        faq("What does compounding frequency mean?", "It is how often interest is added to the balance."),
        faq("Are monthly contributions made at month end?", "This calculator treats monthly contributions as made at the end of each month."),
        faq("Can I use this for fixed deposits?", "Yes, if the rate and compounding frequency match the deposit terms.")
      ]
    },
    {
      slug: "bmi-calculator",
      title: "BMI Calculator",
      shortTitle: "BMI",
      categoryId: "health",
      popular: true,
      description: "Calculate body mass index and see the common BMI category.",
      metaTitle: "BMI Calculator - Body Mass Index and Category",
      metaDescription: "Calculate BMI from height and weight, with category and healthy weight range estimates.",
      inputs: [
        inputNumber("weightKg", "Weight", 70, 1, 0.1, "kg"),
        inputNumber("heightCm", "Height", 170, 30, 0.1, "cm")
      ],
      formula: "BMI = weight in kg / (height in meters)^2.",
      example: "A person weighing 70 kg and 170 cm tall has BMI 24.2, which is in the normal range.",
      explanation: [
        "Convert height from centimeters to meters.",
        "Square the height in meters.",
        "Divide weight in kilograms by squared height.",
        "Compare BMI with standard adult BMI categories."
      ],
      faq: [
        faq("Is BMI a diagnosis?", "No. BMI is a screening estimate and does not measure body composition directly."),
        faq("Can athletes have high BMI?", "Yes. High muscle mass can raise BMI without indicating excess body fat."),
        faq("Is BMI used for children?", "Children use age and sex percentile charts, not the adult category bands shown here.")
      ]
    },
    {
      slug: "calorie-calculator",
      title: "Calorie Calculator",
      shortTitle: "Calories",
      categoryId: "health",
      popular: true,
      description: "Estimate daily maintenance calories using the Mifflin-St Jeor equation.",
      metaTitle: "Calorie Calculator - Daily Maintenance Calories",
      metaDescription: "Estimate BMR and daily maintenance calories using age, sex, height, weight, and activity level.",
      inputs: [
        inputSelect("sex", "Sex", "male", [
          ["male", "Male"],
          ["female", "Female"]
        ]),
        inputNumber("age", "Age", 30, 10, 1, "years"),
        inputNumber("heightCm", "Height", 170, 50, 0.1, "cm"),
        inputNumber("weightKg", "Weight", 70, 20, 0.1, "kg"),
        inputSelect("activity", "Activity level", "1.55", [
          ["1.2", "Sedentary"],
          ["1.375", "Light activity"],
          ["1.55", "Moderate activity"],
          ["1.725", "Very active"],
          ["1.9", "Athlete level"]
        ])
      ],
      formula: "BMR = 10W + 6.25H - 5A + S, where S is +5 for men and -161 for women. TDEE = BMR x activity factor.",
      example: "A 30-year-old man, 70 kg, 170 cm, moderate activity has maintenance near 2,550 calories per day.",
      explanation: [
        "Calculate basal metabolic rate from sex, age, height, and weight.",
        "Choose an activity multiplier based on typical weekly movement.",
        "Multiply BMR by activity factor to estimate maintenance calories.",
        "Use surplus or deficit targets depending on weight goal."
      ],
      faq: [
        faq("Is this exact for everyone?", "No. It is a useful estimate. Real maintenance can vary with metabolism, activity tracking, and body composition."),
        faq("How should I use cutting calories?", "A modest deficit such as 10% to 20% below maintenance is commonly used."),
        faq("How should I use bulking calories?", "A modest surplus such as 5% to 15% above maintenance is commonly used.")
      ]
    },
    {
      slug: "ideal-weight-calculator",
      title: "Ideal Weight Calculator",
      shortTitle: "Ideal Weight",
      categoryId: "health",
      popular: false,
      description: "Estimate ideal body weight using the Devine formula with a practical range.",
      metaTitle: "Ideal Weight Calculator - Devine Formula Estimate",
      metaDescription: "Estimate ideal body weight by height and sex using the Devine formula plus a practical healthy range.",
      inputs: [
        inputSelect("sex", "Sex", "male", [
          ["male", "Male"],
          ["female", "Female"]
        ]),
        inputNumber("heightCm", "Height", 170, 100, 0.1, "cm")
      ],
      formula: "Men: 50 kg + 2.3 kg per inch over 5 ft. Women: 45.5 kg + 2.3 kg per inch over 5 ft.",
      example: "A 170 cm male is about 5 ft 7 in, so the Devine estimate is about 66 kg.",
      explanation: [
        "Convert height from centimeters to inches.",
        "Find inches above 5 feet.",
        "Use the sex-specific Devine base weight.",
        "Show a practical range around the estimate because ideal weight is not a single universal number."
      ],
      faq: [
        faq("Is ideal weight medical advice?", "No. It is a formula-based estimate, not a diagnosis or personal medical target."),
        faq("Why show a range?", "Healthy weight depends on frame size, muscle, age, and health context."),
        faq("Can short heights be calculated?", "Yes. Heights below 5 ft use the formula base without added inches.")
      ]
    },
    {
      slug: "pregnancy-due-date-calculator",
      title: "Pregnancy Due Date Calculator",
      shortTitle: "Due Date",
      categoryId: "health",
      popular: false,
      description: "Estimate due date, conception date, and trimester milestones from last period.",
      metaTitle: "Pregnancy Due Date Calculator - Estimated Delivery Date",
      metaDescription: "Estimate pregnancy due date from last menstrual period and cycle length, with conception and trimester dates.",
      inputs: [
        inputDate("lastPeriod", "First day of last menstrual period"),
        inputNumber("cycleLength", "Average cycle length", 28, 20, 1, "days")
      ],
      formula: "Estimated due date = LMP + 280 days + (cycle length - 28 days).",
      example: "If LMP was 2026-01-01 and cycle length is 28 days, estimated due date is 2026-10-08.",
      explanation: [
        "Start with the first day of the last menstrual period.",
        "Add 280 days, the common 40-week pregnancy estimate.",
        "Adjust for cycle length compared with a 28-day cycle.",
        "Estimate conception and trimester milestones from the due date."
      ],
      faq: [
        faq("Is the due date exact?", "No. It is an estimate. A clinician can adjust it using ultrasound and medical history."),
        faq("Why does cycle length matter?", "Longer or shorter cycles can shift estimated ovulation and due date."),
        faq("What date should I enter?", "Enter the first day of the last menstrual period.")
      ]
    },
    {
      slug: "scientific-calculator",
      title: "Scientific Calculator",
      shortTitle: "Scientific",
      categoryId: "math",
      popular: true,
      description: "Evaluate scientific expressions with powers, roots, logarithms, and trigonometry.",
      metaTitle: "Scientific Calculator - Trigonometry, Logs, Powers and Roots",
      metaDescription: "Use a safe scientific calculator for arithmetic, powers, square roots, logarithms, trigonometric functions, pi, and e.",
      inputs: [
        inputText("expression", "Expression", "sqrt(144) + sin(30) + 2^3", "Use + - * / ^, sqrt(), log(), ln(), sin(), cos(), tan(), pi, e"),
        inputSelect("angleMode", "Angle mode", "deg", [
          ["deg", "Degrees"],
          ["rad", "Radians"]
        ])
      ],
      formula: "Expressions are parsed by precedence: parentheses, functions, powers, multiplication/division, then addition/subtraction.",
      example: "sqrt(144) + sin(30) + 2^3 in degree mode equals 20.5.",
      explanation: [
        "Read parentheses and function calls first.",
        "Evaluate powers before multiplication and division.",
        "Evaluate addition and subtraction last.",
        "Use degree or radian conversion for trigonometric functions."
      ],
      faq: [
        faq("Is the expression evaluated with eval?", "No. The site uses a small parser for supported math functions instead of browser eval."),
        faq("Which functions are supported?", "sqrt, abs, ln, log, sin, cos, tan, asin, acos, atan, pi, and e are supported."),
        faq("How do powers work?", "Use the caret operator, such as 2^8.")
      ]
    },
    {
      slug: "percentage-calculator",
      title: "Percentage Calculator",
      shortTitle: "Percentage",
      categoryId: "math",
      popular: true,
      description: "Calculate percent of a number, increases, decreases, and percentage change.",
      metaTitle: "Percentage Calculator - Percent Of, Increase, Decrease and Change",
      metaDescription: "Calculate percentages, percent increase or decrease, and percentage change with step-by-step formulas.",
      inputs: [
        inputSelect("mode", "Calculation type", "percentOf", [
          ["percentOf", "What is P% of X?"],
          ["increase", "Increase X by P%"],
          ["decrease", "Decrease X by P%"],
          ["whatPercent", "X is what percent of Y?"],
          ["change", "Percentage change from X to Y"]
        ]),
        inputNumber("baseValue", "X value", 200, 0, 0.01, ""),
        inputNumber("percentage", "P percentage", 15, 0, 0.01, "%", false),
        inputNumber("newValue", "Y value", 250, 0, 0.01, "", false)
      ],
      formula: "Percent of X = X x P / 100. Percentage change = (Y - X) / X x 100.",
      example: "15% of 200 is 30. Increasing 200 by 15% gives 230.",
      explanation: [
        "Choose the percentage calculation type.",
        "Use X as the base or starting value.",
        "Use P for a direct percent calculation, or Y for comparison modes.",
        "Apply the selected formula and format the result clearly."
      ],
      faq: [
        faq("What is percent change?", "Percent change compares a new value with an old value as a share of the old value."),
        faq("Can I calculate discounts?", "Yes. Use decrease X by P% for discount-style calculations."),
        faq("Can values be decimal?", "Yes. Decimal values and decimal percentages are supported.")
      ]
    },
    {
      slug: "fraction-calculator",
      title: "Fraction Calculator",
      shortTitle: "Fraction",
      categoryId: "math",
      popular: false,
      description: "Add, subtract, multiply, or divide fractions and reduce the result.",
      metaTitle: "Fraction Calculator - Add, Subtract, Multiply and Divide",
      metaDescription: "Calculate fraction operations with reduced result, mixed number, decimal value, and step-by-step formula.",
      inputs: [
        inputNumber("n1", "First numerator", 1, -999999, 1, ""),
        inputNumber("d1", "First denominator", 2, -999999, 1, ""),
        inputSelect("operator", "Operation", "+", [
          ["+", "Add"],
          ["-", "Subtract"],
          ["*", "Multiply"],
          ["/", "Divide"]
        ]),
        inputNumber("n2", "Second numerator", 1, -999999, 1, ""),
        inputNumber("d2", "Second denominator", 3, -999999, 1, "")
      ],
      formula: "a/b + c/d = (ad + bc) / bd. Multiply across for multiplication; divide by multiplying by reciprocal.",
      example: "1/2 + 1/3 = (3 + 2) / 6 = 5/6.",
      explanation: [
        "Validate that denominators are not zero.",
        "Apply the selected fraction operation.",
        "Reduce the numerator and denominator by their greatest common divisor.",
        "Show the exact fraction, mixed number, and decimal value."
      ],
      faq: [
        faq("Can denominators be negative?", "Yes. The calculator normalizes the sign into the numerator."),
        faq("What is a reduced fraction?", "A reduced fraction divides numerator and denominator by their greatest common divisor."),
        faq("How is division handled?", "Dividing by a fraction multiplies by its reciprocal.")
      ]
    },
    {
      slug: "ratio-calculator",
      title: "Ratio Calculator",
      shortTitle: "Ratio",
      categoryId: "math",
      popular: false,
      description: "Simplify ratios and solve equivalent ratio problems.",
      metaTitle: "Ratio Calculator - Simplify and Solve Equivalent Ratios",
      metaDescription: "Simplify A:B ratios and solve A:B = C:X with a clear proportional formula.",
      inputs: [
        inputNumber("a", "A", 4, 0.000001, 0.01, ""),
        inputNumber("b", "B", 6, 0.000001, 0.01, ""),
        inputNumber("c", "C in A:B = C:X", 10, 0.000001, 0.01, "")
      ],
      formula: "For A:B = C:X, X = (B x C) / A. Simplified ratio divides A and B by their common factor.",
      example: "For 4:6 = 10:X, X = 6 x 10 / 4 = 15. The ratio 4:6 simplifies to 2:3.",
      explanation: [
        "Read A and B as the starting ratio.",
        "Simplify A:B when both values are whole numbers.",
        "Set up an equivalent proportion A/B = C/X.",
        "Solve for X by cross multiplication."
      ],
      faq: [
        faq("Can ratios include decimals?", "Yes. Equivalent ratio solving supports decimals."),
        faq("Why simplify ratios?", "Simplified ratios make proportions easier to compare."),
        faq("What does X mean?", "X is the missing value that keeps C:X equivalent to A:B.")
      ]
    },
    {
      slug: "age-calculator",
      title: "Age Calculator",
      shortTitle: "Age",
      categoryId: "date",
      popular: true,
      description: "Calculate exact age in years, months, days, and total days.",
      metaTitle: "Age Calculator - Exact Age in Years, Months and Days",
      metaDescription: "Calculate exact age between date of birth and any as-of date, including total days lived.",
      inputs: [
        inputDate("birthDate", "Date of birth"),
        inputDate("asOfDate", "Age on date", false)
      ],
      formula: "Age = calendar difference between birth date and as-of date, adjusted for incomplete months and days.",
      example: "Someone born on 2000-01-15 is 26 years, 3 months, and 19 days old on 2026-05-04.",
      explanation: [
        "Compare the birth date with the selected as-of date.",
        "Subtract years first, then adjust if the birthday has not occurred.",
        "Adjust months and days using the previous calendar month length.",
        "Also calculate total elapsed days."
      ],
      faq: [
        faq("What if I leave age on date blank?", "The calculator uses today's date from your device."),
        faq("Does it account for leap years?", "Yes. It uses calendar dates, so leap years are included."),
        faq("Can I calculate future age?", "Yes. Choose a future as-of date.")
      ]
    },
    {
      slug: "date-difference-calculator",
      title: "Date Difference Calculator",
      shortTitle: "Date Difference",
      categoryId: "date",
      popular: false,
      description: "Find the number of days, weeks, months, and calendar difference between two dates.",
      metaTitle: "Date Difference Calculator - Days, Weeks, Months and Years",
      metaDescription: "Calculate date difference between two dates, with optional inclusive end date and calendar breakdown.",
      inputs: [
        inputDate("startDate", "Start date"),
        inputDate("endDate", "End date"),
        inputSelect("includeEnd", "Include end date", "no", [
          ["no", "No"],
          ["yes", "Yes"]
        ])
      ],
      formula: "Total days = end date - start date. Inclusive mode adds one day.",
      example: "From 2026-05-01 to 2026-05-04 is 3 days, or 4 days when the end date is included.",
      explanation: [
        "Convert both dates to local calendar dates.",
        "Subtract start from end to get elapsed days.",
        "Add one day when inclusive counting is selected.",
        "Convert total days to weeks and show a calendar-style breakdown."
      ],
      faq: [
        faq("What does include end date mean?", "It counts both the start date and the end date as full calendar days."),
        faq("Can the end date be before start date?", "No. The calculator asks you to place the later date as the end date."),
        faq("Are times included?", "No. This calculator compares calendar dates only.")
      ]
    },
    {
      slug: "countdown-timer",
      title: "Countdown Timer",
      shortTitle: "Countdown",
      categoryId: "date",
      popular: false,
      description: "Count down to a future date and time with days, hours, minutes, and seconds.",
      metaTitle: "Countdown Timer - Days, Hours, Minutes and Seconds",
      metaDescription: "Create a countdown to a target date and time with live days, hours, minutes, and seconds.",
      inputs: [
        inputDateTime("targetDateTime", "Target date and time")
      ],
      formula: "Remaining time = target date and time - current device time.",
      example: "If the target is 48 hours from now, the timer shows 2 days, 0 hours, 0 minutes, and 0 seconds.",
      explanation: [
        "Read the target date and time.",
        "Compare it with the current device time.",
        "Convert remaining milliseconds into days, hours, minutes, and seconds.",
        "Update the result while the page is open."
      ],
      faq: [
        faq("Does the countdown update live?", "Yes. Once calculated, the page refreshes the remaining time every second."),
        faq("Which timezone is used?", "The calculator uses the timezone of your device."),
        faq("Can I count down to a past date?", "Past targets show that the target time has already passed.")
      ]
    },
    {
      slug: "length-converter",
      title: "Length Converter",
      shortTitle: "Length",
      categoryId: "unit",
      popular: true,
      description: "Convert meters, kilometers, centimeters, inches, feet, yards, and miles.",
      metaTitle: "Length Converter - Meter, Kilometer, Inch, Foot, Yard and Mile",
      metaDescription: "Convert common length units instantly with exact conversion factors.",
      inputs: [
        inputNumber("value", "Value", 100, -999999999, 0.01, ""),
        inputSelect("fromUnit", "From", "meter", lengthOptions()),
        inputSelect("toUnit", "To", "foot", lengthOptions())
      ],
      formula: "Converted value = input value x from-unit factor / to-unit factor.",
      example: "100 meters equals 328.08399 feet.",
      explanation: [
        "Convert the input value into meters using the source unit factor.",
        "Divide the meter value by the target unit factor.",
        "Format the converted value with practical decimal precision.",
        "Show the exact conversion relationship used."
      ],
      faq: [
        faq("Are conversions exact?", "Metric and defined imperial conversion factors are exact for these units."),
        faq("Can I enter negative values?", "Yes. Negative length values are useful for coordinate-style calculations."),
        faq("What is the base unit?", "Meters are used as the internal base unit.")
      ]
    },
    {
      slug: "weight-converter",
      title: "Weight Converter",
      shortTitle: "Weight",
      categoryId: "unit",
      popular: false,
      description: "Convert kilograms, grams, pounds, ounces, tonnes, and stones.",
      metaTitle: "Weight Converter - Kilogram, Gram, Pound, Ounce and Tonne",
      metaDescription: "Convert common weight and mass units using clear conversion factors.",
      inputs: [
        inputNumber("value", "Value", 70, -999999999, 0.01, ""),
        inputSelect("fromUnit", "From", "kilogram", weightOptions()),
        inputSelect("toUnit", "To", "pound", weightOptions())
      ],
      formula: "Converted value = input value x from-unit kg factor / to-unit kg factor.",
      example: "70 kilograms equals about 154.324 pounds.",
      explanation: [
        "Convert the input value into kilograms.",
        "Divide by the target unit's kilogram factor.",
        "Format the converted amount.",
        "Show the factor relationship for quick checking."
      ],
      faq: [
        faq("Is weight the same as mass here?", "For everyday conversions, the site treats these units as mass units."),
        faq("Can I convert pounds to kilograms?", "Yes. Choose pound as the source and kilogram as the target."),
        faq("What is the base unit?", "Kilograms are used as the internal base unit.")
      ]
    },
    {
      slug: "temperature-converter",
      title: "Temperature Converter",
      shortTitle: "Temperature",
      categoryId: "unit",
      popular: false,
      description: "Convert Celsius, Fahrenheit, Kelvin, and Rankine temperatures.",
      metaTitle: "Temperature Converter - Celsius, Fahrenheit, Kelvin and Rankine",
      metaDescription: "Convert Celsius, Fahrenheit, Kelvin, and Rankine with formulas and validation.",
      inputs: [
        inputNumber("value", "Temperature", 37, -100000, 0.01, ""),
        inputSelect("fromUnit", "From", "celsius", temperatureOptions()),
        inputSelect("toUnit", "To", "fahrenheit", temperatureOptions())
      ],
      formula: "C = (F - 32) x 5/9, K = C + 273.15, R = (C + 273.15) x 9/5.",
      example: "37 Celsius equals 98.6 Fahrenheit.",
      explanation: [
        "Convert the source temperature into Celsius.",
        "Validate that Kelvin or Rankine values are not below absolute zero.",
        "Convert Celsius into the selected target unit.",
        "Show the converted temperature and formula relationship."
      ],
      faq: [
        faq("Can Kelvin be negative?", "No. Kelvin cannot be below 0 because it starts at absolute zero."),
        faq("What is normal body temperature in Fahrenheit?", "37 Celsius equals 98.6 Fahrenheit."),
        faq("Is Rankine supported?", "Yes. Rankine converts through Kelvin and Celsius.")
      ]
    },
    {
      slug: "speed-converter",
      title: "Speed Converter",
      shortTitle: "Speed",
      categoryId: "unit",
      popular: false,
      description: "Convert meters per second, kilometers per hour, miles per hour, knots, and feet per second.",
      metaTitle: "Speed Converter - m/s, km/h, mph, knots and ft/s",
      metaDescription: "Convert common speed units instantly using exact base factors.",
      inputs: [
        inputNumber("value", "Value", 60, -999999999, 0.01, ""),
        inputSelect("fromUnit", "From", "kilometer-hour", speedOptions()),
        inputSelect("toUnit", "To", "mile-hour", speedOptions())
      ],
      formula: "Converted speed = input speed x source m/s factor / target m/s factor.",
      example: "60 km/h equals about 37.282 mph.",
      explanation: [
        "Convert the input speed to meters per second.",
        "Divide by the target unit factor.",
        "Format the result in the selected unit.",
        "Show the conversion relationship used."
      ],
      faq: [
        faq("What is a knot?", "A knot is one nautical mile per hour."),
        faq("Can I convert mph to km/h?", "Yes. Choose miles per hour as the source and kilometers per hour as the target."),
        faq("What is the base unit?", "Meters per second are used as the internal base unit.")
      ]
    }
  ];

  var lengthFactors = {
    meter: { label: "Meter", abbr: "m", factor: 1 },
    kilometer: { label: "Kilometer", abbr: "km", factor: 1000 },
    centimeter: { label: "Centimeter", abbr: "cm", factor: 0.01 },
    millimeter: { label: "Millimeter", abbr: "mm", factor: 0.001 },
    inch: { label: "Inch", abbr: "in", factor: 0.0254 },
    foot: { label: "Foot", abbr: "ft", factor: 0.3048 },
    yard: { label: "Yard", abbr: "yd", factor: 0.9144 },
    mile: { label: "Mile", abbr: "mi", factor: 1609.344 }
  };

  var weightFactors = {
    kilogram: { label: "Kilogram", abbr: "kg", factor: 1 },
    gram: { label: "Gram", abbr: "g", factor: 0.001 },
    tonne: { label: "Tonne", abbr: "t", factor: 1000 },
    pound: { label: "Pound", abbr: "lb", factor: 0.45359237 },
    ounce: { label: "Ounce", abbr: "oz", factor: 0.028349523125 },
    stone: { label: "Stone", abbr: "st", factor: 6.35029318 }
  };

  var speedFactors = {
    "meter-second": { label: "Meter per second", abbr: "m/s", factor: 1 },
    "kilometer-hour": { label: "Kilometer per hour", abbr: "km/h", factor: 0.2777777777777778 },
    "mile-hour": { label: "Mile per hour", abbr: "mph", factor: 0.44704 },
    knot: { label: "Knot", abbr: "kn", factor: 0.5144444444444445 },
    "foot-second": { label: "Foot per second", abbr: "ft/s", factor: 0.3048 }
  };

  var calculationMap = {
    "emi-calculator": calculateEmi,
    "sip-calculator": calculateSip,
    "loan-calculator": calculateLoan,
    "mortgage-calculator": calculateMortgage,
    "income-tax-calculator": calculateIncomeTax,
    "compound-interest-calculator": calculateCompoundInterest,
    "bmi-calculator": calculateBmi,
    "calorie-calculator": calculateCalories,
    "ideal-weight-calculator": calculateIdealWeight,
    "pregnancy-due-date-calculator": calculatePregnancy,
    "scientific-calculator": calculateScientific,
    "percentage-calculator": calculatePercentage,
    "fraction-calculator": calculateFraction,
    "ratio-calculator": calculateRatio,
    "age-calculator": calculateAge,
    "date-difference-calculator": calculateDateDifference,
    "countdown-timer": calculateCountdown,
    "length-converter": function (data) {
      return calculateLinearUnit(data, lengthFactors, "meters");
    },
    "weight-converter": function (data) {
      return calculateLinearUnit(data, weightFactors, "kilograms");
    },
    "temperature-converter": calculateTemperature,
    "speed-converter": function (data) {
      return calculateLinearUnit(data, speedFactors, "meters per second");
    }
  };

  function inputNumber(name, label, defaultValue, min, step, suffix, required) {
    return {
      type: "number",
      name: name,
      label: label,
      defaultValue: defaultValue,
      min: min,
      step: step,
      suffix: suffix || "",
      required: required !== false
    };
  }

  function inputSelect(name, label, defaultValue, options) {
    return {
      type: "select",
      name: name,
      label: label,
      defaultValue: defaultValue,
      options: options,
      required: true
    };
  }

  function inputText(name, label, defaultValue, placeholder) {
    return {
      type: "text",
      name: name,
      label: label,
      defaultValue: defaultValue,
      placeholder: placeholder,
      required: true
    };
  }

  function inputDate(name, label, required) {
    return {
      type: "date",
      name: name,
      label: label,
      required: required !== false
    };
  }

  function inputDateTime(name, label) {
    return {
      type: "datetime-local",
      name: name,
      label: label,
      required: true
    };
  }

  function faq(question, answer) {
    return { question: question, answer: answer };
  }

  function lengthOptions() {
    return [
      ["meter", "Meter"],
      ["kilometer", "Kilometer"],
      ["centimeter", "Centimeter"],
      ["millimeter", "Millimeter"],
      ["inch", "Inch"],
      ["foot", "Foot"],
      ["yard", "Yard"],
      ["mile", "Mile"]
    ];
  }

  function weightOptions() {
    return [
      ["kilogram", "Kilogram"],
      ["gram", "Gram"],
      ["tonne", "Tonne"],
      ["pound", "Pound"],
      ["ounce", "Ounce"],
      ["stone", "Stone"]
    ];
  }

  function temperatureOptions() {
    return [
      ["celsius", "Celsius"],
      ["fahrenheit", "Fahrenheit"],
      ["kelvin", "Kelvin"],
      ["rankine", "Rankine"]
    ];
  }

  function speedOptions() {
    return [
      ["meter-second", "Meter per second"],
      ["kilometer-hour", "Kilometer per hour"],
      ["mile-hour", "Mile per hour"],
      ["knot", "Knot"],
      ["foot-second", "Foot per second"]
    ];
  }

  function getCalculator(slug) {
    for (var i = 0; i < calculators.length; i += 1) {
      if (calculators[i].slug === slug) {
        return calculators[i];
      }
    }
    return null;
  }

  function getCategory(id) {
    for (var i = 0; i < categories.length; i += 1) {
      if (categories[i].id === id) {
        return categories[i];
      }
    }
    return null;
  }

  function calculate(slug, data) {
    if (!calculationMap[slug]) {
      throwUser("This calculator is not available yet.");
    }
    return calculationMap[slug](data || {});
  }

  function throwUser(message) {
    var error = new Error(message);
    error.userMessage = message;
    throw error;
  }

  function numberValue(data, key, label) {
    var value = data[key];
    if (value === "" || value === null || typeof value === "undefined") {
      throwUser(label + " is required.");
    }
    var number = Number(value);
    if (!Number.isFinite(number)) {
      throwUser(label + " must be a valid number.");
    }
    return number;
  }

  function nonNegative(data, key, label) {
    var value = numberValue(data, key, label);
    if (value < 0) {
      throwUser(label + " cannot be negative.");
    }
    return value;
  }

  function positive(data, key, label) {
    var value = numberValue(data, key, label);
    if (value <= 0) {
      throwUser(label + " must be greater than zero.");
    }
    return value;
  }

  function optionalNonNegative(data, key, label) {
    if (data[key] === "" || data[key] === null || typeof data[key] === "undefined") {
      return 0;
    }
    return nonNegative(data, key, label);
  }

  function formatNumber(value, decimals) {
    var places = typeof decimals === "number" ? decimals : 2;
    if (Math.abs(value) >= 1000 && typeof Intl !== "undefined") {
      return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: places,
        minimumFractionDigits: value % 1 === 0 ? 0 : Math.min(2, places)
      }).format(value);
    }
    return round(value, places).toLocaleString(undefined, {
      maximumFractionDigits: places,
      minimumFractionDigits: value % 1 === 0 ? 0 : Math.min(2, places)
    });
  }

  function formatCurrency(value) {
    if (typeof Intl !== "undefined") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: Math.abs(value) >= 1000 ? 0 : 2
      }).format(value);
    }
    return "INR " + formatNumber(value, 2);
  }

  function formatPercent(value, decimals) {
    return formatNumber(value, typeof decimals === "number" ? decimals : 2) + "%";
  }

  function round(value, decimals) {
    var factor = Math.pow(10, decimals || 0);
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }

  function amortizedPayment(principal, monthlyRate, months) {
    if (months <= 0) {
      throwUser("Term must be greater than zero.");
    }
    if (monthlyRate === 0) {
      return principal / months;
    }
    var factor = Math.pow(1 + monthlyRate, months);
    return principal * monthlyRate * factor / (factor - 1);
  }

  function calculateEmi(data) {
    var principal = positive(data, "loanAmount", "Loan amount");
    var annualRate = nonNegative(data, "annualRate", "Annual interest rate");
    var years = positive(data, "tenureYears", "Loan tenure");
    var months = Math.round(years * 12);
    var monthlyRate = annualRate / 100 / 12;
    var emi = amortizedPayment(principal, monthlyRate, months);
    var totalPayment = emi * months;
    var totalInterest = totalPayment - principal;
    return result("Monthly EMI: " + formatCurrency(emi), [
      out("Monthly EMI", formatCurrency(emi)),
      out("Total interest", formatCurrency(totalInterest)),
      out("Total repayment", formatCurrency(totalPayment)),
      out("Installments", formatNumber(months, 0) + " months")
    ], [
      "Monthly rate = " + formatPercent(monthlyRate * 100, 4) + ".",
      "Total installments = " + months + ".",
      "EMI = " + formatCurrency(emi) + ".",
      "Total interest = total repayment - loan amount = " + formatCurrency(totalInterest) + "."
    ]);
  }

  function calculateSip(data) {
    var p = positive(data, "monthlyInvestment", "Monthly investment");
    var annualReturn = nonNegative(data, "annualReturn", "Expected annual return");
    var years = positive(data, "years", "Investment period");
    var months = Math.round(years * 12);
    var i = annualReturn / 100 / 12;
    var futureValue = i === 0 ? p * months : p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    var invested = p * months;
    var gains = futureValue - invested;
    return result("Estimated value: " + formatCurrency(futureValue), [
      out("Estimated maturity value", formatCurrency(futureValue)),
      out("Total invested", formatCurrency(invested)),
      out("Estimated gains", formatCurrency(gains)),
      out("Monthly return used", formatPercent(i * 100, 4))
    ], [
      "Monthly return = annual return / 12 = " + formatPercent(i * 100, 4) + ".",
      "Number of SIP installments = " + months + ".",
      "Future value is calculated as a growing stream of monthly investments.",
      "Estimated gains = maturity value - total invested = " + formatCurrency(gains) + "."
    ]);
  }

  function calculateLoan(data) {
    var principal = positive(data, "principal", "Loan principal");
    var annualRate = nonNegative(data, "annualRate", "Annual interest rate");
    var years = positive(data, "years", "Loan term");
    var extra = optionalNonNegative(data, "extraPayment", "Extra monthly payment");
    var months = Math.round(years * 12);
    var monthlyRate = annualRate / 100 / 12;
    var scheduledPayment = amortizedPayment(principal, monthlyRate, months);
    var balance = principal;
    var totalPaid = 0;
    var totalInterest = 0;
    var elapsed = 0;
    var monthlyOutflow = scheduledPayment + extra;

    if (monthlyRate > 0 && monthlyOutflow <= principal * monthlyRate) {
      throwUser("Payment is too small to cover monthly interest.");
    }

    while (balance > 0.01 && elapsed < 12000) {
      var interest = balance * monthlyRate;
      var principalPaid = monthlyOutflow - interest;
      if (principalPaid <= 0) {
        throwUser("Payment is too small to reduce the loan balance.");
      }
      if (principalPaid > balance) {
        principalPaid = balance;
      }
      totalInterest += interest;
      totalPaid += interest + principalPaid;
      balance -= principalPaid;
      elapsed += 1;
    }

    return result("Monthly payment: " + formatCurrency(scheduledPayment), [
      out("Scheduled monthly payment", formatCurrency(scheduledPayment)),
      out("Monthly outflow with extra", formatCurrency(monthlyOutflow)),
      out("Estimated payoff time", elapsed + " months"),
      out("Total interest", formatCurrency(totalInterest)),
      out("Total repayment", formatCurrency(totalPaid))
    ], [
      "Scheduled payment is based on " + months + " months.",
      "Monthly outflow = scheduled payment + extra payment.",
      "Each month, interest is balance x monthly rate.",
      "Principal reduces by payment after interest, giving a payoff estimate of " + elapsed + " months."
    ]);
  }

  function calculateMortgage(data) {
    var homePrice = positive(data, "homePrice", "Home price");
    var downPayment = nonNegative(data, "downPayment", "Down payment");
    if (downPayment >= homePrice) {
      throwUser("Down payment must be less than home price.");
    }
    var annualRate = nonNegative(data, "annualRate", "Annual interest rate");
    var years = positive(data, "years", "Loan term");
    var annualTaxes = optionalNonNegative(data, "annualTaxes", "Annual property tax");
    var annualInsurance = optionalNonNegative(data, "annualInsurance", "Annual insurance");
    var principal = homePrice - downPayment;
    var months = Math.round(years * 12);
    var monthlyRate = annualRate / 100 / 12;
    var pi = amortizedPayment(principal, monthlyRate, months);
    var taxes = annualTaxes / 12;
    var insurance = annualInsurance / 12;
    var totalMonthly = pi + taxes + insurance;
    var totalInterest = pi * months - principal;

    return result("Estimated monthly payment: " + formatCurrency(totalMonthly), [
      out("Loan principal", formatCurrency(principal)),
      out("Principal and interest", formatCurrency(pi)),
      out("Monthly taxes", formatCurrency(taxes)),
      out("Monthly insurance", formatCurrency(insurance)),
      out("Total monthly payment", formatCurrency(totalMonthly)),
      out("Total interest", formatCurrency(totalInterest))
    ], [
      "Mortgage principal = home price - down payment = " + formatCurrency(principal) + ".",
      "Principal and interest payment uses the amortization formula.",
      "Monthly taxes and insurance are annual amounts divided by 12.",
      "Total monthly payment = P&I + taxes + insurance = " + formatCurrency(totalMonthly) + "."
    ]);
  }

  function calculateIncomeTax(data) {
    var gross = nonNegative(data, "grossIncome", "Annual gross income");
    var deductions = optionalNonNegative(data, "deductions", "Eligible deductions and exemptions");
    if (deductions > gross) {
      throwUser("Deductions cannot exceed gross income.");
    }
    var regime = data.regime === "old" ? "old" : "new";
    var ageGroup = data.ageGroup || "below60";
    var resident = data.resident !== "no";
    var taxable = Math.max(0, gross - deductions);
    var baseTax = slabTax(taxable, regime, ageGroup);
    var rebateLimit = 0;
    var rebateCondition = false;
    if (resident && regime === "new" && taxable <= 1200000) {
      rebateLimit = 60000;
      rebateCondition = true;
    }
    if (resident && regime === "old" && taxable <= 500000) {
      rebateLimit = 12500;
      rebateCondition = true;
    }
    var rebate = rebateCondition ? Math.min(baseTax, rebateLimit) : 0;
    var taxAfterRebate = Math.max(0, baseTax - rebate);
    var surchargeRate = getSurchargeRate(taxable, regime);
    var surcharge = taxAfterRebate * surchargeRate;
    var cess = (taxAfterRebate + surcharge) * 0.04;
    var total = taxAfterRebate + surcharge + cess;

    return result("Estimated tax payable: " + formatCurrency(total), [
      out("Taxable income", formatCurrency(taxable)),
      out("Slab tax before rebate", formatCurrency(baseTax)),
      out("Section 87A rebate", formatCurrency(rebate)),
      out("Surcharge", formatCurrency(surcharge)),
      out("Health and education cess", formatCurrency(cess)),
      out("Estimated total tax", formatCurrency(total)),
      out("Approx monthly tax", formatCurrency(total / 12))
    ], [
      "Taxable income = gross income - deductions = " + formatCurrency(taxable) + ".",
      "Selected regime: " + (regime === "new" ? "new regime u/s 115BAC" : "old regime") + ".",
      "Rebate applied = " + formatCurrency(rebate) + ".",
      "Cess = 4% of tax after rebate plus surcharge = " + formatCurrency(cess) + ".",
      "This estimate excludes marginal relief and special-rate income such as certain capital gains."
    ]);
  }

  function slabTax(income, regime, ageGroup) {
    var slabs;
    if (regime === "new") {
      slabs = [
        [400000, 0],
        [800000, 0.05],
        [1200000, 0.10],
        [1600000, 0.15],
        [2000000, 0.20],
        [2400000, 0.25],
        [Infinity, 0.30]
      ];
    } else if (ageGroup === "80plus") {
      slabs = [
        [500000, 0],
        [1000000, 0.20],
        [Infinity, 0.30]
      ];
    } else if (ageGroup === "60to79") {
      slabs = [
        [300000, 0],
        [500000, 0.05],
        [1000000, 0.20],
        [Infinity, 0.30]
      ];
    } else {
      slabs = [
        [250000, 0],
        [500000, 0.05],
        [1000000, 0.20],
        [Infinity, 0.30]
      ];
    }

    var tax = 0;
    var previousLimit = 0;
    for (var i = 0; i < slabs.length; i += 1) {
      var limit = slabs[i][0];
      var rate = slabs[i][1];
      if (income > previousLimit) {
        var taxableAtBand = Math.min(income, limit) - previousLimit;
        tax += taxableAtBand * rate;
      }
      previousLimit = limit;
      if (income <= limit) {
        break;
      }
    }
    return tax;
  }

  function getSurchargeRate(income, regime) {
    if (income <= 5000000) {
      return 0;
    }
    if (income <= 10000000) {
      return 0.10;
    }
    if (income <= 20000000) {
      return 0.15;
    }
    if (income <= 50000000) {
      return 0.25;
    }
    return regime === "old" ? 0.37 : 0.25;
  }

  function calculateCompoundInterest(data) {
    var principal = nonNegative(data, "principal", "Initial principal");
    var annualRate = nonNegative(data, "annualRate", "Annual interest rate");
    var years = positive(data, "years", "Time period");
    var frequency = positive(data, "frequency", "Compounding frequency");
    var monthlyContribution = optionalNonNegative(data, "monthlyContribution", "Monthly contribution");
    var rate = annualRate / 100;
    var periods = frequency * years;
    var principalFuture = rate === 0 ? principal : principal * Math.pow(1 + rate / frequency, periods);
    var months = Math.round(years * 12);
    var monthlyRate = rate === 0 ? 0 : Math.pow(1 + rate / frequency, frequency / 12) - 1;
    var contributionFuture = 0;
    if (monthlyContribution > 0) {
      contributionFuture = monthlyRate === 0 ? monthlyContribution * months : monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }
    var futureValue = principalFuture + contributionFuture;
    var contributed = principal + monthlyContribution * months;
    var interest = futureValue - contributed;

    return result("Future value: " + formatCurrency(futureValue), [
      out("Future value", formatCurrency(futureValue)),
      out("Total contributions", formatCurrency(contributed)),
      out("Interest earned", formatCurrency(interest)),
      out("Compounding periods", formatNumber(periods, 0))
    ], [
      "Periodic rate = annual rate / compounding frequency.",
      "Principal grows to " + formatCurrency(principalFuture) + ".",
      "Monthly contribution future value = " + formatCurrency(contributionFuture) + ".",
      "Interest earned = future value - total contributions = " + formatCurrency(interest) + "."
    ]);
  }

  function calculateBmi(data) {
    var weight = positive(data, "weightKg", "Weight");
    var heightCm = positive(data, "heightCm", "Height");
    var heightM = heightCm / 100;
    var bmi = weight / (heightM * heightM);
    var category = "Normal weight";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 30) {
      category = "Obesity range";
    } else if (bmi >= 25) {
      category = "Overweight";
    }
    var minHealthy = 18.5 * heightM * heightM;
    var maxHealthy = 24.9 * heightM * heightM;
    return result("BMI: " + formatNumber(bmi, 1) + " (" + category + ")", [
      out("BMI", formatNumber(bmi, 1)),
      out("Category", category),
      out("Healthy weight range", formatNumber(minHealthy, 1) + " kg to " + formatNumber(maxHealthy, 1) + " kg")
    ], [
      "Height in meters = " + formatNumber(heightM, 2) + ".",
      "BMI = " + weight + " / " + formatNumber(heightM, 2) + "^2.",
      "BMI result = " + formatNumber(bmi, 1) + ".",
      "Category is based on common adult BMI ranges."
    ]);
  }

  function calculateCalories(data) {
    var sex = data.sex === "female" ? "female" : "male";
    var age = positive(data, "age", "Age");
    var height = positive(data, "heightCm", "Height");
    var weight = positive(data, "weightKg", "Weight");
    var activity = positive(data, "activity", "Activity level");
    var bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : -161);
    var maintenance = bmr * activity;
    return result("Maintenance calories: " + formatNumber(maintenance, 0) + " kcal/day", [
      out("BMR", formatNumber(bmr, 0) + " kcal/day"),
      out("Maintenance calories", formatNumber(maintenance, 0) + " kcal/day"),
      out("Mild fat-loss target", formatNumber(maintenance * 0.85, 0) + " kcal/day"),
      out("Lean-gain target", formatNumber(maintenance * 1.10, 0) + " kcal/day")
    ], [
      "BMR uses Mifflin-St Jeor with sex-specific constant.",
      "Activity factor = " + activity + ".",
      "Maintenance = BMR x activity factor = " + formatNumber(maintenance, 0) + " kcal/day.",
      "Targets show practical estimates around maintenance."
    ]);
  }

  function calculateIdealWeight(data) {
    var sex = data.sex === "female" ? "female" : "male";
    var heightCm = positive(data, "heightCm", "Height");
    var inches = heightCm / 2.54;
    var overFiveFeet = Math.max(0, inches - 60);
    var ideal = (sex === "male" ? 50 : 45.5) + 2.3 * overFiveFeet;
    var low = ideal * 0.9;
    var high = ideal * 1.1;
    return result("Estimated ideal weight: " + formatNumber(ideal, 1) + " kg", [
      out("Formula estimate", formatNumber(ideal, 1) + " kg"),
      out("Practical range", formatNumber(low, 1) + " kg to " + formatNumber(high, 1) + " kg"),
      out("Height in inches", formatNumber(inches, 1) + " in")
    ], [
      "Height in inches = height cm / 2.54 = " + formatNumber(inches, 1) + ".",
      "Inches over 5 ft = " + formatNumber(overFiveFeet, 1) + ".",
      "Devine estimate = " + formatNumber(ideal, 1) + " kg.",
      "Range is +/- 10% around the estimate."
    ]);
  }

  function calculatePregnancy(data) {
    var lmp = dateValue(data, "lastPeriod", "Last menstrual period");
    var cycleLength = positive(data, "cycleLength", "Average cycle length");
    var adjustment = Math.round(cycleLength - 28);
    var dueDate = addDays(lmp, 280 + adjustment);
    var conception = addDays(dueDate, -266);
    var trimester2 = addDays(lmp, 98 + adjustment);
    var trimester3 = addDays(lmp, 189 + adjustment);
    return result("Estimated due date: " + formatDate(dueDate), [
      out("Estimated due date", formatDate(dueDate)),
      out("Estimated conception date", formatDate(conception)),
      out("Second trimester starts", formatDate(trimester2)),
      out("Third trimester starts", formatDate(trimester3))
    ], [
      "Base estimate adds 280 days to LMP.",
      "Cycle adjustment = " + adjustment + " days.",
      "Due date = LMP + 280 days + adjustment.",
      "Conception estimate is about 266 days before due date."
    ]);
  }

  function calculateScientific(data) {
    var expression = String(data.expression || "").trim();
    if (!expression) {
      throwUser("Expression is required.");
    }
    var angleMode = data.angleMode === "rad" ? "rad" : "deg";
    var value = evaluateExpression(expression, angleMode);
    return result("Result: " + formatNumber(value, 10), [
      out("Expression result", formatNumber(value, 10)),
      out("Angle mode", angleMode === "deg" ? "Degrees" : "Radians")
    ], [
      "Expression was parsed using calculator precedence.",
      "Functions and parentheses were evaluated before arithmetic operators.",
      "Angle mode used for trigonometric functions: " + (angleMode === "deg" ? "degrees" : "radians") + ".",
      "Final numeric result = " + formatNumber(value, 10) + "."
    ]);
  }

  function evaluateExpression(source, angleMode) {
    var text = source.toLowerCase().replace(/\s+/g, "");
    var index = 0;

    function peek() {
      return text.charAt(index);
    }

    function consume(char) {
      if (text.charAt(index) === char) {
        index += 1;
        return true;
      }
      return false;
    }

    function parseExpression() {
      var value = parseTerm();
      while (true) {
        if (consume("+")) {
          value += parseTerm();
        } else if (consume("-")) {
          value -= parseTerm();
        } else {
          return value;
        }
      }
    }

    function parseTerm() {
      var value = parsePower();
      while (true) {
        if (consume("*")) {
          value *= parsePower();
        } else if (consume("/")) {
          var divisor = parsePower();
          if (divisor === 0) {
            throwUser("Division by zero is not allowed.");
          }
          value /= divisor;
        } else {
          return value;
        }
      }
    }

    function parsePower() {
      var value = parseUnary();
      if (consume("^")) {
        value = Math.pow(value, parsePower());
      }
      return value;
    }

    function parseUnary() {
      if (consume("+")) {
        return parseUnary();
      }
      if (consume("-")) {
        return -parseUnary();
      }
      return parsePrimary();
    }

    function parsePrimary() {
      if (consume("(")) {
        var grouped = parseExpression();
        if (!consume(")")) {
          throwUser("Missing closing parenthesis.");
        }
        return grouped;
      }

      if (isDigit(peek()) || peek() === ".") {
        var number = parseNumber();
        while (consume("%")) {
          number /= 100;
        }
        return number;
      }

      if (isLetter(peek())) {
        var name = parseName();
        if (name === "pi") {
          return Math.PI;
        }
        if (name === "e") {
          return Math.E;
        }
        if (!consume("(")) {
          throwUser("Function " + name + " needs parentheses.");
        }
        var arg = parseExpression();
        if (!consume(")")) {
          throwUser("Missing closing parenthesis for " + name + ".");
        }
        return applyFunction(name, arg, angleMode);
      }

      throwUser("Unexpected character near '" + peek() + "'.");
    }

    function parseNumber() {
      var start = index;
      while (isDigit(peek()) || peek() === ".") {
        index += 1;
      }
      var value = Number(text.slice(start, index));
      if (!Number.isFinite(value)) {
        throwUser("Invalid number in expression.");
      }
      return value;
    }

    function parseName() {
      var start = index;
      while (isLetter(peek())) {
        index += 1;
      }
      return text.slice(start, index);
    }

    var parsed = parseExpression();
    if (index < text.length) {
      throwUser("Unexpected input near '" + text.slice(index) + "'.");
    }
    if (!Number.isFinite(parsed)) {
      throwUser("The expression result is not finite.");
    }
    return parsed;
  }

  function isDigit(char) {
    return char >= "0" && char <= "9";
  }

  function isLetter(char) {
    return char >= "a" && char <= "z";
  }

  function applyFunction(name, value, angleMode) {
    var toRadians = angleMode === "deg" ? Math.PI / 180 : 1;
    var fromRadians = angleMode === "deg" ? 180 / Math.PI : 1;
    if (name === "sqrt") {
      if (value < 0) {
        throwUser("Square root needs a non-negative value.");
      }
      return Math.sqrt(value);
    }
    if (name === "abs") return Math.abs(value);
    if (name === "ln") {
      if (value <= 0) throwUser("ln needs a value greater than zero.");
      return Math.log(value);
    }
    if (name === "log") {
      if (value <= 0) throwUser("log needs a value greater than zero.");
      return Math.log10(value);
    }
    if (name === "sin") return Math.sin(value * toRadians);
    if (name === "cos") return Math.cos(value * toRadians);
    if (name === "tan") return Math.tan(value * toRadians);
    if (name === "asin") {
      if (value < -1 || value > 1) throwUser("asin needs a value from -1 to 1.");
      return Math.asin(value) * fromRadians;
    }
    if (name === "acos") {
      if (value < -1 || value > 1) throwUser("acos needs a value from -1 to 1.");
      return Math.acos(value) * fromRadians;
    }
    if (name === "atan") return Math.atan(value) * fromRadians;
    throwUser("Unsupported function: " + name + ".");
  }

  function calculatePercentage(data) {
    var mode = data.mode || "percentOf";
    var base = numberValue(data, "baseValue", "X value");
    var percentage = data.percentage === "" ? 0 : numberValue(data, "percentage", "P percentage");
    var y = data.newValue === "" ? 0 : numberValue(data, "newValue", "Y value");
    var value;
    var label;
    var steps;
    if (mode === "percentOf") {
      value = base * percentage / 100;
      label = percentage + "% of " + base;
      steps = [
        "Convert percentage to decimal: " + percentage + " / 100.",
        "Multiply by X: " + base + " x " + (percentage / 100) + ".",
        "Result = " + formatNumber(value, 4) + "."
      ];
      return result(label + " = " + formatNumber(value, 4), [out("Result", formatNumber(value, 4))], steps);
    }
    if (mode === "increase") {
      value = base * (1 + percentage / 100);
      return result("Increased value: " + formatNumber(value, 4), [
        out("Final value", formatNumber(value, 4)),
        out("Increase amount", formatNumber(value - base, 4))
      ], [
        "Increase factor = 1 + P/100 = " + formatNumber(1 + percentage / 100, 4) + ".",
        "Final value = X x increase factor.",
        "Increase amount = final value - X."
      ]);
    }
    if (mode === "decrease") {
      value = base * (1 - percentage / 100);
      return result("Decreased value: " + formatNumber(value, 4), [
        out("Final value", formatNumber(value, 4)),
        out("Decrease amount", formatNumber(base - value, 4))
      ], [
        "Decrease factor = 1 - P/100 = " + formatNumber(1 - percentage / 100, 4) + ".",
        "Final value = X x decrease factor.",
        "Decrease amount = X - final value."
      ]);
    }
    if (mode === "whatPercent") {
      if (y === 0) throwUser("Y value cannot be zero.");
      value = base / y * 100;
      return result("X is " + formatPercent(value, 4) + " of Y", [
        out("Percentage", formatPercent(value, 4))
      ], [
        "Divide X by Y: " + base + " / " + y + ".",
        "Multiply by 100.",
        "Result = " + formatPercent(value, 4) + "."
      ]);
    }
    if (mode === "change") {
      if (base === 0) throwUser("X value cannot be zero for percentage change.");
      value = (y - base) / base * 100;
      return result("Percentage change: " + formatPercent(value, 4), [
        out("Percentage change", formatPercent(value, 4)),
        out("Absolute change", formatNumber(y - base, 4))
      ], [
        "Change = Y - X = " + formatNumber(y - base, 4) + ".",
        "Percentage change = change / X x 100.",
        "Result = " + formatPercent(value, 4) + "."
      ]);
    }
    throwUser("Choose a valid percentage calculation type.");
  }

  function calculateFraction(data) {
    var n1 = integerValue(data, "n1", "First numerator");
    var d1 = integerValue(data, "d1", "First denominator");
    var n2 = integerValue(data, "n2", "Second numerator");
    var d2 = integerValue(data, "d2", "Second denominator");
    var op = data.operator || "+";
    if (d1 === 0 || d2 === 0) {
      throwUser("Denominators cannot be zero.");
    }
    var numerator;
    var denominator;
    if (op === "+") {
      numerator = n1 * d2 + n2 * d1;
      denominator = d1 * d2;
    } else if (op === "-") {
      numerator = n1 * d2 - n2 * d1;
      denominator = d1 * d2;
    } else if (op === "*") {
      numerator = n1 * n2;
      denominator = d1 * d2;
    } else if (op === "/") {
      if (n2 === 0) {
        throwUser("Cannot divide by a zero fraction.");
      }
      numerator = n1 * d2;
      denominator = d1 * n2;
    } else {
      throwUser("Choose a valid fraction operation.");
    }
    var reduced = reduceFraction(numerator, denominator);
    var decimal = reduced.numerator / reduced.denominator;
    return result("Result: " + fractionText(reduced), [
      out("Reduced fraction", fractionText(reduced)),
      out("Mixed number", mixedNumberText(reduced)),
      out("Decimal", formatNumber(decimal, 8))
    ], [
      "Raw result = " + numerator + "/" + denominator + ".",
      "Greatest common divisor = " + gcd(Math.abs(numerator), Math.abs(denominator)) + ".",
      "Reduced result = " + fractionText(reduced) + ".",
      "Decimal value = " + formatNumber(decimal, 8) + "."
    ]);
  }

  function integerValue(data, key, label) {
    var value = numberValue(data, key, label);
    if (Math.round(value) !== value) {
      throwUser(label + " must be a whole number.");
    }
    return value;
  }

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      var temp = b;
      b = a % b;
      a = temp;
    }
    return a || 1;
  }

  function reduceFraction(numerator, denominator) {
    if (denominator < 0) {
      numerator *= -1;
      denominator *= -1;
    }
    var divisor = gcd(numerator, denominator);
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    };
  }

  function fractionText(fraction) {
    if (fraction.denominator === 1) {
      return String(fraction.numerator);
    }
    return fraction.numerator + "/" + fraction.denominator;
  }

  function mixedNumberText(fraction) {
    var numerator = fraction.numerator;
    var denominator = fraction.denominator;
    var sign = numerator < 0 ? "-" : "";
    numerator = Math.abs(numerator);
    var whole = Math.floor(numerator / denominator);
    var remainder = numerator % denominator;
    if (remainder === 0) {
      return sign + whole;
    }
    if (whole === 0) {
      return sign + remainder + "/" + denominator;
    }
    return sign + whole + " " + remainder + "/" + denominator;
  }

  function calculateRatio(data) {
    var a = positive(data, "a", "A");
    var b = positive(data, "b", "B");
    var c = positive(data, "c", "C");
    var x = b * c / a;
    var simplified = simplifyRatio(a, b);
    return result("Missing X: " + formatNumber(x, 6), [
      out("Simplified A:B", simplified),
      out("Missing X", formatNumber(x, 6)),
      out("Equivalent ratio", formatNumber(c, 6) + ":" + formatNumber(x, 6))
    ], [
      "Start with A:B = " + a + ":" + b + ".",
      "Set A/B = C/X.",
      "Cross multiply to get X = B x C / A.",
      "X = " + b + " x " + c + " / " + a + " = " + formatNumber(x, 6) + "."
    ]);
  }

  function simplifyRatio(a, b) {
    if (Math.round(a) === a && Math.round(b) === b) {
      var divisor = gcd(a, b);
      return a / divisor + ":" + b / divisor;
    }
    var scale = Math.pow(10, 6);
    var ai = Math.round(a * scale);
    var bi = Math.round(b * scale);
    var divisor2 = gcd(ai, bi);
    return formatNumber(ai / divisor2, 4) + ":" + formatNumber(bi / divisor2, 4);
  }

  function calculateAge(data) {
    var birth = dateValue(data, "birthDate", "Date of birth");
    var asOf = data.asOfDate ? dateValue(data, "asOfDate", "Age on date") : startOfToday();
    if (asOf < birth) {
      throwUser("Age on date must be after date of birth.");
    }
    var breakdown = calendarDifference(birth, asOf);
    var totalDays = daysBetween(birth, asOf);
    return result("Age: " + breakdown.years + " years, " + breakdown.months + " months, " + breakdown.days + " days", [
      out("Exact age", breakdown.years + " years, " + breakdown.months + " months, " + breakdown.days + " days"),
      out("Total months", formatNumber(breakdown.years * 12 + breakdown.months, 0) + " months"),
      out("Total weeks", formatNumber(totalDays / 7, 1) + " weeks"),
      out("Total days", formatNumber(totalDays, 0) + " days")
    ], [
      "Start date = " + formatDate(birth) + ".",
      "As-of date = " + formatDate(asOf) + ".",
      "Calendar age is adjusted for incomplete months and days.",
      "Total days lived = " + formatNumber(totalDays, 0) + "."
    ]);
  }

  function calculateDateDifference(data) {
    var start = dateValue(data, "startDate", "Start date");
    var end = dateValue(data, "endDate", "End date");
    if (end < start) {
      throwUser("End date must be after start date.");
    }
    var inclusive = data.includeEnd === "yes";
    var totalDays = daysBetween(start, end) + (inclusive ? 1 : 0);
    var breakdownEnd = inclusive ? addDays(end, 1) : end;
    var breakdown = calendarDifference(start, breakdownEnd);
    return result("Difference: " + totalDays + " days", [
      out("Total days", formatNumber(totalDays, 0) + " days"),
      out("Total weeks", formatNumber(totalDays / 7, 2) + " weeks"),
      out("Calendar difference", breakdown.years + " years, " + breakdown.months + " months, " + breakdown.days + " days"),
      out("Inclusive counting", inclusive ? "Yes" : "No")
    ], [
      "Start date = " + formatDate(start) + ".",
      "End date = " + formatDate(end) + ".",
      "Elapsed days = end date - start date" + (inclusive ? " + 1 inclusive day." : "."),
      "Calendar breakdown adjusts for month lengths."
    ]);
  }

  function calculateCountdown(data) {
    if (!data.targetDateTime) {
      throwUser("Target date and time is required.");
    }
    var target = new Date(data.targetDateTime);
    if (!Number.isFinite(target.getTime())) {
      throwUser("Enter a valid target date and time.");
    }
    var now = new Date();
    var diffMs = target.getTime() - now.getTime();
    if (diffMs <= 0) {
      return result("Target time has passed", [
        out("Status", "Target time has passed"),
        out("Target", formatDateTime(target))
      ], [
        "Target date and time = " + formatDateTime(target) + ".",
        "Current device time is after the target.",
        "Set a future target to start a live countdown."
      ]);
    }
    var parts = durationParts(diffMs);
    return result("Remaining: " + parts.days + " days, " + parts.hours + " hours, " + parts.minutes + " minutes", [
      out("Days", String(parts.days)),
      out("Hours", String(parts.hours)),
      out("Minutes", String(parts.minutes)),
      out("Seconds", String(parts.seconds)),
      out("Target", formatDateTime(target))
    ], [
      "Target date and time = " + formatDateTime(target) + ".",
      "Remaining milliseconds are converted into day, hour, minute, and second parts.",
      "The display updates while the page is open.",
      "Device timezone is used."
    ]);
  }

  function calculateLinearUnit(data, factors, baseName) {
    var value = numberValue(data, "value", "Value");
    var from = factors[data.fromUnit];
    var to = factors[data.toUnit];
    if (!from || !to) {
      throwUser("Choose valid source and target units.");
    }
    var baseValue = value * from.factor;
    var converted = baseValue / to.factor;
    return result(formatNumber(value, 8) + " " + from.abbr + " = " + formatNumber(converted, 8) + " " + to.abbr, [
      out("Converted value", formatNumber(converted, 8) + " " + to.abbr),
      out("Input", formatNumber(value, 8) + " " + from.abbr),
      out("Base value", formatNumber(baseValue, 8) + " " + baseName),
      out("Factor used", "1 " + from.abbr + " = " + formatNumber(from.factor / to.factor, 10) + " " + to.abbr)
    ], [
      "Convert input to " + baseName + ": " + value + " x " + from.factor + ".",
      "Divide by target factor: " + formatNumber(baseValue, 8) + " / " + to.factor + ".",
      "Converted value = " + formatNumber(converted, 8) + " " + to.abbr + "."
    ]);
  }

  function calculateTemperature(data) {
    var value = numberValue(data, "value", "Temperature");
    var from = data.fromUnit || "celsius";
    var to = data.toUnit || "fahrenheit";
    var celsius = toCelsius(value, from);
    var converted = fromCelsius(celsius, to);
    return result(formatNumber(value, 4) + " " + temperatureLabel(from) + " = " + formatNumber(converted, 4) + " " + temperatureLabel(to), [
      out("Converted temperature", formatNumber(converted, 4) + " " + temperatureLabel(to)),
      out("Celsius base", formatNumber(celsius, 4) + " C"),
      out("From", temperatureLabel(from)),
      out("To", temperatureLabel(to))
    ], [
      "Convert source temperature to Celsius.",
      "Celsius base value = " + formatNumber(celsius, 4) + " C.",
      "Convert Celsius to the selected target unit.",
      "Converted result = " + formatNumber(converted, 4) + " " + temperatureLabel(to) + "."
    ]);
  }

  function toCelsius(value, unit) {
    if (unit === "celsius") return value;
    if (unit === "fahrenheit") return (value - 32) * 5 / 9;
    if (unit === "kelvin") {
      if (value < 0) throwUser("Kelvin cannot be below 0.");
      return value - 273.15;
    }
    if (unit === "rankine") {
      if (value < 0) throwUser("Rankine cannot be below 0.");
      return (value - 491.67) * 5 / 9;
    }
    throwUser("Choose a valid temperature unit.");
  }

  function fromCelsius(value, unit) {
    if (unit === "celsius") return value;
    if (unit === "fahrenheit") return value * 9 / 5 + 32;
    if (unit === "kelvin") return value + 273.15;
    if (unit === "rankine") return (value + 273.15) * 9 / 5;
    throwUser("Choose a valid temperature unit.");
  }

  function temperatureLabel(unit) {
    if (unit === "celsius") return "C";
    if (unit === "fahrenheit") return "F";
    if (unit === "kelvin") return "K";
    if (unit === "rankine") return "R";
    return unit;
  }

  function dateValue(data, key, label) {
    if (!data[key]) {
      throwUser(label + " is required.");
    }
    var date = new Date(String(data[key]) + "T00:00:00");
    if (!Number.isFinite(date.getTime())) {
      throwUser(label + " must be a valid date.");
    }
    return date;
  }

  function startOfToday() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function addDays(date, days) {
    var copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function daysBetween(start, end) {
    var startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    var endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    return Math.round((endUtc - startUtc) / 86400000);
  }

  function calendarDifference(start, end) {
    var years = end.getFullYear() - start.getFullYear();
    var months = end.getMonth() - start.getMonth();
    var days = end.getDate() - start.getDate();
    if (days < 0) {
      months -= 1;
      var prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years: years, months: months, days: days };
  }

  function durationParts(ms) {
    var totalSeconds = Math.floor(ms / 1000);
    var days = Math.floor(totalSeconds / 86400);
    totalSeconds -= days * 86400;
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds -= hours * 3600;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds - minutes * 60;
    return { days: days, hours: hours, minutes: minutes, seconds: seconds };
  }

  function formatDate(date) {
    if (typeof Intl !== "undefined") {
      return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric"
      }).format(date);
    }
    return date.toISOString().slice(0, 10);
  }

  function formatDateTime(date) {
    if (typeof Intl !== "undefined") {
      return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    }
    return date.toISOString();
  }

  function out(label, value) {
    return { label: label, value: value };
  }

  function result(summary, outputs, steps) {
    return {
      summary: summary,
      outputs: outputs || [],
      steps: steps || []
    };
  }

  return {
    categories: categories,
    calculators: calculators,
    getCalculator: getCalculator,
    getCategory: getCategory,
    calculate: calculate,
    utils: {
      formatCurrency: formatCurrency,
      formatNumber: formatNumber,
      formatPercent: formatPercent,
      formatDate: formatDate
    }
  };
});
