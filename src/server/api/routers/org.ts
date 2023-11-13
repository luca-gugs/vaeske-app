import { eq } from "drizzle-orm";
import { z } from "zod";

import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { orgs, buyboxes } from "~/server/db/schema";

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
      const org = await ctx.db.insert(orgs).values({
        id: input.id,
        email: input.email,
        phone: input.phone,
        name: input.name,
        slug: input.slug,
        description: input.description,
      });
      return org;
    }),

  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        getBuyBoxes: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const org = await ctx.db.query.orgs.findFirst({
          where: eq(orgs.slug, input.slug),
        });
        let _buyboxes: any[] = [];
        if (!org) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Org not found" });
        }
        if (input.getBuyBoxes) {
          _buyboxes = await ctx.db.query.buyboxes.findMany({
            where: eq(buyboxes.orgId, org.id),
          });
        }
        return {
          payload: { org, buyboxes: _buyboxes },
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
          errorCode: "network_error",
        };
      }
    }),
});
