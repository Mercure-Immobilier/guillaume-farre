import type { DocumentLegal } from "../types";

const cgv: DocumentLegal = {
  titre: "Conditions Générales de Vente",
  description:
    "Conditions générales de vente du site guillaumefarre.com : prix, produits, commande et paiement, livraison, droit de rétractation et certificat d'authenticité.",
  sections: [
    {
      titre: "1. Informations légales",
      blocs: [
        {
          lignes: [
            [{ gras: "Guillaume Farré" }],
            "Entrepreneur individuel",
            "Activité : Création artistique relevant des arts plastiques (NAF 90.03A)",
            "SIRET : 449 392 943 00055",
            "Adresse : 14 rue Peyras, 31000 Toulouse, France",
            "Email : contact@guillaumefarre.com",
            "TVA non applicable, article 293 B du Code général des impôts",
          ],
        },
      ],
    },
    {
      titre: "2. Objet",
      blocs: [
        {
          paragraphe:
            "Les présentes conditions générales de vente (CGV) régissent la vente d'œuvres d'art par Guillaume Farré via le site guillaumefarre.com. Deux types d'œuvres sont proposés :",
        },
        {
          paragraphe: [
            { gras: "Photographies" },
            " : tirages Fine Art Giclee numérotés et signés, disponibles en éditions limitées de 9 exemplaires (grands formats A1 à 2A0) ou 99 exemplaires (petits formats A4 à A2). Formats disponibles : A4 (250 €), A3 (500 €), A2 (800 €), A1 (1 200 €), A0 et 2A0 (sur devis). Chaque tirage est accompagné d'un certificat d'authenticité précisant le numéro d'édition (ex: 3/9).",
          ],
        },
        {
          paragraphe: [
            { gras: "Toiles" },
            " : pièces uniques créées par friction automobile sur toile vierge, prix de 2 500 € à 20 000 €. Les toiles sont accessibles sur rendez-vous uniquement. Pour toute demande, contactez l'artiste directement. Elles ne sont pas vendues en ligne.",
          ],
        },
      ],
    },
    {
      titre: "3. Prix",
      blocs: [
        {
          paragraphe:
            "Les prix sont indiqués en euros, toutes taxes comprises (TTC). Les frais de port sont en sus et calculés selon la destination.",
        },
        { paragraphe: "TVA non applicable, article 293 B du Code général des impôts." },
        {
          paragraphe:
            "Les prix peuvent être modifiés à tout moment, mais les œuvres seront facturées sur la base des tarifs en vigueur au moment de la validation de la commande.",
        },
      ],
    },
    {
      titre: "4. Produits",
      blocs: [
        {
          paragraphe: [
            { gras: "Photographies" },
            " : tirages Fine Art Giclee 12 couleurs sur papier archival 200 gsm, numérotés et signés par l'artiste. Éditions limitées strictes : une fois tous les exemplaires vendus, la série est close définitivement. Formats : A4 (21 x 29,7 cm), A3 (29,7 x 42 cm), A2 (42 x 59,4 cm), A1 (59,4 x 84,1 cm), A0 (84,1 x 118,9 cm), 2A0 (118,9 x 168,2 cm).",
          ],
        },
        {
          paragraphe: [
            { gras: "Toiles" },
            " : pièces uniques, totalement irréplicables, créées par peinture industrielle déposée par friction, chaleur et pression lors du passage direct d'une Ferrari sur toile vierge. Formats variables. Prix : de 2 500 € à 20 000 € selon format et technique. Accessibles sur rendez-vous uniquement, contactez l'artiste.",
          ],
        },
      ],
    },
    {
      titre: "5. Commande et paiement",
      blocs: [
        {
          paragraphe: [
            { gras: "Photographies" },
            " : commande en ligne via le panier sur le site. Paiement sécurisé via Stripe.",
          ],
        },
        {
          paragraphe: [
            { gras: "Toiles" },
            " : réservation sur rendez-vous uniquement. Une facture Stripe personnalisée est envoyée par l'artiste après validation.",
          ],
        },
        { paragraphe: [{ gras: "Moyens de paiement acceptés :" }] },
        {
          liste: [
            "Carte bancaire (Visa, Mastercard, American Express)",
            "Apple Pay et Google Pay (via Stripe Checkout)",
          ],
        },
        {
          paragraphe:
            "Les données bancaires ne sont jamais stockées sur nos serveurs. Elles sont traitées directement par Stripe, plateforme de paiement sécurisée certifiée PCI-DSS.",
        },
      ],
    },
    {
      titre: "6. Livraison",
      blocs: [
        {
          paragraphe:
            "Les œuvres sont emballées professionnellement pour garantir leur intégrité durant le transport. Une assurance transport est incluse pour les toiles.",
        },
        { paragraphe: [{ gras: "Délais de livraison indicatifs :" }] },
        {
          liste: [
            "France : 5 à 7 jours ouvrés",
            "Europe : 7 à 14 jours ouvrés",
            "International : 14 à 30 jours ouvrés",
          ],
        },
        {
          paragraphe:
            "Ces délais sont donnés à titre indicatif et ne constituent pas un engagement contractuel.",
        },
      ],
    },
    {
      titre: "7. Droit de rétractation",
      blocs: [
        {
          paragraphe: [
            "Conformément à l'article L221-18 du Code de la consommation, l'acheteur consommateur dispose d'un délai de ",
            { gras: "14 jours" },
            " à compter de la réception de l'œuvre pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.",
          ],
        },
        { paragraphe: [{ gras: "Modalités de rétractation :" }] },
        {
          liste: [
            "L'œuvre doit être retournée dans son emballage d'origine, en parfait état",
            "Les frais de retour sont à la charge de l'acheteur",
            "Le remboursement intégral intervient sous 14 jours après réception du retour",
          ],
        },
        {
          paragraphe:
            "Pour exercer votre droit de rétractation, vous pouvez utiliser le formulaire type ci-dessous ou me contacter par email à l'adresse : contact@guillaumefarre.com",
        },
        {
          paragraphe: [
            { gras: "Exceptions :" },
            " Le droit de rétractation ne s'applique pas si l'œuvre a été créée sur mesure selon les spécifications du client (article L221-28, 3° du Code de la consommation), ni pour les achats effectués par un professionnel dans le cadre de son activité.",
          ],
        },
        {
          encadre: {
            titre: "Formulaire type de rétractation",
            lignes: [
              "À l'attention de Guillaume Farré, contact@guillaumefarre.com :",
              "Je vous notifie par la présente ma rétractation du contrat portant sur la vente du bien ci-dessous :",
              "- Œuvre : [titre]",
              "- Commandée le : [date]",
              "- Reçue le : [date]",
              "- Nom de l'acheteur : [nom]",
              "- Adresse de l'acheteur : [adresse]",
              "- Signature de l'acheteur (uniquement en cas de notification papier) :",
              "- Date :",
            ],
          },
        },
      ],
    },
    {
      titre: "8. Propriété intellectuelle",
      blocs: [
        {
          paragraphe:
            "Conformément à l'article L111-1 du Code de la propriété intellectuelle, l'achat d'une œuvre confère à l'acquéreur la propriété physique de l'objet uniquement. Aucun droit d'auteur n'est transféré.",
        },
        { paragraphe: [{ gras: "L'acheteur ne peut pas :" }] },
        {
          liste: [
            "Reproduire l'œuvre à des fins commerciales (affiches, posters, produits dérivés, NFT, etc.)",
            "Publier l'image de l'œuvre à des fins publicitaires",
            "Modifier l'œuvre",
          ],
        },
        {
          paragraphe: [
            { gras: "L'acheteur peut :" },
            " exposer l'œuvre chez lui, la revendre (le droit de suite s'applique sur les reventes futures si un professionnel intervient).",
          ],
        },
      ],
    },
    {
      titre: "9. Certificat d'authenticité",
      blocs: [
        {
          paragraphe:
            "Chaque œuvre (photographie et toile) est accompagnée d'un certificat d'authenticité signé par l'artiste, comportant un numéro unique. Pour les éditions limitées, le numéro d'édition est précisé (exemple : 3/9 pour les grands formats ou 15/99 pour les petits formats).",
        },
      ],
    },
    {
      titre: "10. Protection des données personnelles",
      blocs: [
        {
          paragraphe:
            "Conformément au Règlement Général sur la Protection des Données (RGPD), les données personnelles collectées lors de la commande sont utilisées uniquement pour le traitement de celle-ci et la gestion de la relation client.",
        },
        {
          paragraphe:
            "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : contact@guillaumefarre.com",
        },
        {
          paragraphe: [
            "Consultez notre ",
            { lien: "politique de confidentialité", vers: "/politique-de-confidentialite" },
            " pour plus d'informations.",
          ],
        },
      ],
    },
    {
      titre: "11. Médiateur de la consommation",
      blocs: [
        {
          paragraphe:
            "Conformément aux articles L611-1 et R612-1 du Code de la consommation, il est prévu que pour tout litige n'ayant pu être résolu à l'amiable entre le professionnel et le consommateur, ce dernier a la possibilité de saisir gratuitement le médiateur de la consommation dont relève le professionnel.",
        },
        {
          lignes: [
            ["Le professionnel a désigné ", { gras: "MEDICYS" }, " comme médiateur de la consommation."],
            "MEDICYS",
            "73 Boulevard de Clichy",
            "75009 Paris",
            ["Site internet : ", { lienExterne: "www.medicys.fr", vers: "https://www.medicys.fr" }],
          ],
        },
        {
          paragraphe: [
            "En cas de litige, le consommateur peut également saisir la plateforme européenne de règlement en ligne des litiges à l'adresse suivante : ",
            { lienExterne: "https://ec.europa.eu/consumers/odr", vers: "https://ec.europa.eu/consumers/odr" },
          ],
        },
      ],
    },
    {
      titre: "12. Loi applicable et tribunaux compétents",
      blocs: [
        {
          paragraphe:
            "Les présentes conditions générales de vente sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité. À défaut d'accord, les tribunaux de Toulouse seront seuls compétents.",
        },
      ],
    },
  ],
  miseAJour: { libelle: "Dernière mise à jour :", date: "15 avril 2026" },
};

export default cgv;
