import { Composer, InlineKeyboard } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { config } from "#root/config.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), (ctx) => {
  return ctx.reply(ctx.t("welcome.message"), {
    reply_markup: new InlineKeyboard()
      .webApp(ctx.t("welcome.scan_qr_button"), config.WEBAPP_URL)
      .switchInlineCurrent(ctx.t("welcome.generate_qr_button")),
  });
});

export { composer as welcomeFeature };
