(function () {
  var site = window.CalculatorSite;
  var calculators = site ? site.calculators : [];
  var categories = site ? site.categories : [];
  var recentKey = "brightcalc_recent";
  var countdownInterval = null;

  ready(function () {
    initMobileNav();
    initSearch();
    initCalculatorPage();
    initRecentCalculations();
    initContactForm();
  });

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function basePath() {
    return document.body.getAttribute("data-base-path") || "";
  }

  function initMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-site-nav]");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var isOpen = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  function initSearch() {
    var shells = document.querySelectorAll("[data-search-shell]");
    forEach(shells, function (shell) {
      var input = shell.querySelector(".js-search");
      var panel = shell.querySelector(".search-suggestions");
      if (!input || !panel) return;

      var selectedIndex = -1;

      input.addEventListener("input", function () {
        selectedIndex = -1;
        renderSuggestions(input, panel, selectedIndex);
      });

      input.addEventListener("focus", function () {
        renderSuggestions(input, panel, selectedIndex);
      });

      input.addEventListener("keydown", function (event) {
        var buttons = panel.querySelectorAll("button");
        if (event.key === "ArrowDown") {
          event.preventDefault();
          selectedIndex = Math.min(selectedIndex + 1, buttons.length - 1);
          updateSuggestionFocus(buttons, selectedIndex);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          selectedIndex = Math.max(selectedIndex - 1, 0);
          updateSuggestionFocus(buttons, selectedIndex);
        } else if (event.key === "Enter") {
          if (buttons.length) {
            event.preventDefault();
            var target = selectedIndex >= 0 ? buttons[selectedIndex] : buttons[0];
            window.location.href = target.getAttribute("data-url");
          }
        } else if (event.key === "Escape") {
          panel.hidden = true;
        }
      });

      document.addEventListener("click", function (event) {
        if (!shell.contains(event.target)) {
          panel.hidden = true;
        }
      });
    });
  }

  function renderSuggestions(input, panel, selectedIndex) {
    var query = normalize(input.value);
    if (!query) {
      panel.hidden = true;
      panel.innerHTML = "";
      return;
    }

    var matches = calculators.filter(function (calc) {
      var category = site.getCategory(calc.categoryId);
      var haystack = normalize([
        calc.title,
        calc.shortTitle,
        calc.description,
        category ? category.title : "",
        calc.slug.replace(/-/g, " ")
      ].join(" "));
      return haystack.indexOf(query) !== -1;
    }).slice(0, 8);

    if (!matches.length) {
      panel.hidden = false;
      panel.innerHTML = '<div class="suggestion-empty">No calculator found. Try loan, BMI, tax, date, or speed.</div>';
      return;
    }

    panel.hidden = false;
    panel.innerHTML = matches.map(function (calc, index) {
      var category = site.getCategory(calc.categoryId);
      var active = index === selectedIndex ? ' data-active="true"' : "";
      return '<button type="button" class="suggestion-item"' + active + ' data-url="' + basePath() + calc.slug + '/#calculator">' +
        '<span>' + escapeHtml(calc.title) + '</span>' +
        '<small>' + escapeHtml(category ? category.title : "Calculator") + '</small>' +
        '</button>';
    }).join("");

    forEach(panel.querySelectorAll("button"), function (button) {
      button.addEventListener("click", function () {
        window.location.href = button.getAttribute("data-url");
      });
    });
  }

  function updateSuggestionFocus(buttons, selectedIndex) {
    forEach(buttons, function (button, index) {
      button.setAttribute("data-active", String(index === selectedIndex));
      if (index === selectedIndex) {
        button.focus();
      }
    });
  }

  function normalize(value) {
    return String(value || "").toLowerCase().trim();
  }

  function initCalculatorPage() {
    var slug = document.body.getAttribute("data-calculator");
    if (!slug || !site) return;

    var calc = site.getCalculator(slug);
    var form = document.querySelector("[data-calculator-form]");
    var resultShell = document.querySelector("[data-result-shell]");
    var resetButton = document.querySelector("[data-reset-form]");
    var shareButton = document.querySelector("[data-share-result]");
    if (!calc || !form || !resultShell) return;

    var debounced = debounce(function () {
      calculateCurrent(false);
    }, slug === "scientific-calculator" ? 350 : 180);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      calculateCurrent(true);
    });

    form.addEventListener("input", function () {
      debounced();
    });

    form.addEventListener("change", function () {
      calculateCurrent(false);
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        form.reset();
        clearResult(resultShell);
        stopCountdown();
        setTimeout(function () {
          calculateCurrent(false);
        }, 0);
      });
    }

    if (shareButton) {
      shareButton.addEventListener("click", function () {
        shareResult(calc, resultShell);
      });
    }

    calculateCurrent(false);
    focusCalculatorWhenRequested(form);

    function calculateCurrent(save) {
      var validation = validateForm(form, save);
      if (!validation.valid) {
        if (save) {
          showResultError(resultShell, validation.message || "Please fix the highlighted fields.");
        }
        return;
      }

      try {
        var data = formDataObject(form);
        var output = site.calculate(slug, data);
        renderResult(resultShell, output);
        if (shareButton) {
          shareButton.disabled = false;
          shareButton.setAttribute("data-share-text", calc.title + " - " + output.summary + " " + window.location.href);
        }
        if (save) {
          saveRecent(calc, output.summary);
          flashStatus(resultShell, "Calculation saved to recent results.");
        }
        if (slug === "countdown-timer") {
          startCountdown(calculateCurrent);
        }
      } catch (error) {
        showResultError(resultShell, error.userMessage || error.message || "Unable to calculate. Please check the inputs.");
      }
    }
  }

  function validateForm(form, showErrors) {
    var valid = true;
    var firstMessage = "";
    forEach(form.querySelectorAll("input, select, textarea"), function (field) {
      var message = "";
      var label = field.getAttribute("data-label") || field.name || "This field";
      var value = field.value;

      if (field.required && !value) {
        message = label + " is required.";
      } else if (field.type === "number" && value !== "") {
        var number = Number(value);
        if (!Number.isFinite(number)) {
          message = label + " must be a valid number.";
        } else if (field.min !== "" && Number.isFinite(Number(field.min)) && number < Number(field.min)) {
          message = label + " must be at least " + field.min + ".";
        }
      } else if ((field.type === "date" || field.type === "datetime-local") && value && !field.validity.valid) {
        message = label + " must be a valid date.";
      }

      setFieldError(field, showErrors ? message : "");
      if (message) {
        valid = false;
        if (!firstMessage) firstMessage = message;
      }
    });
    return { valid: valid, message: firstMessage };
  }

  function setFieldError(field, message) {
    var group = closest(field, ".form-field");
    if (!group) return;
    var error = group.querySelector(".field-error");
    group.setAttribute("data-invalid", message ? "true" : "false");
    if (error) {
      error.textContent = message;
    }
  }

  function formDataObject(form) {
    var data = {};
    var formData = new FormData(form);
    formData.forEach(function (value, key) {
      data[key] = value;
    });
    return data;
  }

  function renderResult(shell, output) {
    shell.setAttribute("data-state", "ready");
    var summary = shell.querySelector("[data-result-summary]");
    var list = shell.querySelector("[data-result-list]");
    var steps = shell.querySelector("[data-result-steps]");
    if (summary) summary.textContent = output.summary;
    if (list) {
      list.innerHTML = output.outputs.map(function (item) {
        return '<div class="result-row"><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.value) + '</strong></div>';
      }).join("");
    }
    if (steps) {
      steps.innerHTML = output.steps.map(function (step) {
        return "<li>" + escapeHtml(step) + "</li>";
      }).join("");
    }
  }

  function clearResult(shell) {
    shell.setAttribute("data-state", "empty");
    var summary = shell.querySelector("[data-result-summary]");
    var list = shell.querySelector("[data-result-list]");
    var steps = shell.querySelector("[data-result-steps]");
    if (summary) summary.textContent = "Enter values and calculate to see results.";
    if (list) list.innerHTML = "";
    if (steps) steps.innerHTML = "";
  }

  function showResultError(shell, message) {
    shell.setAttribute("data-state", "error");
    var summary = shell.querySelector("[data-result-summary]");
    var list = shell.querySelector("[data-result-list]");
    var steps = shell.querySelector("[data-result-steps]");
    if (summary) summary.textContent = message;
    if (list) list.innerHTML = "";
    if (steps) steps.innerHTML = "";
  }

  function flashStatus(shell, message) {
    var status = shell.querySelector("[data-result-status]");
    if (!status) return;
    status.textContent = message;
    window.setTimeout(function () {
      status.textContent = "";
    }, 2600);
  }

  function startCountdown(calculateCurrent) {
    stopCountdown();
    countdownInterval = window.setInterval(function () {
      calculateCurrent(false);
    }, 1000);
  }

  function stopCountdown() {
    if (countdownInterval) {
      window.clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  function shareResult(calc, shell) {
    var button = document.querySelector("[data-share-result]");
    var text = button ? button.getAttribute("data-share-text") : "";
    if (!text) {
      text = calc.title + " - " + (shell.querySelector("[data-result-summary]") || {}).textContent + " " + window.location.href;
    }

    if (navigator.share) {
      navigator.share({
        title: calc.title,
        text: text,
        url: window.location.href
      }).catch(function () {});
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        flashStatus(shell, "Result link copied.");
      }).catch(function () {
        fallbackCopy(text, shell);
      });
      return;
    }

    fallbackCopy(text, shell);
  }

  function fallbackCopy(text, shell) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      flashStatus(shell, "Result link copied.");
    } catch (error) {
      flashStatus(shell, "Copy is unavailable in this browser.");
    }
    document.body.removeChild(textarea);
  }

  function saveRecent(calc, summary) {
    var list = readRecent().filter(function (item) {
      return item.slug !== calc.slug || item.summary !== summary;
    });
    list.unshift({
      slug: calc.slug,
      title: calc.title,
      summary: summary,
      categoryId: calc.categoryId,
      createdAt: new Date().toISOString()
    });
    list = list.slice(0, 8);
    try {
      localStorage.setItem(recentKey, JSON.stringify(list));
    } catch (error) {}
    renderRecent(list);
  }

  function readRecent() {
    try {
      return JSON.parse(localStorage.getItem(recentKey) || "[]");
    } catch (error) {
      return [];
    }
  }

  function initRecentCalculations() {
    renderRecent(readRecent());
  }

  function renderRecent(list) {
    var shell = document.querySelector("[data-recent-calculations]");
    if (!shell) return;
    if (!list.length) {
      shell.innerHTML = '<p class="muted">Your saved calculations will appear here after you calculate a result.</p>';
      return;
    }
    shell.innerHTML = list.map(function (item) {
      var category = site.getCategory(item.categoryId);
      return '<a class="recent-item" href="' + basePath() + item.slug + '/#calculator">' +
        '<span>' + escapeHtml(item.title) + '</span>' +
        '<strong>' + escapeHtml(item.summary) + '</strong>' +
        '<small>' + escapeHtml(category ? category.title : "Calculator") + '</small>' +
        '</a>';
    }).join("");
  }

  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;
    var message = form.querySelector("[data-contact-status]");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = form.querySelector("[name='name']").value.trim();
      var email = form.querySelector("[name='email']").value.trim();
      var details = form.querySelector("[name='message']").value.trim();
      if (!name || !email || !details) {
        if (message) message.textContent = "Please complete all contact fields.";
        return;
      }
      if (message) message.textContent = "Thanks. Your email app will open with this message.";
      var subject = encodeURIComponent("Calculator website contact");
      var body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + details);
      window.location.href = "mailto:hello@example.com?subject=" + subject + "&body=" + body;
    });
  }

  function debounce(callback, wait) {
    var timeout;
    return function () {
      var args = arguments;
      window.clearTimeout(timeout);
      timeout = window.setTimeout(function () {
        callback.apply(null, args);
      }, wait);
    };
  }

  function focusCalculatorWhenRequested(form) {
    if (window.location.hash !== "#calculator") return;
    var target = document.getElementById("calculator");
    if (target && target.scrollIntoView) {
      window.setTimeout(function () {
        target.scrollIntoView({ block: "start" });
        var firstField = form.querySelector("input, select, textarea");
        if (firstField && firstField.focus) {
          firstField.focus({ preventScroll: true });
        }
      }, 80);
    }
  }

  function forEach(list, callback) {
    Array.prototype.forEach.call(list, callback);
  }

  function closest(element, selector) {
    while (element && element.nodeType === 1) {
      if (element.matches(selector)) return element;
      element = element.parentElement;
    }
    return null;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
