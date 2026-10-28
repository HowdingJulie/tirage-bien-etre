# HOWPASS · Tirage bien-être

Site web responsive en React, TypeScript et Vite. Une carte bien-être par jour, avec mélange animé, révélation et son facultatif.

## Lancer le site

```powershell
cd C:\Users\olive\Downloads\julie\tirage-bien-etre
npm install
npm start
```

Ouvrir http://localhost:8093. Les commandes `npm run dev` et `npm run web` lancent le même site. Le projet est exclusivement web : aucune prévisualisation iOS/Android et aucune dépendance Expo ou React Native.

## Vérifier et publier

```powershell
npm run lint
npm test
npm run build
npm run preview
```

`npm run build` génère `dist/`, prêt à être hébergé comme site statique. Netlify utilise cette commande et publie `dist/` via `netlify.toml`. `npm run preview` sert le build de production sur le même port ; arrêter le serveur de développement avant de le lancer.

## Fonctionnement du tirage

- Le tirage est enregistré avant l’animation et reste identique jusqu’à minuit, selon la date locale du navigateur.
- Les clés `tirage:today` et `tirage:history`, ainsi que leur format JSON, sont conservés pour retrouver les tirages de l’ancienne version web sur la même origine.
- Les cartes récentes sont exclues pendant 30 jours ; les deux catégories gardent leur répartition 50/50. Si toute une catégorie a été tirée, son contenu redevient disponible.
- Les autres onglets et les retours sur le site sont synchronisés. Si le stockage est bloqué, la carte reste disponible pendant la session, sans garantie après fermeture.
- L’animation respecte `prefers-reduced-motion`. Le bouton de son permet de couper l’effet sonore avant le tirage.

## Contenu et configuration

- `lib/config.ts` : liens « Découvrir… », phrase d’intention, proportions, durée sans répétition et activation du son.
- `lib/practices.ts`, `lib/actions.ts` : catalogue des cartes. Les identifiants et textes existants sont conservés.
- `lib/deck.ts` : correspondance des photos, accroches et URL. Une carte peut définir son propre `image` (URL importée ou distante) et son propre `url`.
- `styles.css` : couleurs, typographie, fond photographique couvrant toute la section, disposition et animations.
- `cards.css`, `components/CardOrnaments.tsx` : cartes ivoire, filets dorés, ornements botaniques et étoiles, au recto comme au verso.
- `App.tsx` : interface du tirage ; `components/CardFace.tsx` : face des cartes.

## Identité visuelle

Référence fournie : https://howpass-p1-v7.netlify.app/. Le logo HOWPASS, la police Clemente et la photographie de méditation viennent de cette référence. Palette : bleu canard `#1a7378`, bleu profond `#124f53`, olive `#6f6714`, blanc cassé `#f9f9f7`. Inter est embarquée localement ; les polices WOFF2 sont limitées aux caractères latins utilisés par le site. Les icônes sont des SVG intégrés et les animations utilisent CSS.

Le son `assets/sounds/magic-reveal.wav` est synthétisé par `scripts/generate-magic-sound.py`. Il est chargé uniquement au premier tirage avec son activé. Les photos des cartes existantes sont conservées.

Les propositions de bien-être ne remplacent pas un avis médical.
