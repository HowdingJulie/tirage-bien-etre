import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getCardImage, getCardUrl, getHook } from '../lib/deck';
import { colors, fonts, fr } from '../lib/theme';
import type { PracticeCard } from '../lib/types';
import {
    BodyText,
    BrandCorner,
    CtaButton,
    Leaf,
    MantraBox,
    PhotoCurve,
    SectionRow,
    cardStyles,
} from './CardParts';

/** Taille du titre selon sa longueur, pour qu'il tienne dans le bandeau. */
function titleSize(name: string, k: number) {
    if (name.length <= 11) return 31 * k;
    if (name.length <= 16) return 24 * k;
    return 20 * k;
}

/** Carte « pratique » — modèle de gauche. */
export function PracticeCardFront({
    card,
    width,
    k,
}: {
    card: PracticeCard;
    width: number;
    k: number;
}) {
    const photoH = 235 * k;
    return (
        <View style={[cardStyles.card, { width }]}>
            {/* Photo + logo */}
            <View style={{ height: photoH, overflow: 'hidden' }}>
                <Image source={getCardImage(card)} style={StyleSheet.absoluteFill} resizeMode="cover" />
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(251,247,239,0.35)']}
                    style={StyleSheet.absoluteFill}
                />
                <BrandCorner k={k} />
                <Leaf size={48 * k} color="rgba(255,255,255,0.85)" rotate={-25} style={{ right: 10 * k, top: 40 * k }} />
                <Leaf size={36 * k} color="rgba(255,255,255,0.7)" rotate={20} style={{ right: 36 * k, top: 90 * k }} />
                <PhotoCurve k={k} width={width} />
            </View>

            {/* Bandeau titre */}
            <View style={{ marginTop: -62 * k, alignItems: 'center' }}>
                <View
                    style={{
                        backgroundColor: colors.teal,
                        marginHorizontal: 14 * k,
                        paddingHorizontal: 14 * k,
                        paddingTop: 6 * k,
                        paddingBottom: 8 * k,
                        borderTopLeftRadius: 34 * k,
                        borderBottomRightRadius: 34 * k,
                        borderTopRightRadius: 10 * k,
                        borderBottomLeftRadius: 10 * k,
                        transform: [{ rotate: '-2deg' }],
                        alignItems: 'center',
                        alignSelf: 'stretch',
                    }}
                >
                    <Image
                        source={require('../assets/images/lotus-white.png')}
                        style={{ width: 22 * k, height: 23 * k, opacity: 0.9 }}
                        resizeMode="contain"
                    />
                    <Text
                        style={{
                            fontFamily: fonts.title,
                            fontSize: titleSize(card.name, k),
                            lineHeight: titleSize(card.name, k) * 1.25,
                            color: colors.white,
                            letterSpacing: 1.5 * k,
                            textAlign: 'center',
                        }}
                    >
                        {card.name.toUpperCase()}
                    </Text>
                </View>
            </View>

            {/* Accroche */}
            <Text
                style={{
                    color: colors.teal,
                    fontSize: 14.5 * k,
                    lineHeight: 20 * k,
                    fontWeight: '600',
                    textAlign: 'center',
                    paddingHorizontal: 22 * k,
                    marginTop: 12 * k,
                }}
            >
                {fr(getHook(card))}
            </Text>

            <SectionRow
                k={k}
                icon="leaf-outline"
                iconColor={colors.gold}
                title={`Qu’est-ce que ${card.withArticle} ?`}
                titleColor={colors.gold}
            >
                <BodyText k={k} text={card.what} />
            </SectionRow>

            <SectionRow k={k} icon="heart-outline" iconColor={colors.teal} title="Ton mantra du jour" titleColor={colors.teal}>
                <MantraBox k={k} text={card.mantra} />
            </SectionRow>

            <SectionRow
                k={k}
                icon="sunny-outline"
                iconColor={colors.gold}
                title="Ton exercice en 3 minutes"
                titleColor={colors.gold}
            >
                <BodyText k={k} text={card.exercise} />
            </SectionRow>

            <CtaButton k={k} label={'Découvrir cette pratique\nsur HowPass'} url={getCardUrl(card)} />
        </View>
    );
}
