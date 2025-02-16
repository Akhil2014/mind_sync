import React from 'react';
import { Container, Typography } from '@mui/material';

const Admin = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Typography variant="body1">
        Welcome to the Admin panel. Manage users and settings here.
      </Typography>
    </Container>
  );
};

export default Admin;
