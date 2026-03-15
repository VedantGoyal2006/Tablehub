import { fetchRestaurantsByCity, createRestaurant } from "../models/restaurantModel.js";

export const createRestaurantController = async (req, res) => {
  try {
    const { owner_id, name, city } = req.body;

    const restaurant = await createRestaurant(owner_id, name, city);

    res.json({
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating restaurant" });
  }
};

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