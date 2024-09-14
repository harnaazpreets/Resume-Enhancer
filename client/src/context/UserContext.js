// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Updated import statement

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User data (email, id)
  const [feedback, setFeedback] = useState(null); // Feedback from Claude API
  const [enhancedResume, setEnhancedResume] = useState(null); // Enhanced resume text
  const [resumeText, setResumeText] = useState(null); // Parsed resume text
  const [jobDescription, setJobDescription] = useState(null); // Job description text

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Use the named import
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
        } else {
          setUser({ id: decoded.user.id, email: decoded.user.email });
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const logout = () => {
    // Remove the token from localStorage and reset user state
    localStorage.removeItem('token');
    setUser(null);
    // Clear other state variables if necessary
    setFeedback(null);
    setEnhancedResume(null);
    setResumeText(null);
    setJobDescription(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        feedback,
        setFeedback,
        enhancedResume,
        setEnhancedResume,
        resumeText,
        setResumeText,
        jobDescription,
        setJobDescription,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};