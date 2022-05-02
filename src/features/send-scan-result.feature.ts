import { Composer } from "grammy";
import { isPrivate } from "grammy-guard";

import { Context } from "@bot/types";

export const composer = new Composer<Context>();

const feature = composer.filter(isPrivate);

feature.on(":web_app_data", async (ctx) => {
  if (ctx.message?.web_app_data.button_text === ctx.t("scan_qr_btn")) {
    return Promise.all([
      ctx.deleteMessage(),
      ctx.reply(ctx.message.web_app_data.data),
    ]);
  }
});
