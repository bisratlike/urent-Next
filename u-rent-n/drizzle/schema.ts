import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name"),
    description: text("description"),
    price: numeric("price"),
    picture: text("picture"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});