# Tirage bien-être HOW PASS

Application séparée (Expo SDK 54 : iPhone, Android et web) : un tirage de carte bien-être **par jour**.

1. Phrase d'intention : *« Univers, donne-moi ce dont j'ai besoin aujourd'hui »*
2. Mélange visuel du paquet de cartes
3. Une carte sort du paquet et se retourne : **paillettes dorées + son magique + vibration**
4. La carte du jour reste affichée jusqu'à minuit (« Reviens demain pour un nouveau tirage »)

Deux types de cartes, tirés à 50 / 50 :

| Type | Nombre | Contenu |
|---|---|---|
| **Pratique** (modèle de gauche) | 100 | nom, accroche, « Qu'est-ce que… ? », mantra du jour, exercice en 3 minutes |
| **Action du jour** (modèle de droite) | 30 | « Aujourd'hui : … », Pourquoi ?, mantra du jour, petite astuce |

Une carte déjà tirée ne ressort pas pendant 30 jours.

---

## Lancer l'app

```bash
cd tirage-bien-etre
npm install
npx expo start        # puis scanne le QR code avec l'app Expo Go (iPhone / Android)
npm run web           # version navigateur
```

---

## 👉 Coller tes URL « Découvrir… sur HowPass »

Tout se passe dans **`lib/config.ts`** :

```ts
export const URL_DECOUVRIR_PRATIQUE = 'https://how-pass.com';      // bouton des cartes pratiques
export const URL_DECOUVRIR_INSPIRATIONS = 'https://how-pass.com';  // bouton des cartes action du jour
```

- Si l'URL contient `{pratique}`, il est remplacé par le nom de la pratique tirée
  (ex. `https://how-pass.com/annuaire?q={pratique}` → `…?q=Sophrologie`).
- Une carte précise peut avoir sa propre URL : ajoute `url: 'https://…'` dans son bloc
  (fichiers `lib/practices.ts` / `lib/actions.ts`).

Dans le même fichier : la phrase d'intention, la répartition 50/50, les 30 jours sans
répétition, le son (on/off, et lecture même en mode silencieux sur iPhone).

---

## Modifier ou ajouter des cartes

- `lib/practices.ts` : les 100 cartes pratiques
- `lib/actions.ts` : les 30 cartes action du jour

Copie un bloc `p({ ... })` ou `a({ ... })`, change les textes, garde un `id` unique.

## Photos

Chaque carte a une `category` qui choisit sa photo (`CATEGORY_IMAGES` dans `lib/deck.ts`,
images dans `assets/images/`). Pour une photo propre à une carte, ajoute dans son bloc :

```ts
image: require('../assets/images/ma-photo.jpg'),
```

## Son

`assets/sounds/magic-reveal.wav` est **synthétisé par script** (aucun son externe, libre de droits).
Pour le régénérer ou le modifier : `npm run generate-sound` (script `scripts/generate-magic-sound.py`).
Tu peux aussi remplacer le fichier par ton propre son (même nom).

## Tester plusieurs tirages le même jour

En mode développement (`npx expo start`), un bouton **« ↺ Réinitialiser le tirage (mode dev) »**
apparaît sous la carte. Il n'existe pas dans l'app publiée.

---

## Publier

- **Web** : `npx expo export --platform web` → le dossier `dist/` se met sur n'importe quel
  hébergement statique.
- **iOS / Android** : `npx eas-cli@latest build` (identifiant `com.howpass.tirage`, à ajuster dans
  `app.json` si besoin). `expo-audio` est un module natif : il faut un build EAS, une simple
  mise à jour OTA d'une autre app ne suffit pas.

---

## Structure

```
App.tsx                      chargement des polices + carte du jour
components/
  DrawScreen.tsx             l'écran : intro → mélange → révélation → carte du jour
  ShuffleDeck.tsx            paquet + animation de mélange
  FlipCard.tsx               carte qui grandit, se retourne puis se déplie
  Sparkles.tsx               explosion de paillettes + halo doré
  Twinkles.tsx               étoiles qui scintillent en fond
  CardBack.tsx               dos de carte
  PracticeCardFront.tsx      carte pratique (modèle de gauche)
  ActionCardFront.tsx        carte action du jour (modèle de droite)
  CardParts.tsx              éléments communs (logo, rubriques, mantra, bouton)
lib/
  config.ts                  ⚙️ réglages + URL à coller
  practices.ts / actions.ts  contenu des cartes
  deck.ts                    photos, accroches, URL
  draw.ts                    tirage du jour + historique (stocké sur le téléphone)
  feedback.ts                son + vibrations
```

Les propositions de bien-être ne remplacent pas un avis médical (mention affichée sous la carte).
