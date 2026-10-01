import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../lib/theme';

/** Petites étoiles fixes du dos de carte (positions en % de la carte). */
const STARS = [
    { x: 0.18, y: 0.2, s: 10 },
    { x: 0.8, y: 0.16, s: 8 },
    { x: 0.86, y: 0.42, s: 12 },
    { x: 0.12, y: 0.55, s: 9 },
    { x: 0.24, y: 0.8, s: 11 },
    { x: 0.76, y: 0.78, s: 9 },
    { x: 0.52, y: 0.9, s: 7 },
    { x: 0.5, y: 0.1, s: 7 },
];

/** Dos de carte : turquoise, filets dorés, lotus HOW PASS au centre. */
export const CardBack = memo(function CardBack({ width, height, k }: { width: number; height: number; k: number }) {
    const medal = width * 0.46;
    return (
        <LinearGradient
            colors={[colors.teal, '#1c8287', colors.tealDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width, height, borderRadius: 22 * k, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}
        >
            <View style={[styles.frame, { top: 10 * k, left: 10 * k, right: 10 * k, bottom: 10 * k, borderRadius: 16 * k }]} />
            <View
                style={[
                    styles.frame,
                    { top: 16 * k, left: 16 * k, right: 16 * k, bottom: 16 * k, borderRadius: 12 * k, opacity: 0.45 },
                ]}
            />

            {STARS.map((st, i) => (
                <Text
                    key={i}
                    style={{
                        position: 'absolute',
                        left: st.x * width,
                        top: st.y * height,
                        fontSize: st.s * k,
                        color: colors.goldLight,
                        opacity: 0.8,
                    }}
                >
                    ✦
                </Text>
            ))}

            {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((corner) => (
                <View
                    key={corner}
                    style={{
                        position: 'absolute',
                        [corner.startsWith('top') ? 'top' : 'bottom']: 24 * k,
                        [corner.endsWith('Left') ? 'left' : 'right']: 24 * k,
                    }}
                >
                    <Ionicons name="sparkles" size={16 * k} color={colors.goldLight} />
                </View>
            ))}

            <Text style={{ fontFamily: fonts.script, fontSize: 30 * k, lineHeight: 40 * k, color: colors.goldLight }}>
                Ici et maintenant
            </Text>

            <View
                style={{
                    width: medal,
                    height: medal,
                    borderRadius: medal / 2,
                    borderWidth: 2,
                    borderColor: colors.goldLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    marginVertical: 14 * k,
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        width: medal - 14 * k,
                        height: medal - 14 * k,
                        borderRadius: medal,
                        borderWidth: 1,
                        borderColor: 'rgba(241,225,166,0.45)',
                    }}
                />
                <Image
                    source={require('../assets/images/lotus-white.png')}
                    style={{ width: medal * 0.52, height: medal * 0.55 }}
                    resizeMode="contain"
                />
            </View>

            <Text style={{ color: colors.white, fontFamily: fonts.display, fontSize: 16 * k, letterSpacing: 6 * k }}>HOW PASS</Text>
            <Text style={{ color: colors.goldLight, fontSize: 10 * k, letterSpacing: 3 * k, marginTop: 6 * k }}>
                ⎯ TIRAGE BIEN-ÊTRE ⎯
            </Text>
        </LinearGradient>
    );
});

const styles = StyleSheet.create({
    frame: {
        position: 'absolute',
        borderWidth: 1.5,
        borderColor: 'rgba(241,225,166,0.8)',
    },
});
