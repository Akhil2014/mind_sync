import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1">
        Welcome to our website! Explore our features and enjoy the experience.
      </Typography>
    </Container>
  );
};

export default Home;
