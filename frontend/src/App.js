import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from '@mui/material';


function App() {
  return (
    <>
        {/* <Navbar /> */} 
        <h1>Navbar</h1>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute admin><Admin /></PrivateRoute>} /> */}
          </Routes>
        </Container>

    </>
  );
}

export default App;
