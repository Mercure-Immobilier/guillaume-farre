import type { DocumentLegal } from "../types";

const politiqueDeConfidentialite: DocumentLegal = {
  titre: "Privacy Policy",
  avertissement: [
    "This English translation is provided for information only. The ",
    { lien: "French version", vers: "/politique-de-confidentialite", langue: "fr" },
    " is the only authoritative text.",
  ],
  sections: [
    {
      titre: "1. Introduction",
      blocs: [
        {
          paragraphe:
            "Protecting your personal data is a priority for Guillaume Farré. This privacy policy explains what information we collect, how we use it and what your rights are.",
        },
      ],
    },
    {
      titre: "2. Data controller",
      blocs: [
        {
          lignes: [
            [{ gras: "Guillaume Farré" }],
            "Artist - Automotive action painting",
            "Address: 31000 Toulouse, France",
            "Email: contact@guillaumefarre.com",
          ],
        },
      ],
    },
    {
      titre: "3. Data collected",
      blocs: [
        { paragraphe: "We collect the following data:" },
        {
          liste: [
            [{ gras: "Identity data:" }, " last name, first name"],
            [{ gras: "Contact data:" }, " email address, telephone number, postal address"],
            [{ gras: "Order data:" }, " purchase history, preferences"],
            [{ gras: "Payment data:" }, " processed securely by Stripe (we never store your bank details)"],
            [{ gras: "Connection data:" }, " IP address, browser type, pages visited"],
          ],
        },
      ],
    },
    {
      titre: "4. Purposes of processing",
      blocs: [
        { paragraphe: "Your data is collected in order to:" },
        {
          liste: [
            "Process and deliver your orders",
            "Manage your customer account",
            "Send you information about your orders",
            "Improve our services and our website",
            "Comply with our legal obligations",
          ],
        },
      ],
    },
    {
      titre: "5. Legal basis for processing",
      blocs: [
        { paragraphe: "The processing of your data is based on:" },
        {
          liste: [
            [{ gras: "Performance of a contract:" }, " to process your orders"],
            [{ gras: "Our legitimate interest:" }, " to improve our services"],
            [{ gras: "Our legal obligations:" }, " accounting, invoicing"],
          ],
        },
      ],
    },
    {
      titre: "6. Recipients of the data",
      blocs: [
        { paragraphe: "Your data may be transferred to:" },
        {
          liste: [
            [{ gras: "Stripe:" }, " for the secure processing of payments"],
            [{ gras: "Carriers:" }, " for the delivery of your orders"],
          ],
        },
        { paragraphe: "We never sell your data to third parties." },
        {
          paragraphe: [
            { gras: "Transfers outside the EU:" },
            " Stripe Inc. is based in the United States. Data transfers are governed by the standard contractual clauses of the European Commission (Article 46 of the GDPR).",
          ],
        },
      ],
    },
    {
      titre: "7. Retention period",
      blocs: [
        { paragraphe: "Your data is kept for:" },
        {
          liste: [
            [{ gras: "Order data:" }, " 10 years (accounting obligations)"],
            [{ gras: "Customer account data:" }, " 3 years after the last activity"],
          ],
        },
      ],
    },
    {
      titre: "8. Your rights",
      blocs: [
        { paragraphe: "In accordance with the GDPR, you have the following rights:" },
        {
          liste: [
            [{ gras: "Right of access:" }, " obtain a copy of your data"],
            [{ gras: "Right to rectification:" }, " correct your inaccurate data"],
            [{ gras: "Right to erasure:" }, " request the deletion of your data"],
            [{ gras: "Right to restriction:" }, " restrict the processing of your data"],
            [{ gras: "Right to data portability:" }, " receive your data in a structured format"],
            [{ gras: "Right to object:" }, " object to the processing of your data"],
            [{ gras: "Right to withdraw consent:" }, " withdraw your consent at any time"],
          ],
        },
        { paragraphe: "To exercise these rights, contact us at: contact@guillaumefarre.com" },
      ],
    },
    {
      titre: "9. Security",
      blocs: [
        {
          paragraphe:
            "We implement appropriate technical and organizational measures to protect your data against:",
        },
        { liste: ["Unauthorized access", "Accidental loss", "Destruction or damage"] },
        {
          paragraphe:
            "Payments are secured by Stripe, certified PCI DSS Level 1 (the strictest security standard).",
        },
      ],
    },
    {
      titre: "10. Cookies",
      blocs: [
        {
          paragraphe:
            "Our website uses cookies to improve your browsing experience. You can configure your browser to refuse cookies.",
        },
        { paragraphe: "Types of cookies used:" },
        {
          liste: [
            [
              { gras: "Necessary cookies:" },
              " Administration authentication cookie (",
              { code: "gf_auth" },
              ", 30-day duration)",
            ],
            [
              { gras: "Payment cookies:" },
              " Stripe cookies placed during checkout to secure the payment process",
            ],
          ],
        },
      ],
    },
    {
      titre: "11. Changes",
      blocs: [
        {
          paragraphe:
            "We reserve the right to change this privacy policy at any time. Any change will be published on this page with a new update date.",
        },
      ],
    },
    {
      titre: "12. Contact and complaints",
      blocs: [
        {
          paragraphe: "For any question about this privacy policy or the exercise of your rights:",
        },
        { paragraphe: "Email: contact@guillaumefarre.com" },
        {
          paragraphe:
            "If you believe that your rights are not being respected, you may lodge a complaint with the CNIL, the French data protection authority:",
        },
        {
          lignes: [
            "Commission Nationale de l'Informatique et des Libertés",
            "3 Place de Fontenoy - TSA 80715",
            "75334 PARIS CEDEX 07",
            "Telephone: +33 1 53 73 22 22",
            [{ lienExterne: "www.cnil.fr", vers: "https://www.cnil.fr" }],
          ],
        },
      ],
    },
  ],
  miseAJour: { libelle: "Last updated:", date: "April 15, 2026" },
};

export default politiqueDeConfidentialite;
