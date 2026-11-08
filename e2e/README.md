# Tests E2E — Guillaume Farré

Playwright `@playwright/test` + `@axe-core/playwright`.

## Lancer en local

```bash
# Pre-requis : dev server lance
bun run dev

# Tous les E2E (sans VIP/admin fixtures, juste smoke)
bunx playwright test

# Avec VIP flow complet (auth → reservation → signature → Stripe URL)
RUN_E2E=true TEST_VIP_CODE=XXXXXXXX bunx playwright test

# Avec admin
RUN_E2E=true ADMIN_PASSWORD=xxx bunx playwright test admin-reservations

# Avec expiration solde (fixture)
RUN_E2E=true \
  TEST_EXPIRED_RESA_ID=resa-... \
  TEST_EXPIRED_TOKEN=eyJhbGc... \
  bunx playwright test balance-expiration

# A11y uniquement
bunx playwright test a11y
```

## Strategie

- **`RUN_E2E=true`** active les scenarios qui exigent un dev server avec
  donnees test. Sans cette var, les tests sont skip (CI safe).
- Les scenarios VIP s'arretent a l'URL Stripe Checkout (mode test). On ne
  saisit aucune carte (pas de side effect sur le compte Stripe).
- Les expectations sont volontairement tolerantes (selectors role/text
  plutot que data-testid) pour resister aux refactors UI.

## Scenarios couverts (Sprint 8)

| Fichier | Scenario | Fixture requise |
|---------|----------|-----------------|
| `vip-flow.spec.ts` | Auth + reservation + signature + checkout integral | `TEST_VIP_CODE` |
| `deposit-balance.spec.ts` | Acompte 30% Stripe Checkout | `TEST_VIP_CODE` |
| `admin-reservations.spec.ts` | Login admin + liste + filtres + detail + CSV | `ADMIN_PASSWORD` |
| `balance-expiration.spec.ts` | Lien solde invalide / expire | optionnelle |
| `a11y.spec.ts` | axe-core sur 6 pages publiques | aucune |
| `navigation.spec.ts` | Smoke nav globale (legacy) | aucune |
| `admin-upload.spec.ts` | Smoke admin upload (legacy) | aucune |

## Gardes d'affichage

`gardes-affichage.spec.ts` se joue contre le serveur local, après une construction faite avec l'environnement
du site public (`SITE_MODE=public`) :

```bash
bun run build && bun run test:gardes                            # next start sur le port 3993, puis 37 cas
PLAYWRIGHT_BASE_URL=http://localhost:3991 bun run test:gardes   # contre un serveur déjà lancé
GARDES_ENV=/tmp/gf-presse-env.sh bash e2e/cassures-gardes.sh    # chaque garde vue tomber sur sa cassure
```

La suite tombe sur un débordement horizontal (390, 768, 1024, 1440 px ; /fr, /fr/presse, /fr/toiles,
/fr/contact), sur moins de 24 px d'air entre le nom du site et le menu de 768 à 1024 px, sur une zone d'appui
des liens « Autres langues » de la presse sous 24 px, sur un lien actif du menu sous 4,5 pour 1, sur une carte de
la presse restée invisible après défilement. Un témoin la fait tomber quand le serveur ne sert pas le site public.

## A11y — bareme

`a11y.spec.ts` echoue si une page contient une violation `critical` ou
`serious`. Les violations `moderate` / `minor` sont loggees en warning
mais ne bloquent pas la CI. La liste complete est imprimee a la fin de
chaque test pour suivi.

---

Lalou
