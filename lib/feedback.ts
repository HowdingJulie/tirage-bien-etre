import magicSound from '../assets/sounds/magic-reveal.wav';
import { SON_ACTIVE } from './config';

let context: AudioContext | null = null;
let buffer: Promise<AudioBuffer | null> | null = null;

/** Called by the draw button's user gesture; sound is fetched only when needed. */
export function prepareMagicSound() {
    if (!SON_ACTIVE || !window.AudioContext) return;
    try {
        context ??= new AudioContext();
        void context.resume().catch(() => {});
        const audio = context;
        buffer ??= fetch(magicSound).then(r => r.arrayBuffer()).then(data => audio.decodeAudioData(data)).catch(() => null);
    } catch { /* Sound is optional. */ }
}

export async function playMagicSound() {
    const decoded = await buffer;
    if (!decoded || !context || context.state !== 'running') return;
    try {
        const source = context.createBufferSource();
        source.buffer = decoded;
        const gain = context.createGain();
        gain.gain.value = 0.4;
        source.connect(gain).connect(context.destination);
        source.start();
    } catch { /* The card remains usable without audio. */ }
}
