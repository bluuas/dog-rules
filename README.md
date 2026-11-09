# DOG Rules

**Live app: https://dog-rules.onrender.com**

A pocket rule reference for the card game DOG ([Brändi Dog](https://www.braendi-dog.de)). Open it on your phone at the table, tap a card, and see what it lets you do. No account, no ads, and it works offline once loaded.

## What DOG is

DOG is a Swiss board game in the Ludo family: every player moves four marbles around the board and into their home. Instead of dice you play cards, and each card allows a different move. Remembering what the Jack, the 7 or the Joker do is the hard part, especially for new players. This app is that cheat sheet.

## What the app does

- **One tap per card.** The grid shows every card with its short rule. Tapping a card opens the full rule with the edge cases.
- **Six languages.** German, English, Spanish, Italian, French and Swedish. Pick one in the settings, or share a link that opens in a given language, for example `https://dog-rules.onrender.com/?lang=de`.
- **Read aloud.** The speaker button in a card popup, and next to the general rules, reads the rules out with your device's own voice. Handy when your hands are full of cards, or for kids who don't read yet. The button only appears when your device has a voice for the chosen language.
- **Install it.** On iPhone: Share, then Add to Home Screen. On Android: browser menu, then Install app. It then opens like a native app and works without a connection.
- **Readable for everyone.** Text size slider, dark mode, pinch zoom, and screen reader support with labels in every language.

## About the rules

The rules follow the official Brändi Dog rules at https://www.braendi-dog.de, with a few house rules from our table, for example "a move is a move" and "touched is played". If your group plays differently, the rule texts are plain JSON files and easy to change; see Contributing.

This is an unofficial fan project. DOG and Brändi Dog are products of the Stiftung Brändi, which is not involved in this app.

## Contributing

Spotted a wrong translation or a missing rule? Open an issue at https://github.com/bluuas/dog-rules/issues or send a pull request.

- Rule texts live in `src/app/i18n/locales/`, one JSON file per language. The card structure (which cards exist, their letters and suit) is shared in `src/app/i18n/card-metadata.json`.
- Adding a language takes one new JSON file and two small code changes. [src/app/i18n/README.md](src/app/i18n/README.md) walks through it.

## Running it yourself

Requires Node 20 or newer and npm.

```bash
git clone https://github.com/bluuas/dog-rules.git
cd dog-rules
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

The build is a plain static export: upload the `out/` folder to any static host. The live site runs on Render as a static site with build command `npm run build` and publish directory `out`. The service worker is only registered in production builds, so development always serves fresh code.

## How it's built

Next.js 15 with the app router and static export, React 19, TypeScript and Tailwind CSS 4. There is no backend. Reading aloud uses the browser's Web Speech API, so there are no audio files and no third-party service.

```
src/app/
  page.tsx                      card grid and general rules
  layout.tsx                    metadata, viewport, fonts
  components/                   Card, CardPopup, ReadAloudButton, SettingsButton, PWAInstaller
  context/LanguageContext.tsx   selected language, also sets <html lang>
  config/languages.ts           supported languages, names, flags
  i18n/                         card metadata and translations
  lib/speech.ts                 voice selection and text cleanup for speech
public/sw.js                    service worker: pages network-first, hashed assets cache-first
```
