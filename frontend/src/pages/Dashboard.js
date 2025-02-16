import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import API from '../utils/axios'; // Import API for backend requests

const UserDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch user bookings from backend API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get('/bookings');
        setBookings(res.data);
      } catch (error) {
        setError(true);
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await API.put(`/bookings/${bookingId}/cancel`);
      setBookings(bookings.map(booking => booking._id === bookingId ? { ...booking, status: 'Cancelled' } : booking));
      alert("Booking cancelled successfully.");
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>

      {/* Loading & Error Handling */}
      {loading && <CircularProgress />}
      {error && <Typography color="error">Failed to load bookings.</Typography>}

      {/* Bookings Table */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Item</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.item?.title || "N/A"}</TableCell>
                <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  {booking.status !== "Cancelled" && (
                    <Button variant="outlined" color="error" size="small" sx={{ ml: 1 }} onClick={() => handleCancelBooking(booking._id)}>
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserDashboard;
