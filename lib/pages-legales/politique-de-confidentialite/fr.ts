import type { DocumentLegal } from "../types";

const politiqueDeConfidentialite: DocumentLegal = {
  titre: "Politique de Confidentialité",
  sections: [
    {
      titre: "1. Introduction",
      blocs: [
        {
          paragraphe:
            "La protection de vos données personnelles est une priorité pour Guillaume Farré. Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons et quels sont vos droits.",
        },
      ],
    },
    {
      titre: "2. Responsable du traitement",
      blocs: [
        {
          lignes: [
            [{ gras: "Guillaume Farré" }],
            "Artiste - Action painting automobile",
            "Adresse : 31000 Toulouse, France",
            "Email : contact@guillaumefarre.com",
          ],
        },
      ],
    },
    {
      titre: "3. Données collectées",
      blocs: [
        { paragraphe: "Nous collectons les données suivantes :" },
        {
          liste: [
            [{ gras: "Données d'identité :" }, " nom, prénom"],
            [{ gras: "Données de contact :" }, " adresse email, numéro de téléphone, adresse postale"],
            [{ gras: "Données de commande :" }, " historique d'achats, préférences"],
            [
              { gras: "Données de paiement :" },
              " traitées de manière sécurisée par Stripe (nous ne stockons jamais vos données bancaires)",
            ],
            [{ gras: "Données de connexion :" }, " adresse IP, type de navigateur, pages visitées"],
          ],
        },
      ],
    },
    {
      titre: "4. Finalités du traitement",
      blocs: [
        { paragraphe: "Vos données sont collectées pour :" },
        {
          liste: [
            "Traiter et livrer vos commandes",
            "Gérer votre compte client",
            "Vous envoyer des informations sur vos commandes",
            "Améliorer nos services et notre site web",
            "Respecter nos obligations légales",
          ],
        },
      ],
    },
    {
      titre: "5. Base légale du traitement",
      blocs: [
        { paragraphe: "Le traitement de vos données repose sur :" },
        {
          liste: [
            [{ gras: "L'exécution d'un contrat :" }, " pour traiter vos commandes"],
            [{ gras: "Notre intérêt légitime :" }, " pour améliorer nos services"],
            [{ gras: "Nos obligations légales :" }, " comptabilité, facturation"],
          ],
        },
      ],
    },
    {
      titre: "6. Destinataires des données",
      blocs: [
        { paragraphe: "Vos données peuvent être transmises à :" },
        {
          liste: [
            [{ gras: "Stripe :" }, " pour le traitement sécurisé des paiements"],
            [{ gras: "Transporteurs :" }, " pour la livraison de vos commandes"],
          ],
        },
        { paragraphe: "Nous ne vendons jamais vos données à des tiers." },
        {
          paragraphe: [
            { gras: "Transferts hors UE :" },
            " Stripe Inc. est basé aux États-Unis. Les transferts de données sont encadrés par les clauses contractuelles types de la Commission européenne (article 46 du RGPD).",
          ],
        },
      ],
    },
    {
      titre: "7. Durée de conservation",
      blocs: [
        { paragraphe: "Vos données sont conservées pendant :" },
        {
          liste: [
            [{ gras: "Données de commande :" }, " 10 ans (obligations comptables)"],
            [{ gras: "Données de compte client :" }, " 3 ans après la dernière activité"],
          ],
        },
      ],
    },
    {
      titre: "8. Vos droits",
      blocs: [
        { paragraphe: "Conformément au RGPD, vous disposez des droits suivants :" },
        {
          liste: [
            [{ gras: "Droit d'accès :" }, " obtenir une copie de vos données"],
            [{ gras: "Droit de rectification :" }, " corriger vos données inexactes"],
            [{ gras: "Droit à l'effacement :" }, " demander la suppression de vos données"],
            [{ gras: "Droit à la limitation :" }, " limiter le traitement de vos données"],
            [{ gras: "Droit à la portabilité :" }, " recevoir vos données dans un format structuré"],
            [{ gras: "Droit d'opposition :" }, " vous opposer au traitement de vos données"],
            [{ gras: "Droit de retrait du consentement :" }, " retirer votre consentement à tout moment"],
          ],
        },
        { paragraphe: "Pour exercer ces droits, contactez-nous à : contact@guillaumefarre.com" },
      ],
    },
    {
      titre: "9. Sécurité",
      blocs: [
        {
          paragraphe:
            "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre :",
        },
        { liste: ["L'accès non autorisé", "La perte accidentelle", "La destruction ou les dommages"] },
        {
          paragraphe:
            "Les paiements sont sécurisés par Stripe, certifié PCI DSS niveau 1 (norme de sécurité la plus stricte).",
        },
      ],
    },
    {
      titre: "10. Cookies",
      blocs: [
        {
          paragraphe:
            "Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser les cookies.",
        },
        { paragraphe: "Types de cookies utilisés :" },
        {
          liste: [
            [
              { gras: "Cookies nécessaires :" },
              " Cookie d'authentification administration (",
              { code: "gf_auth" },
              ", durée 30 jours)",
            ],
            [
              { gras: "Cookies de paiement :" },
              " Cookies Stripe déposés lors du checkout pour sécuriser le processus de paiement",
            ],
          ],
        },
      ],
    },
    {
      titre: "11. Modifications",
      blocs: [
        {
          paragraphe:
            "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.",
        },
      ],
    },
    {
      titre: "12. Contact et réclamation",
      blocs: [
        {
          paragraphe:
            "Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits :",
        },
        { paragraphe: "Email : contact@guillaumefarre.com" },
        {
          paragraphe:
            "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL :",
        },
        {
          lignes: [
            "Commission Nationale de l'Informatique et des Libertés",
            "3 Place de Fontenoy - TSA 80715",
            "75334 PARIS CEDEX 07",
            "Téléphone : 01 53 73 22 22",
            [{ lienExterne: "www.cnil.fr", vers: "https://www.cnil.fr" }],
          ],
        },
      ],
    },
  ],
  miseAJour: { libelle: "Dernière mise à jour :", date: "15 avril 2026" },
};

export default politiqueDeConfidentialite;
