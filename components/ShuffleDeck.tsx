import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { DECK_SCALE } from '../lib/layout';
import { CardBack } from './CardBack';

const N = 7;
/** Index de la carte « choisie » qui sort du paquet à la fin du mélange. */
const CHOSEN = 3;
const STAGGER = 25;
const START = 150;
const CYCLES = 3;
const OUT = 260;
const BACK = 260;
const FAN = 450;
const HOLD = 380;
const PICK = 420;

/** Remontée de la carte choisie (px) et son agrandissement, repris par FlipCard. */
export const CHOSEN_LIFT = 26;
export const CHOSEN_SCALE = DECK_SCALE * 1.06;

/** Instants (ms) utiles au parent : vibrations à chaque passe, fin du mélange. */
export const SHUFFLE_BEATS = Array.from({ length: CYCLES }, (_, c) => START + c * (OUT + BACK));
export const PICK_AT = START + CYCLES * (OUT + BACK) + FAN + HOLD;
export const SHUFFLE_DURATION = PICK_AT + PICK + (N - 1) * STAGGER;

type Frame = { x: number; y: number; r: number; s: number; o: number; d: number };

function buildFrames(i: number, width: number): { base: Frame; frames: Frame[] } {
    const rand = Math.random;
    const base: Frame = { x: 0, y: -i * 1.5, r: (i - CHOSEN) * 1.5, s: 1, o: 1, d: 0 };
    const frames: Frame[] = [];
    for (let c = 0; c < CYCLES; c++) {
        const dir = (i + c) % 2 === 0 ? -1 : 1;
        frames.push({
            x: dir * width * (0.28 + rand() * 0.14),
            y: -8 + rand() * 16,
            r: dir * (10 + rand() * 8),
            s: 1,
            o: 1,
            d: OUT,
        });
        frames.push({ x: rand() * 6 - 3, y: -i * 1.5, r: (rand() - 0.5) * 6, s: 1, o: 1, d: BACK });
    }
    const fan: Frame = { x: (i - CHOSEN) * width * 0.085, y: Math.abs(i - CHOSEN) * 7, r: (i - CHOSEN) * 7, s: 1, o: 1, d: FAN };
    frames.push(fan, { ...fan, d: HOLD });
    frames.push(
        i === CHOSEN
            ? { x: 0, y: -CHOSEN_LIFT, r: 0, s: 1.06, o: 1, d: PICK }
            : { x: (i - CHOSEN) * width * 0.02, y: 40, r: (i - CHOSEN) * 3, s: 0.96, o: 0, d: PICK },
    );
    return { base, frames };
}

function DeckCard({
    index,
    width,
    height,
    k,
    shuffling,
}: {
    index: number;
    width: number;
    height: number;
    k: number;
    shuffling: boolean;
}) {
    const [plan] = useState(() => buildFrames(index, width));
    const x = useSharedValue(plan.base.x);
    const y = useSharedValue(plan.base.y);
    const r = useSharedValue(plan.base.r);
    const s = useSharedValue(plan.base.s);
    const o = useSharedValue(plan.base.o);

    useEffect(() => {
        if (!shuffling) return;
        const ease = Easing.inOut(Easing.quad);
        const run = (key: 'x' | 'y' | 'r' | 's' | 'o') => {
            const steps = plan.frames.map((f) => withTiming(f[key], { duration: f.d, easing: ease }));
            return withDelay(index * STAGGER, withSequence(steps[0], ...steps.slice(1)));
        };
        x.value = run('x');
        y.value = run('y');
        r.value = run('r');
        s.value = run('s');
        o.value = run('o');
    }, [shuffling, index, plan, x, y, r, s, o]);

    const style = useAnimatedStyle(() => ({
        opacity: o.value,
        transform: [
            { translateX: x.value },
            { translateY: y.value },
            { rotate: `${r.value}deg` },
            { scale: DECK_SCALE * s.value },
        ],
    }));

    return (
        <Animated.View style={[styles.card, { width, height, marginLeft: -width / 2, marginTop: -height / 2 }, style]}>
            <View style={[styles.shadow, { borderRadius: 22 * k }]}>
                <CardBack width={width} height={height} k={k} />
            </View>
        </Animated.View>
    );
}

/**
 * Paquet de cartes (dos visibles). Au repos il flotte doucement ;
 * avec `shuffling`, il joue le mélange puis fait ressortir une carte.
 */
export function ShuffleDeck({
    width,
    height,
    k,
    offsetY,
    shuffling,
}: {
    width: number;
    height: number;
    k: number;
    offsetY: number;
    shuffling: boolean;
}) {
    const float = useSharedValue(0);

    useEffect(() => {
        if (shuffling) {
            float.value = withTiming(0, { duration: 150 });
            return;
        }
        float.value = withRepeat(
            withSequence(
                withTiming(-6, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
                withTiming(0, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
            ),
            -1,
        );
    }, [shuffling, float]);

    const floatStyle = useAnimatedStyle(() => ({ transform: [{ translateY: offsetY + float.value }] }));

    return (
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, floatStyle]}>
            <View style={styles.center}>
                {Array.from({ length: N }, (_, i) => (
                    <DeckCard key={i} index={i} width={width} height={height} k={k} shuffling={shuffling} />
                ))}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    center: { position: 'absolute', left: '50%', top: '50%', width: 0, height: 0 },
    card: { position: 'absolute', left: 0, top: 0 },
    shadow: {
        shadowColor: '#0b3c3e',
        shadowOpacity: 0.28,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
        backgroundColor: '#1c8287',
    },
});
