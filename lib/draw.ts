import { ACTIONS } from './actions';
import { JOURS_SANS_REPETITION, PROBA_PRATIQUE } from './config';
import { findCard } from './deck';
import { PRACTICES } from './practices';
import type { WellbeingCard } from './types';

// Same keys and JSON as the original web app: existing draws survive the migration.
const TODAY_KEY = 'tirage:today';
const HISTORY_KEY = 'tirage:history';
type DrawEntry = { date: string; cardId: string };
export type DrawStorage = Pick<Storage, 'getItem' | 'setItem'>;
let sessionEntry: DrawEntry | null = null;
const fallbackEntries = new WeakMap<DrawStorage, DrawEntry>();

function browserStorage(): DrawStorage | null {
    try { return typeof window === 'undefined' ? null : window.localStorage; }
    catch { return null; }
}

function readJson(key: string, storage: DrawStorage | null): unknown {
    try { return JSON.parse(storage?.getItem(key) ?? 'null'); }
    catch { return null; }
}

function isEntry(value: unknown): value is DrawEntry {
    return !!value && typeof value === 'object' && 'date' in value && 'cardId' in value
        && typeof value.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.date)
        && typeof value.cardId === 'string';
}

export function todayKey(now = new Date()): string {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function daysBetween(a: string, b: string): number {
    const [ya, ma, da] = a.split('-').map(Number);
    const [yb, mb, db] = b.split('-').map(Number);
    return Math.round((Date.UTC(yb, mb - 1, db) - Date.UTC(ya, ma - 1, da)) / 86_400_000);
}

export function loadTodayCard(now = new Date(), storage = browserStorage()): WellbeingCard | null {
    const saved = readJson(TODAY_KEY, storage);
    const entry = isEntry(saved) ? saved : storage ? fallbackEntries.get(storage) : sessionEntry;
    return entry?.date === todayKey(now) ? findCard(entry.cardId) ?? null : null;
}

/** Save immediately, before animation; drawing again returns the same card. */
export function drawTodayCard(now = new Date(), random = Math.random, storage = browserStorage()): WellbeingCard {
    const existing = loadTodayCard(now, storage);
    if (existing) return existing;
    const saved = readJson(HISTORY_KEY, storage);
    const history = Array.isArray(saved) ? saved.filter(isEntry) : [];
    const today = todayKey(now);
    const recent = new Set(history.filter(h => {
        const age = daysBetween(h.date, today);
        return age >= 0 && age < JOURS_SANS_REPETITION;
    }).map(h => h.cardId));
    const deck: WellbeingCard[] = random() < PROBA_PRATIQUE ? PRACTICES : ACTIONS;
    const fresh = deck.filter(c => !recent.has(c.id));
    const pool = fresh.length ? fresh : deck;
    const card = pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))];
    const entry = { date: today, cardId: card.id };
    if (storage) fallbackEntries.set(storage, entry);
    else sessionEntry = entry;
    try {
        storage?.setItem(TODAY_KEY, JSON.stringify(entry));
        storage?.setItem(HISTORY_KEY, JSON.stringify([entry, ...history].slice(0, 120)));
    } catch { /* The current tab still retains its draw if storage is unavailable. */ }
    return card;
}

export function msUntilMidnight(now = new Date()): number {
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now.getTime();
}
