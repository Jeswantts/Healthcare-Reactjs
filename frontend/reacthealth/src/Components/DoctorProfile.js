import React from 'react';
import {BrowserRouter,Routes,Route,NavLink} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function DoctorProfile() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [doctor, setDoctor] = useState([]);


  
  useEffect(() => {
    const doctorId = localStorage.getItem('doctorId');
  
    fetch(`https://localhost:7258/api/Doctor/${doctorId}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctor(data);
      })
      .catch((error) => {
        console.error('Error fetching doctor details:', error);
      });
  }); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const doctorId = localStorage.getItem('doctorId');
  
    fetch(`https://localhost:7258/api/Doctor/ChangePass/${doctorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Error changing password:');
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error('Error changing password:', error);
      });
  };

  return (
    <div className="container-xl px-4 mt-4">
      <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/Home" activeClassName="active">
                Profile
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Home" activeClassName="active">
                Change Password
              </Nav.Link>
      </Nav>
      <hr className="mt-0 mb-4" />
      <div className="row">
  <div className="col-xl-4">
    <div className="card mb-4 mb-xl-0">
      <div className="card-header">Profile Pic</div>
      <div className="card-body text-center">
        <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
        <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
        <button className="btn btn-primary" type="file">Upload new image</button>
      </div>
    </div>
  </div>
  <div className="col-xl-8">
    <div className="card mb-4">
      <div className="card-header">Doctor Details</div>
      <div className="card-body">
        <form key={doctor.doctor_ID}>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="doctor_Name">Name</label>
            <input className="form-control" id="doctor_Name" type="text" placeholder="Enter your username" value={doctor.doctor_Name} />
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="age">Age</label>
              <input className="form-control" id="age" type="text" placeholder="Enter your first name" value={doctor.age} />
            </div>
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="gender">Gender</label>
              <input className="form-control" id="gender" type="text" placeholder="Enter your last name" value={doctor.gender} />
            </div>
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="specialization">Specialization</label>
              <input className="form-control" id="specialization" type="text" placeholder="Enter your organization name" value={doctor.specialization} />
            </div>
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="consulting_Day">Consulting Day</label>
              <input className="form-control" id="consulting_Day" type="text" placeholder="Enter your location" value={doctor.consulting_Day} />
            </div>
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="consulting_Time">Consulting Time</label>
              <input className="form-control" id="consulting_Time" type="text" placeholder="Enter your organization name" value={doctor.consulting_Time} />
            </div>
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="review">Review</label>
              <input className="form-control" id="review" type="text" placeholder="Enter your location" value={doctor.review} />
            </div>
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="doctor_Email">Email</label>
            <input className="form-control" id="doctor_Email" type="email" placeholder="Enter your email address" value={doctor.doctor_Email} />
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="doctor_Mobile">Phone number</label>
              <input className="form-control" id="doctor_Mobile" type="tel" placeholder="Enter your phone number" value={doctor.doctor_Mobile} />
            </div>
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="emergency_No">Emergency number</label>
              <input className="form-control" id="emergency_No" type="text" name="emergency_No" placeholder="Enter your birthday" value={doctor.emergency_No} />
            </div>
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-md-12">
              <label className="small mb-1" htmlFor="doctor_Address">Address</label>
              <input className="form-control" id="doctor_Address" type="text" name="doctor_Address" placeholder="Enter your birthday" value={doctor.doctor_Address} />
            </div>
          </div>
          <button className="btn btn-primary" type="button">Save changes</button>
        </form>
      </div>
    </div>
  </div>
</div>



      <div className="card mb-4">
        <div className="card-header">Appointment Schedule</div>
        <div className="card-body p-0">
          <div className="table-responsive table-billing-history">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th className="border-gray-200" scope="col">Appointment ID</th>
                  <th className="border-gray-200" scope="col">Patient ID</th>
                  <th className="border-gray-200" scope="col">Reason of Visit</th>
                  <th className="border-gray-200" scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#39201</td>
                  <td>06/15/2021</td>
                  <td>$29.99</td>
                  <td><span className="badge bg-danger text-dark">Pending</span></td>
                </tr>
                <tr>
                  <td>#38125</td>
                  <td>03/15/2021</td>
                  <td>$29.99</td>
                  <td><span className="badge bg-success">Paid</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Change Password</div>
        <div className="card-body">
        <form>
            <div className="mb-3">
              <label className="small mb-1" htmlFor="oldPassword">Current Password</label>
              <input className="form-control" id="oldPassword" name='oldPassword' type="password" value={oldPassword}
              onChange={handleInputChange} placeholder="Enter current password" />
            </div>

            <div className="mb-3">
              <label className="small mb-1" htmlFor="newPassword">New Password</label>
              <input className="form-control" id="newPassword" name='newPassword' type="password" value={newPassword}
              onChange={handleInputChange} placeholder="Enter new password" />
            </div>
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;

