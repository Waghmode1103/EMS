import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function EmpNavbar() {
    
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
            <nav class="navbar navbar-expand-lg navbar-info bg-info">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><img src="https://imgs.search.brave.com/pfq83l9bN5IIveEo46884S1TAmPI8ItSg8zQMgr00K8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS81MjMt/NTIzMzM3OV9lbXBs/b3llZS1tYW5hZ2Vt/ZW50LXN5c3RlbS1s/b2dvLWhkLXBuZy1k/b3dubG9hZC5wbmc" width="45" height="45" className="rounded-circle"></img></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link className="nav-link active" to="/home">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/showEmployee">Show Employee</Link>
                            </li>

                            <li class="nav-item">
                                <Link className="nav-link" to="/leaveapplication">Apply for Leave</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/viewleavedetails">view leave details</Link>
                            </li>
                               
                            <li class="nav-item">
                                <Link className="nav-link" to="/aboutus">About Us</Link>
                            </li>

                            <li class="nav-item">
                                <Link className="nav-link" to="/contactus">Contact Us</Link>
                            </li>

                            <li class="nav-item">
                                <Link className="nav-link" to="/ourservices">Services</Link>
                            </li>

                                

                            <li className='nav-item'>
                                 <span className='nav-link'
                                 style={{"fontSize":"18px","color":"white", "display":"flex", "alignItems":"center", "gap":"10px" }}>
                                    {user?.profile && <img src={user?.profile} alt="profile" style={{"width":"35px", "height":"35px", "borderRadius":"50%", "border":"2px solid white"}}/>}
                                    Welcome {user?.firstname}
                                 </span>
                            </li>
                            <li className='nav-item'>
                                <button className='btn btn-danger mt-2 ms-2'onClick={logout}>Logout</button>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}