import { defineConfig, devices } from "@playwright/test";

/**
 * Gardes d'affichage du site public (e2e/gardes-affichage.spec.ts), lancées par « bun run test:gardes » après
 * « bun run build ». Toute garde qui tombe rend un code de sortie non nul : le build de contrôle tombe avec elle.
 *
 * Sans PLAYWRIGHT_BASE_URL, Playwright sert la construction existante par next start sur GARDES_PORT (3993 par
 * défaut) puis l'arrête. Un port déjà pris le fait échouer : il ne mesure jamais le serveur d'une autre
 * construction. Avec PLAYWRIGHT_BASE_URL, la suite mesure le serveur déjà lancé à cette adresse.
 *
 * Le serveur doit servir le site public (SITE_MODE=public) : le test témoin de la suite tombe sinon.
 */
const PORT = Number(process.env.GARDES_PORT ?? 3993);
const ADRESSE_FOURNIE = process.env.PLAYWRIGHT_BASE_URL;
const ADRESSE = ADRESSE_FOURNIE ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  testMatch: "gardes-affichage.spec.ts",
  // Machine de contrôle à deux cœurs : un seul navigateur à la fois, mesures d'animation sans concurrence
  workers: 1,
  retries: 0,
  forbidOnly: true,
  reporter: "list",
  outputDir: "test-results/gardes",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: ADRESSE,
    trace: "off",
    screenshot: "only-on-failure",
  },
  webServer: ADRESSE_FOURNIE
    ? undefined
    : {
        command: `next start -p ${PORT}`,
        url: `${ADRESSE}/fr`,
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
