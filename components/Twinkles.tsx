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
import { colors } from '../lib/theme';

type StarData = { x: number; y: number; size: number; delay: number; duration: number; color: string };

function TwinkleStar({ star }: { star: StarData }) {
    const t = useSharedValue(0);

    useEffect(() => {
        t.value = withDelay(
            star.delay,
            withRepeat(
                withSequence(
                    withTiming(1, { duration: star.duration, easing: Easing.inOut(Easing.sin) }),
                    withTiming(0, { duration: star.duration, easing: Easing.inOut(Easing.sin) }),
                ),
                -1,
            ),
        );
    }, [star, t]);

    const style = useAnimatedStyle(() => ({
        opacity: t.value * 0.9,
        transform: [{ scale: 0.5 + t.value * 0.6 }],
    }));

    return (
        <Animated.Text
            style={[
                { position: 'absolute', left: `${star.x}%`, top: `${star.y}%`, fontSize: star.size, color: star.color },
                style,
            ]}
        >
            ✦
        </Animated.Text>
    );
}

/** Petites étoiles qui scintillent en fond d'écran. */
export function Twinkles({ count = 16 }: { count?: number }) {
    const [stars] = useState<StarData[]>(() =>
        Array.from({ length: count }, (_, i) => ({
            x: Math.random() * 94 + 2,
            y: Math.random() * 94 + 2,
            size: 8 + Math.random() * 10,
            delay: Math.random() * 2500,
            duration: 1200 + Math.random() * 1600,
            color: i % 3 === 0 ? '#8fd9dc' : colors.gold,
        })),
    );
    return (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            {stars.map((s, i) => (
                <TwinkleStar key={i} star={s} />
            ))}
        </View>
    );
}
