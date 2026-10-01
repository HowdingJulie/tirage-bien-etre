/**
 * ─────────────────────────────────────────────────────────────
 *  RÉGLAGES DE L'APPLICATION — c'est ici que tu colles tes URL
 * ─────────────────────────────────────────────────────────────
 *
 * 👉 Remplace simplement le texte entre les guillemets '...'
 *
 * Astuce : si ton URL contient {pratique}, il sera remplacé
 * automatiquement par le nom de la pratique tirée.
 *   ex : 'https://how-pass.com/annuaire?q={pratique}'
 *        → https://how-pass.com/annuaire?q=Sophrologie
 *
 * Chaque carte peut aussi avoir sa propre URL (champ `url` dans
 * lib/practices.ts ou lib/actions.ts) : elle passe alors avant
 * celles-ci.
 */

/** Bouton « Découvrir cette pratique sur HowPass » (cartes pratiques). */
export const URL_DECOUVRIR_PRATIQUE = 'https://how-pass.com';

/** Bouton « Découvrir d'autres inspirations sur HowPass » (cartes action du jour). */
export const URL_DECOUVRIR_INSPIRATIONS = 'https://how-pass.com';

/** Phrase affichée avant le mélange des cartes. */
export const PHRASE_INTENTION = 'Univers, donne-moi ce dont j’ai besoin aujourd’hui';

/** Chance de tirer une carte « pratique » (0.5 = 1 chance sur 2). Le reste = « action du jour ». */
export const PROBA_PRATIQUE = 0.5;

/** Une carte déjà tirée ne peut pas ressortir avant ce nombre de jours. */
export const JOURS_SANS_REPETITION = 30;

/** Son magique au retournement de la carte. */
export const SON_ACTIVE = true;

/** iPhone : jouer le son même quand le téléphone est en mode silencieux. */
export const SON_MEME_EN_MODE_SILENCIEUX = false;
