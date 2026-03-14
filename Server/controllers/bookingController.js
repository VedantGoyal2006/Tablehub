import { checkAvailableTable, createBooking, addToWaitingList } from "../models/bookingModel.js";
import { getBookingStatus, getWaitingPosition } from "../models/bookingModel.js";
import { cancelBooking, getFirstWaitingBooking, promoteWaitingBooking } from "../models/bookingModel.js";
import { getUserBookings } from "../models/bookingModel.js";


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

export const checkBookingStatus = async (req, res) => {
  try {

    const { booking_id } = req.params;

    const booking = await getBookingStatus(booking_id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "waiting") {

      const position = await getWaitingPosition(booking_id);

      return res.json({
        status: "waiting",
        restaurant: booking.restaurant_name,
        arrival_time: booking.arrival_time,
        position: position
      });

    }

    res.json({
      status: "confirmed",
      restaurant: booking.restaurant_name,
      table_number: booking.table_number,
      arrival_time: booking.arrival_time
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Server error" });

  }
};


export const cancelBookingController = async (req, res) => {

  try {

    const { booking_id } = req.params;

    const cancelled = await cancelBooking(booking_id);

    if (!cancelled) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const restaurant_id = cancelled.restaurant_id;
    const arrival_time = cancelled.arrival_time;
    const table_id = cancelled.table_id;

    if (table_id) {

      const waitingBooking = await getFirstWaitingBooking(
        restaurant_id,
        arrival_time
      );

      if (waitingBooking) {

        const promoted = await promoteWaitingBooking(
          waitingBooking.booking_id,
          table_id
        );

        return res.json({
          message: "Booking cancelled and waiting user promoted",
          promoted_booking: promoted
        });

      }

    }

    res.json({
      message: "Booking cancelled successfully"
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Server error" });

  }

};

export const getUserBookingsController = async (req, res) => {

  try {

    const { user_id } = req.params;

    const bookings = await getUserBookings(user_id);

    res.json(bookings);

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Server error" });

  }

};