<h1 align="center">🤖 Scan Tool Bot</h1>

<img align="right" width="35%" src="https://github.com/bot-base/scan-tool-bot/assets/26162440/92e1e035-a3d7-4f0f-b5f8-0c40f96a60ec">

<p align="center">
<a href="https://t.me/ScanToolBot">Open in Telegram</a>
<br/> or 
<br/>
just type <code>@ScanToolBot</code> in message input field

</p>

## Features

- Scan QR codes with a camera
- Generate QR codes
- Works in any chat via inline mode

## Launch

1.  Close repository:

```sh
git clone git@github.com:bot-base/scan-tool-bot.git
```

2.  Create an environment variables file:

```bash
cp .env.example .env
```

3.  Launch web app following the instructions in [webapp/README.md](webapp/README.md).

4.  Set BOT_TOKEN, WEBAPP_URL, API_URL [environment variables](#environment-variables) in `.env` file.

5.  Launch bot

    Development mode:

    ```bash
    # 1. Install dependencies
    npm i

    # 2. Set BOT_SERVER_HOST to localhost
    # Set BOT_SERVER_PORT to any available port

    # 2. Run bot (in watch mode)
    npm run dev
    ```

    Production mode:

    ```bash
    # 1. Install dependencies
    npm i --only=prod

    # 2. Set NODE_ENV to production
    # Change BOT_WEBHOOK to the actual URL to receive updates

    # 3. Run bot
    npm start 
    # or
    npm run start:force # if you want to skip type checking
    ```

### List of available commands
- `npm run lint` — Lint source code.
- `npm run format` — Format source code.
- `npm run typecheck` — Runs type checking.
- `npm run dev` — Starts the bot in development mode.
- `npm run start` — Starts the bot.
- `npm run start:force` — Starts the bot without type checking.

## Environment Variables

| Variable            | Description                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NODE_ENV            | Node environment (development or production)                                                                                                                                          |
| LOG_LEVEL           | Log level                                                                                                                                                 |
| BOT_SERVER_HOST     | Server address (default 0.0.0.0)                                                                                                                                            |
| BOT_SERVER_PORT     | Server port (default 80)                                                                                                                                               |
| BOT_ALLOWED_UPDATES | List of [update types](https://core.telegram.org/bots/api#update) to receive                                                                              |
| BOT_TOKEN           | Token, get it from [@BotFather](https://t.me/BotFather)                                                                                                   |
| BOT_WEBHOOK         | <details><summary>Webhook endpoint</summary>Will be used to setup webhook in production mode.</details>                                                        |
| BOT_ADMIN_USER_ID   | <details><summary>Administrator user ID</summary>Commands, such as `/setcommands`, will only be available to the user with this ID.</details> |
| WEBAPP_URL          | HTTPS link to web app |
| API_URL          | `/api` endpoint (must be public and available to Telegram) |