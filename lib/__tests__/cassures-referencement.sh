#!/usr/bin/env bash
# Cassures du test de référencement par langue (lib/__tests__/referencement-par-langue.test.ts). Pour chaque cassure :
# un défaut posé dans le code, le test qui doit tomber sur les cas visés, puis le fichier rendu à son contenu, vérifié
# contre le dépôt. À la fin, le test entier doit repasser.
#
#   bash lib/__tests__/cassures-referencement.sh                    toutes les cassures
#   bash lib/__tests__/cassures-referencement.sh canonical-racine   une seule
#
# Prérequis : fichiers cassés sans modification en cours. Journaux dans test-results/cassures-referencement/.
# Code de sortie : 0 quand chaque cassure a fait tomber ses cas puis que le test est repassé, 1 sinon.
set -uo pipefail
cd "$(dirname "$0")/../.." || exit 1

TEST=lib/__tests__/referencement-par-langue.test.ts
JOURNAUX=test-results/cassures-referencement
mkdir -p "$JOURNAUX"

# nom | fichier | texte remplacé | texte de la cassure | titre d'un cas qui doit tomber | nombre de cas qui tombent
CASSURES=(
  'canonical-racine|lib/adresses-de-page.ts|    canonical: adresseDePage(langue, chemin),|    canonical: chemin === "/galerie" ? "https://guillaumefarre.com" : adresseDePage(langue, chemin),|https://guillaumefarre.com/en/galerie déclare sa propre adresse pour canonical|3'
  'versions-accueil|lib/adresses-de-page.ts|[version, adresseDePage(version, chemin)]|[version, adresseDePage(version, "")]|https://guillaumefarre.com/it/contact déclare la même page dans chaque langue|72'
  'description-francaise|messages/en.json|"description": "Photographs by Guillaume Farré — numbered and signed prints, limited editions.",|"description": "Photographies de Guillaume Farré — tirages numérotés et signés, éditions limitées.",|https://guillaumefarre.com/en/galerie ne contient aucun mot français|1'
  'og-locale|lib/metadonnees-de-page.ts|    locale: localeOpenGraph(langue),|    locale: localeOpenGraph(routing.defaultLocale),|https://guillaumefarre.com/it/cgv déclare la langue de sa carte de partage|50'
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

tombes() { # journal JSON de vitest : titres complets des cas tombés, un par ligne
  node -e '
    const rapport = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
    for (const fichier of rapport.testResults)
      for (const cas of fichier.assertionResults) if (cas.status === "failed") console.log(cas.fullName);
  ' "$1"
}

echec=0
for ligne in "${CASSURES[@]}"; do
  IFS='|' read -r nom fichier ancien nouveau attendu nombre <<< "$ligne"
  [ $# -gt 0 ] && [ "$1" != "$nom" ] && continue
  if ! git diff --quiet -- "$fichier"; then echo "$nom : $fichier a des modifications en cours, cassure refusée"; echec=1; continue; fi
  copie="$JOURNAUX/$nom.original"
  cp "$fichier" "$copie"
  if ! remplacer "$fichier" "$ancien" "$nouveau"; then echec=1; continue; fi
  npx vitest run "$TEST" --reporter=json --outputFile="$JOURNAUX/$nom.json" > "$JOURNAUX/$nom.log" 2>&1
  code=$?
  cp "$copie" "$fichier"
  if ! git diff --quiet -- "$fichier"; then echo "$nom : $fichier n'a pas retrouvé son contenu"; exit 1; fi
  liste=$(tombes "$JOURNAUX/$nom.json")
  compte=$(printf '%s\n' "$liste" | grep -c . || true)
  # Comparaison de chaînes en bash : sous pipefail, un grep -q qui trouve tôt fait échouer la commande qui lui écrit.
  # Vitest cite l'adresse entre apostrophes dans le nom du cas : elles sont retirées avant la comparaison.
  if [[ "${liste//\'/}" == *"$attendu"* ]]; then present=présent; else present=absent; fi
  if [ "$code" -ne 0 ] && [ "$present" = présent ] && [ "$compte" -eq "$nombre" ]; then
    echo "$nom : le test tombe sur $compte cas, dont « $attendu »"
  else
    echo "$nom : ÉCHEC de la cassure (code $code, $compte cas tombés pour $nombre attendus, « $attendu » $present)"
    echec=1
  fi
done

npx vitest run "$TEST" > "$JOURNAUX/remise-en-etat.log" 2>&1
if [ $? -eq 0 ]; then echo "remise en état : le test repasse"; else echo "remise en état : le test ne repasse pas"; echec=1; fi
exit "$echec"
