import { NextFunction } from "grammy";

import { Context } from "@bot/types";
import { rawLogger } from "@bot/logger";

export const middleware = () => (ctx: Context, next: NextFunction) => {
  ctx.local.logger = rawLogger.child({
    update_id: ctx.update.update_id,
  });

  return next();
};
