# UPSIFS 2026 Hub

Student-built UPSIFS hub with a Google Drive-backed academic resource explorer and a Telegram approval bot.

## Final Resource Flow

Students do not connect Google Drive accounts. One server-side Google service account reads and writes inside the central UPSIFS Drive folder.

### Telegram Uploads

1. A student sends a file or photo to the Telegram bot.
2. The caption contains the destination folder path:

```text
Physics/Waves/Sound Waves
```

3. The bot sends an approval request to the configured admin Telegram chat.
4. Admin taps Approve or Reject.
5. Approved files are uploaded under `DRIVE_ROOT_FOLDER_ID`, creating any missing subfolders.

### Website Resources

The academic resources page reads the same Drive folder through backend API routes:

- `/api/resources/list`
- `/api/resources/preview/:fileId`
- `/api/resources/download/:fileId`

The browser never receives service-account credentials.

## Google Drive Setup

1. Enable the Google Drive API in Google Cloud Console.
2. Create a service account.
3. Copy the service account email.
4. Share the root Drive folder with that email as Editor.
5. Add the service account JSON to your server environment.

Root folder:

```text
https://drive.google.com/drive/folders/1DTSwGkV4_jniit6tv9svFZba1oa7DuUT
```

## Environment Variables

Set these locally and in production:

```text
DRIVE_ROOT_FOLDER_ID=1DTSwGkV4_jniit6tv9svFZba1oa7DuUT
GOOGLE_SERVICE_ACCOUNT_JSON=
GOOGLE_SERVICE_ACCOUNT_FILE=
TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=
```

Use either `GOOGLE_SERVICE_ACCOUNT_JSON` or `GOOGLE_SERVICE_ACCOUNT_FILE`.

Never commit these files or secrets:

```text
.env
credentials.json
token.json
service-account*.json
google-tokens*.json
.data/
```

## Run

```bash
npm run bot
```

The website can be served as usual. On Vercel, the `/api/resources/*` routes handle Drive listing, preview, and download.
