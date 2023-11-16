import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { propertyRouter } from "./routers/property";
import { orgRouter } from "./routers/org";
import { buyBoxrouter } from "./routers/buybox";
import { ruleRouter } from "./routers/rule";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  buybox: buyBoxrouter,
  org: orgRouter,
  post: postRouter,
  property: propertyRouter,
  rule: ruleRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
