import React from 'react';
import {BrowserRouter,Routes,Route,NavLink} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Doctordash() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [doctor, setDoctor] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setimageName] = useState('');
  const [showImageNameInput, setShowImageNameInput] = useState(false);
  const [appointmentRequests,setAppointmentRequests] =  useState('');
  useEffect(() => {
    const doctorId = localStorage.getItem('doctorId');
  
    fetch(`https://localhost:7258/api/Doctor/${doctorId}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctor(data);
        toast.success("Welcome",doctor.doctor_Name);
      })
      .catch((error) => {
        console.error('Error fetching doctor details:', error);
      });
  },[]); 

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
          console.log('Password changed successfully');
          toast.success('Password changed successfully')
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        toast.error('Error changing password')
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setShowImageNameInput(true);
  };

  const handleimageName = (event) =>{
    setimageName(event.target.value);
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('imageName', imageName);
      const doctorId = localStorage.getItem('doctorId');

      const response = await axios.post(`https://localhost:7258/api/Doctor/updateimage/${doctorId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      toast.success("Profile Updated");
      // Handle successful upload

      // Reset selected file state after upload is complete
      setimageName('');
      setSelectedFile(null);
      setShowImageNameInput(false);
    } catch (error) {
      console.error('An error occurred during image upload', error);
      // Handle error
    }
  };

    const [appointments, setAppointments] = useState([]);
  
    const handleConfirmAppointment = async (appointment_ID) => {
      console.log('Appointment ID:', appointment_ID);    
      try {
        await axios.put('https://localhost:7032/api/Appoint/Status', {
          appointment_ID: appointment_ID,
          status: 'Confirmed'
        });
  
        const updatedAppointments = appointmentRequests.map(appointment => {
          if (appointment.appointment_ID === appointment_ID) {
            return { ...appointment, status: 'Confirmed' };
          }
          return appointment;
        });
  
        setAppointmentRequests(updatedAppointments);
      } catch (error) {
        console.log(error);
      }
    };
  
    const fetchAppointments = async () => {
      try {

        const doctorId = localStorage.getItem('doctorId');
        const response = await fetch(`https://localhost:7032/api/Appoint/FilterbyDoctor/${doctorId}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error('Error occurred while fetching appointments:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching appointments:', error);
        // Handle error
      }
    };
  
    // Call fetchAppointments when the component mounts to fetch the initial list of appointments
    useEffect(() => {
      fetchAppointments();
    }, []);

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
        <img className="img-account-profile rounded-circle mb-2" src={`/Images/${doctor.imageName}`} width={300}height={300} alt="" />
        <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
        <input
  type="file"
  onChange={handleFileChange}
  style={{
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px 12px',
    backgroundColor: '#f8f8f8',
    color: '#555',
  }}
/>
      {showImageNameInput && (
        <input type="text" value={imageName} onChange={handleimageName} />
        )}
        {selectedFile && <p>Selected file: {selectedFile.imageName}</p>}
      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
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
              <input className="form-control" id="consulting_Day" type="text" placeholder="Enter your location" value={doctor.constulting_Day} />
            </div>
          </div>
          <div className="row gx-3 mb-3">
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="consulting_Time">Consulting Time</label>
              <input className="form-control" id="consulting_Time" type="text" placeholder="Enter your organization name" value={doctor.constulting_Time} />
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
                  <th className="border-gray-200" scope="col">Accept/Reject</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
            <tr key={appointment.appoinment_ID}>
              <td>{appointment.appoinment_ID}</td>
              <td>{appointment.patient_ID}</td>
              <td>{appointment.reason_of_visit}</td>
              <td>
              <span className={`badge ${appointment.status === 'waiting' ? 'bg-warning text-dark' : 'bg-success text-light'}`}>
  {appointment.status}
</span>
              </td>
              <td>
                <button className="btn btn-success" onClick={() => handleConfirmAppointment(appointment.appoinment_ID)}>Accept</button>
                <button className="btn btn-danger" onClick={() => handleConfirmAppointment(appointment.appoinment_ID)}>Reject</button>
              </td>
            </tr>
          ))}
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
export default Doctordash;

