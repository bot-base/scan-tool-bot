## Usage

### Development mode

1. Install dependencies:

   ```sh
   npm i
   ```

2. Run the app in the development mode:

   ```sh
   npm run dev
   ```

   The page will reload if you make edits.

3. Update the `WEBAPP_URL` [environment variable](../README.md#environment-variables)

    Since Telegram only accepts HTTPS URLs for Web Apps, you'll need to use a tunneling software like [serveo](https://serveo.net) or [ngrok](https://ngrok.com) ([list of tunnelling software and services](https://github.com/anderspitman/awesome-tunneling#readme)):

    ```sh
    # serveo usage example (no client required)
    ssh -R 80:localhost:5173 serveo.net

    # ngrok usage example
    ngrok http 5173
    ```

    > Note: `5173` is default port. If the port differs from `5173`, change it accordingly.

    Set the [environment variable](../README.md#environment-variables) `WEBAPP_URL` to obtained link.

### Production mode

1. Install dependencies:

   ```sh
   npm i
   ```

2. Build the app for production to the `dist` folder:

   ```sh
   npm run build
   ```

3. Deploy the `dist` folder to any static hosting provider.

4. Set the [environment variable](../README.md#environment-variables) `WEBAPP_URL` to your link.

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
