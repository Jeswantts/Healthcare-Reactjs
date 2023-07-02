import { Component } from "react";
import { toast } from "react-toastify";
import { VariablesD } from "./VariableD";

import React, { useState } from 'react';
import axios from 'axios';

const DoctorReg = () => {
  const [doctor_Name, setDoctorName] = useState("");
  const [age, setAge] = useState(0);
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctor_Email, setDoctorEmail] = useState("");
  const [doctor_Address, setDoctorAddress] = useState("");
  const [doctor_Mobile, setDoctorMobile] = useState(0);
  const [emergency_No, setEmergencyNo] = useState(0);
  const [doctor_Experience, setDoctorExperience] = useState("");
  const [constulting_Day, setConsultingDay] = useState("");
  const [constulting_Time, setConsultingTime] = useState(new Date());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [imageName, setImageName] = useState("");
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('doctor', JSON.stringify({
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
        status,
        imageName,
        review
      }));
      formData.append('file', file);
      formData.append('password',password);

    try {
      const response = await axios.post(VariablesD.API_URL + "Doctor", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log("Doctor is created");
        toast.success("Doctor is created");
        setDoctorName("");
        setAge(0);
        setDob(new Date());
        setGender("");
        setSpecialization("");
        setDoctorEmail("");
        setDoctorAddress("");
        setDoctorMobile(0);
        setEmergencyNo(0);
        setDoctorExperience("");
        setConsultingDay("");
        setConsultingTime(new Date());
        setUsername("");
        setPassword("");
        setStatus("");
        setImageName("");
        setReview("");
        setFile(null);
        this.fetchDoctor();
      } else {
        throw new Error("Error creating doctor");
      }
    } catch (error) {
      console.error("Error creating doctor:", error);
      toast.error("Error creating doctor:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
      <input type="text" value={doctor_Name} onChange={(event) => handleChange(event, setDoctorName)} placeholder="Doctor Name" />
      <input type="number" value={age} onChange={(event) => handleChange(event, setAge)} placeholder="Age" />
      <input type="date" value={dob} onChange={(event) => handleChange(event, setDob)} placeholder="Date of Birth" />
      <input type="text" value={gender} onChange={(event) => handleChange(event, setGender)} placeholder="Gender" />
      <input type="text" value={specialization} onChange={(event) => handleChange(event, setSpecialization)} placeholder="Specialization" />
      <input type="email" value={doctor_Email} onChange={(event) => handleChange(event, setDoctorEmail)} placeholder="Doctor Email" />
      <input type="text" value={doctor_Address} onChange={(event) => handleChange(event, setDoctorAddress)} placeholder="Doctor Address" />
      <input type="number" value={doctor_Mobile} onChange={(event) => handleChange(event, setDoctorMobile)} placeholder="Doctor Mobile" />
      <input type="number" value={emergency_No} onChange={(event) => handleChange(event, setEmergencyNo)} placeholder="Emergency Number" />
      <input type="text" value={doctor_Experience} onChange={(event) => handleChange(event, setDoctorExperience)} placeholder="Doctor Experience" />
      <input type="text" value={constulting_Day} onChange={(event) => handleChange(event, setConsultingDay)} placeholder="Consulting Day" />
      <input type="date" value={constulting_Time} onChange={(event) => handleChange(event, setConsultingTime)} placeholder="Consulting Time" />
      <input type="text" value={username} onChange={(event) => handleChange(event, setUsername)} placeholder="Username" />
      <input type="password" value={password} onChange={(event) => handleChange(event, setPassword)} placeholder="Password" />
      <input type="text" value={status} onChange={(event) => handleChange(event, setStatus)} placeholder="Status" />
      <input type="text" value={imageName} onChange={(event) => handleChange(event, setImageName)} placeholder="Image Name" />
      <input type="text" value={review} onChange={(event) => handleChange(event, setReview)} placeholder="Review" />
      <input type="file" onChange={handleFileChange} />

      <button type="submit">Create Doctor</button>
    </form>
  );
};

export default DoctorReg;
