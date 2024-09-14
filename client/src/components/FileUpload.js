import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function FileUpload() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [message, setMessage] = useState('');
  const { setFeedback, setResumeText, setJobDescription } = useContext(UserContext);

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDesc(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage('Please upload your resume.');
      return;
    }

    if (!jobDesc) {
      setMessage('Please paste the job description.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDesc);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Update context with feedback, resumeText, and jobDescription
      setFeedback(response.data.feedback);
      setResumeText(response.data.resumeText);
      setJobDescription(response.data.jobDescription);
      setMessage('Files uploaded and feedback received!');
    } catch (error) {
      console.error('Error uploading files', error);
      setMessage('Error uploading files. Please try again.');
    }
  };

  return (
    <div className="file-upload">
      <h3>Upload Your Resume and Job Description</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Resume:</label>
          <input type="file" onChange={handleResumeChange} accept=".pdf,.txt,.docx" required />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea
            value={jobDesc}
            onChange={handleJobDescriptionChange}
            placeholder="Paste job description here"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUpload;
