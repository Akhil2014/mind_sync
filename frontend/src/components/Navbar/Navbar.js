import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For avatar menu
  const [user, setUser] = useState(null); // Stores authenticated user
  const navigate = useNavigate();

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT
    localStorage.removeItem('user'); // Remove user data
    setUser(null);
    navigate('/login'); // Redirect to login
  };

  return (
    <>
      {/* Top AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Logo or App Name */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {user && <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>}
            {user?.role === 'admin' && <Button color="inherit" component={Link} to="/admin">Admin</Button>}

            {user ? (
              <>
                {/* User Avatar & Name */}
                <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
                  <Avatar src={user.avatar || "https://i.pravatar.cc/40"} />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem disabled>{user.username}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { width: 250 } }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          {user && <ListItem button component={Link} to="/dashboard" onClick={handleDrawerToggle}>
            <ListItemText primary="Dashboard" />
          </ListItem>}
          {user?.role === 'admin' && <ListItem button component={Link} to="/admin" onClick={handleDrawerToggle}>
            <ListItemText primary="Admin" />
          </ListItem>}

          {user ? (
            <>
              <ListItem>
                <Avatar src={user.avatar || "https://i.pravatar.cc/40"} sx={{ mr: 2 }} />
                <Typography>{user.username}</Typography>
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
