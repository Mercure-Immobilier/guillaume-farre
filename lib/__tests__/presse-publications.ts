/**
 * Textes des publications, figés pour les tests de la rubrique Presse.
 *
 * Chaque extrait a été relevé sur la publication le 6 novembre 2026 puis confronté signe à signe,
 * le 7 novembre, aux pages archivées par l'audit de la rubrique : ceux de QCEG MAG égalent le premier
 * paragraphe du corps de l'article ; celui de Sud Ouest reprend les deux premières phrases d'un
 * paragraphe qui en compte quatre. Une retouche de lib/presse.ts qui s'en écarte fait tomber la suite.
 */
export const EXTRAITS_PUBLIES: Record<string, Record<string, string>> = {
  "qceg-2026-10": {
    en: "What if the most meaningful part of a journey were not its destination, but the traces we leave behind? For French contemporary artist Guillaume Farré, this question lies at the heart of an artistic practice that brings together automotive heritage, abstract expression and a deeply personal exploration of the human experience.",
    fr: "Et si la véritable richesse d’un voyage ne résidait pas dans sa destination, mais dans les traces que nous laissons derrière nous ? Pour l’artiste contemporain français Guillaume Farré, cette interrogation constitue le fil conducteur d’une démarche artistique où se rencontrent patrimoine automobile, expression abstraite et réflexion profondément personnelle sur la condition humaine.",
    zh: "如果一段旅程中最有意义的部分不是目的地，而是我们留下的痕迹，会怎样？对法国当代艺术家纪尧姆·法雷而言，这个问题正是他艺术实践的核心——它融合了汽车传承、抽象表现，以及对人类经验的深度个人探索。",
  },
  "sud-ouest-2026-06": {
    fr: "Allongé sur sa toile posée au sol, Guillaume Farré donne l’impression de nager sur son œuvre. Bleu comme l’océan qui embrasse Biarritz – la ville de son garage-atelier –, le tableau de près de 6 mètres réunit « des méduses, ici un poisson ».",
  },
};

/** Fin du titre de Sud Ouest, que le journaliste a rendue volontairement obscène : elle ne paraît nulle part */
export const PARTIE_OBSCENE = "laisse sa trace de pneus";

/**
 * Vrai quand le texte porte la partie obscène, quelle que soit sa forme : phrase du titre, adresse à
 * tirets, capitales, accents ou entités HTML. La comparaison se fait sur les seules lettres et chiffres.
 */
export function contientLaPartieObscene(texte: string): boolean {
  const lettres = (s: string) =>
    s
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLowerCase()
      .replace(/&[a-z0-9#]+;/g, " ")
      .replace(/[^a-z0-9]+/g, " ");
  return lettres(texte).includes(lettres(PARTIE_OBSCENE));
}
