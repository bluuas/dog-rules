# Translation Structure

## Overview
Translations are now separated into **metadata** (structure) and **content** (text) to make synchronization across languages easier.

## File Structure

```
src/app/i18n/
├── card-metadata.json          # Card structure (id, letter, emoji) - SINGLE SOURCE OF TRUTH
├── locales/
│   ├── de.json                 # German translations (text only)
│   ├── en.json                 # English translations (text only)
│   ├── es.json                 # Spanish translations (text only)
│   ├── it.json                 # Italian translations (text only)
│   ├── fr.json                 # French translations (text only)
│   └── sv.json                 # Swedish translations (text only)
└── translations.ts             # Merges metadata + translations
```

## How It Works

### 1. Card Metadata (`card-metadata.json`)
**Single source of truth** for card structure - edit once, affects all languages:
```json
[
  { "id": 1, "letter": "J", "emoji": "🃏" },
  { "id": 2, "letter": "A", "emoji": "♠" },
  ...
]
```

### 2. Language Files (`locales/*.json`)
**Text-only translations** - no duplication of structure:
```json
{
  "title": "DOG Rules",
  "cards": {
    "1": {
      "name": "Joker",
      "description": ["Can only be used as a Joker."],
      "detailed_description": []
    },
    "2": {
      "name": "Ace",
      "description": ["Move from kennel to start", "Move 1 forward", "Move 11 forward"],
      "detailed_description": []
    }
  },
  "general": {
    "title": "General rules",
    "description": ["Rule 1", "Rule 2"]
  }
}
```

### 3. UI Strings (`ui` in each language file)
Labels that screen readers announce for controls without visible text: icon buttons, the text size slider, the dialog title. `{name}` and `{language}` are placeholders filled in at runtime with `interpolate()` from `translations.ts`. Any key a language leaves out falls back to English.
```json
"ui": {
  "viewDetails": "View details for {name}",
  "close": "Close",
  "settings": "Settings",
  "language": "Language",
  "switchTo": "Switch to {language}",
  "textSize": "Text size",
  "textSizeSmall": "Small",
  "textSizeMedium": "Medium",
  "textSizeLarge": "Large",
  "darkMode": "Dark mode",
  "readAloud": "Read aloud",
  "stopReading": "Stop reading"
}
```

## Benefits

✅ **Easy synchronization**: Card structure (id, emoji, letter) defined once  
✅ **No duplication**: Metadata not repeated in every language file  
✅ **Easy to maintain**: Add a new card once, translate text separately  
✅ **Less error-prone**: Can't accidentally mismatch card IDs or emojis  
✅ **Translation-friendly**: Translators only see text, not structure  

## How to Add a New Card

### Step 1: Add metadata (once)
Edit `card-metadata.json`:
```json
{ "id": 15, "letter": "X", "emoji": "🎴" }
```

### Step 2: Add translations (for each language)
Edit each language file in `locales/`:
```json
"15": {
  "name": "New Card",
  "description": ["Description here"],
  "detailed_description": []
}
```

## How to Change Card Structure

If you need to change emoji or letter:
1. Edit `card-metadata.json` (one place)
2. Changes automatically apply to all languages

## How to Add a New Language

1. Create `locales/XX.json` with the same structure as `en.json`, including the `ui` block
2. Add language to `config/languages.ts`
3. Import in `translations.ts` and add to merge function

That's it! The metadata will automatically merge with your new translations.
