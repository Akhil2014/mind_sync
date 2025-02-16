import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from '@mui/material';
import PrivateRoute from './utils/PrivateRoute';
import Home  from './pages/Home';
import Login  from './pages/Login';
import Register  from './pages/Register';
import Admin  from './pages/Admin';
import Dashboard  from './pages/Dashboard';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <>
        <Navbar /> 
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute admin><Admin /></PrivateRoute>} />
          </Routes>
        </Container>
    </>
  );
}

export default App;
