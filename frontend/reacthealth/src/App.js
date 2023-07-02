import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {BrowserRouter,Routes,Route,NavLink} from 'react-router-dom';
import Admin from './Components/Admin';
import Doctor from './Components/Doctor';
import Home from './Components/Home';
import Login from './Components/Login';
import Patient from './Components/Patient';
import Register from './Components/Register';
import DoctorReg from './Components/DoctorReg';
import DoctorProfile from './Components/DoctorProfile';
function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar bg="blue" expand="lg">
          <Navbar.Brand>React-front</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/Patient" activeClassName="active">
              Patient
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Doctor" activeClassName="active">
              Doctor
              </Nav.Link>
              <Nav.Link as={NavLink} to="/DoctorReg" activeClassName="active">
              DoctorReg
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Image" activeClassName="active">
                Image
              </Nav.Link>
              <Nav.Link as={NavLink} to="/DoctorProfile" activeClassName="active">
              DoctorProfile
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Register" activeClassName="active">
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Login" activeClassName="active">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      <Routes>
        <Route path='/Home' Component={Home}></Route>
        <Route path='/Admin' Component={Admin}></Route>
        <Route path='/Patient' Component={Patient}></Route>
        <Route path='/Doctor' Component={Doctor}></Route>
        <Route path='/Login' Component={Login}></Route>
        <Route path='/Register' Component={Register}></Route>
        <Route path='/DoctorReg' Component={DoctorReg}></Route>
        <Route path='/DoctorProfile' Component={DoctorProfile}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
