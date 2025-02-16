import express from 'express';
import { getAllUsers, deleteUser, getAllBookings } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/bookings', getAllBookings);

export default router;