
import React, { useState } from 'react';
import axios from 'axios';
import { VariablesP } from './VariableP';
import './Patient.css';

const Patient = () => {
  const [patientData, setPatientData] = useState({
    patient: {
      patient_Name: '',
      age: 0,
      gender: '',
      bloodGroup: '',
      patient_Address: '',
      patient_Phone: 0,
      patient_Email: '',
      patient_UserName: '',
    },
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevState) => ({
      ...prevState,
      patient: {
        ...prevState.patient,
        [name]: value,
      },
    }));
  };

  const handlePasswordChange = (e) => {
    setPatientData((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(VariablesP.API_URL + 'Patient', patientData);
      console.log(response.data);
      // Handle successful patient addition
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="container-fluid register">
      <div className="row">
        <div className="col-md-3 register-left">
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h3>Welcome</h3>
          <p>To Book Your Appointment Please Register.You Can Expect The Best Care."Nanga Irukom"</p>
          <input type="submit" name="" value="Login" />
          <br />
        </div>
        <div className="col-md-9 register-right">
          
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <h3 className="register-heading">Patient Register</h3>
              <div className="row register-form">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name *"
                      name="patient_Name"
                      value={patientData.patient_Name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Age*"
                      name="age"
                      value={patientData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password *"
                      name="password"
                      value={patientData.password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Gender*"
                      name="gender"
                      value={patientData.gender}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username*"
                      name="patient_UserName"
                      value={patientData.patient_UserName}
                      onChange={handleInputChange}
                    />
                  </div>
                
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email *"
                      name="patient_Email"
                      value={patientData.patient_Email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      minLength="10"
                      maxLength="10"
                      className="form-control"
                      placeholder="Phone number *"
                      name="patient_Phone"
                      value={patientData.patient_Phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                    type='text'
                      className="form-control"
                      name="bloodGroup"
                      placeholder="BloodGroup*"
                      value={patientData.bloodGroup}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address*"
                      name="patient_Address"
                      value={patientData.patient_Address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btnRegister"
                    value="Register"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
