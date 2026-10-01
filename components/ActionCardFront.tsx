import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getCardImage, getCardUrl } from '../lib/deck';
import { colors, fonts, fr } from '../lib/theme';
import type { ActionCard } from '../lib/types';
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

/** Carte « action du jour » — modèle de droite. */
export function ActionCardFront({
    card,
    width,
    k,
}: {
    card: ActionCard;
    width: number;
    k: number;
}) {
    const photoH = 320 * k;
    return (
        <View style={[cardStyles.card, { width }]}>
            {/* Photo + logo + « Aujourd'hui : … » */}
            <View style={{ height: photoH, overflow: 'hidden' }}>
                <Image source={getCardImage(card)} style={StyleSheet.absoluteFill} resizeMode="cover" />
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(251,247,239,0.25)']}
                    style={StyleSheet.absoluteFill}
                />
                <BrandCorner k={k} />
                <Leaf size={44 * k} color="rgba(255,255,255,0.85)" rotate={25} style={{ right: 12 * k, top: 22 * k }} />
                <Leaf size={32 * k} color="rgba(255,255,255,0.7)" rotate={-15} style={{ right: 44 * k, top: 76 * k }} />
                <PhotoCurve k={k} width={width} />

                {/* Bande « papier » manuscrite */}
                <View
                    style={{
                        position: 'absolute',
                        left: 34 * k,
                        right: 8 * k,
                        top: 162 * k,
                        backgroundColor: 'rgba(251,247,239,0.93)',
                        borderTopLeftRadius: 8 * k,
                        borderBottomLeftRadius: 30 * k,
                        borderTopRightRadius: 30 * k,
                        borderBottomRightRadius: 8 * k,
                        paddingVertical: 8 * k,
                        paddingHorizontal: 14 * k,
                        transform: [{ rotate: '-5deg' }],
                        shadowColor: '#000',
                        shadowOpacity: 0.08,
                        shadowRadius: 6,
                        shadowOffset: { width: 0, height: 2 },
                    }}
                >
                    <Text
                        style={{
                            fontFamily: fonts.script,
                            fontSize: 26 * k,
                            lineHeight: 32 * k,
                            color: colors.teal,
                            textAlign: 'center',
                        }}
                    >
                        Aujourd’hui :
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.script,
                            fontSize: 24 * k,
                            lineHeight: 30 * k,
                            color: colors.teal,
                            textAlign: 'center',
                        }}
                    >
                        {fr(card.title)}
                    </Text>
                </View>
            </View>

            <SectionRow k={k} icon="leaf-outline" iconColor={colors.gold} title="Pourquoi ?" titleColor={colors.gold}>
                <BodyText k={k} text={card.why} />
            </SectionRow>

            <SectionRow k={k} icon="heart-outline" iconColor={colors.teal} title="Ton mantra du jour" titleColor={colors.teal}>
                <MantraBox k={k} text={card.mantra} />
            </SectionRow>

            <SectionRow k={k} icon="bulb-outline" iconColor={colors.gold} title="Petite astuce" titleColor={colors.gold}>
                <BodyText k={k} text={card.tip} />
            </SectionRow>

            <CtaButton k={k} label={'Découvrir d’autres inspirations\nsur HowPass'} url={getCardUrl(card)} />
        </View>
    );
}
