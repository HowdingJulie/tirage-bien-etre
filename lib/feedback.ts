import * as Haptics from 'expo-haptics';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { SON_ACTIVE, SON_MEME_EN_MODE_SILENCIEUX } from './config';

const magicSound = require('../assets/sounds/magic-reveal.wav');

/** Vibration légère (ignorée sur le web ou si indisponible). */
export function haptic(kind: 'light' | 'medium' | 'success') {
    if (Platform.OS === 'web') return;
    const run =
        kind === 'success'
            ? Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            : Haptics.impactAsync(
                  kind === 'medium'
                      ? Haptics.ImpactFeedbackStyle.Medium
                      : Haptics.ImpactFeedbackStyle.Light,
              );
    run.catch(() => {});
}

/** Renvoie une fonction qui joue le son magique du retournement de carte. */
export function useMagicSound() {
    const player = useAudioPlayer(magicSound);

    useEffect(() => {
        setAudioModeAsync({
            playsInSilentMode: SON_MEME_EN_MODE_SILENCIEUX,
            interruptionMode: 'mixWithOthers',
        }).catch(() => {});
    }, []);

    return useCallback(() => {
        if (!SON_ACTIVE) return;
        try {
            // expo-audio ne rembobine pas automatiquement : on revient au début avant de jouer.
            void Promise.resolve(player.seekTo(0)).catch(() => {});
            player.play();
        } catch (e) {
            // Le son est un bonus : s'il échoue, la carte s'affiche quand même.
            console.warn('[tirage] son indisponible', e);
        }
    }, [player]);
}
