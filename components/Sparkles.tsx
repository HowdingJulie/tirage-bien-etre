import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { colors } from '../lib/theme';

const PARTICLE_COLORS = [colors.goldLight, '#e8c46a', '#ffffff', '#fff4cf', '#8fd9dc'];

type Particle = {
    angle: number;
    distance: number;
    size: number;
    delay: number;
    duration: number;
    color: string;
    shape: 'sparkle' | 'star' | 'dot';
    spin: number;
    fall: number;
};

function makeParticles(count: number, spread: number): Particle[] {
    return Array.from({ length: count }, (_, i) => {
        const r = Math.random();
        return {
            angle: (i / count) * Math.PI * 2 + Math.random() * 0.5,
            distance: spread * (0.45 + Math.random() * 0.75),
            size: 10 + Math.random() * 20,
            delay: Math.random() * 180,
            duration: 900 + Math.random() * 700,
            color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
            shape: r < 0.45 ? 'sparkle' : r < 0.7 ? 'star' : 'dot',
            spin: (Math.random() - 0.5) * 360,
            fall: 20 + Math.random() * 50,
        };
    });
}

function ParticleView({ p }: { p: Particle }) {
    const t = useSharedValue(0);

    useEffect(() => {
        t.value = withDelay(p.delay, withTiming(1, { duration: p.duration, easing: Easing.out(Easing.cubic) }));
    }, [p, t]);

    const style = useAnimatedStyle(() => {
        const dx = Math.cos(p.angle) * p.distance * t.value;
        const dy = Math.sin(p.angle) * p.distance * t.value + p.fall * t.value * t.value;
        return {
            opacity: interpolate(t.value, [0, 0.12, 0.7, 1], [0, 1, 0.9, 0]),
            transform: [
                { translateX: dx },
                { translateY: dy },
                { scale: interpolate(t.value, [0, 0.2, 1], [0.2, 1.25, 0.5]) },
                { rotate: `${p.spin * t.value}deg` },
            ],
        };
    });

    return (
        <Animated.View style={[styles.particle, style]}>
            {p.shape === 'dot' ? (
                <View
                    style={{
                        width: p.size * 0.45,
                        height: p.size * 0.45,
                        borderRadius: p.size,
                        backgroundColor: p.color,
                        shadowColor: p.color,
                        shadowOpacity: 1,
                        shadowRadius: 6,
                        shadowOffset: { width: 0, height: 0 },
                    }}
                />
            ) : (
                <Ionicons name={p.shape === 'sparkle' ? 'sparkles' : 'star'} size={p.size} color={p.color} />
            )}
        </Animated.View>
    );
}

/** Explosion de paillettes depuis le centre du conteneur (se joue une fois au montage). */
export function SparkleBurst({ count = 42, spread = 220 }: { count?: number; spread?: number }) {
    const [particles] = useState(() => makeParticles(count, spread));
    return (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.center]}>
            <View style={styles.origin}>
                {particles.map((p, i) => (
                    <ParticleView key={i} p={p} />
                ))}
            </View>
        </View>
    );
}

/**
 * Halo doré derrière la carte : flash au retournement, puis respiration lente.
 * `active` = false → invisible.
 */
export function GlowHalo({ size, active }: { size: number; active: boolean }) {
    const o = useSharedValue(0);
    const s = useSharedValue(0.8);

    useEffect(() => {
        if (!active) {
            o.value = withTiming(0, { duration: 200 });
            return;
        }
        o.value = withSequence(
            withTiming(1, { duration: 280 }),
            withTiming(0.55, { duration: 900 }),
            withRepeat(withSequence(withTiming(0.35, { duration: 1800 }), withTiming(0.55, { duration: 1800 })), -1),
        );
        s.value = withSequence(
            withTiming(1.25, { duration: 380, easing: Easing.out(Easing.quad) }),
            withTiming(1.05, { duration: 900 }),
            withRepeat(withSequence(withTiming(1.12, { duration: 1800 }), withTiming(1.05, { duration: 1800 })), -1),
        );
    }, [active, o, s]);

    const style = useAnimatedStyle(() => ({ opacity: o.value, transform: [{ scale: s.value }] }));

    return (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.center]}>
            <Animated.View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
                {[1, 0.78, 0.56].map((f, i) => (
                    <View
                        key={i}
                        style={{
                            position: 'absolute',
                            width: size * f,
                            height: size * f,
                            borderRadius: size,
                            backgroundColor: colors.goldLight,
                            opacity: 0.16 + i * 0.12,
                        }}
                    />
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { alignItems: 'center', justifyContent: 'center' },
    origin: { width: 0, height: 0, alignItems: 'center', justifyContent: 'center' },
    particle: { position: 'absolute' },
});
