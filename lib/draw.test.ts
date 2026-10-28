import { describe, expect, it } from 'vitest';
import { ACTIONS } from './actions';
import { PRACTICES } from './practices';
import { drawTodayCard, loadTodayCard, msUntilMidnight, todayKey, type DrawStorage } from './draw';

const now = new Date(2026, 9, 28, 12);
function memoryStorage(): DrawStorage {
    const values = new Map<string, string>();
    return { getItem: key => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
}
describe('Daily draw compatibility and rules', () => {
    it('reads an existing Expo web draw without changing its card or history', () => {
        const storage = memoryStorage();
        storage.setItem('tirage:today', JSON.stringify({ date: todayKey(now), cardId: ACTIONS[3].id }));
        expect(loadTodayCard(now, storage)?.id).toBe(ACTIONS[3].id);
        expect(drawTodayCard(now, () => 0, storage)?.id).toBe(ACTIONS[3].id);
    });
    it('saves immediately and returns the same card for repeated draws', () => {
        const storage = memoryStorage();
        const first = drawTodayCard(now, () => 0, storage);
        expect(first.kind).toBe('pratique');
        expect(loadTodayCard(now, storage)?.id).toBe(first.id);
        expect(drawTodayCard(now, () => .99, storage)?.id).toBe(first.id);
        expect(JSON.parse(storage.getItem('tirage:history')!)).toHaveLength(1);
    });
    it('keeps both practice and action draws available', () => {
        expect(drawTodayCard(now, () => .99, memoryStorage()).kind).toBe('action');
        expect(drawTodayCard(now, () => .1, memoryStorage()).kind).toBe('pratique');
    });
    it('starts a new day and excludes recently drawn cards', () => {
        const storage = memoryStorage();
        const first = drawTodayCard(now, () => 0, storage);
        const tomorrow = new Date(2026, 9, 29, 12);
        expect(loadTodayCard(tomorrow, storage)).toBeNull();
        expect(drawTodayCard(tomorrow, () => 0, storage).id).not.toBe(first.id);
    });
    it('allows a card again at 30 days and ignores malformed history records', () => {
        const storage = memoryStorage();
        storage.setItem('tirage:history', JSON.stringify([null, 7, { date: '2026-09-28', cardId: PRACTICES[0].id }]));
        expect(drawTodayCard(now, () => 0, storage).id).toBe(PRACTICES[0].id);
    });
    it('recovers from invalid saved JSON', () => {
        const storage = memoryStorage();
        storage.setItem('tirage:today', '{broken');
        storage.setItem('tirage:history', '{broken');
        expect(loadTodayCard(now, storage)).toBeNull();
        expect(drawTodayCard(now, () => .99, storage)).toBeTruthy();
    });
    it('keeps the same in-session draw when browser storage cannot be written', () => {
        const storage: DrawStorage = { getItem: () => null, setItem: () => { throw Error('Storage blocked'); } };
        const first = drawTodayCard(now, () => 0, storage);
        expect(loadTodayCard(now, storage)?.id).toBe(first.id);
        expect(drawTodayCard(now, () => .99, storage).id).toBe(first.id);
    });
    it('uses local midnight for the countdown', () => {
        expect(todayKey(new Date(2026, 9, 28, 23, 59))).toBe('2026-10-28');
        expect(msUntilMidnight(new Date(2026, 9, 28, 23, 59, 30))).toBe(30000);
    });
});
