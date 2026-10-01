import type { WellbeingCard } from '../lib/types';
import { ActionCardFront } from './ActionCardFront';
import { PracticeCardFront } from './PracticeCardFront';

/** Face visible de la carte, selon son type. */
export function CardFront(props: { card: WellbeingCard; width: number; k: number }) {
    const { card, ...size } = props;
    return card.kind === 'pratique' ? (
        <PracticeCardFront card={card} {...size} />
    ) : (
        <ActionCardFront card={card} {...size} />
    );
}
