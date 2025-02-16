import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField fullWidth label="Email" variant="outlined" margin="normal" />
      <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
      <Button variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Container>
  );
};

export default Login;
