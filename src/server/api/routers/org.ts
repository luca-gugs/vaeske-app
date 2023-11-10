import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts, users, propertys, orgs } from "~/server/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

export const orgRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: privateProcedure
    .input(
      z.object({
        id: z.string().min(1),
        email: z.string().min(1),
        phone: z.string().min(1),
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call -- pls use to test ux
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const user = await ctx.db.insert(orgs).values({
        id: ctx.userId,
        email: input.email,
        phone: input.phone,
        name: input.name,
        slug: input.slug,
        description: input.description,
      });
      return user;
    }),

  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const org = await ctx.db.query.orgs.findFirst({
          where: eq(orgs.slug, input.slug),
        });
        if (!org) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Org not found" });
        }
        return {
          payload: org,
          isSuccess: true,
        };
      } catch (error) {
        console.log("E: ", error);
        return {
          isSuccess: false,
          errorCode: "network_error",
        };
      }
    }),
});
