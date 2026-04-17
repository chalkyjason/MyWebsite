---
title: "Support"
project: "vibing-in-the-valley"
type: "support"
lastUpdated: 2026-04-17
---

## Contact

For bug reports, feature requests, or general questions about Vibing in the Valley, please reach out:

- **Email:** support@jasonchalky.com
- **Developer:** Jason Chalky

Please include your iOS version and iPhone model when reporting bugs -- it makes triage much faster.

## Frequently Asked Questions

### Does Vibing in the Valley require an account?

No. The game is fully offline and single-player. No account, no email, no password.

### Does the game work without internet?

Yes. The entire game works offline. Internet is only used for the optional iCloud save sync and the optional BYOK Claude dialogue feature.

### How do I save my progress?

The game auto-saves at the end of every in-game day (about every 10 real minutes). You don't need to do anything -- just play.

### How do I move a save between my iPhone and iPad?

Sign into iCloud on both devices. As long as both are signed into the same iCloud account, your save syncs automatically via iCloud Key-Value Store.

### How does the BYOK AI Dialogue feature work?

By default, NPCs use hand-written dialogue lines. If you want them to say more dynamic things, you can bring your own Anthropic Claude API key in Settings. The key is stored in your device's secure Keychain and is used only to call Anthropic directly from your device -- the developer never sees your key or your conversations. You pay Anthropic for any usage. The feature is completely optional.

### I lost my API key -- was it sent anywhere?

No. Your API key lives only in the secure iOS Keychain on your device. It is not backed up to iCloud and is not transmitted to the developer. If you lose it, you can generate a new one from the Anthropic console and paste it in Settings again.

### My crops stopped growing

Make sure they are (a) planted during a valid season -- check the Shop to see what each seed needs -- and (b) watered. Crops only grow on days they were watered. At the start of a new day, all tiles dry out, so water daily!

### The game crashes on launch

1. Make sure you're running iOS 16.0 or later -- the game requires iOS 16+.
2. Delete and reinstall the App.
3. If it still crashes, email support@jasonchalky.com with your iOS version and iPhone model.

Note: reinstalling the App will erase your local data. If you had iCloud sync enabled, your save will restore from iCloud on first launch after reinstall.

## Data Deletion

All Vibing in the Valley data is stored **locally on your device**, plus optionally in your personal iCloud container. There is no server-side account and nothing to delete remotely.

**To delete all App data:**

1. Delete the App from your iPhone (long-press the icon → **Remove App** → **Delete App**).

That's it. Deleting the App removes your save, settings, and any stored API key from the Keychain.

**If you had iCloud sync enabled:** after deleting, also go to **iOS Settings → [your name] → iCloud → Manage Account Storage** and remove Vibing in the Valley data to clear it from your iCloud container.
