import "vuetify/styles";
import { createApp } from "vue";
import { createVuetify } from "vuetify";

import App from "./App.vue";

const app = createApp(App);
const vuetify = createVuetify();

if (Object.keys(window.Telegram.WebApp.themeParams).length === 0) {
  window.location.href = import.meta.env.VITE_BOT_URL;
}

app.use(vuetify);
app.mount("#app");
