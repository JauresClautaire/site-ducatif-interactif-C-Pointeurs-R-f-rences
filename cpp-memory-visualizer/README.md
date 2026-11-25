# C++ Memory Lab — Pointeurs vs Références (`T*` vs `T&`)

Visualiseur interactif de l'état de la pile (**Stack**) permettant de comprendre pas à pas la gestion mémoire en C++ moderne (adresses hexadécimales, déréférencement, alias de référence, pièges de réassignation et sécurité face aux pointeurs nuls).

---

## 🎯 Problème résolu et motivation

En programmation système (C++), la difficulté principale autour des pointeurs (`int*`) et des références (`int&`) ne vient pas de la syntaxe, mais de l'abstraction mentale de la mémoire :
* Les schémas statiques ne montrent pas l'évolution de la **Stack** instruction par instruction.
* Les explications générées par défaut par les grands modèles de langage (LLM) manquent souvent de déterminisme et introduisent des approximations (par exemple, représenter une référence comme une variable indépendante plutôt que comme un alias lié à l'adresse de sa cible).

**C++ Memory Lab** comble ce manque en combinant un moteur de simulation pas-à-pas déterministe, un tableau d'arbitrages techniques et un quiz interactif ciblant les erreurs classiques (dangling references, réassignation de référence, `nullptr`).

---

## ✨ Fonctionnalités clés

* **Simulateur mémoire pas-à-pas (4 scénarios progressifs) :**
  1. *Initialisation & Alias* (`int x`, `int* ptr`, `int& ref`)
  2. *Déréférencement vs Alias* (`*ptr = 99` vs `ref = 77`)
  3. *Le piège de la réassignation* (`ptr = &y` vs `ref = y`)
  4. *Nullité & Sécurité mémoire* (`nullptr` et garanties à la compilation)
* **Tableau comparatif des arbitrages (`T*` vs `T&`) :** Empreinte mémoire, initialisation, réassignation et syntaxe d'accès.
* **Quiz de validation interactif :** Questions piégées avec calcul de score en direct et rétroaction technique détaillée.
* **Mode Sombre / Clair :** Interface réactive sans dépendance externe lourde.
* **Tests automatisés d'intégrité :** Suite de tests Node.js (`tests/validation.test.js`) vérifiant la cohérence des scénarios, des adresses mémoire et des invariants C++.

---

## 🏗️ Architecture du projet

```text
cpp-memory-visualizer/
├── index.html              # Structure sémantique et conteneurs UI
├── css/
│   └── style.css           # Système de design responsive avec variables CSS (Dark/Light)
├── js/
│   ├── scenarios.js        # Données structurées des états mémoire de la Stack
│   ├── quizData.js         # Banque de questions C++ et explications techniques
│   └── app.js              # Moteur de rendu déterministe du simulateur et du quiz
├── tests/
│   └── validation.test.js  # Assertions automatisées sur les invariants C++ et les données
└── README.md               # Documentation du projet