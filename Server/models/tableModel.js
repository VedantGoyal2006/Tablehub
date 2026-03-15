import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

export const addTables = async (restaurant_id, tables) => {

  const createdTables = [];

  // find current max table number
  const maxTableRes = await db.query(
    "SELECT MAX(table_number) FROM tables WHERE restaurant_id=$1",
    [restaurant_id]
  );

  let currentTableNumber = maxTableRes.rows[0].max || 0;

  for (let table of tables) {

    currentTableNumber++;

    const res = await db.query(
      "INSERT INTO tables (restaurant_id, table_number, capacity) VALUES ($1,$2,$3) RETURNING *",
      [restaurant_id, currentTableNumber, table.capacity]
    );

    createdTables.push(res.rows[0]);
  }

  return createdTables;
};