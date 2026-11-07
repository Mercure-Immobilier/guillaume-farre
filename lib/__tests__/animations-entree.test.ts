// @vitest-environment node
/**
 * Les classes de durée et de courbe des animations d'entrée (DarkEntry, WelcomeAnimation) doivent exister dans
 * la feuille compilée. Écrites en valeur arbitraire (duration-[1500ms]), elles n'y étaient pas : tailwindcss-animate
 * déclare lui aussi duration-* et ease-*, Tailwind refuse alors de choisir et ne génère rien, sans erreur à la
 * construction. Chaque classe est passée ici au moteur Tailwind avec la configuration du site.
 */
import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import loadConfig from "tailwindcss/loadConfig";
import { describe, expect, it } from "vitest";

const RACINE = path.resolve(__dirname, "../..");
const CONFIG = loadConfig(path.join(RACINE, "tailwind.config.ts"));
const COMPOSANTS = ["components/DarkEntry.tsx", "components/WelcomeAnimation.tsx"];
// duration-*, ease-* et delay-* écrits comme classes, hors des valeurs d'animation du type fadeIn_1s_ease-out
const CLASSES_DE_MOUVEMENT = /(?<![\w-])(?:duration|ease|delay)-[^\s`"'{}$]+/g;

async function genere(classe: string): Promise<string> {
  const resultat = await postcss([
    tailwindcss({ ...CONFIG, content: [{ raw: `<div class="${classe}"></div>`, extension: "html" }] }),
  ]).process("@tailwind utilities;", { from: undefined });
  return resultat.css;
}

// Une règle dont le sélecteur est la classe elle-même. La sortie n'est jamais vide : tailwindcss-animate y pose
// toujours ses @keyframes enter et exit, qu'une classe soit générée ou non.
async function regleDe(classe: string): Promise<boolean> {
  const selecteur = "." + classe.replace(/[^a-zA-Z0-9_-]/g, (c) => "\\" + c);
  let trouvee = false;
  postcss.parse(await genere(classe)).walkRules((regle) => {
    if (regle.selectors.includes(selecteur)) trouvee = true;
  });
  return trouvee;
}

describe("classes de mouvement des animations d'entrée", () => {
  for (const composant of COMPOSANTS) {
    it(`${composant} : chaque classe duration-*, ease-* et delay-* est générée`, async () => {
      const source = fs.readFileSync(path.join(RACINE, composant), "utf8");
      const classes = [...new Set(source.match(CLASSES_DE_MOUVEMENT) ?? [])];
      expect(classes.length).toBeGreaterThan(0);
      const absentes: string[] = [];
      for (const classe of classes) {
        if (!(await regleDe(classe))) absentes.push(classe);
      }
      expect(absentes).toEqual([]);
    });
  }

  it("ouvre les portes en 1,5 s et anime les particules en 3 s", async () => {
    expect(await genere("duration-1500")).toMatch(/\.duration-1500\s*\{[^}]*transition-duration:\s*1500ms/);
    expect(await genere("duration-3000")).toMatch(/\.duration-3000\s*\{[^}]*transition-duration:\s*3000ms/);
    expect(await genere("ease-in-out")).toMatch(/transition-timing-function:\s*cubic-bezier\(0\.4,\s*0,\s*0\.2,\s*1\)/);
  });

  it("témoins : une durée par défaut est générée, une durée arbitraire ne l'est pas", async () => {
    expect(await regleDe("duration-300")).toBe(true);
    expect(await regleDe("duration-[1500ms]")).toBe(false);
    expect(await regleDe("ease-[cubic-bezier(0.4,0,0.2,1)]")).toBe(false);
  });
});
