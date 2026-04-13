---
title: "Privacy Policy"
project: "familyfeast"
type: "privacy-policy"
lastUpdated: 2026-04-13
---

## Overview

FamilyFeast ("the App") is a consensus-driven meal planning app for iOS families, developed by Jason Chalky. We built FamilyFeast with a simple privacy principle: **your family's meal plans, recipes, and preferences are your business, not ours.**

## What We Collect

**Nothing is sent to us.** The App does not collect, store, transmit, or share any of the following with the developer:

- Your name, email address, phone number, or any other personal identifier
- Your location
- Device identifiers (IDFA, IDFV, etc.)
- Contacts, photos, calendar, or any other data from your device
- Analytics, telemetry, crash reports, or usage metrics
- Anything you type into the App

## What We Store (on your device only)

The App uses Apple's **SwiftData** framework to store the following **locally on your device**, never on a remote server:

- Recipes you create or import (titles, ingredients, instructions, nutrition info)
- Family group membership and member profiles
- Voting sessions and individual votes
- Meal plans and scheduled meals
- Shopping lists and checked-off items
- Dietary restrictions, allergen settings, and cuisine preferences
- Budget settings and cost estimates

This data leaves your device only if **you** enable iCloud sync (see below).

To delete all stored data, delete the App from your device.

## iCloud Sync (CloudKit)

If you are signed into iCloud, the App uses Apple's **CloudKit** framework to sync your family group data across your devices and with other family members you invite.

- Apple assigns an anonymous **CloudKit Record ID** (User ID) to associate your data with your iCloud account
- This identifier is managed entirely by Apple -- the developer cannot see your Apple ID, name, or email
- All CloudKit data is protected by Apple's end-to-end encryption
- The developer has no access to data stored in your iCloud container

If you are not signed into iCloud, the App works fully in local-only mode. No data is transmitted anywhere.

Apple's privacy policy applies to iCloud services: [apple.com/legal/privacy](https://www.apple.com/legal/privacy/).

## Third-Party Services

FamilyFeast does not integrate any third-party analytics, advertising, or tracking services. The only external service is Apple's CloudKit, governed by Apple's privacy policy linked above.

## Children's Privacy

FamilyFeast is not directed to children under 13 and does not knowingly collect information from children under 13. The App is designed for family use and does not require account creation or personal information entry.

## Data Security

All data is stored locally on your device using Apple's SwiftData framework, which uses standard iOS file-system encryption when your device is locked. CloudKit data in transit and at rest is encrypted by Apple. We never transmit, process, or store your data on servers we control.

## Your Choices

- **Delete all data:** Delete the App from your device.
- **Disable iCloud sync:** Sign out of iCloud or disable the App's iCloud access in iOS Settings → [your name] → iCloud → Apps Using iCloud.
- **Remove iCloud data:** After deleting the App, go to iOS Settings → [your name] → iCloud → Manage Account Storage and remove FamilyFeast data.

## Changes to This Policy

We may update this policy from time to time. The "Last Updated" date at the top of this document reflects the most recent revision. Material changes will be disclosed in the App's release notes.

## Contact

Privacy questions or data deletion requests:

- **Email:** support@jasonchalky.com
- **Developer:** Jason Chalky
