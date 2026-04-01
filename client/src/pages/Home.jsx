import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurantsByCity } from "../services/api";
import "../styles/Home.css";

function Home() {
  const [city, setCity] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const res = await getRestaurantsByCity(city);
      setRestaurants(res.data);
      setSearched(true);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">Find Your Perfect Table</h1>
        <p className="hero-subtitle">
          Discover and book the finest restaurants in your city
        </p>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter your city..."
            className="search-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="restaurants-section">
        {loading && <p className="status-msg">Finding restaurants...</p>}

        {!loading && searched && restaurants.length === 0 && (
          <p className="status-msg">No restaurants found in "{city}"</p>
        )}

        {!loading && restaurants.length > 0 && (
          <>
            <h2 className="section-title">
              Restaurants in {city}
            </h2>
            <div className="restaurant-grid">
              {restaurants.map((r) => (
                <div className="restaurant-card" key={r.restaurant_id}>
                  <div className="card-image">🍽️</div>
                  <div className="card-body">
                    <h3 className="card-name">{r.name}</h3>
                    <p className="card-address">📍 {r.address}</p>
                    <p className="card-time">
                      🕐 {r.opening_time} - {r.closing_time}
                    </p>
                    <button
                      className="card-btn"
                      onClick={() => navigate(`/restaurant/${r.restaurant_id}`)}
                    >
                      Book a Table
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;