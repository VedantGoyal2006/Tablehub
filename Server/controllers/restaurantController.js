import { fetchRestaurantsByCity } from "../models/restaurantModel.js";

export const getRestaurantsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    const restaurants = await fetchRestaurantsByCity(city);
    res.json(restaurants);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to fetch restaurants" });
  }
};