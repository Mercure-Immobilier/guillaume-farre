"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { installerPiegeFocus } from "./piege-focus";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  // Le calque et le panneau sont rendus dans document.body : laissés dans l'en-tête collant, dont le flou
  // fait un bloc conteneur, ils s'y attachaient (page élargie de 320 px, panneau réduit à 80 px de haut).
  const [corps, setCorps] = useState<HTMLElement | null>(null);
  const boutonRef = useRef<HTMLButtonElement>(null);
  const panneauRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const t = useTranslations("nav");

  useEffect(() => {
    setCorps(document.body);
  }, []);

  const fermer = useCallback(() => {
    setIsOpen(false);
    boutonRef.current?.focus();
  }, []);

  // Menu ouvert : le focus entre dans le panneau et y reste, Échap ferme où que soit le focus.
  // Le panneau suit désormais toute la page dans le document : sans ce piège, Tab partirait du bouton vers la page.
  useEffect(() => {
    const panneau = panneauRef.current;
    if (!isOpen || !panneau) return;
    return installerPiegeFocus(panneau, fermer);
  }, [isOpen, fermer, corps]);

  const links = [
    { href: "/galerie", label: t("photographies") },
    { href: "/toiles", label: t("toiles") },
    { href: "/presse", label: t("presse") },
    { href: "/contact", label: t("contact") },
  ];

  // MASQUE - Pages désactivées (code gardé pour réactivation future) :
  // { href: "/dino", label: "Dino" },
  // { href: "/origine", label: "Origines" },
  // { href: "/", label: t("accueil") },
  // { href: "/histoire", label: t("histoire") },

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={boutonRef}
        onClick={() => setIsOpen((ouvert) => !ouvert)}
        className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 z-50"
        aria-label="Menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {corps &&
        createPortal(
          <>
            {/* Mobile Menu Overlay : au-dessus des bandeaux fixes de la page (cookies, retour en haut) */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
                onClick={fermer}
                aria-hidden="true"
              />
            )}

            {/* Mobile Menu Panel - utilise design token au lieu de hardcoded.
                Replié, il est invisible : son ombre ne borde plus la page à droite, ses liens ne prennent plus
                le focus ni la voix d'un lecteur d'écran. À la fermeture, la visibilité bascule au terme de la
                sortie ; à l'ouverture elle bascule aussitôt, ce qui laisse le focus y entrer sans attendre.
                Il défile quand l'écran est plus bas que lui (téléphone en paysage) ; data-lenis-prevent laisse la
                molette le faire défiler là où Lenis lisse le défilement de la page. */}
            <div
              id="mobile-menu"
              ref={panneauRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              data-lenis-prevent
              className={`fixed top-0 right-0 h-full w-[85vw] max-w-xs overflow-y-auto overscroll-contain bg-background border-l border-border z-[70] transform duration-300 lg:hidden shadow-2xl ${
                isOpen
                  ? "visible translate-x-0 transition-transform"
                  : "invisible translate-x-full transition-[transform,visibility]"
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-light tracking-wide text-foreground">Menu</span>
                  <button
                    onClick={fermer}
                    className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label="Fermer"
                  >
                    ✕
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={fermer}
                      className={`text-base font-light tracking-wide transition-colors py-2.5 min-h-[44px] flex items-center ${
                        pathname === link.href ? "text-primary-strong" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t border-border">
                    <LanguageSwitcher />
                  </div>
                </nav>
              </div>
            </div>
          </>,
          corps
        )}
    </>
  );
}
