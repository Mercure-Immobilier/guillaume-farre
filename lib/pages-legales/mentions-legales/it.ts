import type { DocumentLegal } from "../types";

const mentionsLegales: DocumentLegal = {
  titre: "Note legali",
  avertissement: [
    "Questa traduzione italiana è fornita a solo titolo informativo. Fa fede unicamente la ",
    { lien: "versione francese", vers: "/mentions-legales", langue: "fr" },
    ".",
  ],
  sections: [
    {
      titre: "Editore del sito",
      blocs: [
        {
          lignes: [
            [{ gras: "Guillaume Farré" }],
            "Imprenditore individuale (entrepreneur individuel)",
            "Attività: creazione artistica nel campo delle arti plastiche (NAF 90.03A)",
            "SIRET: 449 392 943 00055",
            "Indirizzo: 14 rue Peyras, 31000 Toulouse, Francia",
            "Email: contact@guillaumefarre.com",
            "Sito web: guillaumefarre.com",
            "IVA non applicabile, articolo 293 B del Codice generale delle imposte francese",
          ],
        },
      ],
    },
    {
      titre: "Direttore della pubblicazione",
      blocs: [{ paragraphe: "Guillaume Farré" }],
    },
    {
      titre: "Hosting",
      blocs: [{ lignes: ["Il sito è ospitato da:", "OVH SAS", "2 rue Kellermann, 59100 Roubaix", "Francia"] }],
    },
    {
      titre: "Proprietà intellettuale",
      blocs: [
        {
          paragraphe:
            "L'intero sito è soggetto alla legislazione francese e internazionale sul diritto d'autore e sulla proprietà intellettuale.",
        },
        {
          paragraphe:
            "Tutti i diritti di riproduzione sono riservati, anche per i documenti scaricabili e per le rappresentazioni iconografiche e fotografiche.",
        },
        {
          paragraphe:
            "La riproduzione totale o parziale di questo sito su qualsiasi supporto, elettronico o di altro tipo, è formalmente vietata salvo espressa autorizzazione del direttore della pubblicazione.",
        },
        {
          paragraphe:
            "Le fotografie, i testi, gli slogan, i disegni, le immagini, le sequenze animate sonore e non, nonché tutte le opere integrate nel sito sono di proprietà di Guillaume Farré o di terzi che hanno autorizzato Guillaume Farré a utilizzarle.",
        },
      ],
    },
    {
      titre: "Crediti fotografici",
      blocs: [
        {
          paragraphe:
            "Tutte le fotografie delle opere presenti su questo sito sono di proprietà esclusiva di Guillaume Farré. Qualsiasi riproduzione, anche parziale, è vietata senza previa autorizzazione scritta.",
        },
      ],
    },
    {
      titre: "Cookie",
      blocs: [
        {
          paragraphe:
            "Il sito può chiedervi di accettare i cookie per finalità statistiche e di visualizzazione. Un cookie è un'informazione depositata sul vostro disco rigido dal server del sito che state visitando.",
        },
        {
          paragraphe:
            "Contiene diversi dati memorizzati sul vostro computer in un semplice file di testo, a cui un server accede per leggere e registrare informazioni.",
        },
      ],
    },
    {
      titre: "Protezione dei dati personali",
      blocs: [
        {
          paragraphe:
            "Ai sensi del Regolamento generale sulla protezione dei dati (GDPR), disponete di un diritto di accesso, rettifica e cancellazione dei dati che vi riguardano.",
        },
        { paragraphe: "Per esercitare questo diritto, potete contattarmi all'indirizzo: contact@guillaumefarre.com" },
        {
          paragraphe: [
            "Per maggiori informazioni, consultate la nostra ",
            { lien: "informativa sulla privacy", vers: "/politique-de-confidentialite" },
            ".",
          ],
        },
      ],
    },
    {
      titre: "Mediatore del consumo",
      blocs: [
        {
          paragraphe:
            "Ai sensi degli articoli L611-1 e R612-1 del Codice del consumo francese, per qualsiasi controversia che non sia stato possibile risolvere in via amichevole tra il professionista e il consumatore, quest'ultimo ha la possibilità di rivolgersi gratuitamente al mediatore del consumo competente per il professionista.",
        },
        {
          lignes: [
            ["Il professionista ha designato ", { gras: "MEDICYS" }, " come mediatore del consumo."],
            "MEDICYS",
            "73 Boulevard de Clichy",
            "75009 Paris",
            ["Sito internet: ", { lienExterne: "www.medicys.fr", vers: "https://www.medicys.fr" }],
          ],
        },
        {
          paragraphe: [
            "In caso di controversia, il consumatore può inoltre rivolgersi alla piattaforma europea di risoluzione online delle controversie al seguente indirizzo: ",
            { lienExterne: "https://ec.europa.eu/consumers/odr", vers: "https://ec.europa.eu/consumers/odr" },
          ],
        },
      ],
    },
  ],
  miseAJour: { libelle: "Ultimo aggiornamento:", date: "15 aprile 2026" },
};

export default mentionsLegales;
