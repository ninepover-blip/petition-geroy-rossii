import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const signatures = pgTable(
  "signatures",
  {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 140 }).notNull(),
    city: varchar("city", { length: 140 }).notNull(),
    email: varchar("email", { length: 220 }).notNull().unique(),
    comment: text("comment"),
    isPublic: boolean("is_public").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("signatures_created_at_idx").on(t.createdAt),
    index("signatures_email_lower_idx").on(sql`lower(${t.email})`),
  ]
);

export const shares = pgTable(
  "shares",
  {
    id: serial("id").primaryKey(),
    network: varchar("network", { length: 32 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("shares_created_at_idx").on(t.createdAt)]
);

export const petitionUpdates = pgTable("petition_updates", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 220 }).notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Signature = typeof signatures.$inferSelect;
export type NewSignature = typeof signatures.$inferInsert;
export type PetitionUpdate = typeof petitionUpdates.$inferSelect;
