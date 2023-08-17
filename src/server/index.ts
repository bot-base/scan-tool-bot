import fastify from "fastify";
import { BotError, webhookCallback } from "grammy";
import QRCode from "qrcode";
import type { Bot } from "#root/bot/index.js";
import { errorHandler } from "#root/bot/handlers/index.js";
import { logger } from "#root/logger.js";
import { config } from "#root/config.js";

export const createServer = async (bot: Bot) => {
  const server = fastify({
    logger,
  });

  server.setErrorHandler(async (error, request, response) => {
    if (error instanceof BotError) {
      errorHandler(error);

      await response.code(200).send({});
    } else {
      logger.error(error);

      await response.status(500).send({ error: "Oops! Something went wrong." });
    }
  });

  server.get("/", () => ({ status: true }));

  server.get(`/${bot.token}`, async (request, response) => {
    const hostname = request.headers["x-forwarded-host"];
    if (typeof hostname === "string") {
      const webhookUrl = new URL(bot.token, `https://${hostname}`).href;
      await bot.api.setWebhook(webhookUrl, {
        allowed_updates: config.BOT_ALLOWED_UPDATES,
      });
      await response.send({
        status: true,
      });
    } else {
      await response.status(500).send({
        status: false,
      });
    }
  });

  server.get("/api/qr-code", async (request, response) => {
    const { data } = request.query as { data: string | undefined };

    if (typeof data === "string") {
      const qrCodeDataUrl = await QRCode.toDataURL(data, {
        type: "image/jpeg",
        width: 256,
        maskPattern: 2,
        margin: 2,
      });
      const qrCode = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");

      await response
        .type("image/jpeg")
        .header("Content-Disposition", "inline")
        .send(qrCode);
    } else {
      await response.status(400).send({
        error: "Missing data",
      });
    }
  });

  server.post(`/${bot.token}`, webhookCallback(bot, "fastify"));

  return server;
};
