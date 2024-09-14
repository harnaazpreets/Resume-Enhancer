// src/pages/Dashboard.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

// Import the dashboard components
import FileUpload from '../components/FileUpload';
import Feedback from '../components/Feedback';
import ResumeDisplay from '../components/ResumeDisplay';

function Dashboard() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
      {/* Add the dashboard components */}
      <FileUpload />
      <Feedback />
      <ResumeDisplay />
    </div>
  );
}

export default Dashboard;

