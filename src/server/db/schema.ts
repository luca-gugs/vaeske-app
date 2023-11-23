// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  float,
  index,
  mysqlTableCreator,
  timestamp,
  unique,
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
    first: varchar("first", { length: 256 }).notNull(),
    last: varchar("last", { length: 256 }).notNull(),
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

export const propertys = mysqlTable(
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

    //Other
    matches: bigint("matches", { mode: "number" }),

    // TimeStamps
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.userId),
  }),
);

export const orgs = mysqlTable(
  "org",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    email: varchar("email", { length: 256 }).notNull(),
    phone: varchar("phone", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }).notNull(),
    // TimeStamps
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    slugIndex: index("slug_idx").on(example.slug),
  }),
);

export const buyboxes = mysqlTable(
  "buybox",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    orgId: varchar("orgId", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    disallowedStates: varchar("disallowedStates", { length: 256 })
      .notNull()
      .default(""),
    disallowedZips: varchar("disallowedZips", { length: 256 })
      .notNull()
      .default(""),

    // TimeStamps
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    orgIdIndex: index("orgId_idx").on(example.orgId),
  }),
);

export const rules = mysqlTable(
  "rule",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    buyBoxId: bigint("buyBoxId", { mode: "number" }).notNull(),
    key: varchar("key", { length: 256 }).notNull(),
    params: varchar("params", { length: 256 }).notNull(),
    value: varchar("value", { length: 256 }).notNull(),
    valueType: varchar("valueType", { length: 256 }).notNull(),
    // TimeStamps
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    buyBoxIdIndex: index("buyBoxId_idx").on(example.buyBoxId),
  }),
);

export const matches = mysqlTable(
  "match",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    buyBoxId: bigint("buyBoxId", { mode: "number" }).notNull(),
    orgId: varchar("orgId", { length: 256 }).notNull(),
    propertyId: bigint("propertyId", { mode: "number" }).notNull(),

    // TimeStamps
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    buyBoxIdIndex: index("buyBoxId_idx").on(example.buyBoxId),
    orgIdIndex: index("orgId_idx").on(example.orgId),
    propertyId: index("propertyId_idx").on(example.propertyId),
    unq: unique().on(example.buyBoxId, example.propertyId),
  }),
);
