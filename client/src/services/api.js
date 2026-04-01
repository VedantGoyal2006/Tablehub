import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// ── Restaurants ──────────────────────────────
export const getRestaurantsByCity = (city) =>
  API.get(`/restaurants/restaurants?city=${city}`);

// ── Bookings ──────────────────────────────────
export const bookTable = (data) => 
  API.post("/bookings", data);

export const getBookingStatus = (booking_id) =>
  API.get(`/booking-status/${booking_id}`);

export const cancelBooking = (booking_id) =>
  API.delete(`/cancel-booking/${booking_id}`);

export const getUserBookings = (user_id) =>
  API.get(`/user-bookings/${user_id}`);