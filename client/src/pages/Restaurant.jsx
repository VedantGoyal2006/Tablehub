import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { bookTable } from "../services/api";
import "../styles/Restaurant.css";

function Restaurant() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    user_id: "",
    number_of_people: "",
    date: "",
    time: "",
  });
  const [bookingResult, setBookingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    const { user_id, number_of_people, date, time } = formData;

    // Basic validation
    if (!user_id || !number_of_people || !date || !time) {
      setError("Please fill in all fields!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const arrival_time = `${date}T${time}:00`;
      const res = await bookTable({
        user_id: parseInt(user_id),
        restaurant_id: parseInt(id),
        number_of_people: parseInt(number_of_people),
        arrival_time,
      });
      setBookingResult(res.data);
    } catch (err) {
      setError("Something went wrong. Please try again!");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="restaurant-page">

      {/* Booking Form */}
      <div className="booking-section">
        <h2 className="booking-title">Reserve Your Table</h2>
        <p className="booking-subtitle">Restaurant ID: {id}</p>

        <div className="booking-form">

          <div className="form-group">
            <label>Your User ID</label>
            <input
              type="number"
              name="user_id"
              placeholder="Enter your user ID"
              value={formData.user_id}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Number of People</label>
            <input
              type="number"
              name="number_of_people"
              placeholder="How many guests?"
              value={formData.number_of_people}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button
            className="book-btn"
            onClick={handleBooking}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>

        </div>

        {/* Booking Result */}
        {bookingResult && (
          <div className={`booking-result ${bookingResult.status}`}>
            {bookingResult.status === "confirmed" ? (
              <>
                <h3>✅ Booking Confirmed!</h3>
                <p>Table ID: <strong>{bookingResult.table_id}</strong></p>
                <p>Booking ID: <strong>{bookingResult.booking_id}</strong></p>
              </>
            ) : (
              <>
                <h3>⏳ Added to Waiting List</h3>
                <p>No tables available right now.</p>
                <p>Wait ID: <strong>{bookingResult.wait_id}</strong></p>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Restaurant;