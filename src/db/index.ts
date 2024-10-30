import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../../env";

const client = postgres(env.DATABASE_URL, { prepare: false });
const db = drizzle({ client });

async function main() {
  async function createRUMIndex() {
    const sql = `
      CREATE INDEX CONCURRENTLY idx_products_name_rum
      ON products USING rum (name);
    `;

    try {
      await db.execute(sql);
      console.log("RUM index created successfully.");
    } catch (error) {
      console.error("Error creating RUM index:", error);
    }
  }

  try {
    // Wait for the RUM index creation to complete
    await createRUMIndex();
  } catch (error) {
    console.error("Error in main function:", error);
  } finally {
    // Close the database connection
    await client.end();
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
});
