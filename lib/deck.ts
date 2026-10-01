import type { ImageSourcePropType } from 'react-native';
import { ACTIONS } from './actions';
import { URL_DECOUVRIR_INSPIRATIONS, URL_DECOUVRIR_PRATIQUE } from './config';
import { PRACTICES } from './practices';
import type { Category, WellbeingCard } from './types';

/** Photo affichée en haut de la carte, selon sa catégorie. */
export const CATEGORY_IMAGES: Record<Category, ImageSourcePropType> = {
    souffle: require('../assets/images/souffle.jpg'),
    meditation: require('../assets/images/meditation.jpg'),
    soin: require('../assets/images/soin.jpg'),
    mouvement: require('../assets/images/mouvement.jpg'),
    nature: require('../assets/images/nature.jpg'),
    eau: require('../assets/images/eau.jpg'),
    accompagnement: require('../assets/images/accompagnement.jpg'),
    cocon: require('../assets/images/cocon.jpg'),
    lien: require('../assets/images/lien.jpg'),
};

/** Phrases d'accroche des cartes pratiques (une est choisie selon la carte). */
const DEFAULT_HOOKS = [
    'Et si aujourd’hui était l’occasion de découvrir une nouvelle façon de prendre un moment pour toi ?',
    'Et si tu offrais à ton corps et à ton esprit une parenthèse rien qu’à toi ?',
    'Aujourd’hui, l’univers t’invite à explorer un nouveau chemin vers le mieux-être.',
    'Et si c’était le bon moment pour essayer quelque chose de nouveau ?',
    'Une pratique à découvrir, comme une porte qui s’ouvre vers plus de sérénité.',
    'Offre-toi la curiosité de découvrir une autre façon de te faire du bien.',
];

export const ALL_CARDS: WellbeingCard[] = [...PRACTICES, ...ACTIONS];

const BY_ID = new Map(ALL_CARDS.map((c) => [c.id, c]));

export function findCard(id: string): WellbeingCard | undefined {
    return BY_ID.get(id);
}

export function getCardImage(card: WellbeingCard): ImageSourcePropType {
    return card.image ?? CATEGORY_IMAGES[card.category];
}

/** Petit hash stable pour choisir toujours la même accroche pour une carte. */
function hash(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
}

export function getHook(card: WellbeingCard): string {
    if (card.kind === 'pratique' && card.hook) return card.hook;
    return DEFAULT_HOOKS[hash(card.id) % DEFAULT_HOOKS.length];
}

/** URL du bouton « Découvrir… » : URL de la carte, sinon celle de lib/config.ts. */
export function getCardUrl(card: WellbeingCard): string {
    if (card.url) return card.url;
    if (card.kind === 'pratique') {
        return URL_DECOUVRIR_PRATIQUE.replace('{pratique}', encodeURIComponent(card.name));
    }
    return URL_DECOUVRIR_INSPIRATIONS;
}
