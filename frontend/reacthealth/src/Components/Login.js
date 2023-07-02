import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function Login() {
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
        navigate('/Doctor');
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
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
        <form onSubmit={proceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>User Name <span className="errmsg">*</span></label>
                <input value={userName} onChange={(e) => setUsername(e.target.value)} className="form-control"></input>
              </div>
              <div className="form-group">
                <label>Password <span className="errmsg">*</span></label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Login</button> |
              <Link className="btn btn-success" to="/register">New User</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

