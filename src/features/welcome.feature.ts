import { Composer, Keyboard } from "grammy";
import { isPrivate } from "grammy-guard";

import { Context } from "@bot/types";
import { logCommandHandle } from "@bot/helpers/logging";
import { config } from "@bot/config";

export const composer = new Composer<Context>();

const feature = composer.filter(isPrivate);

feature.command("start", logCommandHandle, async (ctx) => {
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
