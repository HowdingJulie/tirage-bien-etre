import logo from '../assets/brand/howpass.png';
import { getCardImage, getCardUrl, getHook } from '../lib/deck';
import type { WellbeingCard } from '../lib/types';
import { Icon } from './Icon';
import { CardOrnaments } from './CardOrnaments';

export function CardFace({ card }: { card: WellbeingCard }) {
    return <article className="wellbeing-card" aria-label={card.kind === 'pratique' ? card.name : card.title}>
        <CardOrnaments />
        <p className="card-daily-heading">Votre carte du jour</p>
        <div className="card-photo"><img className="card-photo-image" src={getCardImage(card)} alt="" decoding="async" /></div>
        <h2 className="card-message-title">{card.kind === 'pratique' ? card.name : <><span>Aujourd’hui :</span>{card.title}</>}</h2>
        {card.kind === 'pratique' && <p className="card-hook">{getHook(card)}</p>}
        <div className="card-content">
            <section className="card-section olive"><Icon name="leaf" /><div><h3>{card.kind === 'pratique' ? `Qu’est-ce que ${card.withArticle} ?` : 'Pourquoi ?'}</h3><p>{card.kind === 'pratique' ? card.what : card.why}</p></div></section>
            <section className="card-section"><Icon name="heart" /><div><h3>Ton mantra du jour</h3><blockquote>“{card.mantra}”</blockquote></div></section>
            <section className="card-section olive"><Icon name={card.kind === 'pratique' ? 'sun' : 'bulb'} /><div><h3>{card.kind === 'pratique' ? 'Ton exercice en 3 minutes' : 'Petite astuce'}</h3><p>{card.kind === 'pratique' ? card.exercise : card.tip}</p></div></section>
            <a className="button card-cta" href={getCardUrl(card)} target="_blank" rel="noopener noreferrer"><span>{card.kind === 'pratique' ? 'Découvrir cette pratique' : 'Découvrir d’autres inspirations'}<br />sur HowPass</span><Icon name="arrow" /></a>
            <img className="card-signature" src={logo} alt="HOWPASS" width="112" height="27" />
        </div>
    </article>;
}
