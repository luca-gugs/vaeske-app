import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts, users, propertys, matches } from "~/server/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
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
        email: z.string().min(1),
        first: z.string().min(1),
        last: z.string().min(1),
        type: z.string().min(1),
        creditScore: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call -- pls use to test ux
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const user = await ctx.db.insert(users).values({
        id: ctx.userId,
        email: input.email,
        first: input.first,
        last: input.last,
        type: input.type,
        creditScore: input.creditScore,
      });
      return user;
    }),

  getCurrent: publicProcedure
    .input(
      z
        .object({ getProperties: z.boolean().nullable().default(false) })
        .nullable(),
    )
    .query(async ({ ctx, input }) => {
      try {
        const [user] = await clerkClient.users.getUserList({
          userId: [ctx?.userId ?? ""],
        });
        const _user = await ctx.db.query.users.findFirst({
          where: eq(users.id, user?.id ?? "1"),
        });

        if (!_user) {
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }
        let properties: {
          userId: string;
          id: number;
          streetAddress: string;
          streetAddress2: string | null;
          city: string;
          state: string;
          zip: string;
          country: string | null;
          ehv: number | null;
          mb: number | null;
          ltv: number | null;
          liens: number | null;
          matchCount?: number;
        }[] = [];

        if (input?.getProperties) {
          properties = await ctx.db.query.propertys.findMany({
            where: eq(propertys.userId, user?.id ?? "1"),
          });

          const counts = await Promise.all(
            properties.map(async (property) => {
              const propertyId = property.id;
              const matchingMatches = await ctx.db.query.matches.findMany({
                where: eq(matches.propertyId, propertyId),
              });

              const matchCount = matchingMatches.length || 0;
              property.matchCount = matchCount;
              return property;
            }),
          );
        }

        return {
          payload: { user: _user, properties: properties },
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
