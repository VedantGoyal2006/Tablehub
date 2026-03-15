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

export const createRestaurant = async (owner_id, name, city) => {
  const res = await db.query(
    "INSERT INTO restaurants (owner_id, name, city) VALUES ($1,$2,$3) RETURNING *",
    [owner_id, name, city]
  );

  return res.rows[0];
};

export const fetchRestaurantsByCity = async (city) => {
  const res = await db.query("SELECT * FROM restaurants WHERE city = $1", [city]);
  return res.rows;
};

export const updateRestaurantProfile = async (
  restaurant_id,
  address,
  opening_time,
  closing_time,
  image_url
) => {

  const res = await db.query(
    `UPDATE restaurants
     SET address = $1,
         opening_time = $2,
         closing_time = $3,
         image_url = $4
     WHERE restaurant_id = $5
     RETURNING *`,
    [address, opening_time, closing_time, image_url, restaurant_id]
  );

  return res.rows[0];
};