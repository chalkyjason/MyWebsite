---
title: "Support"
project: "callsign-fpv"
type: "support"
lastUpdated: 2026-10-01
---

## Contact

For bug reports, feature requests, or general questions about Callsign FPV, please reach out:

- **Email:** support@jasonchalky.com
- **Developer:** Jason Chalky
- **Source and issues:** [github.com/chalkyjason/edgesounds](https://github.com/chalkyjason/edgesounds)

Please include your iOS version and iPhone model when reporting bugs, and for a conversion problem, the type of file you were converting.

## Frequently Asked Questions

### Which audio files can I convert?

MP3, M4A (AAC), WAV and FLAC. Callsign FPV uses your iPhone's own audio decoder, so a file iOS can't play won't convert; you'll see a message saying so.

### Where do I put the converted sound on my radio?

Copy it to your SD card under `/SOUNDS/<language>/`, for example `/SOUNDS/en/`. Sounds named for EdgeTX's own events (pick them from **Trigger preset**) go in `/SOUNDS/en/SYSTEM/` and play automatically. Any other name you bind yourself with a Play Track special function. The **Setup** tab walks through both.

### Why is the filename limited to 8 characters?

EdgeTX stores Play Track filenames in an 8-character field on every radio, so a longer name can't be selected on the radio.

### How do I install an OSD font?

Save the `.mcm` file, move it to your computer, and upload it with Betaflight Configurator's **Font Manager** while your flight controller is connected. The stock font is always one click away in Font Manager if you want to go back.

### My edits and saved sounds disappeared. Why?

Everything is stored on your device only. Deleting and reinstalling the App, or iOS clearing app storage when your iPhone is very low on space, removes it. Save anything you want to keep to Files.

### Does the app work offline?

Yes. Callsign FPV never needs an internet connection.

## Data Deletion

All Callsign FPV data is stored **locally on your device**. There is no account and nothing to delete remotely.

**To delete your data:**

- **Saved sounds:** My Sounds → **Clear all**.
- **Font edits:** the glyph editor → **Discard all edits**.
- **Splash design:** Start screen → **Start over**.
- **Everything:** delete the App (long-press the icon → **Remove App** → **Delete App**).

## Disclaimer

Callsign FPV is not affiliated with or endorsed by the EdgeTX or Betaflight projects. Check your sounds and OSD on the bench before you fly, and fly safely and within the law.
