import type { DocumentLegal } from "../types";

const mentionsLegales: DocumentLegal = {
  titre: "Mentions Légales",
  description:
    "Mentions légales du site guillaumefarre.com : éditeur du site, directeur de publication, hébergement, propriété intellectuelle et crédits photographiques.",
  sections: [
    {
      titre: "Éditeur du site",
      blocs: [
        {
          lignes: [
            [{ gras: "Guillaume Farré" }],
            "Entrepreneur individuel",
            "Activité : Création artistique relevant des arts plastiques (NAF 90.03A)",
            "SIRET : 449 392 943 00055",
            "Adresse : 14 rue Peyras, 31000 Toulouse, France",
            "Email : contact@guillaumefarre.com",
            "Site web : guillaumefarre.com",
            "TVA non applicable, article 293 B du Code général des impôts",
          ],
        },
      ],
    },
    {
      titre: "Directeur de publication",
      blocs: [{ paragraphe: "Guillaume Farré" }],
    },
    {
      titre: "Hébergement",
      blocs: [{ lignes: ["Le site est hébergé par :", "OVH SAS", "2 rue Kellermann, 59100 Roubaix", "France"] }],
    },
    {
      titre: "Propriété intellectuelle",
      blocs: [
        {
          paragraphe:
            "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.",
        },
        {
          paragraphe:
            "Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.",
        },
        {
          paragraphe:
            "La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de publication.",
        },
        {
          paragraphe:
            "Les photographies, textes, slogans, dessins, images, séquences animées sonores ou non ainsi que toutes les œuvres intégrées dans le site sont la propriété de Guillaume Farré ou de tiers ayant autorisé Guillaume Farré à les utiliser.",
        },
      ],
    },
    {
      titre: "Crédits photographiques",
      blocs: [
        {
          paragraphe:
            "Toutes les photographies d'œuvres présentes sur ce site sont la propriété exclusive de Guillaume Farré. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.",
        },
      ],
    },
    {
      titre: "Cookies",
      blocs: [
        {
          paragraphe:
            "Le site peut être amené à vous demander l'acceptation des cookies pour des besoins de statistiques et d'affichage. Un cookie est une information déposée sur votre disque dur par le serveur du site que vous visitez.",
        },
        {
          paragraphe:
            "Il contient plusieurs données qui sont stockées sur votre ordinateur dans un simple fichier texte auquel un serveur accède pour lire et enregistrer des informations.",
        },
      ],
    },
    {
      titre: "Protection des données personnelles",
      blocs: [
        {
          paragraphe:
            "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.",
        },
        { paragraphe: "Pour exercer ce droit, vous pouvez me contacter à l'adresse : contact@guillaumefarre.com" },
        {
          paragraphe: [
            "Pour plus d'informations, consultez notre ",
            { lien: "politique de confidentialité", vers: "/politique-de-confidentialite" },
            ".",
          ],
        },
      ],
    },
    {
      titre: "Médiateur de la consommation",
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
  ],
  miseAJour: { libelle: "Dernière mise à jour :", date: "15 avril 2026" },
};

export default mentionsLegales;
