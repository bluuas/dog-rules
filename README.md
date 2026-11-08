# DOG Rules

A quick reference for the card game DOG as a small web app: tap a card to see what it does. Six languages, works offline, installable on a phone, and it can read the rules aloud.

Live: https://dog-rules.onrender.com

## Features

- Rules per card, with a short version in the grid and details in a popup
- Six languages: German, English, Spanish, Italian, French, Swedish. The language comes from the URL (`?lang=de`), then the saved choice, then the browser language.
- Read aloud: a speaker button in each card popup and next to the general rules, using the browser's built-in speech synthesis. Hidden when the device has no voice for the current language.
- Text size and dark mode settings, remembered per device
- Installable PWA that works offline after the first visit
- Screen reader friendly: translated control labels, keyboard-operable cards, a dialog that manages focus

## Development

Requires Node 20 or newer and npm.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
```

The build is a static export (`output: 'export'` in `next.config.ts`): plain files in `out/`, no server. The service worker is only registered in production builds so development always serves fresh code.

## Deployment

The site runs on Render as a static site. Pushes to `main` deploy automatically.

- Build command: `npm run build`
- Publish directory: `out`

Render's CDN keeps files for up to five minutes, so a deploy can take that long to show up. Visitors who already have the site open get the new version on their next visit; the service worker reloads stale pages once when it updates.

## Project structure

```
src/app/
  page.tsx                      card grid and general rules
  layout.tsx                    metadata, viewport, fonts, providers
  components/
    Card.tsx                    one card in the grid, opens the popup
    CardPopup.tsx               dialog with the full rules of a card
    ReadAloudButton.tsx         speech synthesis control
    SettingsButton.tsx          language, text size, dark mode
    PWAInstaller.tsx            registers the service worker
    ErrorBoundary.tsx
  context/LanguageContext.tsx   selected language, also sets <html lang>
  config/languages.ts           supported languages, names, flags
  i18n/                         card metadata and translations, see i18n/README.md
  lib/speech.ts                 voice selection and text cleanup for speech
public/
  sw.js                         service worker: pages network-first, hashed assets cache-first
  manifest.json, icon-*.png     PWA manifest and icons
```

## Translations

Card structure (id, letter, suit) lives once in `src/app/i18n/card-metadata.json`. Text lives per language in `src/app/i18n/locales/*.json`, including the labels screen readers announce. [src/app/i18n/README.md](src/app/i18n/README.md) explains how to add a card or a language.

## Rules

The rules follow the official Brändi Dog rules at https://www.braendi-dog.de. This app is an unofficial quick reference.
