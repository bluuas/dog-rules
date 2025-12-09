# PWA Icons Setup

## Required Icons

For PWA support to work properly, you need to add the following icon files to the `/public` directory:

### Required Files:
- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels

### Quick Setup Options:

#### Option 1: Use an emoji as icon
You can use an online tool like https://favicon.io/emoji-favicons/ to create icons from the 🃏 emoji.

#### Option 2: Create simple colored icons
```bash
# Using ImageMagick (if installed)
convert -size 192x192 xc:#2c2c2c -fill white -pointsize 120 -gravity center -annotate +0+0 "🃏" public/icon-192.png
convert -size 512x512 xc:#2c2c2c -fill white -pointsize 320 -gravity center -annotate +0+0 "🃏" public/icon-512.png
```

#### Option 3: Design custom icons
Use any graphics software (Figma, Canva, Photoshop, GIMP) to create:
- 192x192px PNG with transparent or #2c2c2c background
- 512x512px PNG with transparent or #2c2c2c background

### Note:
Until you add these icons, the PWA manifest will reference missing files. The app will still work, but won't be installable as a PWA.

### Current Setup:
- ✅ manifest.json created
- ✅ Service worker configured
- ✅ Meta tags added to layout
- ⏳ Icons need to be added manually
