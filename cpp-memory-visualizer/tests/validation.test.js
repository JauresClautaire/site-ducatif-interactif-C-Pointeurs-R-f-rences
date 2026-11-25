const assert = require("node:assert/strict");
const { MEMORY_SCENARIOS } = require("../js/scenarios.js");
const { QUIZ_QUESTIONS } = require("../js/quizData.js");

console.log("Exécution des tests d'intégrité C++ Memory Lab...");

// 1. Vérifier que chaque scénario possède des étapes valides et des index de ligne cohérents
assert.ok(MEMORY_SCENARIOS.length >= 4, "Au moins 4 scénarios mémoire attendus.");

MEMORY_SCENARIOS.forEach((sc) => {
  assert.ok(sc.steps.length > 0, `Le scénario ${sc.id} doit contenir des étapes.`);
  sc.steps.forEach((step, idx) => {
    assert.ok(
      step.activeLine >= 0 && step.activeLine < sc.lines.length,
      `Index de ligne invalide dans ${sc.id} à l'étape ${idx}`
    );
    assert.ok(step.cells.length > 0, `Aucune cellule mémoire dans ${sc.id} à l'étape ${idx}`);
  });
});

// 2. Vérifier la cohérence des invariants C++ (une référence partage toujours l'adresse de sa cible)
const initFinalStep = MEMORY_SCENARIOS[0].steps[2];
const varX = initFinalStep.cells.find((c) => c.name.includes("int x"));
const refX = initFinalStep.cells.find((c) => c.name.includes("int& ref"));
assert.equal(
  varX.address,
  refX.address,
  "Invariant C++ violé : une référence doit partager l'adresse mémoire exacte de sa variable cible."
);

// 3. Vérifier l'intégrité des questions du quiz
QUIZ_QUESTIONS.forEach((q) => {
  assert.ok(q.options.length >= 3, `La question ${q.id} doit avoir au moins 3 choix.`);
  assert.ok(
    q.correctIndex >= 0 && q.correctIndex < q.options.length,
    `Indice de bonne réponse invalide pour ${q.id}`
  );
  assert.ok(q.explanation.length > 20, `Explication trop courte pour ${q.id}`);
});

console.log("✅ Tous les tests d'intégrité et d'invariants C++ ont réussi !");