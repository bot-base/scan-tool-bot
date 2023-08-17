import { Composer } from "grammy";
import type { InlineQueryResultsButton } from "@grammyjs/types";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { config } from "#root/config.js";

const composer = new Composer<Context>();

const feature = composer;

const CACHE_TIME = config.isDev ? { cache_time: 0 } : {};

function getOpenScannerButton(ctx: Context): InlineQueryResultsButton {
  return {
    text: ctx.t("inline_mode.scan_qr_button"),
    web_app: {
      url: config.WEBAPP_URL,
    },
  };
}

// handle as a scan result if starts with "# "
feature.inlineQuery(/^#\s/, logHandle("inline-mode-scan-result"), (ctx) => {
  const [_prefix, result] = ctx.inlineQuery.query.split("# ");

  return ctx.answerInlineQuery(
    result.length > 0
      ? [
          {
            id: "result",
            type: "article",
            title: ctx.t("inline_mode.result_label"),
            description: result,
            input_message_content: {
              message_text: result,
            },
          },
        ]
      : [],
    {
      button: getOpenScannerButton(ctx),
      ...CACHE_TIME,
    },
  );
});

feature.on(
  "inline_query",
  logHandle("inline-mode-generate-qr"),
  async (ctx) => {
    const { query } = ctx.inlineQuery;
    const qrCodeUrl = `${config.API_URL}/qr-code?data=${encodeURIComponent(
      query,
    )}`;

    return ctx.answerInlineQuery(
      query.length > 0
        ? [
            {
              id: "result",
              type: "photo",
              photo_url: qrCodeUrl,
              thumbnail_url: qrCodeUrl,
              photo_width: 256,
              photo_height: 256,
            },
          ]
        : [],
      {
        button: getOpenScannerButton(ctx),
        ...CACHE_TIME,
      },
    );
  },
);

export { composer as inlineModeFeature };
