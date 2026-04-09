---
name: add-project
description: Add a new project to the website by analyzing a local repo. Generates project page, legal docs, and copies assets.
---

# Add Project to Website

You are adding a new project to the Jason Chalky personal website (Astro static site).

## Input

The user provides a path to a local repository: `/path/to/repo`

## Steps

### 1. Analyze the Repository

Read and gather information from the repo:

- **README.md** or any markdown docs — extract description, features, and marketing copy
- **Info.plist** or project config files (project.yml, Package.swift, build.gradle) — extract app name, bundle ID, version, platform
- **Source code** — scan for:
  - Analytics SDKs (Firebase, Mixpanel, Amplitude)
  - Ad frameworks (AdMob, Facebook Ads, Unity Ads)
  - Data collection patterns (network calls, UserDefaults, CoreData, CloudKit)
  - Privacy-sensitive permissions (NSCameraUsageDescription, NSLocationUsageDescription, NSContactsUsageDescription in Info.plist)
- **Asset catalogs** — find app icon (AppIcon.appiconset) and any screenshots
- **Package dependencies** (Package.swift, Podfile, package.json) — identify third-party SDKs

### 2. Generate a Slug

Derive a URL-friendly slug from the app name (e.g., "Guardian Protocol" → "guardian-protocol").

### 3. Copy Assets

```bash
mkdir -p public/projects/<slug>
```

Copy the app icon to `public/projects/<slug>/icon.png`. If multiple icon sizes exist, prefer the largest one.

Copy any screenshots found to `public/projects/<slug>/`.

### 4. Generate Project Page

Create `src/content/projects/<slug>.mdx` with frontmatter matching this schema:

```yaml
title: "<App Name>"
slug: "<slug>"
tagline: "<one-line description>"
status: "coming-soon"  # ask user or check TestFlight/App Store presence
platform: "<iOS/Android/Web>"
techStack: [<detected frameworks>]
appStoreUrl: ""
testFlightUrl: ""
screenshots: [<copied screenshot filenames>]
icon: "icon.png"
features:
  - title: "<feature>"
    description: "<description>"
relatedBlog: "<slug>"
date: <today's date YYYY-MM-DD>
```

Write an MDX body with a description and any relevant details from the README.

### 5. Generate Legal Documents

Create these three files:

**`src/content/legal/<slug>-privacy.md`** — Privacy policy tailored to the app's actual data usage. Base it on what you found in step 1:
- If the app uses ads → document the ad SDK's data collection
- If the app uses analytics → document what's tracked
- If the app accesses camera/location/contacts → document why and what's stored
- If the app has no data collection → state that clearly

**`src/content/legal/<slug>-terms.md`** — Terms of service covering license, IP, acceptable use, and disclaimers.

**`src/content/legal/<slug>-support.md`** — Support page with contact info, FAQ placeholders, and data deletion instructions. Data deletion instructions must explain how to remove all app data (usually: delete the app from device, plus any server-side deletion if applicable).

All legal docs must have correct frontmatter:

```yaml
title: "<Privacy Policy|Terms of Service|Support>"
project: "<slug>"
type: "<privacy-policy|terms|support>"
lastUpdated: <today's date YYYY-MM-DD>
```

### 6. Create Branch and Commit

```bash
git checkout -b add-project/<slug>
git add public/projects/<slug>/ src/content/projects/<slug>.mdx src/content/legal/<slug>-*
git commit -m "feat: add <App Name> project page and legal docs"
```

### 7. Verify Build

```bash
npm run build
```

Confirm the build succeeds and the new pages are generated.

### 8. Report to User

Tell the user:
- What was generated (project page, privacy policy, terms, support)
- What data collection was detected and reflected in the privacy policy
- What they should review and customize (especially: status, testFlightUrl/appStoreUrl, screenshots, bio text in legal docs, FAQ in support)
- The branch name so they can review and merge
