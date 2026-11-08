import type { DocumentLegal } from "../types";

const cgv: DocumentLegal = {
  titre: "Condizioni generali di vendita",
  avertissement: [
    "Questa traduzione italiana è fornita a solo titolo informativo. Fa fede unicamente la ",
    { lien: "versione francese", vers: "/cgv", langue: "fr" },
    ".",
  ],
  sections: [
    {
      titre: "1. Informazioni legali",
      blocs: [
        {
          lignes: [
            [{ gras: "Guillaume Farré" }],
            "Imprenditore individuale (entrepreneur individuel)",
            "Attività: creazione artistica nel campo delle arti plastiche (NAF 90.03A)",
            "SIRET: 449 392 943 00055",
            "Indirizzo: 14 rue Peyras, 31000 Toulouse, Francia",
            "Email: contact@guillaumefarre.com",
            "IVA non applicabile, articolo 293 B del Codice generale delle imposte francese",
          ],
        },
      ],
    },
    {
      titre: "2. Oggetto",
      blocs: [
        {
          paragraphe:
            "Le presenti condizioni generali di vendita (CGV) disciplinano la vendita di opere d'arte da parte di Guillaume Farré tramite il sito guillaumefarre.com. Sono proposti due tipi di opere:",
        },
        {
          paragraphe: [
            { gras: "Fotografie" },
            ": stampe Fine Art Giclee numerate e firmate, disponibili in edizioni limitate di 9 esemplari (grandi formati da A1 a 2A0) o di 99 esemplari (piccoli formati da A4 ad A2). Formati disponibili: A4 (250 €), A3 (500 €), A2 (800 €), A1 (1.200 €), A0 e 2A0 (su preventivo). Ogni stampa è accompagnata da un certificato di autenticità che indica il numero dell'edizione (es.: 3/9).",
          ],
        },
        {
          paragraphe: [
            { gras: "Tele" },
            ": pezzi unici creati per frizione automobilistica su tela vergine, prezzo da 2.500 € a 20.000 €. Le tele sono visibili solo su appuntamento. Per qualsiasi richiesta, contattate direttamente l'artista. Non sono vendute online.",
          ],
        },
      ],
    },
    {
      titre: "3. Prezzi",
      blocs: [
        {
          paragraphe:
            "I prezzi sono indicati in euro, comprensivi di tutte le imposte. Le spese di spedizione sono a parte e calcolate in base alla destinazione.",
        },
        { paragraphe: "IVA non applicabile, articolo 293 B del Codice generale delle imposte francese." },
        {
          paragraphe:
            "I prezzi possono essere modificati in qualsiasi momento, ma le opere saranno fatturate sulla base delle tariffe in vigore al momento della convalida dell'ordine.",
        },
      ],
    },
    {
      titre: "4. Prodotti",
      blocs: [
        {
          paragraphe: [
            { gras: "Fotografie" },
            ": stampe Fine Art Giclee a 12 colori su carta archival da 200 g/m², numerate e firmate dall'artista. Edizioni rigorosamente limitate: una volta venduti tutti gli esemplari, la serie è chiusa definitivamente. Formati: A4 (21 x 29,7 cm), A3 (29,7 x 42 cm), A2 (42 x 59,4 cm), A1 (59,4 x 84,1 cm), A0 (84,1 x 118,9 cm), 2A0 (118,9 x 168,2 cm).",
          ],
        },
        {
          paragraphe: [
            { gras: "Tele" },
            ": pezzi unici, del tutto irriproducibili, creati con vernice industriale depositata per frizione, calore e pressione durante il passaggio diretto di una Ferrari sulla tela vergine. Formati variabili. Prezzo: da 2.500 € a 20.000 € secondo il formato e la tecnica. Visibili solo su appuntamento, contattate l'artista.",
          ],
        },
      ],
    },
    {
      titre: "5. Ordine e pagamento",
      blocs: [
        {
          paragraphe: [
            { gras: "Fotografie" },
            ": ordine online tramite il carrello del sito. Pagamento sicuro tramite Stripe.",
          ],
        },
        {
          paragraphe: [
            { gras: "Tele" },
            ": prenotazione solo su appuntamento. Dopo la convalida, l'artista invia una fattura Stripe personalizzata.",
          ],
        },
        { paragraphe: [{ gras: "Metodi di pagamento accettati:" }] },
        {
          liste: [
            "Carta bancaria (Visa, Mastercard, American Express)",
            "Apple Pay e Google Pay (tramite Stripe Checkout)",
          ],
        },
        {
          paragraphe:
            "I dati bancari non sono mai conservati sui nostri server. Sono trattati direttamente da Stripe, piattaforma di pagamento sicura certificata PCI-DSS.",
        },
      ],
    },
    {
      titre: "6. Consegna",
      blocs: [
        {
          paragraphe:
            "Le opere sono imballate in modo professionale per garantirne l'integrità durante il trasporto. Per le tele è inclusa un'assicurazione di trasporto.",
        },
        { paragraphe: [{ gras: "Tempi di consegna indicativi:" }] },
        {
          liste: [
            "Francia: da 5 a 7 giorni lavorativi",
            "Europa: da 7 a 14 giorni lavorativi",
            "Internazionale: da 14 a 30 giorni lavorativi",
          ],
        },
        {
          paragraphe: "Questi tempi sono forniti a titolo indicativo e non costituiscono un impegno contrattuale.",
        },
      ],
    },
    {
      titre: "7. Diritto di recesso",
      blocs: [
        {
          paragraphe: [
            "Ai sensi dell'articolo L221-18 del Codice del consumo francese, l'acquirente consumatore dispone di un termine di ",
            { gras: "14 giorni" },
            " dal ricevimento dell'opera per esercitare il diritto di recesso, senza dover fornire alcuna motivazione né pagare penali.",
          ],
        },
        { paragraphe: [{ gras: "Modalità di recesso:" }] },
        {
          liste: [
            "L'opera deve essere restituita nel suo imballaggio originale, in perfette condizioni",
            "Le spese di restituzione sono a carico dell'acquirente",
            "Il rimborso integrale avviene entro 14 giorni dal ricevimento dell'opera restituita",
          ],
        },
        {
          paragraphe:
            "Per esercitare il diritto di recesso, potete utilizzare il modulo tipo riportato di seguito oppure contattarmi via email all'indirizzo: contact@guillaumefarre.com",
        },
        {
          paragraphe: [
            { gras: "Eccezioni:" },
            " Il diritto di recesso non si applica se l'opera è stata realizzata su misura secondo le specifiche del cliente (articolo L221-28, 3° del Codice del consumo francese), né agli acquisti effettuati da un professionista per la propria attività.",
          ],
        },
        {
          encadre: {
            titre: "Modulo tipo di recesso",
            lignes: [
              "Alla cortese attenzione di Guillaume Farré, contact@guillaumefarre.com:",
              "Con la presente notifico il recesso dal contratto di vendita del seguente bene:",
              "- Opera: [titolo]",
              "- Ordinata il: [data]",
              "- Ricevuta il: [data]",
              "- Nome dell'acquirente: [nome]",
              "- Indirizzo dell'acquirente: [indirizzo]",
              "- Firma dell'acquirente (solo se il presente modulo è notificato in versione cartacea):",
              "- Data:",
            ],
          },
        },
      ],
    },
    {
      titre: "8. Proprietà intellettuale",
      blocs: [
        {
          paragraphe:
            "Ai sensi dell'articolo L111-1 del Codice della proprietà intellettuale francese, l'acquisto di un'opera conferisce all'acquirente unicamente la proprietà materiale dell'oggetto. Nessun diritto d'autore viene trasferito.",
        },
        { paragraphe: [{ gras: "L'acquirente non può:" }] },
        {
          liste: [
            "Riprodurre l'opera a fini commerciali (manifesti, poster, prodotti derivati, NFT, ecc.)",
            "Pubblicare l'immagine dell'opera a fini pubblicitari",
            "Modificare l'opera",
          ],
        },
        {
          paragraphe: [
            { gras: "L'acquirente può:" },
            " esporre l'opera a casa propria, rivenderla (il diritto di seguito si applica alle future rivendite se interviene un professionista).",
          ],
        },
      ],
    },
    {
      titre: "9. Certificato di autenticità",
      blocs: [
        {
          paragraphe:
            "Ogni opera (fotografia e tela) è accompagnata da un certificato di autenticità firmato dall'artista, recante un numero unico. Per le edizioni limitate è indicato il numero dell'edizione (ad esempio: 3/9 per i grandi formati o 15/99 per i piccoli formati).",
        },
      ],
    },
    {
      titre: "10. Protezione dei dati personali",
      blocs: [
        {
          paragraphe:
            "Ai sensi del Regolamento generale sulla protezione dei dati (GDPR), i dati personali raccolti al momento dell'ordine sono utilizzati unicamente per la sua gestione e per la gestione del rapporto con il cliente.",
        },
        {
          paragraphe:
            "Disponete di un diritto di accesso, rettifica e cancellazione dei vostri dati. Per esercitare tali diritti, contattateci all'indirizzo: contact@guillaumefarre.com",
        },
        {
          paragraphe: [
            "Consultate la nostra ",
            { lien: "informativa sulla privacy", vers: "/politique-de-confidentialite" },
            " per maggiori informazioni.",
          ],
        },
      ],
    },
    {
      titre: "11. Mediatore del consumo",
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
    {
      titre: "12. Legge applicabile e foro competente",
      blocs: [
        {
          paragraphe:
            "Le presenti condizioni generali di vendita sono soggette alla legge francese. In caso di controversia, si cercherà in via prioritaria una soluzione amichevole. In mancanza di accordo, saranno competenti in via esclusiva i tribunali di Tolosa.",
        },
      ],
    },
  ],
  miseAJour: { libelle: "Ultimo aggiornamento:", date: "15 aprile 2026" },
};

export default cgv;
