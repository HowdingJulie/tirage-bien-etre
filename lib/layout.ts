import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Hauteur réservée au titre au-dessus de la carte. */
export const HEADER_H = 84;
/** Hauteur réservée sous la carte (bouton / compte à rebours). */
export const FOOTER_H = 118;
/** Taille des cartes dans le paquet, avant révélation. */
export const DECK_SCALE = 0.6;

/**
 * Taille de la carte selon l'écran : ratio proche des maquettes (2:3),
 * réduite si l'écran est trop petit en hauteur.
 */
export function useCardSize() {
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const w = Math.min(width - 32, 400);
    const available = height - insets.top - insets.bottom - HEADER_H - FOOTER_H - 12;
    const h = Math.max(Math.min(w * 1.5, available), 380);
    return {
        width: Math.round(w),
        height: Math.round(h),
        /** Facteur d'échelle des textes (1 = carte de 360 px de large). */
        k: w / 360,
    };
}
