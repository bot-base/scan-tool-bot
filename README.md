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

<table>
<thead>
  <tr>
    <th>Variable</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>NODE_ENV</td>
    <td>String</td>
    <td>Application environment (<code>development</code> or <code>production</code>)</td>
  </tr>
  <tr>
    <td>BOT_TOKEN</td>
    <td>
        String
    </td>
    <td>
        Token, get it from <a href="https://t.me/BotFather">@BotFather</a>.
    </td>
  </tr>
  <tr>
    <td>BOT_WEBHOOK</td>
    <td>
        String
    </td>
    <td>
        Webhook endpoint, used to configure webhook in <b>production</b> environment.
    </td>
  </tr>
  <tr>
    <td>WEBAPP_URL</td>
    <td>
        String
    </td>
    <td>
        HTTPS link to Web App.
    </td>
  </tr>
  <tr>
    <td>API_URL</td>
    <td>
        String
    </td>
    <td>
        `/api` endpoint (must be public and available to Telegram)
    </td>
  </tr>
  <tr>
    <td>LOG_LEVEL</td>
    <td>
        String
    </td>
    <td>
        <i>Optional.</i>
        Application log level. 
        See <a href="https://github.com/pinojs/pino/blob/master/docs/api.md#level-string">Pino docs</a> for a complete list of available log levels. <br/>
        Defaults to <code>info</code>.
    </td>
  </tr>
  <tr>
    <td>BOT_SERVER_HOST</td>
    <td>
        String
    </td>
    <td>
        <i>Optional.</i> Server address. <br/>
        Defaults to <code>0.0.0.0</code>.
    </td>
  </tr>
  <tr>
    <td>BOT_SERVER_PORT</td>
    <td>
        Number
    </td>
    <td>
        <i>Optional.</i> Server port. <br/>
        Defaults to <code>80</code>.
    </td>
  </tr>
  <tr>
    <td>BOT_ALLOWED_UPDATES</td>
    <td>
        Array of String
    </td>
    <td>
        <i>Optional.</i> A JSON-serialized list of the update types you want your bot to receive. See <a href="https://core.telegram.org/bots/api#update">Update</a> for a complete list of available update types. <br/>
        Defaults to an empty array (all update types except <code>chat_member</code>).
    </td>
  </tr>
  <tr>
    <td>BOT_ADMIN_USER_ID</td>
    <td>
        Number or <br> Array of Number
    </td>
    <td>
        <i>Optional.</i> Administrator user ID. Commands such as <code>/setcommands</code> will only be available to a user with this ID. <br/>
        Defaults to an empty array.
    </td>
  </tr>
</tbody>
</table>
