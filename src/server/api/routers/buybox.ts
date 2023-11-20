import { asc, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { orgs, buyboxes } from "~/server/db/schema";

export const buyBoxrouter = createTRPCRouter({
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
        orgId: z.string().min(1),
        name: z.string().min(1),
        disallowedStates: z.string().min(1).nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call -- pls use to test ux
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const org = await ctx.db.insert(buyboxes).values({
          orgId: input.orgId,
          name: input.name,
          disallowedStates: input.disallowedStates || "",
        });
        return {
          payload: org,
          isSuccess: true,
        };
      } catch (error) {
        console.error("Error: ", error);

        return {
          isSuccess: false,
          errorCode: "network_error",
        };
      }
    }),

  getByOrg: publicProcedure
    .input(
      z.object({
        orgId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const _buyboxes = await ctx.db.query.buyboxes.findMany({
          where: eq(buyboxes.orgId, input.orgId),
          orderBy: [desc(buyboxes.updatedAt)],
        });
        if (!_buyboxes) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Org not found" });
        }
        return {
          payload: _buyboxes,
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
          errorCode: "network_error",
        };
      }
    }),
  getByState: privateProcedure
    .input(
      z.object({
        state: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const _buyboxes = await ctx.db.execute(
          sql`select * from ${buyboxes} where ${buyboxes.disallowedStates} LIKE '%${input.state}%'`,
        );
        return {
          payload: _buyboxes,
          isSuccess: true,
        };
      } catch (error) {
        console.error('ERROR:"', error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error Occured While Finding Buyboxes By State",
        });
      }
    }),
});
