import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

import restaurantRoutes from "./routes/restaurants.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", restaurantRoutes);
app.use("/", bookingRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurants");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});