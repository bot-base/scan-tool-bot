import { Composer, Keyboard } from "grammy";

import { Context } from "~/bot/types";
import { logHandle } from "~/bot/helpers/logging";
import { config } from "~/config";

export const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("handle /start"), async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("welcome"), {
    reply_markup: {
      keyboard: new Keyboard()
        .webApp(ctx.t("scan_qr_btn"), config.WEBAPP_URL)
        .build(),
      resize_keyboard: true,
    },
  });
});
