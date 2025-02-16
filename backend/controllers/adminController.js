import User from '../models/User.js';
import Booking from '../models/Booking.js';

// @desc    Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user item');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};