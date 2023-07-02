import React from "react";
import { Component } from "react";
import { toast } from "react-toastify";
import { VariablesD } from "./VariableD";
import axios from "axios";

export default class Doctor extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Doctor:[],
        doctor_ID: 0,
        doctor_Name: "",
        age: 0,
        gender: "",
        dob: new Date(),
        specialization: "",
        doctor_Email: "user@example.com",
        doctor_Address: "",
        doctor_Mobile: 0,
        emergency_No: 0,
        doctor_Experience: "",
        constulting_Day: "",
        constulting_Time: new Date(),
        username: "",
        password:"",
        status: "pending",
        imageName: "",
        review: "",
        lastLogin: new Date(),
        file: "",
        selectedDoctor: null,
    };
    }
  
    componentDidMount() {
      this.fetchDoctor();
    }
  
    fetchDoctor() {
      fetch(VariablesD.API_URL + "Doctor")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ Doctor: data });
          toast.success("Fetched doctor data");
        })
        .catch((error) => {
          console.error("Error fetching doctor data:", error);
          toast.error("Error fetching doctor data:", error);
        });
      }

      CreateDoctor = () => {
        const { doctor_Name, age, dob, gender, specialization, doctor_Email, doctor_Address, doctor_Mobile, emergency_No, doctor_Experience, constulting_Day, constulting_Time, username, password,imageName, status, file,review } = this.state;
      
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
              status: '',
              file: null,
              review:""
            });
      
            this.fetchDoctor();
          })
          .catch((error) => {
            console.error('Error creating doctor:', error);
            toast.error('Error creating doctor:', error);
          });
      };
      
      
    deleteHotel = (doctorId) => {
      if (window.confirm("Are you sure you want to delete this room?")) {
        fetch(VariablesD.API_URL + `Doctor/${doctorId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              console.log("Doctor deleted successfully");
              toast.success("Doctor deleted successfully");
              this.fetchDoctor();
            } else {
              throw new Error(toast.error("Error deleting Doctor:"));
             
            }
          })
          .catch((error) => {
            console.error("Error deleting Doctor:", error);
            toast.error("Error deleting Doctor:", error);
          });
      }
    };
  
    updateDoctor = () => {
        const {
          selectedDoctor,
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
          file,
        } = this.state;
      
        if (!selectedDoctor) {
          return;
        }
      
        const updatedDoctor = {
          ...selectedDoctor,
          doctor_Name: doctor_Name,
          age: age,
          dob: dob,
          gender: gender,
          specialization: specialization,
          doctor_Email: doctor_Email,
          doctor_Address: doctor_Address,
          doctor_Mobile: doctor_Mobile,
          emergency_No: emergency_No,
          doctor_Experience: doctor_Experience,
          constulting_Day: constulting_Day,
          constulting_Time: constulting_Time,
          username: username,
          password: password,
          status: status,
          imageName: imageName,
          review: review
        };
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doctorData', JSON.stringify(updatedDoctor));
        fetch(VariablesD.API_URL + "Doctor?/" + selectedDoctor.doctor_ID, {
          method: "PUT",
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Doctor is updated ", data);
            toast.success("Doctor is updated ", data);
            this.setState({
              selectedDoctor: null,
              doctor_Name: "",
              age: 0,
              dob: new Date(),
              gender: "",
              specialization: "",
              doctor_Email: "",
              doctor_Address: "",
              doctor_Mobile: 0,
              emergency_No: 0,
              doctor_Experience: "",
              constulting_Day: "",
              constulting_Time: new Date(),
              username: "",
              password: "",
              status: "",
              imageName: "",
              review: "",
              file:null,
            });
      
            this.fetchDoctor();
          })
          .catch((error) => {
            console.error("Error updating doctor:", error);
            toast.error("Error updating doctor:", error);
          });
      };

      changeStatus = async (doctorId, newStatus) => {
        try {
          const response = await axios.post(`https://localhost:7258/api/Doctor/${doctorId}/activation`, {
            status: newStatus,
          });
          console.log(response.data);
          this.fetchDoctor();
          // Handle successful activation
        } catch (error) {
          console.error('An error occurred during doctor activation', error);
          // Handle error
        }
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
        this.setState({ file:event.target.files[0]});
      };

      
      
  
  
      selectDoctorForUpdate = (doctor) => {
        this.setState({
          selectedDoctor: doctor,
          doctor_Name: doctor.doctor_Name,
          age: doctor.age,
          dob: doctor.dob,
          gender: doctor.gender,
          specialization: doctor.specialization,
          doctor_Email: doctor.doctor_Email,
          doctor_Address: doctor.doctor_Address,
          doctor_Mobile: doctor.doctor_Mobile,
          emergency_No: doctor.emergency_No,
          doctor_Experience: doctor.doctor_Experience,
          constulting_Day: doctor.constulting_Day,
          constulting_Time: doctor.constulting_Time,
          username: doctor.username,
          password: null,
          status: doctor.status,
          imageName: doctor.imageName,
          review: doctor.review,
        });
      };
      
      render() {
        const {
          Doctor,
          selectedDoctor,
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
            <div className="container-fluid">
            <h1>Doctor</h1>
          
            <div className="row">
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={doctor_Name}
                  onChange={this.handleDoctorNameInputChange}
                  placeholder="Name"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={age}
                  onChange={this.handleAgeInputChange}
                  placeholder="Age"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  value={dob}
                  onChange={this.handleDobInputChange}
                  placeholder="Date of Birth"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={gender}
                  onChange={this.handleGenderInputChange}
                  placeholder="Gender"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={specialization}
                  onChange={this.handleSpecializationInputChange}
                  placeholder="Specialization"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="email"
                  className="form-control"
                  value={doctor_Email}
                  onChange={this.handleDoctorEmailInputChange}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={doctor_Address}
                  onChange={this.handleDoctorAddressInputChange}
                  placeholder="Address"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={doctor_Mobile}
                  onChange={this.handleDoctorMobileInputChange}
                  placeholder="Mobile"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={emergency_No}
                  onChange={this.handleEmergencyNoInputChange}
                  placeholder="Emergency Contact"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={doctor_Experience}
                  onChange={this.handleDoctorExperienceInputChange}
                  placeholder="Experience"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={constulting_Day}
                  onChange={this.handleConsultingDayInputChange}
                  placeholder="Consulting Day"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  value={constulting_Time}
                  onChange={this.handleConsultingTimeInputChange}
                  placeholder="Consulting Time"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={this.handleUsernameInputChange}
                  placeholder="Username"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={this.handlePasswordInputChange}
                  placeholder="Password"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={status}
                  onChange={this.handleStatusInputChange}
                  placeholder="Status"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={imageName}
                  onChange={this.handleImageNameInputChange}
                  placeholder="Image Name"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={review}
                  onChange={this.handleReviewInputChange}
                  placeholder="Review"
                />
              </div>

    <div className="col-md-2">
      <input
        type="file"
        className="form-control-file"
        onChange={this.handleFileChange}
      />
    </div>

              <div className="col-md-2">
                {selectedDoctor ? (
                  <button className="btn btn-primary" onClick={this.updateDoctor}>
                    Save
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={this.CreateDoctor}>
                    Create
                  </button>
                )}
              </div>
            </div>
            
            <div className="table-responsive mt-3">
              <table className="table table-hover ">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Age</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Specialization</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Mobile</th>
                    <th>Emergency Contact</th>
                    <th>Experience</th>
                    <th>Consulting Day</th>
                    <th>Consulting Time</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Status</th>
                    <th>Image Name</th>
                    <th>Review</th>
                    <th>CRUD</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Doctor.map((item) => (
                    <tr key={item.doctorId}>
                      <td>{item.doctor_Name}</td>
                      <td><img src={`/Images/${item.imageName}`} width={100} height={100}></img></td>
                      <td>{item.age}</td>
                      <td>{item.dob}</td>
                      <td>{item.gender}</td>
                      <td>{item.specialization}</td>
                      <td>{item.doctor_Email}</td>
                      <td>{item.doctor_Address}</td>
                      <td>{item.doctor_Mobile}</td>
                      <td>{item.emergency_No}</td>
                      <td>{item.doctor_Experience}</td>
                      <td>{item.constulting_Day}</td>
                      <td>{item.constulting_Time}</td>
                      <td>{item.username}</td>
                      <td>{item.hashedPassword}</td>
                      <td>{item.status}</td>
                      <td>{item.imageName}</td>
                      <td>{item.review}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.deleteDoctor(item.doctorId)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary ml-2"
                          onClick={() => this.selectDoctorForUpdate(item)}
                        >
                          Update
                        </button>
                        <div className="d-flex justify-content-around">
        <button
          className={`btn btn-sm ${
            item.status === "active" ? "btn-success" : "btn-secondary"
          }`}
          onClick={() => this.changeStatus(item.doctor_ID, "active")}
        >
          Active
        </button>
        <button
          className={`btn btn-sm ${
            item.status === "inactive" ? "btn-danger" : "btn-secondary"
          }`}
          onClick={() => this.changeStatus(item.doctor_ID, "inactive")}
        >
          Inactive
        </button>
        <button
          className={`btn btn-sm ${
            item.status === "pending" ? "btn-warning" : "btn-secondary"
          }`}
          onClick={() => this.changeStatus(item.doctor_ID, "pending")}
        >
          Pending
        </button>
      </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      
}