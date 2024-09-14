import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode'; // Updated import statement

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate(); // For navigation after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to backend for authentication
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Check if response and response.data exist
      if (response && response.data && response.data.token) {
        // Store token in localStorage
        const token = response.data.token;
        localStorage.setItem('token', token);

        // Decode token to get user info
        const decoded = jwtDecode(token); // Use the named import
        setUser({ id: decoded.user.id, email: email });

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        console.error('Invalid response from server:', response);
        // Handle invalid response (e.g., display error message)
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.data) {
        console.error('Error response data:', error.response.data);
        // Handle error (e.g., display error message to user)
      } else {
        console.error('An unexpected error occurred:', error);
        // Handle unexpected errors
      }
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here.</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;