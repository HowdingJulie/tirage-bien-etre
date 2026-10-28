import { useEffect, useRef, useState, type CSSProperties } from 'react';
import logo from './assets/brand/howpass.png';
import { CardOrnaments } from './components/CardOrnaments';
import { CardFace } from './components/CardFace';
import { Icon } from './components/Icon';
import { PHRASE_INTENTION } from './lib/config';
import { drawTodayCard, loadTodayCard, msUntilMidnight, todayKey } from './lib/draw';
import { playMagicSound, prepareMagicSound } from './lib/feedback';

type Phase = 'intro' | 'shuffling' | 'revealing' | 'today';
const formatDate = () => new Intl.DateTimeFormat('fr-CH', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
function remainingLabel(ms: number) {
    const minutes = Math.max(0, Math.floor(ms / 60000));
    return minutes < 1 ? 'moins d’une minute' : minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')}`;
}

function CardBack() {
    return <span className="card-back"><CardOrnaments /><span className="back-emblem" /></span>;
}

export default function App() {
    const [card, setCard] = useState(() => loadTodayCard());
    const [phase, setPhase] = useState<Phase>(card ? 'today' : 'intro');
    const [remaining, setRemaining] = useState(msUntilMidnight);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const currentDay = useRef(todayKey());
    const drawInProgress = useRef(false);
    const soundAtReveal = useRef(true);
    const resultHeading = useRef<HTMLHeadingElement>(null);
    const isResult = phase === 'revealing' || phase === 'today';

    useEffect(() => {
        const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
        const refresh = () => {
            const nextDay = todayKey();
            if (nextDay !== currentDay.current) {
                clearTimers();
                currentDay.current = nextDay;
                drawInProgress.current = false;
                setCard(loadTodayCard());
                setPhase(loadTodayCard() ? 'today' : 'intro');
            }
            setRemaining(msUntilMidnight());
        };
        const sync = () => {
            refresh();
            if (drawInProgress.current) return;
            const saved = loadTodayCard();
            if (saved) { setCard(saved); setPhase('today'); }
        };
        const interval = setInterval(refresh, 15000);
        window.addEventListener('focus', sync);
        window.addEventListener('storage', sync);
        document.addEventListener('visibilitychange', sync);
        return () => {
            clearTimers();
            clearInterval(interval);
            window.removeEventListener('focus', sync);
            window.removeEventListener('storage', sync);
            document.removeEventListener('visibilitychange', sync);
        };
    }, []);

    function startDraw() {
        if (drawInProgress.current || phase !== 'intro') return;
        drawInProgress.current = true;
        soundAtReveal.current = soundEnabled;
        if (soundEnabled) prepareMagicSound();
        // Retain the local date if the tab was idle over midnight.
        currentDay.current = todayKey();
        const drawn = drawTodayCard();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setPhase('shuffling');
        timers.current.push(setTimeout(() => {
            setCard(drawn);
            setPhase('revealing');
            if (soundAtReveal.current) void playMagicSound();
            timers.current.push(setTimeout(() => {
                setPhase('today');
                drawInProgress.current = false;
                resultHeading.current?.focus({ preventScroll: true });
            }, reduced ? 0 : 750));
        }, reduced ? 100 : 2100));
    }

    return <>
        <a className="skip-link" href="#tirage">Aller au tirage</a>
        <header className="site-header"><div className="header-inner">
            <a className="brand-link" href="https://how-pass.com" aria-label="HOWPASS, site principal"><img src={logo} alt="HOWPASS" width="152" height="37" /></a>
            <p className="header-caption">Ici et maintenant, tout va bien</p>
            <a className="button button-olive header-cta" href="https://how-pass.com" target="_blank" rel="noopener noreferrer"><span>Découvrir HowPass</span><Icon name="arrow" /></a>
        </div></header>
        <main className={`hero ${isResult ? 'has-result' : ''}`}>
            <div className="hero-inner">
                <div className="hero-copy">
                    <p className="eyebrow on-photo"><Icon name="leaf" />Votre rendez-vous bien-être</p>
                    <h1 className="on-photo">{isResult ? 'Une inspiration pour votre journée' : 'Un instant pour vous. Une carte pour aujourd’hui.'}</h1>
                    <p className="lead on-photo">{isResult ? 'Accueillez le message de votre carte et faites une petite place au bien-être, à votre rythme.' : 'Prenez une respiration, posez votre intention et laissez-vous guider par votre carte bien-être du jour.'}</p>
                    <ol className="steps"><li>Respirez et posez votre intention</li><li>Découvrez votre carte du jour</li><li>Offrez-vous un moment de bien-être</li></ol>
                </div>
                <section id="tirage" className="ritual-panel" aria-labelledby="ritual-title" aria-busy={phase === 'shuffling'}>
                    <div className="ritual-header"><div><h2 id="ritual-title" ref={resultHeading} tabIndex={-1}>{isResult ? 'Votre carte du jour' : 'Le tirage du jour'}</h2><p className="date">{formatDate()}</p></div>
                        {!isResult && <button className="sound-toggle" type="button" aria-label={soundEnabled ? 'Désactiver le son' : 'Activer le son'} aria-pressed={soundEnabled} onClick={() => setSoundEnabled(v => !v)}><Icon name={soundEnabled ? 'sound' : 'muted'} /></button>}
                    </div>
                    <div className={`card-stage is-${phase}`}>
                        {!isResult ? <>
                            <p className="intention">{PHRASE_INTENTION}</p>
                            <button className="deck-button" type="button" aria-label="Tirer ma carte" disabled={phase !== 'intro'} onClick={startDraw}>
                                <span className="deck" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <span className="deck-layer" key={i} style={{ '--i': i, '--rotation': `${(i - 3) * 1.5}deg`, '--shift': `${(i % 2 ? -1 : 1) * (i * 9 + 24)}px` } as CSSProperties}><CardBack /></span>)}</span>
                            </button>
                        </> : card && <div className="result-card"><CardFace card={card} /></div>}
                    </div>
                    <div className="ritual-footer">
                        <div className="draw-status" role="status" aria-live="polite">{phase === 'shuffling' ? 'Votre carte se prépare…' : phase === 'revealing' ? 'Votre carte est prête.' : ''}</div>
                        {phase === 'intro' && <><button className="button draw-button" type="button" onClick={startDraw}><Icon name="sparkles" />Je tire ma carte<Icon name="sparkles" /></button><p className="draw-hint">Une carte par jour, à découvrir à votre rythme</p></>}
                        {phase === 'today' && <div className="tomorrow"><p>À demain pour une nouvelle inspiration</p><span>Prochain tirage dans {remainingLabel(remaining)}</span></div>}
                        {isResult && <p className="disclaimer">Ces propositions de bien-être ne remplacent pas un avis médical.</p>}
                    </div>
                </section>
            </div>
        </main>
        <footer className="site-footer"><img src={logo} alt="HOWPASS" width="100" height="24" /><p>Une carte par jour · Un moment pour vous</p><small>Ces propositions de bien-être ne remplacent pas un avis médical.</small></footer>
    </>;
}
