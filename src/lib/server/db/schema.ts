import { pgTable, serial, text, timestamp, integer, doublePrecision } from 'drizzle-orm/pg-core';

// User table (keep if you plan to use it for authentication or profiles)
export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    age: integer('age'),
});

// Models table for model metadata
export const models = pgTable('models', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  description: text('description'),
});

// Metrics table for model evaluation metrics
export const metrics = pgTable('metrics', {
  id: serial('id').primaryKey(),
  modelId: integer('model_id').references(() => models.id).notNull(),
  version: integer('version').notNull(),
  accuracy: doublePrecision('accuracy'),
  precision: doublePrecision('precision'),
  recall: doublePrecision('recall'),
  createdAt: timestamp('created_at').defaultNow(),
});
