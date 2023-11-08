// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  float,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `vaeske_${name}`);

export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    email: varchar("email", { length: 256 }).notNull(),
    creditScore: varchar("creditScore", { length: 256 }),
    type: varchar("type", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.email),
  }),
);

export const property = mysqlTable(
  "property",
  {
    // Id Fields
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    userId: varchar("userId", { length: 256 }).notNull(),

    //Address Fields
    streetAddress: varchar("street_address", { length: 256 }).notNull(),
    streetAddress2: varchar("street_address2", { length: 256 }),
    city: varchar("city", { length: 256 }).notNull(),
    state: varchar("state", { length: 256 }).notNull(),
    zip: varchar("zip", { length: 256 }).notNull(),
    country: varchar("country", { length: 256 }),

    //Financial Fields
    ehv: bigint("ehv", { mode: "number" }),
    mb: bigint("mb", { mode: "number" }),
    ltv: float("ltv"),
    liens: bigint("liens", { mode: "number" }),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.userId),
  }),
);
