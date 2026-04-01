import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantsByCity } from "../services/api";
import "../styles/SearchResults.css";

function SearchResults() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await getRestaurantsByCity(city);
        setRestaurants(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchRestaurants();
  }, [city]);

  return (
    <div className="results-page">
      <div className="results-header">
        <h2 className="results-title">Restaurants in {city}</h2>
        <p className="results-count">
          {restaurants.length} restaurant(s) found
        </p>
      </div>

      {loading && <p className="status-msg">Finding restaurants...</p>}

      {!loading && restaurants.length === 0 && (
        <p className="status-msg">No restaurants found in "{city}"</p>
      )}

      {!loading && restaurants.length > 0 && (
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
      )}
    </div>
  );
}

export default SearchResults;