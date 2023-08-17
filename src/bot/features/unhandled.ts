import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

// ignore message when user generates QR code in chat with bot
feature.on("message").filter(
  (ctx) => ctx.message?.via_bot?.id === ctx.me.id,
  logHandle("via-bot-ignore"),
  () => {},
);

feature.on("message", logHandle("unhandled-message"), (ctx) => {
  return ctx.reply(ctx.t("unhandled"));
});

feature.on("callback_query", logHandle("unhandled-callback-query"), (ctx) => {
  return ctx.answerCallbackQuery();
});

export { composer as unhandledFeature };
