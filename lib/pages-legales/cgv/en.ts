import type { DocumentLegal } from "../types";

const cgv: DocumentLegal = {
  titre: "General Terms and Conditions of Sale",
  description:
    "General terms and conditions of sale of the guillaumefarre.com website: prices, products, orders and payment, delivery, right of withdrawal and certificate of authenticity.",
  avertissement: [
    "This English translation is provided for information only. The ",
    { lien: "French version", vers: "/cgv", langue: "fr" },
    " is the only authoritative text.",
  ],
  sections: [
    {
      titre: "1. Legal information",
      blocs: [
        {
          lignes: [
            [{ gras: "Guillaume Farré" }],
            "Individual entrepreneur (entrepreneur individuel)",
            "Activity: Artistic creation in the visual arts (NAF 90.03A)",
            "SIRET: 449 392 943 00055",
            "Address: 14 rue Peyras, 31000 Toulouse, France",
            "Email: contact@guillaumefarre.com",
            "VAT not applicable, Article 293 B of the French General Tax Code",
          ],
        },
      ],
    },
    {
      titre: "2. Purpose",
      blocs: [
        {
          paragraphe:
            "These general terms and conditions of sale (GTCS) govern the sale of works of art by Guillaume Farré through the website guillaumefarre.com. Two types of works are offered:",
        },
        {
          paragraphe: [
            { gras: "Photographs" },
            ": numbered and signed Fine Art Giclee prints, available in limited editions of 9 copies (large formats A1 to 2A0) or 99 copies (small formats A4 to A2). Available formats: A4 (€250), A3 (€500), A2 (€800), A1 (€1,200), A0 and 2A0 (on quotation). Each print comes with a certificate of authenticity stating the edition number (e.g. 3/9).",
          ],
        },
        {
          paragraphe: [
            { gras: "Canvases" },
            ": unique pieces created by automotive friction on blank canvas, priced from €2,500 to €20,000. The canvases can be seen by appointment only. For any request, please contact the artist directly. They are not sold online.",
          ],
        },
      ],
    },
    {
      titre: "3. Prices",
      blocs: [
        {
          paragraphe:
            "Prices are stated in euros, all taxes included. Shipping costs are extra and calculated according to the destination.",
        },
        { paragraphe: "VAT not applicable, Article 293 B of the French General Tax Code." },
        {
          paragraphe:
            "Prices may be changed at any time, but works will be invoiced on the basis of the prices in force when the order is validated.",
        },
      ],
    },
    {
      titre: "4. Products",
      blocs: [
        {
          paragraphe: [
            { gras: "Photographs" },
            ": 12-color Fine Art Giclee prints on 200 gsm archival paper, numbered and signed by the artist. Strictly limited editions: once all copies have been sold, the series is permanently closed. Formats: A4 (21 x 29.7 cm), A3 (29.7 x 42 cm), A2 (42 x 59.4 cm), A1 (59.4 x 84.1 cm), A0 (84.1 x 118.9 cm), 2A0 (118.9 x 168.2 cm).",
          ],
        },
        {
          paragraphe: [
            { gras: "Canvases" },
            ": unique pieces, impossible to replicate, created with industrial paint deposited by friction, heat and pressure as a Ferrari passes directly over a blank canvas. Variable formats. Price: from €2,500 to €20,000 depending on format and technique. By appointment only; please contact the artist.",
          ],
        },
      ],
    },
    {
      titre: "5. Orders and payment",
      blocs: [
        {
          paragraphe: [
            { gras: "Photographs" },
            ": ordered online through the cart on the website. Secure payment via Stripe.",
          ],
        },
        {
          paragraphe: [
            { gras: "Canvases" },
            ": reservation by appointment only. A personalized Stripe invoice is sent by the artist after validation.",
          ],
        },
        { paragraphe: [{ gras: "Accepted payment methods:" }] },
        {
          liste: [
            "Bank card (Visa, Mastercard, American Express)",
            "Apple Pay and Google Pay (via Stripe Checkout)",
          ],
        },
        {
          paragraphe:
            "Bank details are never stored on our servers. They are processed directly by Stripe, a secure PCI-DSS certified payment platform.",
        },
      ],
    },
    {
      titre: "6. Delivery",
      blocs: [
        {
          paragraphe:
            "Works are professionally packed to preserve their integrity during transport. Transport insurance is included for canvases.",
        },
        { paragraphe: [{ gras: "Indicative delivery times:" }] },
        {
          liste: [
            "France: 5 to 7 working days",
            "Europe: 7 to 14 working days",
            "International: 14 to 30 working days",
          ],
        },
        {
          paragraphe: "These times are given for information only and do not constitute a contractual commitment.",
        },
      ],
    },
    {
      titre: "7. Right of withdrawal",
      blocs: [
        {
          paragraphe: [
            "In accordance with Article L221-18 of the French Consumer Code, a buyer who is a consumer has ",
            { gras: "14 days" },
            " from receipt of the work to exercise their right of withdrawal, without having to give any reason or pay any penalty.",
          ],
        },
        { paragraphe: [{ gras: "Withdrawal procedure:" }] },
        {
          liste: [
            "The work must be returned in its original packaging, in perfect condition",
            "Return costs are borne by the buyer",
            "A full refund is made within 14 days of receipt of the returned work",
          ],
        },
        {
          paragraphe:
            "To exercise your right of withdrawal, you may use the model form below or contact me by email at: contact@guillaumefarre.com",
        },
        {
          paragraphe: [
            { gras: "Exceptions:" },
            " The right of withdrawal does not apply if the work was made to the customer's specifications (Article L221-28, 3° of the French Consumer Code), nor to purchases made by a professional for the purposes of their business.",
          ],
        },
        {
          encadre: {
            titre: "Model withdrawal form",
            lignes: [
              "To Guillaume Farré, contact@guillaumefarre.com:",
              "I hereby give notice that I withdraw from my contract for the sale of the following goods:",
              "- Work: [title]",
              "- Ordered on: [date]",
              "- Received on: [date]",
              "- Name of the buyer: [name]",
              "- Address of the buyer: [address]",
              "- Signature of the buyer (only if this form is notified on paper):",
              "- Date:",
            ],
          },
        },
      ],
    },
    {
      titre: "8. Intellectual property",
      blocs: [
        {
          paragraphe:
            "In accordance with Article L111-1 of the French Intellectual Property Code, the purchase of a work gives the buyer ownership of the physical object only. No copyright is transferred.",
        },
        { paragraphe: [{ gras: "The buyer may not:" }] },
        {
          liste: [
            "Reproduce the work for commercial purposes (posters, prints, merchandise, NFTs, etc.)",
            "Publish the image of the work for advertising purposes",
            "Alter the work",
          ],
        },
        {
          paragraphe: [
            { gras: "The buyer may:" },
            " display the work at home, resell it (the artist's resale right applies to future resales if a professional is involved).",
          ],
        },
      ],
    },
    {
      titre: "9. Certificate of authenticity",
      blocs: [
        {
          paragraphe:
            "Each work (photograph and canvas) comes with a certificate of authenticity signed by the artist, bearing a unique number. For limited editions, the edition number is stated (for example: 3/9 for large formats or 15/99 for small formats).",
        },
      ],
    },
    {
      titre: "10. Personal data protection",
      blocs: [
        {
          paragraphe:
            "In accordance with the General Data Protection Regulation (GDPR), the personal data collected when an order is placed is used solely to process that order and to manage the customer relationship.",
        },
        {
          paragraphe:
            "You have the right to access, rectify and delete your data. To exercise these rights, contact us at: contact@guillaumefarre.com",
        },
        {
          paragraphe: [
            "See our ",
            { lien: "privacy policy", vers: "/politique-de-confidentialite" },
            " for more information.",
          ],
        },
      ],
    },
    {
      titre: "11. Consumer mediator",
      blocs: [
        {
          paragraphe:
            "In accordance with Articles L611-1 and R612-1 of the French Consumer Code, for any dispute that could not be settled amicably between the professional and the consumer, the consumer may refer the matter, free of charge, to the consumer mediator responsible for the professional.",
        },
        {
          lignes: [
            ["The professional has designated ", { gras: "MEDICYS" }, " as consumer mediator."],
            "MEDICYS",
            "73 Boulevard de Clichy",
            "75009 Paris",
            ["Website: ", { lienExterne: "www.medicys.fr", vers: "https://www.medicys.fr" }],
          ],
        },
        {
          paragraphe: [
            "In the event of a dispute, the consumer may also refer the matter to the European online dispute resolution platform at the following address: ",
            { lienExterne: "https://ec.europa.eu/consumers/odr", vers: "https://ec.europa.eu/consumers/odr" },
          ],
        },
      ],
    },
    {
      titre: "12. Governing law and competent courts",
      blocs: [
        {
          paragraphe:
            "These general terms and conditions of sale are governed by French law. In the event of a dispute, an amicable solution will be sought first. Failing agreement, the courts of Toulouse shall have sole jurisdiction.",
        },
      ],
    },
  ],
  miseAJour: { libelle: "Last updated:", date: "April 15, 2026" },
};

export default cgv;
