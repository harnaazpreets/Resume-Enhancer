import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function ResumeDisplay() {
  const { enhancedResume } = useContext(UserContext);

  const handleDownload = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/generate-pdf',
        { enhancedResume },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Important for binary data
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Enhanced_Resume.pdf');

      // Append to the document and trigger download
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="resume-display">
      <h3>Your Enhanced Resume</h3>
      {enhancedResume ? (
        <div>
          <button onClick={handleDownload}>Download Resume</button>
        </div>
      ) : (
        <p>No enhanced resume available yet.</p>
      )}
    </div>
  );
}

export default ResumeDisplay;
