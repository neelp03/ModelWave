// File: src/routes/api/models/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { models } from '$lib/server/db/schema';

// POST: Add a new model to the database
export const POST: RequestHandler = async ({ request }) => {
  const { name, description } = await request.json();

  const result = await db
    .insert(models)
    .values({
      name,
      description,
    })
    .returning();

  return json(result);
};

// GET: Retrieve all models from the database
export const GET: RequestHandler = async () => {
  const result = await db.select().from(models);
  return json(result);
};
