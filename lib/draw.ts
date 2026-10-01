import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACTIONS } from './actions';
import { JOURS_SANS_REPETITION, PROBA_PRATIQUE } from './config';
import { findCard } from './deck';
import { PRACTICES } from './practices';
import type { WellbeingCard } from './types';

/**
 * Tirage « une carte par jour », mémorisé sur le téléphone.
 *   - tirage:today   → { date, cardId } : la carte du jour
 *   - tirage:history → [{ date, cardId }] : les tirages récents (anti-répétition)
 */
const TODAY_KEY = 'tirage:today';
const HISTORY_KEY = 'tirage:history';
const HISTORY_MAX = 120;

type DrawEntry = { date: string; cardId: string };

/** Date locale du jour au format AAAA-MM-JJ. */
export function todayKey(now = new Date()): string {
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function daysBetween(a: string, b: string): number {
    const [ya, ma, da] = a.split('-').map(Number);
    const [yb, mb, db] = b.split('-').map(Number);
    return Math.round((Date.UTC(yb, mb - 1, db) - Date.UTC(ya, ma - 1, da)) / 86_400_000);
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
    try {
        const raw = await AsyncStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

async function writeJson(key: string, value: unknown): Promise<void> {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('[tirage] sauvegarde impossible', e);
    }
}

/** La carte déjà tirée aujourd'hui, ou null si aucun tirage aujourd'hui. */
export async function loadTodayCard(): Promise<WellbeingCard | null> {
    const entry = await readJson<DrawEntry | null>(TODAY_KEY, null);
    if (!entry || entry.date !== todayKey()) return null;
    return findCard(entry.cardId) ?? null;
}

/**
 * Tire la carte du jour et l'enregistre immédiatement
 * (fermer l'app pendant l'animation ne permet donc pas de retirer).
 * Si une carte a déjà été tirée aujourd'hui, c'est elle qui est renvoyée.
 */
export async function drawTodayCard(): Promise<WellbeingCard> {
    const existing = await loadTodayCard();
    if (existing) return existing;

    const today = todayKey();
    const history = await readJson<DrawEntry[]>(HISTORY_KEY, []);
    const recent = new Set(
        history
            .filter((h) => daysBetween(h.date, today) < JOURS_SANS_REPETITION)
            .map((h) => h.cardId),
    );

    const deck: WellbeingCard[] = Math.random() < PROBA_PRATIQUE ? PRACTICES : ACTIONS;
    const fresh = deck.filter((c) => !recent.has(c.id));
    const pool = fresh.length > 0 ? fresh : deck;
    const card = pool[Math.floor(Math.random() * pool.length)];

    const entry: DrawEntry = { date: today, cardId: card.id };
    await writeJson(TODAY_KEY, entry);
    await writeJson(HISTORY_KEY, [entry, ...history].slice(0, HISTORY_MAX));
    return card;
}

/** Mode développement uniquement : efface la carte du jour pour pouvoir retirer. */
export async function resetTodayForDev(): Promise<void> {
    try {
        await AsyncStorage.removeItem(TODAY_KEY);
    } catch {
        // ignoré
    }
}

/** Millisecondes restantes avant minuit (heure locale). */
export function msUntilMidnight(now = new Date()): number {
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now.getTime();
}
