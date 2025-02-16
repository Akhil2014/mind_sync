import React, { useState } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  useMediaQuery 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// Sample data (Replace with API data)
const sampleItems = [
  { id: 1, name: 'Deluxe Room', price: '$200', status: 'Available' },
  { id: 2, name: 'SUV Rental', price: '$80', status: 'Booked' }
];

const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
  { id: 2, name: 'Admin User', email: 'admin@example.com', role: 'Admin' }
];

const AdminPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for managing modals
  const [openItemModal, setOpenItemModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const [newItem, setNewItem] = useState({ name: '', price: '', status: 'Available' });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });

  // Open & Close modals
  const handleOpenItemModal = () => setOpenItemModal(true);
  const handleCloseItemModal = () => setOpenItemModal(false);

  const handleOpenUserModal = () => setOpenUserModal(true);
  const handleCloseUserModal = () => setOpenUserModal(false);

  // Handle form input changes
  const handleItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add Item (Replace with API call)
  const handleAddItem = () => {
    console.log("New Item Added:", newItem);
    handleCloseItemModal();
  };

  // Add User (Replace with API call)
  const handleAddUser = () => {
    console.log("New User Added:", newUser);
    handleCloseUserModal();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      {/* Booking Items Management */}
      <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
        Manage Booking Items
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mb: 2 }} onClick={handleOpenItemModal}>
        Add Item
      </Button>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Management */}
      <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
        Manage Users
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} sx={{ mb: 2 }} onClick={handleOpenUserModal}>
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Item Modal */}
      <Dialog open={openItemModal} onClose={handleCloseItemModal}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Item Name" name="name" value={newItem.name} onChange={handleItemChange} sx={{ mt: 2 }} />
          <TextField fullWidth label="Price" name="price" type="number" value={newItem.price} onChange={handleItemChange} sx={{ mt: 2 }} />
          <TextField fullWidth label="Status" name="status" value={newItem.status} onChange={handleItemChange} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseItemModal} color="secondary">Cancel</Button>
          <Button onClick={handleAddItem} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Add User Modal */}
      <Dialog open={openUserModal} onClose={handleCloseUserModal}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Full Name" name="name" value={newUser.name} onChange={handleUserChange} sx={{ mt: 2 }} />
          <TextField fullWidth label="Email" name="email" type="email" value={newUser.email} onChange={handleUserChange} sx={{ mt: 2 }} />
          <TextField fullWidth label="Role" name="role" value={newUser.role} onChange={handleUserChange} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserModal} color="secondary">Cancel</Button>
          <Button onClick={handleAddUser} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPanel;
