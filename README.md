# UPSIFS 2026 Hub

Student-built UPSIFS hub with a Google Drive-backed academic resource explorer and a Telegram approval bot.

## Final Resource Flow

Students do not connect Google Drive accounts. The backend uses one owner Google OAuth refresh token from the admin account to read and write inside the central UPSIFS Drive folder.

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

The browser never receives Google OAuth credentials or refresh tokens.

## Google Drive Owner OAuth Setup

1. Enable the Google Drive API in Google Cloud Console.
2. Create an OAuth client: `APIs & Services` -> `Credentials` -> `Create credentials` -> `OAuth client ID`.
3. Use app type `Web application`.
4. Add this local redirect URI:

```text
http://localhost:3000/api/google/callback
```

5. Add your deployed redirect URI too:

```text
https://your-site.vercel.app/api/google/callback
```

6. Visit `/api/google/auth`, approve with your Google account, then copy the shown refresh token into `GOOGLE_REFRESH_TOKEN`.

Root folder:

```text
https://drive.google.com/drive/folders/1DTSwGkV4_jniit6tv9svFZba1oa7DuUT
```

## Environment Variables

Set these locally and in production:

```text
DRIVE_ROOT_FOLDER_ID=1DTSwGkV4_jniit6tv9svFZba1oa7DuUT
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/api/google/callback
GOOGLE_REFRESH_TOKEN=
TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=
```

Never commit these files or secrets:

```text
.env
credentials.json
token.json
service-account*.json
google-tokens*.json
.data/
```

## Local Refresh Token Generation

Start any local server that can run the API routes, then open:

```text
http://localhost:3000/api/google/auth
```

After approval, the callback page prints `GOOGLE_REFRESH_TOKEN`. Add that token to `.env`, Vercel env, and the shell where the bot runs.

## Run

```bash
npm run bot
```

The website can be served as usual. On Vercel, the `/api/resources/*` routes handle Drive listing, preview, and download.
