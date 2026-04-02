import React, { useState } from "react";
import { getUserBookings, cancelBooking } from "../services/api";
import "../styles/MyBookings.css";

function MyBookings() {
  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!userId.trim()) {
      setError("Please enter your User ID!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await getUserBookings(userId);
      setBookings(res.data);
      setSearched(true);
    } catch (err) {
      setError("Something went wrong. Please try again!");
      console.log(err);
    }
    setLoading(false);
  };

  const handleCancel = async (booking_id) => {
    try {
      await cancelBooking(booking_id);
      setBookings(bookings.filter((b) => b.booking_id !== booking_id));
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusStyle = (status) => {
    if (status === "confirmed") return "badge confirmed";
    if (status === "waiting") return "badge waiting";
    if (status === "cancelled") return "badge cancelled";
    return "badge";
  };

  return (
    <div className="mybookings-page">
      <div className="mybookings-container">
        <h2 className="mybookings-title">My Bookings</h2>
        <p className="mybookings-subtitle">
          Enter your User ID to view your reservations
        </p>

        {/* Search */}
        <div className="userid-bar">
          <input
            type="number"
            placeholder="Enter your User ID..."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetch()}
            className="userid-input"
          />
          <button className="userid-btn" onClick={handleFetch}>
            {loading ? "Loading..." : "View Bookings"}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {/* No bookings found */}
        {!loading && searched && bookings.length === 0 && (
          <p className="status-msg">No bookings found for User ID: {userId}</p>
        )}

        {/* Bookings List */}
        {!loading && bookings.length > 0 && (
          <div className="bookings-list">
            {bookings.map((b) => (
              <div className="booking-card" key={b.booking_id}>
                <div className="booking-card-header">
                  <h3 className="booking-restaurant">{b.restaurant_name}</h3>
                  <span className={getStatusStyle(b.status)}>
                    {b.status}
                  </span>
                </div>
                <div className="booking-card-body">
                  <p>🕐 {formatDate(b.arrival_time)}</p>
                  {b.table_number && (
                    <p>🪑 Table: <strong>{b.table_number}</strong></p>
                  )}
                  <p>🔖 Booking ID: <strong>{b.booking_id}</strong></p>
                </div>
                {b.status === "confirmed" || b.status === "waiting" ? (
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(b.booking_id)}
                  >
                    Cancel Booking
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;