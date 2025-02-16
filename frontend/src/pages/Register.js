import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const Register = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <TextField fullWidth label="Full Name" variant="outlined" margin="normal" />
      <TextField fullWidth label="Email" variant="outlined" margin="normal" />
      <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
      <Button variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </Container>
  );
};

export default Register;
