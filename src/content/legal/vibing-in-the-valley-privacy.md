---
title: "Privacy Policy"
project: "vibing-in-the-valley"
type: "privacy-policy"
lastUpdated: 2026-04-17
---

## Overview

Vibing in the Valley ("the App") is a single-player farming simulation game for iOS, developed by Jason Chalky. We built it with a simple privacy principle: **your farm, your villagers, and your save data are your business, not ours.**

## What We Collect

**Nothing is sent to us.** The App does not collect, store, transmit, or share any of the following with the developer:

- Your name, email address, phone number, or any other personal identifier
- Your location
- Device identifiers (IDFA, IDFV, etc.)
- Contacts, photos, calendar, or any other data from your device
- Analytics, telemetry, crash reports, or usage metrics
- Anything you type into the App

## What We Store (on your device only)

The App stores your save data locally on your device, never on a server we control:

- Your farm grid, tile states, planted crops, and growth progress
- Inventory, gold, and equipment
- Day, season, year, and time of day
- Stamina and skill levels
- Relationship hearts and gift-giving history with each villager
- Game settings (music volume, SFX volume, optional API key -- see below)

This data leaves your device only if **you** enable iCloud sync (see below).

To delete all stored data, delete the App from your device.

## iCloud Sync

If you are signed into iCloud, the App uses Apple's iCloud Key-Value Store to sync save data across your devices (iPhone and iPad).

- Apple assigns an anonymous iCloud User ID to associate your save with your iCloud account
- This identifier is managed entirely by Apple -- the developer cannot see your Apple ID, name, or email
- All iCloud data is protected by Apple's end-to-end encryption
- The developer has no access to data stored in your iCloud container

If you are not signed into iCloud, the App works fully in local-only mode. No data is transmitted anywhere.

Apple's privacy policy applies to iCloud services: [apple.com/legal/privacy](https://www.apple.com/legal/privacy/).

## Optional AI Dialogue (BYOK Claude API)

The App includes an optional feature that lets NPC conversations go beyond the scripted dialogue by using Anthropic's Claude API. This feature is **off by default** and requires you to provide your own API key in Settings.

If you enable this feature:

- Your API key is stored in your device's secure **Keychain**. It never leaves your device except as part of API calls you make to Anthropic.
- Conversation requests go **directly** from your device to Anthropic's servers. The developer is not a middleman and cannot see your key, your prompts, or the responses.
- Anthropic's privacy policy applies to those requests: [anthropic.com/legal/privacy](https://www.anthropic.com/legal/privacy).
- To disable the feature, toggle it off in Settings. Your key is deleted from the Keychain when you do.

## Third-Party Services

Vibing in the Valley does not integrate any third-party analytics, advertising, or tracking services. The only external service is Apple's iCloud (if you enable it), governed by Apple's privacy policy linked above, and optionally Anthropic's Claude API if you explicitly opt in with your own key.

## Children's Privacy

Vibing in the Valley is suitable for all ages and does not knowingly collect information from children. The App is a single-player game that requires no account creation, personal information entry, or online multiplayer features.

## Data Security

All save data is stored locally on your device using standard iOS file-system encryption when your device is locked. iCloud data in transit and at rest is encrypted by Apple. We never transmit, process, or store your data on servers we control.

## Your Choices

- **Delete all data:** Delete the App from your device.
- **Disable iCloud sync:** Sign out of iCloud or disable the App's iCloud access in iOS Settings → [your name] → iCloud → Apps Using iCloud.
- **Remove iCloud data:** After deleting the App, go to iOS Settings → [your name] → iCloud → Manage Account Storage and remove Vibing in the Valley data.
- **Disable AI dialogue:** Toggle off "AI Dialogue (BYOK)" in Settings. Your API key is deleted from the Keychain.

## Changes to This Policy

We may update this policy from time to time. The "Last Updated" date at the top of this document reflects the most recent revision. Material changes will be disclosed in the App's release notes.

## Contact

Privacy questions or data deletion requests:

- **Email:** support@jasonchalky.com
- **Developer:** Jason Chalky
