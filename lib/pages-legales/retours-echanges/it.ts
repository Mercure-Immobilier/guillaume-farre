import type { PageRetours } from "../types";

const retoursEchanges: PageRetours = {
  titre: "Resi e cambi",
  avertissement: [
    "Questa traduzione italiana è fornita a solo titolo informativo. Fa fede unicamente la ",
    { lien: "versione francese", vers: "/retours-echanges", langue: "fr" },
    ".",
  ],
  delai: {
    titre: "Termine di recesso: 14 giorni",
    texte: [
      "Ai sensi della legge francese, disponete di ",
      { gras: "14 giorni di calendario" },
      " dal ricevimento della vostra opera per esercitare il diritto di recesso, ",
      { gras: "senza dover fornire alcuna motivazione" },
      ".",
    ],
  },
  conditions: {
    titre: "Condizioni",
    points: [
      ["L'opera deve essere ", { gras: "restituita nel suo imballaggio originale" }],
      ["In ", { gras: "perfette condizioni" }, ' (non appesa, non incorniciata se avete scelto "senza cornice")'],
      ["Con ", { gras: "tutti gli accessori" }, " (certificato di autenticità, fattura)"],
    ],
  },
  procedure: {
    titre: "Procedura di reso",
    etapes: [
      {
        titre: "Contattatemi",
        texte: [
          "Inviate un'email a ",
          { courriel: "contact@guillaumefarre.com" },
          " indicando il numero dell'ordine e il motivo del reso.",
        ],
      },
      {
        titre: "Rispedizione dell'opera",
        texte: [
          "Disponete di ",
          { gras: "14 giorni" },
          " per rispedire l'opera all'indirizzo che vi comunicheremo. Le spese di restituzione sono a vostro carico.",
        ],
      },
      {
        titre: "Rimborso",
        texte: [
          "Entro ",
          { gras: "14 giorni" },
          " dal ricevimento del reso in buono stato, vi rimborseremo con il metodo di pagamento utilizzato inizialmente.",
        ],
      },
    ],
  },
  exceptions: {
    titre: "Eccezioni",
    points: [
      [
        "Opere ",
        { gras: "realizzate su misura" },
        " secondo le specifiche del cliente (formati XXL e monumentali su ordinazione)",
      ],
      ["Opere ", { gras: "danneggiate o restituite senza il certificato di autenticità" }, " e l'imballaggio originale"],
    ],
  },
  garantie: {
    titre: "Garanzia di qualità",
    texte: [
      "Se la vostra stampa presenta un ",
      { gras: "difetto di qualità" },
      " (colori errati, danni durante il trasporto, difetto di stampa), la sostituiamo ",
      { gras: "gratuitamente" },
      " o vi rimborsiamo ",
      { gras: "integralmente" },
      ", spese di restituzione incluse.",
    ],
    precision:
      "Tutte le nostre stampe sono realizzate su carta Fine Art Giclee a 12 colori, 200 g/m² archival, certificata qualità museale. Controlliamo ogni stampa prima della spedizione.",
  },
  contact: {
    titre: "Una domanda sul vostro ordine?",
    texte: "Guillaume Farré è a vostra disposizione per accompagnarvi",
    ecrire: "Contattatemi",
    faq: "Consultate le FAQ",
  },
};

export default retoursEchanges;
