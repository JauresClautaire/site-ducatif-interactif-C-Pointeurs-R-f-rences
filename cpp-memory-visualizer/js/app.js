(function () {
  let currentScenarioIdx = 0;
  let currentStepIdx = 0;
  const userAnswers = {};

  const scenarioTabsEl = document.getElementById("scenarioTabs");
  const codeDisplayEl = document.getElementById("codeDisplay");
  const memorySlotsEl = document.getElementById("memorySlots");
  const stepExplanationEl = document.getElementById("stepExplanation");
  const stepCounterEl = document.getElementById("stepCounter");
  const prevStepBtn = document.getElementById("prevStepBtn");
  const nextStepBtn = document.getElementById("nextStepBtn");

  const quizContainerEl = document.getElementById("quizContainer");
  const quizScoreEl = document.getElementById("quizScore");
  const quizTotalEl = document.getElementById("quizTotal");
  const resetQuizBtn = document.getElementById("resetQuizBtn");
  const themeToggleBtn = document.getElementById("themeToggle");

  function renderTabs() {
    scenarioTabsEl.innerHTML = "";
    MEMORY_SCENARIOS.forEach((scenario, idx) => {
      const btn = document.createElement("button");
      btn.className = `tab-btn ${idx === currentScenarioIdx ? "active" : ""}`;
      btn.textContent = scenario.title;
      btn.addEventListener("click", () => {
        currentScenarioIdx = idx;
        currentStepIdx = 0;
        renderTabs();
        renderSimulator();
      });
      scenarioTabsEl.appendChild(btn);
    });
  }

  function renderSimulator() {
    const scenario = MEMORY_SCENARIOS[currentScenarioIdx];
    const step = scenario.steps[currentStepIdx];

    codeDisplayEl.innerHTML = scenario.lines
      .map((line, idx) => {
        const activeClass = idx === step.activeLine ? "active-line" : "";
        return `<span class="code-line ${activeClass}">${escapeHtml(line)}</span>`;
      })
      .join("");

    memorySlotsEl.innerHTML = step.cells
      .map((cell) => {
        const highlightClass = cell.highlight ? "highlight" : "";
        return `
          <div class="mem-cell type-${cell.kind}${highlightClass}">
            <div class="mem-addr">${escapeHtml(cell.address)}</div>
            <div class="mem-name">${escapeHtml(cell.name)}</div>
            <div class="mem-value">${escapeHtml(cell.value)}</div>
            <span class="mem-tag">${escapeHtml(cell.tag)}</span>
          </div>
        `;
      })
      .join("");

    stepExplanationEl.textContent = step.explanation;
    stepCounterEl.textContent = `Étape ${currentStepIdx + 1} /${scenario.steps.length}`;
    prevStepBtn.disabled = currentStepIdx === 0;
    nextStepBtn.disabled = currentStepIdx === scenario.steps.length - 1;
  }

  function renderQuiz() {
    quizTotalEl.textContent = QUIZ_QUESTIONS.length;
    quizContainerEl.innerHTML = "";

    QUIZ_QUESTIONS.forEach((q) => {
      const item = document.createElement("div");
      item.className = "quiz-item";

      const questionEl = document.createElement("div");
      questionEl.className = "quiz-question";
      questionEl.textContent = q.question;
      item.appendChild(questionEl);

      const optionsWrap = document.createElement("div");
      optionsWrap.className = "quiz-options";

      const selected = userAnswers[q.id];

      q.options.forEach((optText, optIdx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = optText;

        if (selected !== undefined) {
          btn.disabled = true;
          if (optIdx === q.correctIndex) btn.classList.add("correct");
          else if (optIdx === selected) btn.classList.add("wrong");
        }

        btn.addEventListener("click", () => {
          userAnswers[q.id] = optIdx;
          updateScore();
          renderQuiz();
        });

        optionsWrap.appendChild(btn);
      });

      item.appendChild(optionsWrap);

      if (selected !== undefined) {
        const fb = document.createElement("div");
        fb.className = "quiz-feedback";
        const prefix = selected === q.correctIndex ? "✅ Exact : " : "❌ Attention : ";
        fb.textContent = prefix + q.explanation;
        item.appendChild(fb);
      }

      quizContainerEl.appendChild(item);
    });
  }

  function updateScore() {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) score++;
    });
    quizScoreEl.textContent = score;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  prevStepBtn.addEventListener("click", () => {
    if (currentStepIdx > 0) {
      currentStepIdx--;
      renderSimulator();
    }
  });

  nextStepBtn.addEventListener("click", () => {
    const max = MEMORY_SCENARIOS[currentScenarioIdx].steps.length - 1;
    if (currentStepIdx < max) {
      currentStepIdx++;
      renderSimulator();
    }
  });

  resetQuizBtn.addEventListener("click", () => {
    Object.keys(userAnswers).forEach((k) => delete userAnswers[k]);
    updateScore();
    renderQuiz();
  });

  themeToggleBtn.addEventListener("click", () => {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
    themeToggleBtn.textContent = isDark ? "🌙 Mode Sombre" : "☀️ Mode Clair";
  });

  renderTabs();
  renderSimulator();
  renderQuiz();
})();