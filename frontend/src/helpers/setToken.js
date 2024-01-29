import axios from 'axios';

// Helper function to set JWT token in Axios headers
const setAuthToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    // Apply the token to every request header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Remove the token if not present
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
