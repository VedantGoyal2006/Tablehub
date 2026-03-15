import { fetchRestaurantsByCity, createRestaurant, updateRestaurantProfile } from "../models/restaurantModel.js";

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

export const updateRestaurantProfileController = async (req, res) => {
  try {

    const { restaurant_id } = req.params;

    const {
      address,
      opening_time,
      closing_time,
      image_url
    } = req.body;

    const updatedRestaurant = await updateRestaurantProfile(
      restaurant_id,
      address,
      opening_time,
      closing_time,
      image_url
    );

    res.json({
      message: "Restaurant profile updated",
      restaurant: updatedRestaurant
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Error updating restaurant profile" });

  }
};