import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode'; // Updated import statement

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate(); // For navigation after registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to backend for registration
      const response = await axios.post('http://localhost:5000/api/auth/register', {
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
      console.error('Registration error:', error);

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
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login here.</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
