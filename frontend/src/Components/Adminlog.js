import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminlog = () => {
  const [adminData, setAdminData] = useState({
    adminName: '',
    adminPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7137/api/Admin/Admin', adminData);
      const token = response.data;

      // Perform desired actions with the token (e.g., store it in localStorage, redirect, etc.)
      localStorage.setItem('Token:', token);
    } catch (error) {
      setErrorMessage('Invalid credentials');
      console.error(error);
      navigate('/Admin');
    }
  };

  return (
    <div>
      <h3>Admin Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="adminName"
            value={adminData.adminName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="adminPassword"
            value={adminData.adminPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Adminlog;
