# Publishing the Cisco Spaces Extension

This guide outlines the steps to publish your extension to the Chrome Web Store and Firefox Add-ons (AMO).

## Prerequisites
- **Google Account**: For Chrome Web Store ($5 one-time fee).
- **Mozilla Account**: For Firefox Add-ons (Free).
- **Zip Files**: `chrome-release.zip` and `firefox-release.zip` (generated below).
- **Privacy Policy**: Use the provided `PRIVACY_POLICY.md`.

---

## 1. Chrome Web Store (Google)

1.  **Register**: Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
2.  **Pay Fee**: Pay the $5 registration fee if you haven't already.
3.  **Create Item**: Click **"New Item"**.
4.  **Upload**: Drag and drop the `chrome-release.zip` file.
5.  **Store Listing**:
    - **Description**: Copy from `README.md`.
    - **Category**: `Productivity` or `Developer Tools`.
    - **Language**: English.
6.  **Privacy**:
    - **Privacy Policy**: Paste the link to your policy (or host the `PRIVACY_POLICY.md` on GitHub Pages).
    - **Permissions Justification**:
        - `activeTab`: "To detect if the user is currently on dnaspaces.io."
        - `storage`: "To save user preferences."
        - `scripting` & `cookies`: "To read the session token from the correct domain."
7.  **Submit**: Click **"Submit for Review"**. Reviews typically take 24-48 hours.

---

## 2. Firefox Add-ons (Mozilla)

1.  **Register**: Go to the [Firefox Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/).
2.  **Submit New Add-on**: Click **"Submit a New Add-on"**.
3.  **Distribution**: Select "On this site" (public) or "On your own" (signed xpi). usually "On this site".
4.  **Upload**: Upload `firefox-release.zip`.
    - Firefox will auto-validate the manifest. If it warns about V3/V2 compatibility, V3 is supported but check warnings.
5.  **Listing**: Fill in the description and icons.
6.  **Review**: Submit. Reviews are often faster than Chrome but can vary.

---

## 3. Hosting the Privacy Policy
Both stores require a link to a privacy policy. Since this project is on GitHub:
1.  Go to your repo `Settings` > `Pages`.
2.  Set `Source` to `main` branch.
3.  Your policy will be available at `https://santpati.github.io/Cisco-spaces-session-extension/PRIVACY_POLICY.md` (once enabled).
