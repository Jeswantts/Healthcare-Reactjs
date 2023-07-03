import React, { useState } from 'react';
import axios from 'axios';

const Appointment = () => {
  const [appointmentData, setAppointmentData] = useState({
    patient_Id: 0,
    doctor_Id: 0,
    reason_of_visit: '',
  });

  const [submittedAppointment, setSubmittedAppointment] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7032/api/Appoint/SetAppoint', appointmentData);
      setSubmittedAppointment(response.data);
      // Handle successful appointment submission
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <h3>Appointment Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient ID:</label>
          <input
            type="number"
            name="patient_Id"
            value={appointmentData.patient_Id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Doctor ID:</label>
          <input
            type="number"
            name="doctor_Id"
            value={appointmentData.doctor_Id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Reason of Visit:</label>
          <input
            type="text"
            name="reason_of_visit"
            value={appointmentData.reason_of_visit}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit Appointment</button>
      </form>

      {submittedAppointment && (
        <div className="card">
          <div className="card-header">Submitted Appointment Details</div>
          <div className="card-body">
            <p>Patient ID: {submittedAppointment.patient_Id}</p>
            <p>Doctor ID: {submittedAppointment.doctor_Id}</p>
            <p>Reason of Visit: {submittedAppointment.reason_of_visit}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
