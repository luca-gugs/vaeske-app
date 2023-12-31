import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { propertys } from "~/server/db/schema";

export const propertyRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        street: z.string().min(1),
        street2: z.string().min(1).nullable(),
        city: z.string().min(1),
        state: z.string().min(1),
        zip: z.string().min(1),

        ehv: z.number().min(1),
        mb: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call -- pls use to test ux
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const ltv = input.mb / input.ehv;
      const liens = 0;
      const newProperty = await ctx.db.insert(propertys).values({
        userId: ctx.userId,
        streetAddress: input.street,
        streetAddress2: input.street2,
        city: input.city,
        state: input.state,
        zip: input.zip,
        ehv: input.ehv,
        mb: input.mb,
        ltv: ltv,
        liens: liens,
      });
      return newProperty;
    }),

  //   getCurrent: publicProcedure.query(async ({ ctx }) => {
  //     const [user] = await clerkClient.users.getUserList({
  //       userId: [ctx?.userId ?? ""],
  //     });
  //     return ctx.db.query.users.findFirst({
  //       where: eq(users.id, "1"),
  //     });
  //   }),
});
