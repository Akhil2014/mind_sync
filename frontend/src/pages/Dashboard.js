import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Sample booking data (Replace with actual API data)
const sampleBookings = [
  { id: 1, item: 'Room A', date: '2025-02-20', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, item: 'Car Rental', date: '2025-02-22', time: '2:00 PM', status: 'Pending' }
];

const UserDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to handle booking edit (Add actual logic)
  const handleEditBooking = (bookingId) => {
    console.log(`Editing booking with ID: ${bookingId}`);
    // Add logic to navigate to edit page or open modal
  };

  // Function to handle booking cancellation (Add actual logic)
  const handleCancelBooking = (bookingId) => {
    console.log(`Canceling booking with ID: ${bookingId}`);
    // Add logic to cancel the booking in backend
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Item</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Time</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.item}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  {isMobile ? (
                    <>
                      <Button variant="outlined" color="primary" size="small" fullWidth sx={{ mb: 1 }} onClick={() => handleEditBooking(booking.id)}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" size="small" fullWidth onClick={() => handleCancelBooking(booking.id)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outlined" color="primary" size="small" onClick={() => handleEditBooking(booking.id)}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" size="small" sx={{ ml: 1 }} onClick={() => handleCancelBooking(booking.id)}>
                        Cancel
                      </Button>
                    </>
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
