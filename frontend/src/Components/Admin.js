import React, { useEffect, useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import { VariablesD } from "./VariablesD";
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';


// Separate components for each page
const Dashboard = () => {
    const [doctorData, setDoctorData] = useState([]);

    useEffect(() => {
        fetchDoctor();
      }, []);
    
      const fetchDoctor = () => {
        fetch(VariablesD.API_URL + 'Doctor')
          .then((response) => response.json())
          .then((data) => {
            // Process the fetched data here
            console.log('Fetched doctor data:', data);
            setDoctorData(data);
          })
          .catch((error) => {
            console.error('Error fetching doctor data:', error);
          });
      };

      const changeStatus = async (doctorId, newStatus) => {
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

    return (
        <div className="container" style={{ marginTop: '50px' }}>
        <div className="row">
          {doctorData.map((item) => (
            <div className="col-md-3" key={item.doctorId}>
              <div className="card-sl">
              <div className="card-image">
  <img src={`/Images/${item.imageName}`} alt={item.doctor_Name} style={{ width: '100%', height: 'auto' }} />
</div>
                <div className="card-heading">
                  {item.doctor_Name}
                </div>
                <div className="card-text">
                  Mobile: {item.doctor_Mobile}
                </div>
                <div className="card-text">
                  Age: {item.age}
                </div>
                <div className="card-text">
                  Specialization: {item.specialization}
                </div>
                <div className="card-text">
                  Experience: {item.doctor_Experience}
                </div>
                <div className="card-text">
                  Consulting Day: {item.constulting_Day}
                </div>
                <div className="card-text">
                  Consulting Time: {item.constulting_Time}
                </div>
                <div className="card-text">
                  Review: {item.review}
                </div>
                <div className="card-text">
                  Status: {item.status}
                </div>
                <div>
        <a className="card-action active" onClick={() => changeStatus(item.doctor_ID, 'active')}>
          <i className="fa fa-check"></i>
        </a>
        <a className="card-action inactive" onClick={() => changeStatus(item.doctor_ID, 'inactive')}>
          <i className="fa fa-times-circle"></i>
        </a>
        </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      );
};

const Cart = () => (
  <div>
    <h2>Cart Page</h2>
    <p>Content for the Cart page goes here.</p>
  </div>
);

const Shopping = () => (
  <div>
    <h2>Shopping Page</h2>
    <p>Content for the Shopping page goes here.</p>
  </div>
);

const MyFavourite = () => (
  <div>
    <h2>My Favourite Page</h2>
    <p>Content for the My Favourite page goes here.</p>
  </div>
);

const Profile = () => (
  <div>
    <h2>Profile Page</h2>
    <p>Content for the Profile page goes here.</p>
  </div>
);

function Admin() {
  const [asideOpen, setAsideOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  const toggleAside = () => {
    setAsideOpen(!asideOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleClickOutsideProfile = () => {
    setProfileOpen(false);
  };

  const handleNavClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />

      <main className="min-h-screen w-full bg-blue-100 text-black-700">
        <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-grey-200 p-2" style={{backgroundColor: '#1a1a2e'}}>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="text-3xl text-blue-500"
              onClick={toggleAside}
            >
              <i className="bx bx-menu"></i>
            </button>
            <div className="text-purple-500">Admin</div>
          </div>

          <div>
            <button
              type="button"
              onClick={toggleProfile}
              onBlur={handleClickOutsideProfile}
              className="h-9 w-9 overflow-hidden rounded-full"
            >
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row">
          <aside
            className="flex w-full lg:w-72 flex-col space-y-2 lg:space-y-0 border-r-2 border-gray-200 p-2"
            style={{ height: '90.5vh', display: asideOpen ? 'block' : 'none', backgroundColor: '#1a1a2e' }}
          >
            <a
              href="#"
              className={`flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-400 hover:text-black-500 ${activeNavItem === 'dashboard' ? 'bg-white-100 text-black-500' : ''}`}
              onClick={() => handleNavClick('dashboard')} style={{ color: 'white' }}
            >
              <span className="text-2xl">
                <i className="bx bx-home"></i>
              </span>
              <span>Dashboard</span>
            </a>

            <a
              href="#"
              className={`flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-400 hover:text-black-500 ${activeNavItem === 'cart' ? 'bg-white-100 text-black-500' : ''}`}
              onClick={() => handleNavClick('cart')} style={{ color: 'white' }}
            >
              <span className="text-2xl">
                <i className="bx bx-cart"></i>
              </span>
              <span>Cart</span>
            </a>

            <a
              href="#"
              className={`flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-400 hover:text-black-500 ${activeNavItem === 'shopping' ? 'bg-white-100 text-black-500' : ''}`}
              onClick={() => handleNavClick('shopping')} style={{ color: 'white' }}
            >
              <span className="text-2xl">
                <i className="bx bx-shopping-bag"></i>
              </span>
              <span>Shopping</span>
            </a>

            <a
              href="#"
              className={`flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-400 hover:text-black-500 ${activeNavItem === 'favourite' ? 'bg-white-100 text-black-500' : ''}`}
              onClick={() => handleNavClick('favourite')} style={{ color: 'white' }}
            >
              <span className="text-2xl">
                <i className="bx bx-heart"></i>
              </span>
              <span>My Favourite</span>
            </a>

            <a
              href="#"
              className={`flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-400 hover:text-black-500 ${activeNavItem === 'profile' ? 'bg-white-100 text-black-500' : ''}`}
              onClick={() => handleNavClick('profile')} style={{ color: 'white' }}
            >
              <span className="text-2xl">
                <i className="bx bx-user"></i>
              </span>
              <span>Profile</span>
            </a>
          </aside>

          <div className="w-full lg:w-auto p-4">
            {/* Conditionally render content based on activeNavItem */}
            {activeNavItem === 'dashboard' && <Dashboard />}
            {activeNavItem === 'cart' && <Cart />}
            {activeNavItem === 'shopping' && <Shopping />}
            {activeNavItem === 'favourite' && <MyFavourite />}
            {activeNavItem === 'profile' && <Profile />}
          </div>
        </div>
      </main>
    </>
  );
}

export default Admin;