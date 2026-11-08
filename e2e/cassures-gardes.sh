#!/usr/bin/env bash
# Cassures des gardes d'affichage (e2e/gardes-affichage.spec.ts). Pour chaque garde : une cassure volontaire du
# code, la construction, la suite qui doit tomber sur cette garde, puis la remise en état du fichier. À la fin,
# construction propre et suite entière, qui doit passer.
#
#   GARDES_ENV=/tmp/gf-presse-env.sh bash e2e/cassures-gardes.sh          toutes les cassures
#   GARDES_ENV=/tmp/gf-presse-env.sh bash e2e/cassures-gardes.sh contraste une seule
#
# Prérequis : fichiers cassés sans modification en cours, site public (SITE_MODE=public, chargé par GARDES_ENV),
# port des gardes libre (GARDES_PORT, 3993 par défaut). Journaux dans test-results/cassures/.
# Code de sortie : 0 quand chaque garde est tombée sur sa cassure puis que la suite est repassée, 1 sinon.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

[ -n "${GARDES_ENV:-}" ] && { set -a; . "$GARDES_ENV"; set +a; }
JOURNAUX=test-results/cassures
PORT="${GARDES_PORT:-3993}"
mkdir -p "$JOURNAUX"

if [ "${SITE_MODE:-}" != "public" ]; then echo "SITE_MODE=public attendu (charger l'environnement par GARDES_ENV)"; exit 1; fi
if ! command -v bun > /dev/null; then echo "bun introuvable"; exit 1; fi
if ss -ltn | grep -c ":$PORT " > /dev/null; then echo "port $PORT déjà pris : la suite mesurerait un autre serveur"; exit 1; fi

# nom | fichier | texte remplacé | texte de la cassure | début du titre des cas qui doivent tomber
CASSURES=(
  'debordement|app/[locale]/presse/page.tsx|<header className="px-4 pb-14|<header className="min-w-[1600px] px-4 pb-14|aucun débordement horizontal'
  'nom-menu|components/navigation/Navigation.tsx|hidden lg:flex items-center gap-10|hidden md:flex items-center gap-10|le nom du site garde'
  'zone-appui|components/presse/TextePresse.tsx|inline-flex min-h-6 min-w-6 items-center|inline-flex items-center|liens « Autres langues »'
  'contraste|app/[locale]/globals.css|--primary-strong: 38 45% 28%;|--primary-strong: 38 45% 48%;|lien actif du menu'
  'carte-invisible|components/animations/ScrollReveal.tsx|toggleActions: "play none none none"|toggleActions: "none none none none"|chaque carte de la page Presse'
)

remplacer() { # fichier, texte remplacé, texte nouveau : une occurrence exactement, sinon la cassure n'est pas posée
  node -e '
    const fs = require("fs");
    const [fichier, ancien, nouveau] = process.argv.slice(1);
    const source = fs.readFileSync(fichier, "utf8");
    const n = source.split(ancien).length - 1;
    if (n !== 1) { console.error(`cassure non posée : ${n} occurrence(s) de « ${ancien} » dans ${fichier}`); process.exit(3); }
    fs.writeFileSync(fichier, source.replace(ancien, nouveau));
  ' "$1" "$2" "$3"
}

construire() { # étiquette
  if ! bun run build > "$JOURNAUX/build-$1.log" 2>&1; then echo "  construction en échec, voir $JOURNAUX/build-$1.log"; return 1; fi
}

jouer_la_suite() { # étiquette : rend le code de la suite ; titres des cas tombés dans $JOURNAUX/tombes-<étiquette>.txt
  PLAYWRIGHT_JSON_OUTPUT_NAME="$JOURNAUX/suite-$1.json" bun run test:gardes --reporter=list,json > "$JOURNAUX/suite-$1.log" 2>&1
  local code=$?
  node -e '
    const r = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
    const tombes = [];
    const parcourir = (suite, chemin) => {
      for (const s of suite.suites ?? []) parcourir(s, s.title.endsWith(".spec.ts") ? chemin : [...chemin, s.title]);
      for (const spec of suite.specs ?? [])
        if (spec.tests.some((t) => t.status === "unexpected")) tombes.push([...chemin, spec.title].join(" › "));
    };
    for (const s of r.suites) parcourir(s, []);
    if (tombes.length) console.log(tombes.join("\n"));
  ' "$JOURNAUX/suite-$1.json" > "$JOURNAUX/tombes-$1.txt" 2> /dev/null
  return $code
}

echecs=0
for cassure in "${CASSURES[@]}"; do
  IFS='|' read -r nom fichier ancien nouveau garde <<< "$cassure"
  if [ $# -gt 0 ] && [ "$1" != "$nom" ]; then continue; fi
  echo "== $nom : $fichier"
  if ! git diff --quiet -- "$fichier"; then echo "  $fichier porte déjà des modifications : arrêt"; exit 1; fi
  if ! remplacer "$fichier" "$ancien" "$nouveau"; then echo "  GARDE NON ÉPROUVÉE"; echecs=$((echecs + 1)); continue; fi
  echo "  cassure posée : « $ancien » devient « $nouveau »"
  if construire "$nom"; then
    jouer_la_suite "$nom"
    code=$?
    visees=$(grep -c -F -- "$garde" "$JOURNAUX/tombes-$nom.txt" || true)
    autres=$(grep -v -c -F -- "$garde" "$JOURNAUX/tombes-$nom.txt" || true)
    if [ "$code" -ne 0 ] && [ "$visees" -gt 0 ]; then
      echo "  GARDE TOMBÉE : suite en échec (code $code), $visees cas de « $garde »"
      grep -F -- "$garde" "$JOURNAUX/tombes-$nom.txt" | sed 's/^/    /'
      [ "$autres" -gt 0 ] && { echo "  autres cas tombés avec elle :"; grep -v -F -- "$garde" "$JOURNAUX/tombes-$nom.txt" | sed 's/^/    /'; }
    else
      echo "  GARDE MUETTE : code $code, aucun cas de « $garde » tombé (journal $JOURNAUX/suite-$nom.log)"
      echecs=$((echecs + 1))
    fi
  else
    echecs=$((echecs + 1))
  fi
  git checkout -- "$fichier"
  if git diff --quiet -- "$fichier"; then echo "  rétabli : $fichier"; else echo "  REMISE EN ÉTAT IMPOSSIBLE : $fichier"; exit 1; fi
done

echo "== remise en état : construction propre puis suite entière"
if construire propre && jouer_la_suite propre; then
  echo "  suite verte après remise en état"
else
  echo "  SUITE EN ÉCHEC APRÈS REMISE EN ÉTAT (journal $JOURNAUX/suite-propre.log)"
  echecs=$((echecs + 1))
fi
echo "gardes non éprouvées ou remise en état en échec : $echecs"
[ "$echecs" -eq 0 ]
