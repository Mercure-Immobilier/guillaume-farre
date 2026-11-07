import { act, cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import messagesEn from "@/messages/en.json";
import messagesFr from "@/messages/fr.json";
import messagesIt from "@/messages/it.json";

/**
 * Pied de page puis bandeau de cookies, rendus dans chaque langue du site avec ses vrais messages.
 * Le mode admin, qui exige le routeur de Next, est remplacé par le mode de lecture du visiteur.
 */
vi.mock("@/contexts/AdminModeContext", () => ({
  useAdminMode: () => ({ isAdminMode: false, pendingChanges: new Map(), setPendingChange: () => undefined }),
}));

const MESSAGES: Record<"fr" | "en" | "it", AbstractIntlMessages> = { fr: messagesFr, en: messagesEn, it: messagesIt };

function rendre(locale: "fr" | "en" | "it", contenu: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]}>
      {contenu}
    </NextIntlClientProvider>,
  );
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  localStorage.clear();
});

describe("pied de page", () => {
  it.each([
    ["fr", "Navigation", "Informations"],
    ["en", "Navigation", "Information"],
    ["it", "Navigazione", "Informazioni"],
  ] as const)("titre ses colonnes dans la langue de la page (%s)", (locale, navigation, informations) => {
    rendre(locale, <Footer />);
    const titres = screen.getAllByRole("heading", { level: 3 }).map((titre) => titre.textContent);
    expect(titres).toEqual(["Guillaume Farré", navigation, informations]);
  });
});

describe("bandeau de cookies", () => {
  it.each(["fr", "en", "it"] as const)("mène à la politique de confidentialité de la langue courante (%s)", async (locale) => {
    vi.useFakeTimers();
    rendre(locale, <CookieConsent />);
    // Le bandeau paraît une seconde après le chargement, faute de consentement enregistré
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    const libelle = (MESSAGES[locale].cookies as Record<string, string>).learnMore;
    expect(screen.getByRole("link", { name: libelle })).toHaveAttribute("href", `/${locale}/politique-de-confidentialite`);
  });
});
