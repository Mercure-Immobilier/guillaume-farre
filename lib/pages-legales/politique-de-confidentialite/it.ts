import type { DocumentLegal } from "../types";

const politiqueDeConfidentialite: DocumentLegal = {
  titre: "Informativa sulla privacy",
  avertissement: [
    "Questa traduzione italiana è fornita a solo titolo informativo. Fa fede unicamente la ",
    { lien: "versione francese", vers: "/politique-de-confidentialite", langue: "fr" },
    ".",
  ],
  sections: [
    {
      titre: "1. Introduzione",
      blocs: [
        {
          paragraphe:
            "La protezione dei vostri dati personali è una priorità per Guillaume Farré. La presente informativa sulla privacy spiega quali informazioni raccogliamo, come le utilizziamo e quali sono i vostri diritti.",
        },
      ],
    },
    {
      titre: "2. Titolare del trattamento",
      blocs: [
        {
          lignes: [
            [{ gras: "Guillaume Farré" }],
            "Artista - Action painting automobilistica",
            "Indirizzo: 31000 Toulouse, Francia",
            "Email: contact@guillaumefarre.com",
          ],
        },
      ],
    },
    {
      titre: "3. Dati raccolti",
      blocs: [
        { paragraphe: "Raccogliamo i seguenti dati:" },
        {
          liste: [
            [{ gras: "Dati identificativi:" }, " cognome, nome"],
            [{ gras: "Dati di contatto:" }, " indirizzo email, numero di telefono, indirizzo postale"],
            [{ gras: "Dati relativi agli ordini:" }, " storico degli acquisti, preferenze"],
            [
              { gras: "Dati di pagamento:" },
              " trattati in modo sicuro da Stripe (non conserviamo mai i vostri dati bancari)",
            ],
            [{ gras: "Dati di connessione:" }, " indirizzo IP, tipo di browser, pagine visitate"],
          ],
        },
      ],
    },
    {
      titre: "4. Finalità del trattamento",
      blocs: [
        { paragraphe: "I vostri dati sono raccolti per:" },
        {
          liste: [
            "Elaborare e consegnare i vostri ordini",
            "Gestire il vostro account cliente",
            "Inviarvi informazioni sui vostri ordini",
            "Migliorare i nostri servizi e il nostro sito web",
            "Adempiere ai nostri obblighi di legge",
          ],
        },
      ],
    },
    {
      titre: "5. Base giuridica del trattamento",
      blocs: [
        { paragraphe: "Il trattamento dei vostri dati si basa su:" },
        {
          liste: [
            [{ gras: "L'esecuzione di un contratto:" }, " per elaborare i vostri ordini"],
            [{ gras: "Il nostro legittimo interesse:" }, " per migliorare i nostri servizi"],
            [{ gras: "I nostri obblighi di legge:" }, " contabilità, fatturazione"],
          ],
        },
      ],
    },
    {
      titre: "6. Destinatari dei dati",
      blocs: [
        { paragraphe: "I vostri dati possono essere trasmessi a:" },
        {
          liste: [
            [{ gras: "Stripe:" }, " per il trattamento sicuro dei pagamenti"],
            [{ gras: "Corrieri:" }, " per la consegna dei vostri ordini"],
          ],
        },
        { paragraphe: "Non vendiamo mai i vostri dati a terzi." },
        {
          paragraphe: [
            { gras: "Trasferimenti al di fuori dell'UE:" },
            " Stripe Inc. ha sede negli Stati Uniti. I trasferimenti di dati sono disciplinati dalle clausole contrattuali tipo della Commissione europea (articolo 46 del GDPR).",
          ],
        },
      ],
    },
    {
      titre: "7. Periodo di conservazione",
      blocs: [
        { paragraphe: "I vostri dati sono conservati per:" },
        {
          liste: [
            [{ gras: "Dati relativi agli ordini:" }, " 10 anni (obblighi contabili)"],
            [{ gras: "Dati dell'account cliente:" }, " 3 anni dopo l'ultima attività"],
          ],
        },
      ],
    },
    {
      titre: "8. I vostri diritti",
      blocs: [
        { paragraphe: "Ai sensi del GDPR, disponete dei seguenti diritti:" },
        {
          liste: [
            [{ gras: "Diritto di accesso:" }, " ottenere una copia dei vostri dati"],
            [{ gras: "Diritto di rettifica:" }, " correggere i vostri dati inesatti"],
            [{ gras: "Diritto alla cancellazione:" }, " chiedere la cancellazione dei vostri dati"],
            [{ gras: "Diritto di limitazione:" }, " limitare il trattamento dei vostri dati"],
            [{ gras: "Diritto alla portabilità:" }, " ricevere i vostri dati in un formato strutturato"],
            [{ gras: "Diritto di opposizione:" }, " opporvi al trattamento dei vostri dati"],
            [{ gras: "Diritto di revoca del consenso:" }, " revocare il vostro consenso in qualsiasi momento"],
          ],
        },
        { paragraphe: "Per esercitare questi diritti, contattateci all'indirizzo: contact@guillaumefarre.com" },
      ],
    },
    {
      titre: "9. Sicurezza",
      blocs: [
        {
          paragraphe: "Adottiamo misure tecniche e organizzative adeguate per proteggere i vostri dati da:",
        },
        { liste: ["Accessi non autorizzati", "Perdita accidentale", "Distruzione o danni"] },
        {
          paragraphe:
            "I pagamenti sono protetti da Stripe, certificato PCI DSS livello 1 (lo standard di sicurezza più rigoroso).",
        },
      ],
    },
    {
      titre: "10. Cookie",
      blocs: [
        {
          paragraphe:
            "Il nostro sito utilizza cookie per migliorare la vostra esperienza di navigazione. Potete configurare il vostro browser per rifiutare i cookie.",
        },
        { paragraphe: "Tipi di cookie utilizzati:" },
        {
          liste: [
            [
              { gras: "Cookie necessari:" },
              " cookie di autenticazione dell'amministrazione (",
              { code: "gf_auth" },
              ", durata 30 giorni)",
            ],
            [
              { gras: "Cookie di pagamento:" },
              " cookie Stripe depositati durante il checkout per proteggere la procedura di pagamento",
            ],
          ],
        },
      ],
    },
    {
      titre: "11. Modifiche",
      blocs: [
        {
          paragraphe:
            "Ci riserviamo il diritto di modificare la presente informativa sulla privacy in qualsiasi momento. Ogni modifica sarà pubblicata su questa pagina con una nuova data di aggiornamento.",
        },
      ],
    },
    {
      titre: "12. Contatti e reclami",
      blocs: [
        {
          paragraphe:
            "Per qualsiasi domanda relativa alla presente informativa sulla privacy o all'esercizio dei vostri diritti:",
        },
        { paragraphe: "Email: contact@guillaumefarre.com" },
        {
          paragraphe:
            "Se ritenete che i vostri diritti non siano rispettati, potete presentare un reclamo alla CNIL, l'autorità francese per la protezione dei dati:",
        },
        {
          lignes: [
            "Commission Nationale de l'Informatique et des Libertés",
            "3 Place de Fontenoy - TSA 80715",
            "75334 PARIS CEDEX 07",
            "Telefono: +33 1 53 73 22 22",
            [{ lienExterne: "www.cnil.fr", vers: "https://www.cnil.fr" }],
          ],
        },
      ],
    },
  ],
  miseAJour: { libelle: "Ultimo aggiornamento:", date: "15 aprile 2026" },
};

export default politiqueDeConfidentialite;
