import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import Footer from "@/components/Footer";
import messagesEn from "@/messages/en.json";
import messagesFr from "@/messages/fr.json";
import messagesIt from "@/messages/it.json";

/**
 * Pied de page rendu dans chaque langue du site avec ses vrais messages.
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
