import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './LoginD.css';
import LoginRegD from './LoginRegD';



export default function LoginD() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      const User = { userName, password };

      fetch("https://localhost:7258/api/Auth/Doctor", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(User),
      })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Return the response as JSON
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then((data) => {
        const { token, doctorId } = data;
        console.log(token); // Log the token for debugging
        console.log(doctorId); // Log the doctorId for debugging
        localStorage.setItem('token', token);
        localStorage.setItem('doctorId', doctorId); // Store the doctorId in localStorage
        toast.success('Success');
        navigate('/Doctordash');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error(error.message);
      });
  }
};

  const validate = () => {
    let result = true;
    if (userName === '' || userName === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  };

  return (
    <div className="pagee-container">
    <form className="login-form" onSubmit={proceedLogin}>
      <h2>Login</h2>
      <div className="form-group hhh">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group hhh">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group hhh">
        <button className='hee' type="submit">Login</button>
      </div>
    </form>
  </div>
  );
}

