import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts, users } from "~/server/db/schema";
import { clerkClient } from "@clerk/nextjs/server";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: privateProcedure
    .input(z.object({ email: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call -- pls use to test ux
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await ctx.db.insert(users).values({
        id: ctx.userId,
        email: input.email,
      });
    }),

  getCurrent: publicProcedure.query(async ({ ctx }) => {
    const [user] = await clerkClient.users.getUserList({
      userId: [ctx?.userId ?? ""],
    });
    console.log("USER: ", user);
    return ctx.db.query.users.findFirst({
      where: eq(users.id, "1"),
    });
  }),
});
