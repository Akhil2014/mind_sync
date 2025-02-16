import Booking from '../models/Booking.js';
import Item from '../models/Item.js';

//   Create booking
export const createBooking = async (req, res) => {
  try {
    const { itemId, startDate, endDate } = req.body;
    const item = await Item.findById(itemId);
    
    if (!item.availability) {
      return res.status(400).json({ error: 'Item not available' });
    }

    const durationHours = (new Date(endDate) - new Date(startDate)) / (1000 * 3600);
    const totalPrice = durationHours * item.price;

    const booking = await Booking.create({
      user: req.user.id,
      item: itemId,
      startDate,
      endDate,
      totalPrice
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//    Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('item');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

//   Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};