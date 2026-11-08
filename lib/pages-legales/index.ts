import { routing } from "@/i18n/routing";
import cgvEn from "./cgv/en";
import cgvFr from "./cgv/fr";
import cgvIt from "./cgv/it";
import mentionsLegalesEn from "./mentions-legales/en";
import mentionsLegalesFr from "./mentions-legales/fr";
import mentionsLegalesIt from "./mentions-legales/it";
import politiqueDeConfidentialiteEn from "./politique-de-confidentialite/en";
import politiqueDeConfidentialiteFr from "./politique-de-confidentialite/fr";
import politiqueDeConfidentialiteIt from "./politique-de-confidentialite/it";
import retoursEchangesEn from "./retours-echanges/en";
import retoursEchangesFr from "./retours-echanges/fr";
import retoursEchangesIt from "./retours-echanges/it";
import type { DocumentLegal, Langue, PageRetours, Versions } from "./types";

export const CGV: Versions<DocumentLegal> = { fr: cgvFr, en: cgvEn, it: cgvIt };

export const MENTIONS_LEGALES: Versions<DocumentLegal> = {
  fr: mentionsLegalesFr,
  en: mentionsLegalesEn,
  it: mentionsLegalesIt,
};

export const POLITIQUE_DE_CONFIDENTIALITE: Versions<DocumentLegal> = {
  fr: politiqueDeConfidentialiteFr,
  en: politiqueDeConfidentialiteEn,
  it: politiqueDeConfidentialiteIt,
};

export const RETOURS_ECHANGES: Versions<PageRetours> = {
  fr: retoursEchangesFr,
  en: retoursEchangesEn,
  it: retoursEchangesIt,
};

function estUneLangue(locale: string): locale is Langue {
  return (routing.locales as readonly string[]).includes(locale);
}

/** Version d'une page dans la langue demandée, la française pour une langue que le site ne sert pas */
export function versionDe<T>(versions: Versions<T>, locale: string): T {
  return versions[estUneLangue(locale) ? locale : routing.defaultLocale];
}
