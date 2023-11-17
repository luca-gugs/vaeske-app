import { eq } from "drizzle-orm";
import { z } from "zod";

import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { orgs, buyboxes, rules } from "~/server/db/schema";

export const ruleRouter = createTRPCRouter({
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
        buyBoxId: z.number().min(1),
        key: z.string().min(1),
        params: z.string().min(1),
        value: z.string().min(1),
        valueType: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call -- pls use to test ux
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const rule = await ctx.db.insert(rules).values({
          buyBoxId: input.buyBoxId,
          key: input.key,
          params: input.params,
          value: input.value,
          valueType: input.valueType,
        });
        return {
          payload: rule,
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
          errorCode: "network_error",
        };
      }
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.number().min(1),
        buyBoxId: z.number().min(1),
        key: z.string().min(1),
        params: z.string().min(1),
        value: z.string().min(1),
        valueType: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call -- pls use to test ux
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const test = await ctx.db
          .update(rules)
          .set({
            ...input,
          })
          .where(eq(rules.id, input.id));
        if (test.rowsAffected === 0) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Unable To Update Rule",
          });
        }
        return {
          payload: null,
          isSuccess: true,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable To Update Rule",
        });
      }
    }),
});
