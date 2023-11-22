import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { buyboxes, rules, propertys, matches } from "~/server/db/schema";

export const matchRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  process: privateProcedure
    .input(
      z.object({
        propertyId: z.number().min(1),
        stateCode: z.string().min(2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call -- pls use to test ux
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const state = `%${input.stateCode}%`;
        const result = await ctx.db.execute(sql`
  SELECT *
  FROM ${buyboxes} AS b
  JOIN ${rules} AS r ON b.id = r.buyBoxId
  WHERE b.disallowedStates NOT LIKE ${state}
`);
        if (result?.rows.length < 1) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No buyboxes found",
          });
        }

        // IF THERE ARE BUYBOXES FOR THE STATE GET PROPERTY
        const _property = await ctx.db.query.propertys.findFirst({
          where: eq(propertys.id, input.propertyId),
        });
        if (!_property) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No buyboxes found",
          });
        }
        console.log("_PROPERTY: ", _property);
        const buyBoxesWithRules: any = {};
        result.rows.forEach((row: any) => {
          const buyBoxId = row.buyBoxId;

          // Create an array for the buyBoxId if it doesn't exist
          if (!buyBoxesWithRules[buyBoxId as keyof typeof buyBoxesWithRules]) {
            buyBoxesWithRules[buyBoxId as keyof typeof buyBoxesWithRules] = [];
          }

          // Push the rule data into the corresponding array
          buyBoxesWithRules[buyBoxId as keyof typeof buyBoxesWithRules].push({
            id: row.id,
            orgId: row.orgId,
            buyBoxId: row.buyBoxId,
            key: row.key,
            params: row.params,
            value: row.value,
            valueType: row.valueType,
          });
        });

        const buyBoxIds = Object.keys(buyBoxesWithRules);

        buyBoxIds.map(async (buyBoxId) => {
          const rules =
            buyBoxesWithRules[buyBoxId as keyof typeof buyBoxesWithRules];
          const orgId = rules[0].orgId;
          let isMatch = true;
          rules.map((rule: any) => {
            if (rule.key === "ehv") {
              const value = parseInt(rule.value);
              console.log("value: ", value);
              console.log("rule: ", rule);
              if (rule.params === "greaterThan") {
                if (_property?.ehv && _property?.ehv < value) {
                  isMatch = false;
                }
              } else if (rule.params === "lessThan") {
                if (_property?.ehv && _property?.ehv > value) {
                  isMatch = false;
                }
              }
            }
          });
          if (isMatch) {
            await ctx.db.insert(matches).values({
              buyBoxId: parseInt(buyBoxId),
              orgId: orgId,
              propertyId: _property.id,
            });
          }
        });

        return {
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
