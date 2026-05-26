import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function AdminNav() {

  let user=JSON.parse(localStorage.getItem("userinfo"));

  let navigate=useNavigate();
  let logout=()=>

  {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("isloggedin");
    navigate("/registrationuser")

    
  }
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-warning bg-info">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">MW</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          {/* <Link to="/home" className='nav-link active'>Home</Link> */}
          <Link to="/home" className='nav-link'>Home</Link>
        </li>
        <li class="nav-item">
          <Link to="/addemployee" className='nav-link'>AddEmployee</Link>
        </li>
         
        <li class="nav-item ">
          <Link to="/viewemployee" className='nav-link'>ViewEmployee</Link>
        </li>

         <li class="nav-item">
          <Link to="/aboutus" className='nav-link'>AboutUs</Link>
        </li>
         <li class="nav-item">
          <Link to="/contactus" className='nav-link'>ContactUs </Link>
        </li>

         <li class="nav-item">
          <Link to="/ourservices" className='nav-link'>Services</Link>
        </li>
        <li class="nav-item">
          <Link to="/admindashboard" className='nav-link'>AdminDashboard</Link>
        </li>
        <li class="nav-item">
          <Link to="/updateleavestatus" className='nav-link'>UpdateLeaveStatus</Link>
        </li>

        <li className='nav-item'>
          <span style={{
            "fontSize":"18px",
            "color":"white",
            "display":"flex",
            "alignItems":"center",
            "gap":"10px"
          }} className='nav-link'>
            {user?.profile && <img src={user?.profile} alt="profile" style={{"width":"35px", "height":"35px", "borderRadius":"50%", "border":"2px solid white"}}/>}
            Welcome, {user?.firstname}
          </span>
        </li>
        <li className='nav-item'>
          <button className='btn btn-danger' onClick={logout}>Logout</button>

        </li>
        
        
        </ul>
      {/* <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
        
      </form> */}
    </div>
  </div>
</nav>
    </div>
  )
}