import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import LoginRegP from './Components/LoginRegP';
import Admin from './Components/Admin';
import Doctordash from './Components/Doctordash';
import PatientView from './Components/PatientView';
import LoginRegD from './Components/LoginRegD';
import LoginD from './Components/LoginD';
import Appointment from './Components/Appoint';
import Adminlog from './Components/Adminlog';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/Home' Component={Home}></Route>
        <Route path='/LoginRegP' Component={LoginRegP}></Route>
        <Route path='/Admin' Component={Admin}></Route>
        <Route path='/Doctordash' Component={Doctordash}></Route>
        <Route path='/PatientView' Component={PatientView}></Route>
        <Route path='/LoginRegD' Component={LoginRegD}></Route>
        <Route path='/LoginD' Component={LoginD}></Route>
        <Route path='/Appoint' Component={Appointment}></Route>
        <Route path='/Adminlog' Component={Adminlog}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
