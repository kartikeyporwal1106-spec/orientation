# UPSIFS 2026 Hub

Static UPSIFS hub with a Telegram-to-Google-Drive resource upload bot.

## Google Drive OAuth Setup

The Telegram Drive bot now uses Google OAuth 2.0 instead of a service account. This is required for uploads into a normal **My Drive** folder because service accounts do not have their own My Drive storage quota.

### 1. Enable Google Drive API

Open Google Cloud Console for the same project you want to use, then enable:

`APIs & Services` → `Library` → `Google Drive API` → `Enable`

### 2. Configure OAuth Consent

Go to `Google Auth Platform` → `Branding` and fill in the app name, support email, and developer email.

For Workspace accounts, use `Internal` if available. Otherwise use `External`, keep the app in testing, and add your Google account under test users.

Important: Google OAuth apps in `External + Testing` mode may issue refresh tokens that expire after a limited testing period. For a college Workspace project, `Internal` avoids that testing limitation when available.

### 3. Create OAuth Client

Because the website uses backend callback routes, create a **Web application** OAuth client.

Authorized redirect URI for local development:

```text
http://localhost:3000/api/google/callback
```

Production format:

```text
https://your-domain.com/api/google/callback
```

Use your actual deployed domain for production.

### 4. Environment Variables

Set these locally and in your host:

```text
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/api/google/callback
GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_TOKEN_ENCRYPTION_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_ALLOWED_CHAT_IDS=
```

`GOOGLE_TOKEN_ENCRYPTION_KEY` must be at least 24 characters. It is used to encrypt the server-side OAuth token file fallback.

This repo currently has no database or logged-in admin model, so OAuth tokens are stored as an encrypted server-side file at `.data/google-tokens.json` by default. This is a temporary single-admin fallback. For production serverless hosting, move this token record to a persistent database or KV store because function filesystems may not persist across deployments or cold starts.

Never commit these files or secrets:

```text
.env
credentials.json
token.json
service-account*.json
google-tokens*.json
.data/
```

### 5. Connect Google Drive

Open the website, go to `academic resources`, and use the `google drive` card.

Disconnected state shows a `connect google drive` button. After OAuth succeeds, the card shows the connected Google account email and the configured Drive folder.

Folder selection is structured for a future picker. For now, uploads use `GOOGLE_DRIVE_FOLDER_ID`.

### 6. Run the Telegram Bot

After connecting Drive once from the website:

```bash
npm run bot
```

The bot uploads Telegram files/photos to folders under `GOOGLE_DRIVE_FOLDER_ID`, creating subfolders from captions such as:

```text
/upload BTech-MTech/2025-26/SEM II/Cyber Law
```

The old service-account flow is no longer used for uploads.
