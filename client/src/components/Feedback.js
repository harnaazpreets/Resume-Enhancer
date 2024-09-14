import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Feedback() {
  const { feedback, resumeText, jobDescription, setEnhancedResume } = useContext(UserContext);

  const handleEnhanceResume = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/enhance',
        { resumeText, jobDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set the enhanced resume in the context
      setEnhancedResume(response.data.enhancedResume);
    } catch (error) {
      console.error('Error enhancing resume', error);
    }
  };

  return (
    <div className="feedback">
      <h3>Feedback</h3>
      {feedback ? (
        <div>
          <p>{feedback}</p>
          <button onClick={handleEnhanceResume}>Enhance Resume</button>
        </div>
      ) : (
        <p>No feedback available yet.</p>
      )}
    </div>
  );
}

export default Feedback;
