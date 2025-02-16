import React from 'react';
import { Container, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        View your stats, manage your profile, and access your activities here.
      </Typography>
    </Container>
  );
};

export default Dashboard;
