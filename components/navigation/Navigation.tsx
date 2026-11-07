"use client";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileNav from "./MobileNav";

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/galerie", label: t("photographies") },
    { href: "/toiles", label: t("toiles") },
    { href: "/presse", label: t("presse") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      {/* Barre de navigation sticky */}
      <nav
        className={`sticky top-0 z-40 border-b transition-all duration-700 ease-out ${
          scrolled ? "border-border/50 shadow-sm" : "border-transparent"
        }`}
      >
        {/* Fond de l'en-tête, voilé et flouté au défilement. Le flou vit sur cette couche : porté par l'en-tête, un
            backdrop-filter faisait de lui le bloc conteneur de ses descendants fixes, ce qui ramenait à 80 px de haut
            le calque qui referme le sélecteur de langue au clic sur la page. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 transition-all duration-700 ease-out ${
            scrolled ? "bg-background/80 backdrop-blur-md" : "bg-background"
          }`}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className={`text-xl sm:text-2xl whitespace-nowrap font-extralight hover:text-primary transition-all duration-500 ${
                scrolled ? "tracking-[0.05em]" : "tracking-[0.08em]"
              }`}
            >
              GUILLAUME FARRÉ
            </Link>
            {/* Sous 1024 px, les liens se replient derrière le bouton Menu : déployés à 768 px, ils touchaient le nom
                (3,8 px d'écart en français) et n'offraient au doigt que des cibles de 12 px de corps. */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-light tracking-[0.15em] uppercase hover:text-primary transition-colors duration-300 relative group ${
                    pathname === link.href ? "text-primary" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[rgba(196,165,112,0.5)] transition-all duration-500 ease-out ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
              <LanguageSwitcher />
            </div>
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </nav>

    </>
  );
}
