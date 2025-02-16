import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Admin', path: '/admin' },
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
  ];

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
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navLinks.map((link) => (
              <Button key={link.title} color="inherit" component={Link} to={link.path}>
                {link.title}
              </Button>
            ))}
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
        sx={{
          '& .MuiDrawer-paper': { width: 250 }
        }}
      >
        <List>
          {navLinks.map((link) => (
            <ListItem button key={link.title} component={Link} to={link.path} onClick={handleDrawerToggle}>
              <ListItemText primary={link.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
