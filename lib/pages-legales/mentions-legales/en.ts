import type { DocumentLegal } from "../types";

const mentionsLegales: DocumentLegal = {
  titre: "Legal Notice",
  description:
    "Legal notice of the guillaumefarre.com website: website publisher, publication director, hosting, intellectual property and photo credits.",
  avertissement: [
    "This English translation is provided for information only. The ",
    { lien: "French version", vers: "/mentions-legales", langue: "fr" },
    " is the only authoritative text.",
  ],
  sections: [
    {
      titre: "Website publisher",
      blocs: [
        {
          lignes: [
            [{ gras: "Guillaume Farré" }],
            "Individual entrepreneur (entrepreneur individuel)",
            "Activity: Artistic creation in the visual arts (NAF 90.03A)",
            "SIRET: 449 392 943 00055",
            "Address: 14 rue Peyras, 31000 Toulouse, France",
            "Email: contact@guillaumefarre.com",
            "Website: guillaumefarre.com",
            "VAT not applicable, Article 293 B of the French General Tax Code",
          ],
        },
      ],
    },
    {
      titre: "Publication director",
      blocs: [{ paragraphe: "Guillaume Farré" }],
    },
    {
      titre: "Hosting",
      blocs: [{ lignes: ["The website is hosted by:", "OVH SAS", "2 rue Kellermann, 59100 Roubaix", "France"] }],
    },
    {
      titre: "Intellectual property",
      blocs: [
        {
          paragraphe:
            "This entire website is governed by French and international legislation on copyright and intellectual property.",
        },
        {
          paragraphe:
            "All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations.",
        },
        {
          paragraphe:
            "Reproduction of all or part of this website on any electronic or other medium whatsoever is strictly prohibited without the express permission of the publication director.",
        },
        {
          paragraphe:
            "The photographs, texts, slogans, drawings, images and animated sequences, with or without sound, as well as all works included in the website, are the property of Guillaume Farré or of third parties who have authorized Guillaume Farré to use them.",
        },
      ],
    },
    {
      titre: "Photo credits",
      blocs: [
        {
          paragraphe:
            "All photographs of works on this website are the exclusive property of Guillaume Farré. Any reproduction, even partial, is prohibited without prior written permission.",
        },
      ],
    },
    {
      titre: "Cookies",
      blocs: [
        {
          paragraphe:
            "The website may ask you to accept cookies for statistical and display purposes. A cookie is a piece of information placed on your hard drive by the server of the website you are visiting.",
        },
        {
          paragraphe:
            "It contains various data stored on your computer in a simple text file, which a server accesses to read and record information.",
        },
      ],
    },
    {
      titre: "Personal data protection",
      blocs: [
        {
          paragraphe:
            "In accordance with the General Data Protection Regulation (GDPR), you have the right to access, rectify and delete the data concerning you.",
        },
        { paragraphe: "To exercise this right, you can contact me at: contact@guillaumefarre.com" },
        {
          paragraphe: [
            "For more information, please see our ",
            { lien: "privacy policy", vers: "/politique-de-confidentialite" },
            ".",
          ],
        },
      ],
    },
    {
      titre: "Consumer mediator",
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
  ],
  miseAJour: { libelle: "Last updated:", date: "April 15, 2026" },
};

export default mentionsLegales;
