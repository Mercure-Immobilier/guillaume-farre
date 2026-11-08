import type { PageRetours } from "../types";

const retoursEchanges: PageRetours = {
  titre: "Returns & Exchanges",
  description:
    "Returns and exchanges on guillaumefarre.com: 14-day withdrawal period, conditions, return procedure, refund, exceptions and quality guarantee.",
  avertissement: [
    "This English translation is provided for information only. The ",
    { lien: "French version", vers: "/retours-echanges", langue: "fr" },
    " is the only authoritative text.",
  ],
  delai: {
    titre: "Withdrawal period: 14 days",
    texte: [
      "Under French law, you have ",
      { gras: "14 calendar days" },
      " from receipt of your work to exercise your right of withdrawal, ",
      { gras: "without having to give any reason" },
      ".",
    ],
  },
  conditions: {
    titre: "Conditions",
    points: [
      ["The work must be ", { gras: "returned in its original packaging" }],
      ["In ", { gras: "perfect condition" }, ' (not hung, not framed if you chose "without frame")'],
      ["With ", { gras: "all accessories" }, " (certificate of authenticity, invoice)"],
    ],
  },
  procedure: {
    titre: "Return procedure",
    etapes: [
      {
        titre: "Contact me",
        texte: [
          "Send an email to ",
          { courriel: "contact@guillaumefarre.com" },
          " with your order number and the reason for the return.",
        ],
      },
      {
        titre: "Sending the work back",
        texte: [
          "You have ",
          { gras: "14 days" },
          " to send the work back to the address we will give you. Return costs are at your expense.",
        ],
      },
      {
        titre: "Refund",
        texte: [
          "Within ",
          { gras: "14 days" },
          " of receiving the returned work in good condition, we will refund you through your original payment method.",
        ],
      },
    ],
  },
  exceptions: {
    titre: "Exceptions",
    points: [
      [
        "Works ",
        { gras: "made to measure" },
        " according to the customer's specifications (XXL and monumental formats made to order)",
      ],
      ["Works ", { gras: "damaged or returned without their certificate of authenticity" }, " and original packaging"],
    ],
  },
  garantie: {
    titre: "Quality Guarantee",
    texte: [
      "If your print has a ",
      { gras: "quality defect" },
      " (incorrect colors, damage during transport, printing defect), we replace it ",
      { gras: "free of charge" },
      " or refund you ",
      { gras: "in full" },
      ", return costs included.",
    ],
    precision:
      "All our prints are made on 12-color Fine Art Giclee paper, 200 gsm archival, museum-quality certified. We check every print before shipping.",
  },
  contact: {
    titre: "A question about your order?",
    texte: "Guillaume Farré is at your disposal to assist you",
    ecrire: "Contact me",
    faq: "See the FAQ",
  },
};

export default retoursEchanges;
