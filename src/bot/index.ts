import { autoChatAction } from "@grammyjs/auto-chat-action";
import { hydrate } from "@grammyjs/hydrate";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { BotConfig, Bot as TelegramBot } from "grammy";
import { Context, createContextConstructor } from "#root/bot/context.js";
import {
  botAdminFeature,
  inlineModeFeature,
  languageFeature,
  unhandledFeature,
  welcomeFeature,
} from "#root/bot/features/index.js";
import { errorHandler } from "#root/bot/handlers/index.js";
import { i18n, isMultipleLocales } from "#root/bot/i18n.js";
import { updateLogger } from "#root/bot/middlewares/index.js";
import { config } from "#root/config.js";
import { logger } from "#root/logger.js";

type Options = {
  config?: Omit<BotConfig<Context>, "ContextConstructor">;
};

export function createBot(token: string, options: Options = {}) {
  const bot = new TelegramBot(token, {
    ...options.config,
    ContextConstructor: createContextConstructor({ logger }),
  });

  // Middlewares
  bot.api.config.use(parseMode("HTML"));

  if (config.isDev) {
    bot.use(updateLogger());
  }

  bot.use(autoChatAction(bot.api));
  bot.use(hydrateReply);
  bot.use(hydrate());
  bot.use(i18n);

  // Handlers
  bot.use(welcomeFeature);
  bot.use(botAdminFeature);
  bot.use(inlineModeFeature);

  if (isMultipleLocales) {
    bot.use(languageFeature);
  }

  // must be the last handler
  bot.use(unhandledFeature);

  if (config.isDev) {
    bot.catch(errorHandler);
  }

  return bot;
}

export type Bot = ReturnType<typeof createBot>;
