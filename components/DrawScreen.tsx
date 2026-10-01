import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { AppState, Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PHRASE_INTENTION } from '../lib/config';
import { drawTodayCard, msUntilMidnight, resetTodayForDev, todayKey } from '../lib/draw';
import { haptic, useMagicSound } from '../lib/feedback';
import { FOOTER_H, HEADER_H, useCardSize } from '../lib/layout';
import { colors, fonts } from '../lib/theme';
import type { WellbeingCard } from '../lib/types';
import { FlipCard, StaticCard } from './FlipCard';
import { CHOSEN_LIFT, CHOSEN_SCALE, PICK_AT, SHUFFLE_BEATS, SHUFFLE_DURATION, ShuffleDeck } from './ShuffleDeck';
import { GlowHalo, SparkleBurst } from './Sparkles';
import { Twinkles } from './Twinkles';

/**
 * intro      → phrase d'intention + paquet qui flotte + bouton
 * shuffling  → mélange des cartes
 * revealing  → la carte choisie grandit et se retourne (paillettes + son)
 * revealed   → carte du jour affichée
 * today      → retour dans l'app le même jour : carte du jour directement
 */
type Phase = 'intro' | 'shuffling' | 'revealing' | 'revealed' | 'today';

const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MONTHS = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

function frenchDate(d = new Date()) {
    return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function formatRemaining(ms: number) {
    const totalMin = Math.max(0, Math.floor(ms / 60_000));
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    if (totalMin < 1) return 'moins d’une minute';
    if (h === 0) return `${m} min`;
    return `${h} h ${String(m).padStart(2, '0')}`;
}

export function DrawScreen({ initialCard }: { initialCard: WellbeingCard | null }) {
    const insets = useSafeAreaInsets();
    const { height: winH } = useWindowDimensions();
    const { width, height, k } = useCardSize();
    const deckOffset = Math.round(height * 0.14);

    const [phase, setPhase] = useState<Phase>(initialCard ? 'today' : 'intro');
    const [card, setCard] = useState<WellbeingCard | null>(initialCard);
    const [glow, setGlow] = useState(initialCard !== null);
    const [burst, setBurst] = useState(0);
    const pendingCard = useRef<Promise<WellbeingCard> | null>(null);
    const playMagic = useMagicSound();

    const isResult = phase === 'revealing' || phase === 'revealed' || phase === 'today';
    const showDeck = phase === 'intro' || phase === 'shuffling';

    const startDraw = () => {
        if (phase !== 'intro') return;
        haptic('medium');
        // Le tirage est enregistré tout de suite : fermer l'app pendant l'animation ne permet pas de retirer.
        pendingCard.current = drawTodayCard();
        setPhase('shuffling');
    };

    // Déroulé du mélange : vibrations à chaque passe, puis révélation.
    useEffect(() => {
        if (phase !== 'shuffling') return;
        let cancelled = false;
        const timers = SHUFFLE_BEATS.map((t) => setTimeout(() => haptic('light'), t));
        timers.push(setTimeout(() => haptic('medium'), PICK_AT));
        timers.push(
            setTimeout(async () => {
                const drawn = await (pendingCard.current ?? drawTodayCard());
                if (cancelled) return;
                setCard(drawn);
                setPhase('revealing');
            }, SHUFFLE_DURATION),
        );
        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [phase]);

    const onMidpoint = () => {
        playMagic();
        haptic('success');
        setGlow(true);
        setBurst((b) => b + 1);
    };

    const backToIntro = () => {
        pendingCard.current = null;
        setCard(null);
        setGlow(false);
        setBurst(0);
        setPhase('intro');
    };

    const resetForDev = async () => {
        await resetTodayForDev();
        backToIntro();
    };

    return (
        <View style={styles.root}>
            <LinearGradient colors={[colors.cream, colors.creamDeep]} style={StyleSheet.absoluteFill} />
            <Twinkles />

            <ScrollView
                contentContainerStyle={[
                    styles.scroll,
                    { minHeight: winH, paddingTop: insets.top, paddingBottom: insets.bottom + 8 },
                ]}
                scrollEnabled={phase === 'revealed' || phase === 'today'}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
            >
                <Header isResult={isResult} k={k} />

                {/* Scène : paquet → carte */}
                <View style={[styles.stage, { minHeight: height }]}>
                    <GlowHalo size={width * 1.3} active={glow} />

                    {showDeck && (
                        <ShuffleDeck
                            width={width}
                            height={height}
                            k={k}
                            offsetY={deckOffset}
                            shuffling={phase === 'shuffling'}
                        />
                    )}

                    {showDeck && <IntentionPhrase k={k} maxHeight={height * 0.34} />}

                    {showDeck && (
                        <Pressable
                            onPress={startDraw}
                            disabled={phase !== 'intro'}
                            accessibilityLabel="Tirer ma carte"
                            style={[
                                styles.deckHit,
                                { top: height * 0.34, width: width * 0.7, height: height * 0.62 },
                            ]}
                        />
                    )}

                    {(phase === 'revealing' || phase === 'revealed') && card && (
                        <FlipCard
                            card={card}
                            width={width}
                            height={height}
                            k={k}
                            startY={deckOffset - CHOSEN_LIFT}
                            startScale={CHOSEN_SCALE}
                            onMidpoint={onMidpoint}
                            onDone={() => setPhase('revealed')}
                        />
                    )}

                    {phase === 'today' && card && <StaticCard card={card} width={width} k={k} />}

                    {burst > 0 && <SparkleBurst key={burst} count={60} spread={width * 0.95} />}
                </View>

                <View style={[styles.footer, { minHeight: FOOTER_H }]}>
                    {phase === 'intro' && <DrawButton k={k} onPress={startDraw} />}
                    {phase === 'shuffling' && (
                        <Text style={[styles.shuffleText, { fontSize: 26 * k }]}>L’univers mélange les cartes…</Text>
                    )}
                    {(phase === 'revealed' || phase === 'today') && (
                        <ComeBackTomorrow k={k} onNewDay={backToIntro} />
                    )}
                    {__DEV__ && (phase === 'revealed' || phase === 'today') && (
                        <Pressable onPress={resetForDev} style={styles.devBtn}>
                            <Text style={styles.devText}>↺ Réinitialiser le tirage (mode dev)</Text>
                        </Pressable>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

/** En-tête : « Ici et maintenant… » avant le tirage, « Ta carte du jour » après. */
function Header({ isResult, k }: { isResult: boolean; k: number }) {
    const t = useSharedValue(isResult ? 1 : 0);
    useEffect(() => {
        t.value = withTiming(isResult ? 1 : 0, { duration: 500 });
    }, [isResult, t]);
    const introStyle = useAnimatedStyle(() => ({ opacity: 1 - t.value }));
    const resultStyle = useAnimatedStyle(() => ({ opacity: t.value }));

    return (
        <View style={{ height: HEADER_H, width: '100%' }}>
            <Animated.View style={[styles.headerLayer, introStyle]} pointerEvents="none">
                <Image source={require('../assets/images/lotus.png')} style={{ width: 34, height: 36 }} resizeMode="contain" />
                <Text style={[styles.tagline, { fontSize: 24 * Math.min(k, 1.1) }]}>Ici et maintenant, tout va bien</Text>
            </Animated.View>
            <Animated.View style={[styles.headerLayer, resultStyle]} pointerEvents="none">
                <Text style={[styles.resultTitle, { fontSize: 36 * Math.min(k, 1.1) }]}>Ta carte du jour</Text>
                <Text style={styles.dateText}>{frenchDate().toUpperCase()}</Text>
            </Animated.View>
        </View>
    );
}

/** « Univers, donne-moi ce dont j'ai besoin aujourd'hui » — apparition mot à mot. */
function IntentionPhrase({ k, maxHeight }: { k: number; maxHeight: number }) {
    const [first, ...rest] = PHRASE_INTENTION.split(' ');
    const size = Math.min(34 * k, maxHeight / 3.6);
    return (
        <View pointerEvents="none" style={[styles.phrase, { height: maxHeight }]}>
            <View style={styles.phraseRow}>
                <FadeWord word={first} delay={250} style={{ fontSize: size * 1.25, lineHeight: size * 1.55, color: colors.gold }} />
            </View>
            <View style={styles.phraseRow}>
                {rest.map((w, i) => (
                    <FadeWord
                        key={`${w}-${i}`}
                        word={w}
                        delay={650 + i * 160}
                        style={{ fontSize: size, lineHeight: size * 1.35, color: colors.teal }}
                    />
                ))}
            </View>
        </View>
    );
}

function FadeWord({ word, delay, style }: { word: string; delay: number; style: object }) {
    const t = useSharedValue(0);
    useEffect(() => {
        t.value = withDelay(delay, withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) }));
    }, [delay, t]);
    const anim = useAnimatedStyle(() => ({
        opacity: t.value,
        transform: [{ translateY: (1 - t.value) * 10 }],
    }));
    return <Animated.Text style={[styles.word, style, anim]}>{word} </Animated.Text>;
}

function DrawButton({ k, onPress }: { k: number; onPress: () => void }) {
    const appear = useSharedValue(0);
    const pulse = useSharedValue(1);
    useEffect(() => {
        appear.value = withDelay(1800, withTiming(1, { duration: 700 }));
        pulse.value = withDelay(
            2500,
            withRepeat(
                withSequence(
                    withTiming(1.04, { duration: 1100, easing: Easing.inOut(Easing.sin) }),
                    withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.sin) }),
                ),
                -1,
            ),
        );
    }, [appear, pulse]);
    const style = useAnimatedStyle(() => ({
        opacity: appear.value,
        transform: [{ translateY: (1 - appear.value) * 12 }, { scale: pulse.value }],
    }));

    return (
        <Animated.View style={[{ alignItems: 'center' }, style]}>
            <Pressable
                onPress={onPress}
                accessibilityRole="button"
                style={({ pressed }) => [styles.drawBtn, pressed && { backgroundColor: colors.tealDark }]}
            >
                <Ionicons name="sparkles" size={20} color={colors.goldLight} />
                <Text style={[styles.drawBtnText, { fontSize: 15 * Math.min(k, 1.1) }]}>JE TIRE MA CARTE</Text>
                <Ionicons name="sparkles" size={20} color={colors.goldLight} />
            </Pressable>
            <Text style={styles.drawHint}>Respire, pense à ta journée… puis touche le paquet</Text>
        </Animated.View>
    );
}

/** « Reviens demain » + compte à rebours jusqu'à minuit. */
function ComeBackTomorrow({ k, onNewDay }: { k: number; onNewDay: () => void }) {
    const [remaining, setRemaining] = useState(() => msUntilMidnight());
    const day = useRef(todayKey());
    const newDay = useRef(onNewDay);
    useEffect(() => {
        newDay.current = onNewDay;
    });

    useEffect(() => {
        const tick = () => {
            if (todayKey() !== day.current) {
                newDay.current();
                return;
            }
            setRemaining(msUntilMidnight());
        };
        const id = setInterval(tick, 15_000);
        const sub = AppState.addEventListener('change', (s) => s === 'active' && tick());
        return () => {
            clearInterval(id);
            sub.remove();
        };
    }, []);

    return (
        <View style={{ alignItems: 'center', gap: 4, paddingHorizontal: 24 }}>
            <Text style={[styles.tomorrow, { fontSize: 25 * Math.min(k, 1.1) }]}>Reviens demain pour un nouveau tirage ✨</Text>
            <Text style={styles.countdown}>Prochain tirage dans {formatRemaining(remaining)}</Text>
            <Text style={styles.disclaimer}>
                Ces propositions de bien-être ne remplacent pas un avis médical.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.cream },
    scroll: { alignItems: 'center' },
    stage: { width: '100%', alignItems: 'center', justifyContent: 'center' },
    deckHit: { position: 'absolute', alignSelf: 'center' },
    headerLayer: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
    tagline: { fontFamily: fonts.script, color: colors.teal, marginTop: 2 },
    resultTitle: { fontFamily: fonts.script, color: colors.teal, lineHeight: 46 },
    dateText: { color: colors.gold, fontSize: 11, letterSpacing: 2.5, fontWeight: '600' },
    phrase: {
        position: 'absolute',
        top: 0,
        left: 16,
        right: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    phraseRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    word: { fontFamily: fonts.script, textAlign: 'center' },
    footer: { width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 10 },
    shuffleText: { fontFamily: fonts.script, color: colors.teal },
    drawBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: colors.teal,
        paddingVertical: 15,
        paddingHorizontal: 28,
        borderRadius: 999,
        shadowColor: colors.tealDark,
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    drawBtnText: { color: colors.white, fontWeight: '700', letterSpacing: 2 },
    drawHint: { marginTop: 10, color: colors.text, fontSize: 12.5, opacity: 0.8, textAlign: 'center' },
    tomorrow: { fontFamily: fonts.script, color: colors.teal, textAlign: 'center', lineHeight: 34 },
    countdown: { color: colors.gold, fontSize: 12.5, letterSpacing: 1, fontWeight: '600' },
    disclaimer: { color: colors.text, opacity: 0.6, fontSize: 10.5, textAlign: 'center', marginTop: 4 },
    devBtn: { marginTop: 10, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, borderColor: '#ccc' },
    devText: { color: '#888', fontSize: 11 },
});
