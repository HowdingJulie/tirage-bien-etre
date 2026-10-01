import { Platform } from 'react-native';

/** Couleurs et polices de l'app — reprises de la charte HOW PASS. */
export const colors = {
    teal: '#229499',
    tealDark: '#1a7378',
    tealSoft: 'rgba(34,148,153,0.09)',
    gold: '#b8923a',
    goldLight: '#f1e1a6',
    cream: '#fbf7ef',
    creamDeep: '#f3e9d8',
    text: '#575756',
    white: '#ffffff',
} as const;

export const fonts = {
    /** Titres (police de marque HOW PASS). */
    display: 'ClementePDag-Bold',
    /** Écriture manuscrite (phrase d'intention, mantras). */
    script: 'GreatVibes_400Regular',
    /** Nom de la pratique dans le bandeau (serif élégante, comme sur la maquette). */
    title: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, "Times New Roman", serif' }),
} as const;

/**
 * Typographie française : espace insécable avant : ; ? ! » et après «,
 * pour éviter qu'un signe se retrouve seul en début de ligne.
 */
export function fr(text: string): string {
    return text.replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ');
}
