const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "1. Que se passe-t-il après l'exécution de : int a = 5, b = 20; int& r = a; r = b;",
    options: [
      "r devient une référence vers b, et a vaut toujours 5.",
      "a prend la valeur 20, et r reste un alias de a.",
      "Le code ne compile pas car on ne peut pas assigner b à r."
    ],
    correctIndex: 1,
    explanation: "En C++, une référence ne peut jamais être réassignée à une autre variable après son initialisation. L'instruction r = b copie donc simplement la valeur de b (20) dans a."
  },
  {
    id: "q2",
    question: "2. Quelle affirmation distingue correctement un pointeur nul d'une référence ?",
    options: [
      "Une référence peut valoir nullptr si elle est déclarée avec const.",
      "Un pointeur peut être réassigné à nullptr, alors qu'une référence valide doit toujours être liée à un objet existant.",
      "Un pointeur et une référence ont exactement la même syntaxe de déréférencement."
    ],
    correctIndex: 1,
    explanation: "L'un des principaux avantages des références en C++ est d'éliminer le risque de pointeur nul dans les interfaces qui exigent un objet valide."
  },
  {
    id: "q3",
    question: "3. Pourquoi retourner une référence vers une variable locale (int& f() { int x = 10; return x; }) est-il dangereux ?",
    options: [
      "Cela provoque une fuite mémoire sur le tas (Heap).",
      "La variable x est détruite à la sortie de la fonction, créant une dangling reference (comportement indéfini).",
      "Le compilateur convertit automatiquement la référence en copie."
    ],
    correctIndex: 1,
    explanation: "x est allouée sur la Stack de f(). Dès que f() retourne, son cadre de pile est libéré : la référence pointe alors vers une zone mémoire invalide (Undefined Behavior)."
  },
  {
    id: "q4",
    question: "4. Dans une signature de fonction C++, quand privilégier const T& plutôt que T* ?",
    options: [
      "Lorsque le paramètre est optionnel et peut être absent (nullptr).",
      "Lorsque l'objet est obligatoire, potentiellement volumineux, et ne doit pas être modifié.",
      "Uniquement pour les types primitifs comme int ou char."
    ],
    correctIndex: 1,
    explanation: "Passer par const T& évite une copie coûteuse tout en garantissant l'immuabilité et la présence d'un objet valide sans vérification de nullité."
  }
];


if (typeof module !== "undefined") {
  module.exports = { QUIZ_QUESTIONS };
}