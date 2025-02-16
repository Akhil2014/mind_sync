import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, 
  Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, CircularProgress 
} from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import API from '../utils/axios'; // Import API for backend requests

const Home = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch items from backend API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get('/items');
        setItems(res.data);
      } catch (error) {
        setError(true);
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Handle filtering logic
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === 'available') {
      setItems(items.filter(item => item.availability === true));
    } else if (event.target.value === 'booked') {
      setItems(items.filter(item => item.availability === false));
    }
  };

  // Handle sorting logic
  const handleSortChange = (event) => {
    setSort(event.target.value);
    let sortedItems = [...items];
    if (event.target.value === 'price-asc') {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (event.target.value === 'price-desc') {
      sortedItems.sort((a, b) => b.price - a.price);
    }
    setItems(sortedItems);
  };

  // Open booking modal
  const handleOpenBooking = (item) => {
    setSelectedItem(item);
    setTotalPrice(item.price);
    setOpenBooking(true);
  };

  // Close booking modal
  const handleCloseBooking = () => {
    setOpenBooking(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setDuration(1);
    setTotalPrice(0);
  };

  // Handle duration change
  const handleDurationChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setDuration(value);
    if (selectedItem) {
      setTotalPrice(selectedItem.price * value);
    }
  };

  // Handle booking confirmation (Send data to backend)
  const handleConfirmBooking = async () => {
    const token = localStorage.getItem('token'); // Ensure user is logged in
    if (!token) {
      alert("Please login to book an item.");
      return;
    }

    const bookingData = {
      itemId: selectedItem._id,
      startDate: selectedDate,
      endDate: selectedDate, // Assuming single-day booking
    };

    try {
      await API.post('/bookings', bookingData);
      alert("Booking confirmed!");
      handleCloseBooking();
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to book item. Please try again.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Browse Booking Items
        </Typography>

        {/* Loading & Error Handling */}
        {loading && <CircularProgress />}
        {error && <Typography color="error">Failed to load items.</Typography>}

        {/* Filtering & Sorting */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Filter</InputLabel>
              <Select value={filter} onChange={handleFilterChange}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="booked">Booked</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort by Price</InputLabel>
              <Select value={sort} onChange={handleSortChange}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price-asc">Lowest to Highest</MenuItem>
                <MenuItem value="price-desc">Highest to Lowest</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Booking Items List */}
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia component="img" height="200" image={item.image} alt={item.title} />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}><b>Price:</b> ${item.price}</Typography>
                  <Typography variant="body2" color={item.availability ? 'green' : 'red'}>
                    {item.availability ? 'Available' : 'Booked'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    disabled={!item.availability} 
                    onClick={() => handleOpenBooking(item)}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Booking Confirmation Dialog */}
        <Dialog open={openBooking} onClose={handleCloseBooking}>
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedItem?.title}</Typography>
            <DatePicker label="Select Date" value={selectedDate} onChange={setSelectedDate} sx={{ mt: 2, width: '100%' }} />
            <TimePicker label="Select Time" value={selectedTime} onChange={setSelectedTime} sx={{ mt: 2, width: '100%' }} />
            <TextField 
              label="Duration (hours)" 
              type="number" 
              fullWidth 
              value={duration} 
              onChange={handleDurationChange} 
              sx={{ mt: 2 }} 
            />
            <Typography variant="h6" sx={{ mt: 2 }}>Total Price: ${totalPrice}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBooking} color="secondary">Cancel</Button>
            <Button onClick={handleConfirmBooking} color="primary" variant="contained">Confirm Booking</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default Home;
