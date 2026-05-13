# AdMob Integration — Handoff Brief

**Hand this file to a Claude Code session opened in the Part 107 Flight Check iOS project.**
Move/copy it into that repo (root is fine) before starting the session, then prompt: *"Read ADMOB-HANDOFF.md and do the integration."*

---

## Context

- **App:** Part 107 Flight Check (iOS, SwiftUI, Swift, SwiftData, StoreKit 2)
- **State:** Live on the App Store. Existing "Remove Ads" IAP via StoreKit 2.
- **Goal:** Add AdMob banner + app-open ads, gated by the Remove Ads entitlement.
- **Already done (outside this repo):** `app-ads.txt` is deployed at `https://chalkyjason.github.io/MyWebsite/app-ads.txt` containing `google.com, pub-3531459586407787, DIRECT, f08c47fec0942fa0`. The developer URL in App Store Connect is `https://chalkyjason.github.io/MyWebsite/`. AdMob crawl is pending.

## AdMob IDs (production)

| Type | ID |
|---|---|
| App ID | `ca-app-pub-3531459586407787~3869163677` |
| Banner | `ca-app-pub-3531459586407787/7350303177` |
| App Open | `ca-app-pub-3531459586407787/6037221509` |

Use Google's test IDs in `#if DEBUG` builds (see code below).

## What to do

### 1. Add the SDK via Swift Package Manager

Add this package to the Xcode project:
```
https://github.com/googleads/swift-package-manager-google-mobile-ads.git
```
Pin to **Up to Next Major** from 11.0.0. Add `GoogleMobileAds` library to the app target.

### 2. Edit `Info.plist`

Add:
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-3531459586407787~3869163677</string>

<key>NSUserTrackingUsageDescription</key>
<string>This identifier will be used to deliver personalized ads to you.</string>

<key>SKAdNetworkItems</key>
<array>
  <!--
    Paste Google's current SKAdNetwork ID list (~60 entries).
    Source: https://developers.google.com/admob/ios/quick-start#update_your_infoplist
    Each entry is:
      <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>xxxxxxxxxx.skadnetwork</string>
      </dict>
  -->
</array>
```

### 3. Create `AdUnits.swift`

```swift
import Foundation

enum AdUnits {
    static let banner: String = {
        #if DEBUG
        return "ca-app-pub-3940256099942544/2934735716"  // Google test banner
        #else
        return "ca-app-pub-3531459586407787/7350303177"
        #endif
    }()

    static let appOpen: String = {
        #if DEBUG
        return "ca-app-pub-3940256099942544/5575463023"  // Google test app-open
        #else
        return "ca-app-pub-3531459586407787/6037221509"
        #endif
    }()
}
```

### 4. Create `AdsManager.swift`

```swift
import SwiftUI
import GoogleMobileAds
import AppTrackingTransparency

@MainActor
final class AdsManager: NSObject, ObservableObject, FullScreenContentDelegate {
    static let shared = AdsManager()

    @Published var hasRemovedAds: Bool = false
    private var appOpenAd: AppOpenAd?
    private var loadTime: Date?
    private var isShowingAd = false

    private let maxAdAge: TimeInterval = 4 * 60 * 60

    func start() {
        Task { @MainActor in
            _ = await ATTrackingManager.requestTrackingAuthorization()
            MobileAds.shared.start(completionHandler: nil)
            loadAppOpenAd()
        }
    }

    private func loadAppOpenAd() {
        guard !hasRemovedAds, appOpenAd == nil else { return }
        Task {
            do {
                let ad = try await AppOpenAd.load(
                    with: AdUnits.appOpen,
                    request: Request()
                )
                ad.fullScreenContentDelegate = self
                self.appOpenAd = ad
                self.loadTime = Date()
            } catch {
                self.appOpenAd = nil
            }
        }
    }

    private var isAdFresh: Bool {
        guard let loadTime else { return false }
        return Date().timeIntervalSince(loadTime) < maxAdAge
    }

    func showAppOpenAdIfAvailable() {
        guard !hasRemovedAds,
              !isShowingAd,
              let ad = appOpenAd,
              isAdFresh,
              let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
              let root = scene.keyWindow?.rootViewController
        else {
            loadAppOpenAd()
            return
        }
        isShowingAd = true
        ad.present(from: root)
    }

    func adDidDismissFullScreenContent(_ ad: FullScreenPresentingAd) {
        isShowingAd = false
        appOpenAd = nil
        loadAppOpenAd()
    }

    func ad(_ ad: FullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        isShowingAd = false
        appOpenAd = nil
        loadAppOpenAd()
    }
}
```

### 5. Create `BannerAdView.swift`

```swift
import SwiftUI
import GoogleMobileAds

struct BannerAdView: UIViewRepresentable {
    let adUnitID: String

    func makeUIView(context: Context) -> BannerView {
        let banner = BannerView(adSize: AdSizeBanner)
        banner.adUnitID = adUnitID
        banner.rootViewController = UIApplication.shared
            .connectedScenes
            .compactMap { ($0 as? UIWindowScene)?.keyWindow?.rootViewController }
            .first
        banner.load(Request())
        return banner
    }

    func updateUIView(_ uiView: BannerView, context: Context) {}
}

struct BannerSlot: View {
    @EnvironmentObject var ads: AdsManager

    var body: some View {
        if ads.hasRemovedAds {
            EmptyView()
        } else {
            BannerAdView(adUnitID: AdUnits.banner)
                .frame(height: 50)
        }
    }
}
```

### 6. Wire the App entry point

Edit the `@main` `App` struct (likely named `Part107FlightCheckApp` or similar — locate it):

```swift
import SwiftUI

@main
struct Part107FlightCheckApp: App {
    @StateObject private var ads = AdsManager.shared
    @Environment(\.scenePhase) private var scenePhase
    @State private var hasLaunched = false

    var body: some Scene {
        WindowGroup {
            RootView()                      // keep the existing root view name
                .environmentObject(ads)
                .task { ads.start() }
        }
        .onChange(of: scenePhase) { _, phase in
            // Cold launch is skipped on purpose — Apple rejects app-open ads
            // shown before users see real app content.
            if phase == .active && hasLaunched {
                ads.showAppOpenAdIfAvailable()
            }
            if phase == .active { hasLaunched = true }
        }
    }
}
```

### 7. Place `BannerSlot()` in the UI

Add `BannerSlot()` to the bottom of these screens **only**:
- Home screen
- Results / quiz-feedback screen (post-submission, NOT during active questions)
- "Recommended Gear" / affiliate screen
- Any settings / about screens

**Do NOT** place a banner on the active quiz screen — interrupting study flow tanks UX and risks App Review pushback for a study app.

Example placement:
```swift
VStack(spacing: 0) {
    // ... existing screen content ...
    Spacer()
    BannerSlot()
}
```

### 8. Wire the Remove Ads entitlement

Find the existing StoreKit 2 transaction listener (look for `Transaction.updates`, `Transaction.currentEntitlements`, or a `StoreManager` / `PurchaseManager` type). Wherever the "Remove Ads" entitlement is resolved, push it into `AdsManager`:

```swift
await MainActor.run {
    AdsManager.shared.hasRemovedAds = isRemoveAdsEntitled
}
```

This must run on app launch (from `Transaction.currentEntitlements`) AND on transaction updates, so users who restore purchases or buy mid-session see ads disappear immediately.

## Verification

After integration:

1. **Build with `#if DEBUG`** — verify test ads load (Google's test ads have a yellow "Test Ad" banner overlay).
2. **Background and foreground the app** — verify the app-open ad shows on resume, **not** on cold launch.
3. **Test the Remove Ads IAP** in StoreKit testing config — verify `BannerSlot()` becomes `EmptyView` and `showAppOpenAdIfAvailable()` early-returns.
4. **Verify on a real device** — simulator can serve test ads but some edge cases (ATT prompt timing, SKAdNetwork) only manifest on hardware.

## Still TODO (not coded — flag to user when done with above)

1. **SKAdNetwork IDs** — paste Google's current list into `Info.plist`. Mandatory; ads will not properly attribute without them.
2. **UMP (User Messaging Platform) consent** — required for GDPR/CCPA compliance. Add the Google UMP SDK call *before* `MobileAds.shared.start()`. Not blocking for App Review but mandatory before serving ads to EU/CA users at scale.
3. **AdMob console** — confirm app-ads.txt status flips to **Authorized** at AdMob → Apps → Part 107 Flight Check → app-ads.txt (can take 24h).

## Notes for the implementing session

- The user prefers SwiftUI-native patterns over UIKit bridging where possible. `UIViewRepresentable` for the banner is unavoidable; everything else should be pure SwiftUI.
- The user values a privacy-first posture (the app's pitch is "no account, no telemetry"). ATT prompt copy and any future analytics decisions should respect that framing.
- Don't introduce new dependencies beyond `GoogleMobileAds`.
- The Remove Ads IAP already exists — do not recreate it. Only wire the entitlement into `AdsManager`.
