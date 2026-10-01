"""
Génère assets/sounds/magic-reveal.wav : carillon ascendant + scintillements.
Son 100 % synthétisé (aucun sample externe) → libre de droits.

Usage : python3 scripts/generate-magic-sound.py
"""
import math
import random
import struct
import wave
from pathlib import Path

RATE = 44100
DURATION = 2.2
random.seed(7)

n = int(RATE * DURATION)
buf = [0.0] * n


def bell(start, freq, amp, decay):
    """Cloche douce : fondamentale + partiels inharmoniques, décroissance exponentielle."""
    partials = [(1.0, 1.0), (2.76, 0.35), (5.4, 0.12), (8.93, 0.05)]
    s0 = int(start * RATE)
    for i in range(s0, n):
        t = (i - s0) / RATE
        env = math.exp(-t / decay) * min(1.0, t / 0.004)
        if env < 1e-4:
            break
        v = 0.0
        for ratio, pa in partials:
            v += pa * math.sin(2 * math.pi * freq * ratio * t)
        buf[i] += amp * env * v


# Arpège ascendant (gamme pentatonique de ré majeur, registre aigu)
notes = [587.33, 739.99, 880.0, 987.77, 1174.66, 1479.98, 1760.0]
for k, f in enumerate(notes):
    bell(0.02 + k * 0.075, f, 0.22, 0.55 + k * 0.05)

# Accord final tenu, plus doux
for f in (1174.66, 1479.98, 1760.0, 2349.32):
    bell(0.60, f, 0.10, 1.1)

# Scintillements : petites notes très aiguës, aléatoires
for _ in range(38):
    start = random.uniform(0.05, 1.5)
    f = random.uniform(2800, 6200)
    bell(start, f, random.uniform(0.02, 0.06), random.uniform(0.05, 0.14))

# Normalisation + léger fondu de sortie
peak = max(abs(x) for x in buf) or 1.0
fade = int(0.25 * RATE)
out = bytearray()
for i, x in enumerate(buf):
    g = 0.85 / peak
    if i > n - fade:
        g *= (n - i) / fade
    out += struct.pack('<h', int(max(-1.0, min(1.0, x * g)) * 32767))

dest = Path(__file__).resolve().parent.parent / 'assets' / 'sounds' / 'magic-reveal.wav'
dest.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(dest), 'wb') as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(RATE)
    w.writeframes(bytes(out))
print(f'OK → {dest} ({len(out) // 1024} Ko)')
