import { checkAvailableTable, createBooking, addToWaitingList } from "../models/bookingModel.js";


export const bookTable = async (req, res) => {
  try {
    const { user_id, restaurant_id, number_of_people, arrival_time } = req.body;

    // Check availability
    const availableTable = await checkAvailableTable(restaurant_id, number_of_people, arrival_time);

    if (availableTable) {
      // Confirmed booking
      const booking = await createBooking(user_id, restaurant_id, availableTable.table_id, arrival_time, number_of_people);
      res.json({ status: "confirmed", table_id: availableTable.table_id, booking_id: booking.booking_id });
    } else {
      // Add to waiting list
      const waitEntry = await addToWaitingList(user_id, restaurant_id, number_of_people, arrival_time);
      res.json({ status: "waiting", wait_id: waitEntry.wait_id });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};