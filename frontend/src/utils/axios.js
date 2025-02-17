import axios from 'axios';

// Set the base URL of your backend
const API = axios.create({
  baseURL: 'https://mind-sync-1.onrender.com/api/', // Change this if your backend is deployed
});

// Attach JWT token to every request if the user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
