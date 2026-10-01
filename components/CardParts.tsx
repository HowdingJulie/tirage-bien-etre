import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, fr } from '../lib/theme';

type IconName = keyof typeof Ionicons.glyphMap;

/** Coin haut-gauche : logo + « Ici et maintenant, tout va bien » sur fond crème arrondi. */
export function BrandCorner({ k }: { k: number }) {
    return (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            <View
                style={{
                    position: 'absolute',
                    left: -95 * k,
                    top: -120 * k,
                    width: 330 * k,
                    height: 300 * k,
                    borderRadius: 165 * k,
                    backgroundColor: colors.cream,
                }}
            />
            <View style={{ position: 'absolute', left: 14 * k, top: 14 * k, width: 150 * k, alignItems: 'center' }}>
                <Image
                    source={require('../assets/images/lotus.png')}
                    style={{ width: 46 * k, height: 49 * k }}
                    resizeMode="contain"
                />
                <Text style={{ marginTop: 2 * k, textAlign: 'center' }}>
                    <Text style={{ fontFamily: fonts.script, fontSize: 26 * k, color: colors.gold }}>Ici </Text>
                    <Text style={{ fontSize: 13 * k, color: colors.teal, fontWeight: '500' }}>et maintenant,</Text>
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.script,
                        fontSize: 25 * k,
                        lineHeight: 30 * k,
                        color: colors.teal,
                        marginTop: -6 * k,
                    }}
                >
                    tout va bien
                </Text>
                <Text style={{ color: colors.gold, fontSize: 10 * k, letterSpacing: 2 * k }}>⎯ ♥ ⎯</Text>
            </View>
        </View>
    );
}

/** Feuille décorative (contour), positionnée librement. */
export function Leaf({
    size,
    color,
    rotate,
    style,
}: {
    size: number;
    color: string;
    rotate: number;
    style: object;
}) {
    return (
        <View pointerEvents="none" style={[{ position: 'absolute', transform: [{ rotate: `${rotate}deg` }] }, style]}>
            <Ionicons name="leaf-outline" size={size} color={color} />
        </View>
    );
}

/**
 * Vague crème en bas de la photo (transition photo → contenu) :
 * un très grand cercle décalé vers la gauche dont on ne voit que le haut.
 */
export function PhotoCurve({ k, width }: { k: number; width: number }) {
    const d = width * 2.2;
    return (
        <View
            pointerEvents="none"
            style={{
                position: 'absolute',
                width: d,
                height: d,
                borderRadius: d / 2,
                left: width * 0.35 - d / 2,
                bottom: -d + 46 * k,
                backgroundColor: colors.cream,
            }}
        />
    );
}

/** Une rubrique de la carte : icône à gauche, titre en capitales, contenu. */
export function SectionRow({
    k,
    icon,
    iconColor,
    title,
    titleColor,
    children,
}: {
    k: number;
    icon: IconName;
    iconColor: string;
    title: string;
    titleColor: string;
    children: ReactNode;
}) {
    return (
        <View style={{ flexDirection: 'row', gap: 10 * k, paddingHorizontal: 18 * k, marginTop: 14 * k }}>
            <View style={{ width: 34 * k, alignItems: 'center', paddingTop: 2 * k }}>
                <Ionicons name={icon} size={28 * k} color={iconColor} />
            </View>
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        color: titleColor,
                        fontSize: 11.5 * k,
                        letterSpacing: 1.6 * k,
                        lineHeight: 16 * k,
                        fontWeight: '700',
                        marginBottom: 3 * k,
                    }}
                >
                    {fr(title.toUpperCase())}
                </Text>
                {children}
            </View>
        </View>
    );
}

export function BodyText({ k, text }: { k: number; text: string }) {
    return <Text style={{ color: colors.text, fontSize: 13 * k, lineHeight: 18.5 * k }}>{fr(text)}</Text>;
}

/** Mantra écrit à la main sur un fond « coup de pinceau » turquoise pâle. */
export function MantraBox({ k, text }: { k: number; text: string }) {
    return (
        <View
            style={{
                backgroundColor: colors.tealSoft,
                borderTopLeftRadius: 22 * k,
                borderBottomRightRadius: 22 * k,
                borderTopRightRadius: 6 * k,
                borderBottomLeftRadius: 6 * k,
                paddingVertical: 6 * k,
                paddingHorizontal: 10 * k,
                marginLeft: -4 * k,
            }}
        >
            <Text
                style={{
                    fontFamily: fonts.script,
                    fontSize: 23 * k,
                    lineHeight: 30 * k,
                    color: colors.teal,
                    textAlign: 'center',
                }}
            >
                “{fr(text)}”
            </Text>
        </View>
    );
}

/** Bouton « Découvrir … sur HowPass » qui ouvre l'URL (lib/config.ts). */
export function CtaButton({ k, label, url }: { k: number; label: string; url: string }) {
    const open = () => {
        Linking.openURL(url).catch((e) => console.warn('[tirage] URL impossible à ouvrir', url, e));
    };
    return (
        <Pressable
            onPress={open}
            accessibilityRole="link"
            style={({ pressed }) => [
                {
                    marginHorizontal: 18 * k,
                    marginTop: 18 * k,
                    marginBottom: 22 * k,
                    borderRadius: 999,
                    backgroundColor: pressed ? colors.tealDark : colors.teal,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12 * k,
                    paddingHorizontal: 16 * k,
                    gap: 6 * k,
                    shadowColor: colors.tealDark,
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 3,
                },
            ]}
        >
            <Text
                style={{
                    flex: 1,
                    color: colors.white,
                    fontSize: 11 * k,
                    letterSpacing: 1.2 * k,
                    lineHeight: 17 * k,
                    fontWeight: '600',
                    textAlign: 'center',
                }}
            >
                {fr(label.toUpperCase())}
            </Text>
            <Ionicons name="arrow-forward" size={24 * k} color={colors.white} />
        </Pressable>
    );
}

export const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: colors.cream,
    },
});
