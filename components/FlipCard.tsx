import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { colors } from '../lib/theme';
import type { WellbeingCard } from '../lib/types';
import { CardBack } from './CardBack';
import { CardFront } from './CardFront';

const GROW = 650;
const FLIP = 900;
const UNFOLD = 650;
/** Moment exact où la carte est « de profil » : paillettes + son. */
export const FLIP_MIDPOINT = GROW + FLIP / 2;
export const FLIP_TOTAL = GROW + FLIP;

/**
 * La carte choisie : part de sa position dans le paquet (startY / startScale),
 * grandit au centre, se retourne en 3D, puis se déplie à la hauteur de son contenu.
 */
export function FlipCard({
    card,
    width,
    height,
    k,
    startY,
    startScale,
    onMidpoint,
    onDone,
}: {
    card: WellbeingCard;
    width: number;
    height: number;
    k: number;
    startY: number;
    startScale: number;
    onMidpoint: () => void;
    onDone: () => void;
}) {
    const rot = useSharedValue(0);
    const sc = useSharedValue(startScale);
    const ty = useSharedValue(startY);
    const h = useSharedValue(height);
    const [revealed, setRevealed] = useState(false);
    const [contentH, setContentH] = useState(0);

    const callbacks = useRef({ onMidpoint, onDone });
    useEffect(() => {
        callbacks.current = { onMidpoint, onDone };
    });

    useEffect(() => {
        sc.value = withSequence(
            withTiming(1.04, { duration: GROW, easing: Easing.out(Easing.back(1.3)) }),
            withTiming(1, { duration: FLIP, easing: Easing.inOut(Easing.cubic) }),
        );
        ty.value = withTiming(0, { duration: GROW, easing: Easing.out(Easing.cubic) });
        rot.value = withDelay(GROW, withTiming(180, { duration: FLIP, easing: Easing.inOut(Easing.cubic) }));

        const mid = setTimeout(() => callbacks.current.onMidpoint(), FLIP_MIDPOINT);
        const end = setTimeout(() => {
            setRevealed(true);
            callbacks.current.onDone();
        }, FLIP_TOTAL + 40);
        return () => {
            clearTimeout(mid);
            clearTimeout(end);
        };
    }, [rot, sc, ty]);

    // Une fois retournée, la carte se déplie pour montrer tout son contenu.
    useEffect(() => {
        if (revealed && contentH > height) {
            h.value = withTiming(contentH, { duration: UNFOLD, easing: Easing.inOut(Easing.cubic) });
        }
    }, [revealed, contentH, height, h]);

    const wrapStyle = useAnimatedStyle(() => ({
        height: h.value,
        transform: [{ translateY: ty.value }, { scale: sc.value }],
    }));
    const backStyle = useAnimatedStyle(() => ({
        opacity: rot.value < 90 ? 1 : 0,
        transform: [{ perspective: 1200 }, { rotateY: `${rot.value}deg` }],
    }));
    const frontStyle = useAnimatedStyle(() => ({
        height: h.value,
        opacity: rot.value >= 90 ? 1 : 0,
        transform: [{ perspective: 1200 }, { rotateY: `${rot.value - 180}deg` }],
    }));

    return (
        <Animated.View style={[{ width }, wrapStyle]}>
            <Animated.View
                pointerEvents="none"
                style={[styles.face, styles.shadow, { height, borderRadius: 22 * k }, backStyle]}
            >
                <CardBack width={width} height={height} k={k} />
            </Animated.View>
            <Animated.View
                pointerEvents={revealed ? 'auto' : 'none'}
                style={[styles.face, styles.shadow, { borderRadius: 22 * k }, frontStyle]}
            >
                <View style={[styles.clip, styles.fill, { borderRadius: 22 * k }]}>
                    <View onLayout={(e) => setContentH(Math.ceil(e.nativeEvent.layout.height))}>
                        <CardFront card={card} width={width} k={k} />
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

/** Carte déjà révélée (retour dans l'app le même jour) : simple apparition en fondu. */
export function StaticCard({ card, width, k }: { card: WellbeingCard; width: number; k: number }) {
    const o = useSharedValue(0);
    const s = useSharedValue(0.96);
    useEffect(() => {
        o.value = withTiming(1, { duration: 600 });
        s.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    }, [o, s]);
    const style = useAnimatedStyle(() => ({ opacity: o.value, transform: [{ scale: s.value }] }));
    return (
        <Animated.View style={[styles.shadow, { width, borderRadius: 22 * k }, style]}>
            <View style={[styles.clip, { borderRadius: 22 * k }]}>
                <CardFront card={card} width={width} k={k} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    face: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backfaceVisibility: 'hidden',
    },
    fill: { flex: 1 },
    clip: {
        overflow: 'hidden',
        backgroundColor: colors.cream,
    },
    shadow: {
        shadowColor: '#0b3c3e',
        shadowOpacity: 0.22,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
        backgroundColor: colors.cream,
    },
});
