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

// Check for available table
export const checkAvailableTable = async (restaurant_id, number_of_people, arrival_time) => {

  const tablesRes = await db.query(
    "SELECT * FROM tables WHERE restaurant_id = $1 AND capacity >= $2",
    [restaurant_id, number_of_people]
  );

  const tables = tablesRes.rows;

  for (let table of tables) {
    const bookingRes = await db.query(
      `SELECT * FROM bookings
       WHERE table_id = $1
       AND arrival_time BETWEEN $2 - INTERVAL '2 hour'
                           AND $2 + INTERVAL '2 hour'`,
      [table.table_id, arrival_time]
    );
    if (bookingRes.rows.length === 0) {
      return table;
    }
  }
  return null;
};

// Create confirmed booking
export const createBooking = async (user_id, restaurant_id, table_id, arrival_time, number_of_people) => {
  const res = await db.query(
    "INSERT INTO bookings (user_id, restaurant_id, table_id, number_of_people, arrival_time, status) VALUES ($1,$2,$3,$4,$5,'confirmed') RETURNING *",
    [user_id, restaurant_id, table_id, number_of_people, arrival_time]
  );
  return res.rows[0];
};

// Add to waiting list
export const addToWaitingList = async (user_id, restaurant_id, number_of_people, request_time) => {
  const res = await db.query(
    "INSERT INTO waiting_list (user_id, restaurant_id, number_of_people, request_time, status) VALUES ($1,$2,$3,$4,'waiting') RETURNING *",
    [user_id, restaurant_id, number_of_people, request_time]
  );
  return res.rows[0];
};

export const getBookingStatus = async (booking_id) => {
  const res = await db.query(
    `SELECT b.booking_id, b.status, b.arrival_time, r.name AS restaurant_name, t.table_number
     FROM bookings b
     JOIN restaurants r ON b.restaurant_id = r.restaurant_id
     LEFT JOIN tables t ON b.table_id = t.table_id
     WHERE b.booking_id = $1`,
    [booking_id]
  );

  return res.rows[0];
};

export const getWaitingPosition = async (booking_id) => {

  const bookingRes = await db.query(
    "SELECT restaurant_id, arrival_time FROM bookings WHERE booking_id = $1",
    [booking_id]
  );

  const booking = bookingRes.rows[0];

  const queueRes = await db.query(
    `SELECT COUNT(*) 
     FROM bookings
     WHERE restaurant_id = $1 
     AND arrival_time = $2
     AND status = 'waiting'
     AND booking_id < $3`,
    [booking.restaurant_id, booking.arrival_time, booking_id]
  );

  const position = parseInt(queueRes.rows[0].count) + 1;

  return position;
};