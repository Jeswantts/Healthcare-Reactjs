import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientView.css';
import { Link } from 'react-router-dom';


function PatientView() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('https://localhost:7258/api/Doctor/DoctorView');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors', error);
    }
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="row">
        {doctors.map((doctor) => (
          <div className="col-md-3" key={doctor.doctor_Name}>
            <div className="card-sl">
              <div className="card-image">
                <img src={`/Images/${doctor.imageName}`} width={300} height={200} alt={doctor.doctor_Name} />
              </div>
              {doctor.status === 'active' && (
        <a className="card-action active">
          <i className="dot"></i>
        </a>
    )}
              {doctor.status != 'active' && (
        <a className="card-action inactive">
          <i className="dot"></i>
        </a>
    )}
              <div className="card-heading">
                {doctor.doctor_Name}
              </div>
              <div className="card-text">
                Mobile: {doctor.doctor_Mobile}
              </div>
              <div className="card-text">
                Age: {doctor.age}
              </div>
              <div className="card-text">
                Specialization: {doctor.specialization}
              </div>
              <div className="card-text">
                Experience: {doctor.doctor_Experience}
              </div>
              <div className="card-text">
                Consulting Day: {doctor.constulting_Day}
              </div>
              <div className="card-text">
                Consulting Time: {doctor.constulting_Time}
              </div>
              <div className="card-text">
                Review: {doctor.review}
              </div>
              
              <Link to={`/Appoint?doctorId=${doctor.doctor_ID}`} className="card-button">Book Appointment</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientView;
