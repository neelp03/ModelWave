// File: src/routes/api/metrics/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { metrics } from '$lib/server/db/schema';

// POST: Add metrics to the database
export const POST: RequestHandler = async ({ request }) => {
  const { modelId, version, accuracy, precision, recall } = await request.json();

  const result = await db
    .insert(metrics)
    .values({
      modelId,
      version,
      accuracy,
      precision,
      recall,
    })
    .returning();

  return json(result);
};

// GET: Retrieve all metrics from the database
export const GET: RequestHandler = async () => {
  const result = await db.select().from(metrics);
  return json(result);
};
