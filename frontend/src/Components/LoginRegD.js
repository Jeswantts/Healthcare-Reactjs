import React, { Component } from 'react';
import './LoginRegD.css';
import { VariablesD } from './VariablesD';
import { toast } from 'react-toastify';

class LoginRegD extends Component {
  state = {
    doctor_Name: '',
    age: 0,
    dob: new Date(),
    gender: '',
    specialization: '',
    doctor_Email: '',
    doctor_Address: '',
    doctor_Mobile: 0,
    emergency_No: 0,
    doctor_Experience: '',
    constulting_Day: '',
    constulting_Time: new Date(),
    username: '',
    password: '',
    status: '',
    imageName: '',
    file: null,
    review: '',
  };

  CreateDoctor = () => {
    const {
      doctor_Name,
      age,
      dob,
      gender,
      specialization,
      doctor_Email,
      doctor_Address,
      doctor_Mobile,
      emergency_No,
      doctor_Experience,
      constulting_Day,
      constulting_Time,
      username,
      password,
      imageName,
      status,
      file,
      review,
    } = this.state;

    // Create a new doctor object with the form data
    const formData = new FormData();
    formData.append('doctor.doctor_Name', doctor_Name);
    formData.append('doctor.age', age);
    formData.append('doctor.dob', dob);
    formData.append('doctor.gender', gender);
    formData.append('doctor.specialization', specialization);
    formData.append('doctor.doctor_Email', doctor_Email);
    formData.append('doctor.doctor_Address', doctor_Address);
    formData.append('doctor.doctor_Mobile', doctor_Mobile);
    formData.append('doctor.emergency_No', emergency_No);
    formData.append('doctor.doctor_Experience', doctor_Experience);
    formData.append('doctor.constulting_Day', constulting_Day);
    formData.append('doctor.constulting_Time', constulting_Time);
    formData.append('doctor.username', username);
    formData.append('doctor.imageName', imageName);
    formData.append('password', password);
    formData.append('doctor.status', status);
    formData.append('doctor.file', file);
    formData.append('doctor.review', review);

    fetch(VariablesD.API_URL + 'Doctor', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Doctor is created', data);
        toast.success('Doctor is created');
        this.setState({
          doctor_Name: '',
          age: 0,
          gender: '',
          dob: new Date(),
          specialization: '',
          doctor_Email: '',
          doctor_Address: '',
          doctor_Mobile: 0,
          emergency_No: 0,
          doctor_Experience: '',
          constulting_Day: '',
          constulting_Time: new Date(),
          username: '',
          password: '',
          status: 'waiting',
          file: null,
          review: '',
        });

        this.fetchDoctor();
      })
      .catch((error) => {
        console.error('Error creating doctor:', error);
        toast.error('Error creating doctor:', error);
      });
  };

  handleDoctorNameInputChange = (event) => {
    this.setState({ doctor_Name: event.target.value });
  };

  handleAgeInputChange = (event) => {
    this.setState({ age: event.target.value });
  };

  handleDobInputChange = (event) => {
    this.setState({ dob: event.target.value });
  };

  handleGenderInputChange = (event) => {
    this.setState({ gender: event.target.value });
  };

  handleSpecializationInputChange = (event) => {
    this.setState({ specialization: event.target.value });
  };

  handleDoctorEmailInputChange = (event) => {
    this.setState({ doctor_Email: event.target.value });
  };

  handleDoctorAddressInputChange = (event) => {
    this.setState({ doctor_Address: event.target.value });
  };

  handleDoctorMobileInputChange = (event) => {
    this.setState({ doctor_Mobile: event.target.value });
  };

  handleEmergencyNoInputChange = (event) => {
    this.setState({ emergency_No: event.target.value });
  };

  handleDoctorExperienceInputChange = (event) => {
    this.setState({ doctor_Experience: event.target.value });
  };

  handleConsultingDayInputChange = (event) => {
    this.setState({ constulting_Day: event.target.value });
  };

  handleConsultingTimeInputChange = (event) => {
    this.setState({ constulting_Time: event.target.value });
  };

  handleUsernameInputChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordInputChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleStatusInputChange = (event) => {
    this.setState({ status: event.target.value });
  };

  handleImageNameInputChange = (event) => {
    this.setState({ imageName: event.target.value });
  };

  handleReviewInputChange = (event) => {
    this.setState({ review: event.target.value });
  };

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  render() {
    const {
      doctor_Name,
      age,
      dob,
      gender,
      specialization,
      doctor_Email,
      doctor_Address,
      doctor_Mobile,
      emergency_No,
      doctor_Experience,
      constulting_Day,
      constulting_Time,
      username,
      password,
      status,
      imageName,
      review,
    } = this.state;

    return (
      <div className="page-container">
        <div className="left-side">
          <div className="info">
            <h2>Information</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="image-container">
            <img src="/img/why.jpg" alt="Image" className="image" />
          </div>
        </div>
        <div className="right-side">
          <h2>Form</h2>
          <div className="form-container">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={doctor_Name}
              onChange={this.handleDoctorNameInputChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={this.handleAgeInputChange}
              placeholder="Age"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={this.handleDobInputChange}
              placeholder="Date of Birth"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={gender}
              onChange={this.handleGenderInputChange}
              placeholder="Gender"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={specialization}
              onChange={this.handleSpecializationInputChange}
              placeholder="Specialization"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              value={doctor_Email}
              onChange={this.handleDoctorEmailInputChange}
              placeholder="Email"
              required
            />
          </div>
          
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={doctor_Address}
              onChange={this.handleDoctorAddressInputChange}
              placeholder="Address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={doctor_Mobile}
              onChange={this.handleDoctorMobileInputChange}
              placeholder="Mobile"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={emergency_No}
              onChange={this.handleEmergencyNoInputChange}
              placeholder="Emergency Contact"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={doctor_Experience}
              onChange={this.handleDoctorExperienceInputChange}
              placeholder="Experience"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={constulting_Day}
              onChange={this.handleConsultingDayInputChange}
              placeholder="Consulting Day"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control"
              value={constulting_Time}
              onChange={this.handleConsultingTimeInputChange}
              placeholder="Consulting Time"
              required
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={this.handleUsernameInputChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={this.handlePasswordInputChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              onChange={this.handleFileChange}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px 12px',
                backgroundColor: '#f8f8f8',
                color: '#555',
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={status}
              onChange={this.handleStatusInputChange}
              placeholder="Status"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={imageName}
              onChange={this.handleImageNameInputChange}
              placeholder="Image Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={review}
              onChange={this.handleReviewInputChange}
              placeholder="Review"
            />
          </div>
          
          <button className="btn btn-primary" onClick={this.CreateDoctor}>
                    Register
                  </button>
        </div>
      </div>
    </div>
        </div>
      </div>
    );
  }
}

export default LoginRegD;