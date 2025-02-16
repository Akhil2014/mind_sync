import React, { useState } from 'react';
import { 
  Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, 
  Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField 
} from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Sample booking items (Replace with API data)
const sampleItems = [
  { id: 1, title: 'Deluxe Room', description: 'Luxury room with ocean view', price: 200, status: 'Available', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop' },
  { id: 2, title: 'SUV Rental', description: 'Spacious SUV for road trips', price: 80, status: 'Booked', image: 'https://images.unsplash.com/photo-1615749895081-795f67a15e2b?w=400&h=300&fit=crop' },
  { id: 3, title: 'Spa Service', description: 'Relaxing full-body massage', price: 50, status: 'Available', image: 'https://images.unsplash.com/photo-1598550476431-22c5cc4898d4?w=400&h=300&fit=crop' },
  { id: 4, title: 'Luxury Suite', description: 'Spacious suite with private pool', price: 350, status: 'Available', image: 'https://images.unsplash.com/photo-1613553494071-06c235f296f3?w=400&h=300&fit=crop' },
  { id: 5, title: 'Convertible Rental', description: 'Luxury convertible for city drives', price: 120, status: 'Booked', image: 'https://images.unsplash.com/photo-1616775715422-1cd71f6b2b7a?w=400&h=300&fit=crop' },
  { id: 6, title: 'Yoga Session', description: 'One-hour guided meditation and yoga', price: 40, status: 'Available', image: 'https://images.unsplash.com/photo-1593005510545-89d328652159?w=400&h=300&fit=crop' },
  { id: 7, title: 'Business Room', description: 'Conference room for business meetings', price: 180, status: 'Available', image: 'https://images.unsplash.com/photo-1578898886225-f75c79b767f3?w=400&h=300&fit=crop' },
  { id: 8, title: 'Jet Ski Rental', description: 'Enjoy an hour of jet ski fun', price: 90, status: 'Booked', image: 'https://images.unsplash.com/photo-1522347323580-d9f59c12c03e?w=400&h=300&fit=crop' },
  { id: 9, title: 'Romantic Dinner', description: 'Fine dining experience for two', price: 150, status: 'Available', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop' },
  { id: 10, title: 'City Tour', description: 'Guided tour of the city’s landmarks', price: 70, status: 'Available', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=300&fit=crop' }
];



const Home = () => {
  const [items, setItems] = useState(sampleItems);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle filtering logic
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === 'available') {
      setItems(sampleItems.filter(item => item.status === 'Available'));
    } else if (event.target.value === 'booked') {
      setItems(sampleItems.filter(item => item.status === 'Booked'));
    } else {
      setItems(sampleItems);
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

  // Handle booking confirmation (Replace with API call)
  const handleConfirmBooking = () => {
    console.log("Booking Confirmed:", {
      item: selectedItem,
      date: selectedDate,
      time: selectedTime,
      duration,
      totalPrice
    });
    handleCloseBooking();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Browse Booking Items
        </Typography>

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
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia component="img" height="200" image={item.image} alt={item.title} />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}><b>Price:</b> ${item.price}</Typography>
                  <Typography variant="body2" color={item.status === 'Available' ? 'green' : 'red'}>
                    {item.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    disabled={item.status !== 'Available'} 
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
