import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  useMediaQuery, CircularProgress 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import API from '../utils/axios';

const AdminPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Modal states
  const [openItemModal, setOpenItemModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', price: '', availability: true });
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user' });

  // Fetch items and users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, usersRes] = await Promise.all([
          API.get('/items'),
          API.get('/admin/users')
        ]);
        setItems(itemsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Open & Close modals
  const handleOpenItemModal = () => setOpenItemModal(true);
  const handleCloseItemModal = () => setOpenItemModal(false);
  const handleOpenUserModal = () => setOpenUserModal(true);
  const handleCloseUserModal = () => setOpenUserModal(false);

  // Handle input changes
  const handleItemChange = (e) => setNewItem({ ...newItem, [e.target.name]: e.target.value });
  const handleUserChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  // Add Item (Admin only)
  const handleAddItem = async () => {
    try {
      const res = await API.post('/items', newItem);
      setItems([...items, res.data]);
      handleCloseItemModal();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };

  // Delete Item (Admin only)
  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await API.delete(`/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  // Add User (Admin only)
  const handleAddUser = async () => {
    try {
      const res = await API.post('/auth/register', newUser);
      setUsers([...users, res.data]);
      handleCloseUserModal();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  // Delete User (Admin only)
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`/admin/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      {/* Loading & Error Handling */}
      {loading && <CircularProgress />}
      {error && <Typography color="error">Failed to load data.</Typography>}

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
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.availability ? 'Available' : 'Booked'}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteItem(item._id)}>
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
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                <IconButton color="primary" onClick={() => handleOpenUserModal(user)}>
              <Edit />
            </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteUser(user._id)}>
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
          <TextField fullWidth label="Item Name" name="title" onChange={handleItemChange} sx={{ mt: 2 }} />
          <TextField fullWidth label="Price" name="price" type="number" onChange={handleItemChange} sx={{ mt: 2 }} />
          <TextField fullWidth label="Description" name="description" onChange={handleItemChange} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseItemModal} color="secondary">Cancel</Button>
          <Button onClick={handleAddItem} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      
      <Dialog open={openUserModal} onClose={handleCloseUserModal}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" name="username" onChange={handleUserChange} sx={{ mt: 2 }} />
          <TextField fullWidth label="Role" name="role" onChange={handleUserChange} sx={{ mt: 2 }} />
          <TextField fullWidth label="Email" name="email" type="email" onChange={handleUserChange} sx={{ mt: 2 }} />
          <TextField fullWidth label="Password" name="password" type="password" onChange={handleUserChange} sx={{ mt: 2 }} />
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
