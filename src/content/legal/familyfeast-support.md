---
title: "Support"
project: "familyfeast"
type: "support"
lastUpdated: 2026-04-13
---

## Contact

For bug reports, feature requests, or general questions about FamilyFeast, please reach out:

- **Email:** support@jasonchalky.com
- **Developer:** Jason Chalky

Please include your iOS version and iPhone model when reporting bugs -- it makes triage much faster.

## Frequently Asked Questions

### Does FamilyFeast require an account?

No. FamilyFeast uses your existing iCloud identity for multi-device sync and family sharing. There is no account to create, no email to enter, and no password to remember.

### Does the app work without iCloud?

Yes. FamilyFeast works fully in local-only mode. All recipes, meal plans, and shopping lists are stored on-device. iCloud sync is optional and only activates if you're signed into iCloud on your device.

### How does the voting work?

Each family member swipes through candidate recipes -- Like (+1), Dislike (-100, soft veto), OK (0), Super Like (+2), or Veto (disqualified, for allergies). The Borda Count consensus algorithm scores everything and ranks the results. It doesn't just find the most-loved option -- it finds the option with the broadest support, so nobody gets stuck eating something they hate.

### Can I invite family members?

Yes. FamilyFeast uses CloudKit sharing to invite family members to your group. Each member can vote, add recipes, and check off shopping list items from their own device. All changes sync in real time.

### How are shopping lists generated?

When you finalize a meal plan for the week, FamilyFeast compiles all required ingredients, merges duplicates, and organizes them by grocery aisle/category. You can check items off collaboratively -- when one person checks an item, it shows as checked for everyone.

### The app shows an iCloud error on the simulator

That's expected. CloudKit sync requires a real device signed into iCloud. On the simulator, the app falls back to local-only mode and all features work normally.

### The app crashes on launch. What should I do?

1. Make sure you're running iOS 17.0 or later -- the App requires iOS 17+.
2. Delete and reinstall the App.
3. If it still crashes, email support@jasonchalky.com with your iOS version and iPhone model.

Note: reinstalling the App will erase your local data, since all progress is stored only on your device.

## Data Deletion

All FamilyFeast data is stored **locally on your device** using Apple's SwiftData framework. There is no server-side account and nothing to delete remotely.

**To delete all App data:**

1. Delete the App from your iPhone (long-press the icon → **Remove App** → **Delete App**).

That's it. Deleting the App removes your recipes, meal plans, shopping lists, votes, and all local settings.

**If you had iCloud sync enabled:** after deleting, also go to **iOS Settings → [your name] → iCloud → Manage Account Storage** and remove FamilyFeast data to clear it from your iCloud container.
