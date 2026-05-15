---
title: "Support"
project: "mealmeld"
type: "support"
lastUpdated: 2026-05-15
---

## Contact

For bug reports, feature requests, or general questions about MealMeld, please reach out:

- **Email:** support@jasonchalky.com
- **Developer:** Jason Chalky

Please include your iOS version and iPhone model when reporting bugs -- it makes triage much faster.

## Frequently Asked Questions

### Does MealMeld require an account?

No. MealMeld works fully without an account. Sign in with Apple is offered but optional -- you can use every feature without signing in.

### Where is my data stored?

Everything is stored **on your device** using Apple's SwiftData framework. No data is uploaded to the developer or any third party.

### How does the voting work?

Each family member swipes through candidate recipes -- Like (+1), Dislike (-100, soft veto), OK (0), Super Like (+2), or Veto (disqualified, for allergies). The Borda Count consensus algorithm scores everything and ranks the results. It doesn't just find the most-loved option -- it finds the option with the broadest support, so nobody gets stuck eating something they hate.

### Can I invite family members from other devices?

Multi-device family sharing is not available in this version. All voting happens on a single device that family members share during a session. Cloud-based family sync is planned for a future release.

### How are shopping lists generated?

When you finalize a meal plan for the week, MealMeld compiles all required ingredients, merges duplicates, and organizes them by grocery aisle/category. You check items off as you shop.

### The app crashes on launch. What should I do?

1. Make sure you're running iOS 17.0 or later -- the App requires iOS 17+.
2. Delete and reinstall the App.
3. If it still crashes, email support@jasonchalky.com with your iOS version and iPhone model.

Note: reinstalling the App will erase your local data, since all progress is stored only on your device.

## Data Deletion

All MealMeld data is stored **locally on your device** using Apple's SwiftData framework. There is no server-side account and nothing to delete remotely.

**To delete all App data:**

1. Delete the App from your iPhone (long-press the icon → **Remove App** → **Delete App**).

That's it. Deleting the App removes your recipes, meal plans, shopping lists, votes, dietary profiles, and any stored Sign in with Apple credentials.
