const MEMORY_SCENARIOS = [
  {
    id: "init",
    title: "1. Initialisation & Alias",
    lines: [
      "int x = 42;",
      "int* ptr = &x;",
      "int& ref = x;"
    ],
    steps: [
      {
        activeLine: 0,
        explanation: "Allocation de l'entier x sur la Stack à l'adresse 0x7ffee4b8 avec la valeur 42.",
        cells: [
          { name: "int x", address: "0x7ffee4b8", value: "42", kind: "var", tag: "Variable originale", highlight: true }
        ]
      },
      {
        activeLine: 1,
        explanation: "ptr est une variable distincte (adresse 0x7ffee4b0) qui stocke l'adresse mémoire de x (0x7ffee4b8).",
        cells: [
          { name: "int x", address: "0x7ffee4b8", value: "42", kind: "var", tag: "Cible pointée", highlight: false },
          { name: "int* ptr", address: "0x7ffee4b0", value: "0x7ffee4b8", kind: "ptr", tag: "Pointeur → x", highlight: true }
        ]
      },
      {
        activeLine: 2,
        explanation: "ref n'alloue pas une nouvelle case autonome pour l'utilisateur : c'est un alias direct sur l'adresse 0x7ffee4b8 de x.",
        cells: [
          { name: "int x", address: "0x7ffee4b8", value: "42", kind: "var", tag: "Variable originale", highlight: false },
          { name: "int* ptr", address: "0x7ffee4b0", value: "0x7ffee4b8", kind: "ptr", tag: "Pointeur → x", highlight: false },
          { name: "int& ref (alias de x)", address: "0x7ffee4b8", value: "42", kind: "ref", tag: "Alias lié à x", highlight: true }
        ]
      }
    ]
  },
  {
    id: "mutation",
    title: "2. Déréférencement vs Alias",
    lines: [
      "int x = 42; int* ptr = &x; int& ref = x;",
      "*ptr = 99;",
      "ref = 77;"
    ],
    steps: [
      {
        activeLine: 0,
        explanation: "État initial : ptr pointe vers 0x7ffee4b8 et ref est un alias de cette même case mémoire.",
        cells: [
          { name: "int x", address: "0x7ffee4b8", value: "42", kind: "var", tag: "Valeur = 42", highlight: false },
          { name: "int* ptr", address: "0x7ffee4b0", value: "0x7ffee4b8", kind: "ptr", tag: "Pointeur → x", highlight: false },
          { name: "int& ref", address: "0x7ffee4b8", value: "42", kind: "ref", tag: "Alias de x", highlight: false }
        ]
      },
      {
        activeLine: 1,
        explanation: "*ptr = 99 déréférence l'adresse contenue dans ptr et écrit 99 directement dans la case de x (et donc de ref).",
        cells: [
          { name: "int x", address: "0x7ffee4b8", value: "99", kind: "var", tag: "Modifié via *ptr", highlight: true },
          { name: "int* ptr", address: "0x7ffee4b0", value: "0x7ffee4b8", kind: "ptr", tag: "Adresse inchangée", highlight: false },
          { name: "int& ref", address: "0x7ffee4b8", value: "99", kind: "ref", tag: "Reflète 99", highlight: true }
        ]
      },
      {
        activeLine: 2,
        explanation: "ref = 77 modifie directement la case mémoire partagée sans opérateur de déréférencement.",
        cells: [
          { name: "int x", address: "0x7ffee4b8", value: "77", kind: "var", tag: "Modifié via ref", highlight: true },
          { name: "int* ptr", address: "0x7ffee4b0", value: "0x7ffee4b8", kind: "ptr", tag: "Pointe toujours sur x", highlight: false },
          { name: "int& ref", address: "0x7ffee4b8", value: "77", kind: "ref", tag: "Alias de x", highlight: true }
        ]
      }
    ]
  },
  {
    id: "rebind",
    title: "3. Le piège de la réassignation",
    lines: [
      "int x = 42, y = 10; int* ptr = &x; int& ref = x;",
      "ptr = &y;",
      "ref = y;"
    ],
    steps: [
      {
        activeLine: 0,
        explanation: "Deux variables distinctes x (0x7ffee4b8) et y (0x7ffee4bc). ptr et ref ciblent initialement x.",
        cells: [
          { name: "int x", address: "0x7ffee4b8", value: "42", kind: "var", tag: "Cible de ptr & ref", highlight: false },
          { name: "int y", address: "0x7ffee4bc", value: "10", kind: "var", tag: "Variable y", highlight: false },
          { name: "int* ptr", address: "0x7ffee4b0", value: "0x7ffee4b8", kind: "ptr", tag: "Pointeur → x", highlight: false },
          { name: "int& ref", address: "0x7ffee4b8", value: "42", kind: "ref", tag: "Alias de x", highlight: false }
        ]
      },
      {
        activeLine: 1,
        explanation: "ptr = &y change l'adresse stockée dans ptr : le pointeur cible désormais y (0x7ffee4bc).",
        cells: [
          { name: "int x", address: "0x7ffee4b8", value: "42", kind: "var", tag: "Inchangé", highlight: false },
          { name: "int y", address: "0x7ffee4bc", value: "10", kind: "var", tag: "Nouvelle cible de ptr", highlight: true },
          { name: "int* ptr", address: "0x7ffee4b0", value: "0x7ffee4bc", kind: "ptr", tag: "Pointeur → y", highlight: true },
          { name: "int& ref", address: "0x7ffee4b8", value: "42", kind: "ref", tag: "Toujours lié à x", highlight: false }
        ]
      },
      {
        activeLine: 2,
        explanation: "PIÈGE CLASSIQUE : ref = y ne relie PAS ref à y ! Une référence est immuable dans son lien : cela copie la valeur 10 dans x.",
        cells: [
          { name: "int x", address: "0x7ffee4b8", value: "10", kind: "var", tag: "Écrasé par la valeur de y !", highlight: true },
          { name: "int y", address: "0x7ffee4bc", value: "10", kind: "var", tag: "Variable y", highlight: false },
          { name: "int* ptr", address: "0x7ffee4b0", value: "0x7ffee4bc", kind: "ptr", tag: "Pointeur → y", highlight: false },
          { name: "int& ref", address: "0x7ffee4b8", value: "10", kind: "ref", tag: "Toujours alias de x (0x7ffee4b8)", highlight: true }
        ]
      }
    ]
  },
  {
    id: "nullsafety",
    title: "4. Nullité & Sécurité mémoire",
    lines: [
      "int* ptr = nullptr;",
      "// int& badRef; -> ERREUR DE COMPILATION",
      "if (ptr != nullptr) { *ptr = 5; }"
    ],
    steps: [
      {
        activeLine: 0,
        explanation: "Un pointeur peut être explicitement initialisé à nullptr (adresse 0x0), indiquant l'absence de cible.",
        cells: [
          { name: "int* ptr", address: "0x7ffee4b0", value: "nullptr (0x0)", kind: "ptr", tag: "Aucune cible valide", highlight: true }
        ]
      },
      {
        activeLine: 1,
        explanation: "Une référence non initialisée (int& badRef;) est rejetée par le compilateur : elle garantit l'existence d'une cible.",
        cells: [
          { name: "int* ptr", address: "0x7ffee4b0", value: "nullptr (0x0)", kind: "ptr", tag: "Nullable", highlight: false },
          { name: "int& badRef", address: "ERREUR", value: "Rejeté à la compilation", kind: "ref", tag: "Initialisation obligatoire", highlight: true }
        ]
      },
      {
        activeLine: 2,
        explanation: "Bonne pratique défensive : toujours vérifier ptr != nullptr avant tout déréférencement pour éviter un Segmentation Fault.",
        cells: [
          { name: "int* ptr", address: "0x7ffee4b0", value: "nullptr (0x0)", kind: "ptr", tag: "Protégé par garde explicite", highlight: true }
        ]
      }
    ]
  }
];

if (typeof module !== "undefined") {
  module.exports = { MEMORY_SCENARIOS };
}