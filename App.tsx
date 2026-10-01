import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawScreen } from './components/DrawScreen';
import { loadTodayCard } from './lib/draw';
import type { WellbeingCard } from './lib/types';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        GreatVibes_400Regular,
        'ClementePDag-Bold': require('./assets/fonts/ClementePDag-Bold.ttf'),
    });
    // undefined = pas encore chargé ; null = pas de carte tirée aujourd'hui.
    const [todayCard, setTodayCard] = useState<WellbeingCard | null | undefined>(undefined);

    useEffect(() => {
        loadTodayCard().then(setTodayCard, () => setTodayCard(null));
    }, []);

    const ready = (fontsLoaded || fontError !== null) && todayCard !== undefined;

    useEffect(() => {
        if (ready) SplashScreen.hideAsync().catch(() => {});
    }, [ready]);

    if (!ready) return null;

    return (
        <SafeAreaProvider>
            <StatusBar style="dark" />
            <DrawScreen initialCard={todayCard} />
        </SafeAreaProvider>
    );
}
