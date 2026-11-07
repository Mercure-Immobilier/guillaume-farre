import type { PageRetours } from "../types";

const retoursEchanges: PageRetours = {
  titre: "Retours & Échanges",
  delai: {
    titre: "Délai de rétractation : 14 jours",
    texte: [
      "Conformément à la loi française, vous disposez de ",
      { gras: "14 jours calendaires" },
      " à compter de la réception de votre œuvre pour exercer votre droit de rétractation, ",
      { gras: "sans avoir à justifier de motif" },
      ".",
    ],
  },
  conditions: {
    titre: "Conditions",
    points: [
      ["L'œuvre doit être ", { gras: "retournée dans son emballage d'origine" }],
      ["En ", { gras: "parfait état" }, ' (non accrochée, non encadrée si vous avez choisi "sans cadre")'],
      ["Avec ", { gras: "tous les accessoires" }, " (certificat d'authenticité, facture)"],
    ],
  },
  procedure: {
    titre: "Procédure de retour",
    etapes: [
      {
        titre: "Contactez-moi",
        texte: [
          "Envoyez un email à ",
          { courriel: "contact@guillaumefarre.com" },
          " avec votre numéro de commande et le motif de retour.",
        ],
      },
      {
        titre: "Renvoi de l'œuvre",
        texte: [
          "Vous disposez de ",
          { gras: "14 jours" },
          " pour renvoyer l'œuvre à l'adresse que nous vous communiquerons. Les frais de retour sont à votre charge.",
        ],
      },
      {
        titre: "Remboursement",
        texte: [
          "Sous ",
          { gras: "14 jours" },
          " après réception du retour en bon état, nous vous rembourserons sur votre moyen de paiement initial.",
        ],
      },
    ],
  },
  exceptions: {
    titre: "Exceptions",
    points: [
      [
        "Œuvres ",
        { gras: "réalisées sur mesure" },
        " selon les spécifications du client (formats XXL et monumentaux sur commande)",
      ],
      ["Œuvres ", { gras: "endommagées ou retournées sans leur certificat d'authenticité" }, " et emballage d'origine"],
    ],
  },
  garantie: {
    titre: "Garantie Qualité",
    texte: [
      "Si votre tirage présente un ",
      { gras: "défaut de qualité" },
      " (couleurs incorrectes, dommage durant transport, défaut d'impression), nous le remplaçons ",
      { gras: "gratuitement" },
      " ou vous remboursons ",
      { gras: "intégralement" },
      ", frais de retour inclus.",
    ],
    precision:
      "Tous nos tirages sont imprimés sur papier Fine Art Giclee 12 couleurs, 200 gsm archival, certifié qualité musée. Nous contrôlons chaque tirage avant expédition.",
  },
  contact: {
    titre: "Une question sur votre commande ?",
    texte: "Guillaume Farré est à votre disposition pour vous accompagner",
    ecrire: "Me contacter",
    faq: "Voir la FAQ",
  },
};

export default retoursEchanges;
