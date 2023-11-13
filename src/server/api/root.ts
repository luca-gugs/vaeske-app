import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { propertyRouter } from "./routers/property";
import { orgRouter } from "./routers/org";
import { buyBoxrouter } from "./routers/buybox";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  property: propertyRouter,
  org: orgRouter,
  buybox: buyBoxrouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
