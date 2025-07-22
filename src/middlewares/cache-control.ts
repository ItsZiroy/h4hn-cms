import { Context, Next } from "koa";

type Strapi = any; // Replace with actual Strapi type if available
type Config = any; // Replace with actual config type if available

const cacheControl = (config: Config, { strapi }: { strapi: Strapi }) => {
  return async (ctx: Context, next: Next) => {
    await next();

    // Apply only to uploaded media files
    if (ctx.path.startsWith("/uploads")) {
      ctx.set("Cache-Control", "public, max-age=31536000, immutable");
    }
  };
};

export default cacheControl;
