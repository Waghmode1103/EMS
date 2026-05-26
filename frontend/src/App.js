import logo from './logo.svg';
import './App.css';
import AddEmployee from './AddEmployee';
import ViewEmployee from './ViewEmployee'
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import OurServices from './OurService';
import Home from './Home';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowEmployee from './ShowEmployee';
import EmpNavbar from './EmpNavbar';
import EmployeeDashboard from './EmployeeDashboard';
import RegistrationUser from './RegistrationUser';

import { useLocation } from 'react-router-dom';
import Firstpage from './Firstpage';
import AddminNav from './AddminNav';
import LeaveApplication from './LeaveApplication';
import CommonNavbar from './CommonNavbar';

import ViewLeaveDetails from './ViewLeaveDetails';
import UpdateLeaveStatus from './UpdateLeaveStatus';


function App() {
  return (<div >

    
  
     {/* <EmployeeDashboard></EmployeeDashboard> */}
     
      <AppContent></AppContent>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/ourservices" element={<OurServices />} />
      <Route path="/addemployee" element={<AddEmployee />} />
      <Route path="/viewemployee" element={<ViewEmployee />} />
      <Route path="/showemployee" element={<ShowEmployee />} />
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/" element={<Firstpage></Firstpage>} />
<Route path="/registrationuser" element={<RegistrationUser />} />
<Route path="/leaveapplication" element={<LeaveApplication></LeaveApplication>} />
<Route path="/viewleavedetails" element={<ViewLeaveDetails></ViewLeaveDetails>} />
<Route path="/updateleavestatus" element={<UpdateLeaveStatus></UpdateLeaveStatus>} />
    </Routes>
    
    

{/* <LeaveApplication></LeaveApplication> */}
  
   {/* <ViewLeaveDetails></ViewLeaveDetails> */}



    </div>
  );
}

export default App;
 function AppContent(){
  let isloggedin=JSON.parse(localStorage.getItem("isloggedin"))
  let user=JSON.parse(localStorage.getItem("userinfo"))
   let publicpages=["/","/home","/aboutus","/contactus","/services"]
  let location=useLocation();
  return (
  <div>
{
  (isloggedin && user && location.pathname!="/registrationuser")&&
  (user.role.toLowerCase()=="admin"?<AddminNav/>:<EmpNavbar/>)
}
{
  (!isloggedin && !user)&&
  publicpages.includes(location.pathname)?
  <CommonNavbar></CommonNavbar>:null
}

  </div>
  )
 }
