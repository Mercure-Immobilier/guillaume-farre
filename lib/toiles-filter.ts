/**
 * Filtre de couleur de toute toile affichée sur le site (compense le rendu pré-vernissage).
 *
 * components/AmericanFrame.tsx et components/toiles/ToileLightbox.tsx l'écrivent encore en dur :
 * lib/__tests__/presse.test.ts échoue dès que l'un d'eux s'écarte de cette valeur.
 */
export const FILTRE_TOILE = "saturate(1.22) contrast(1.10) brightness(1.07)";
