import type { ImageSourcePropType } from 'react-native';

/**
 * Catégorie d'une carte : elle choisit la photo affichée en haut de la carte
 * (voir CATEGORY_IMAGES dans lib/deck.ts).
 */
export type Category =
    | 'souffle'
    | 'meditation'
    | 'soin'
    | 'mouvement'
    | 'nature'
    | 'eau'
    | 'accompagnement'
    | 'cocon'
    | 'lien';

/** Carte « pratique » (modèle de gauche : découvrir une pratique bien-être). */
export type PracticeCard = {
    kind: 'pratique';
    id: string;
    /** Nom affiché dans le bandeau, ex : « Sophrologie ». */
    name: string;
    /** Nom avec son article, pour « Qu'est-ce que … ? », ex : « la sophrologie ». */
    withArticle: string;
    category: Category;
    /** Réponse à « Qu'est-ce que … ? ». */
    what: string;
    /** Ton mantra du jour. */
    mantra: string;
    /** Ton exercice en 3 minutes. */
    exercise: string;
    /** Phrase d'accroche (facultatif — sinon une phrase par défaut est choisie). */
    hook?: string;
    /** URL propre à cette carte (facultatif). */
    url?: string;
    /** Photo propre à cette carte (facultatif), ex : require('../assets/images/ma-photo.jpg'). */
    image?: ImageSourcePropType;
};

/** Carte « action du jour » (modèle de droite : une action à faire aujourd'hui). */
export type ActionCard = {
    kind: 'action';
    id: string;
    /** Affiché après « Aujourd'hui : », ex : « 20 minutes dans la nature sans téléphone. » */
    title: string;
    category: Category;
    /** Pourquoi ? */
    why: string;
    /** Ton mantra du jour. */
    mantra: string;
    /** Petite astuce. */
    tip: string;
    url?: string;
    image?: ImageSourcePropType;
};

export type WellbeingCard = PracticeCard | ActionCard;
