import React from 'react'
import CommonNavbar from './CommonNavbar'

export default function Firstpage() {
  return (
    <div className="Firstpage" style={{ height: "100vh", width: "100%" }}>
      
      <h1 className="heading">Welcome to Employee Management System</h1>

      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner">
          
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&h=1000&q=80"
              className="d-block w-100 carousel-img"
              alt="Employee Management"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Employee Management</h5>
              <p>Efficiently manage your workforce with smart solutions.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&h=1000&q=80"
              className="d-block w-100 carousel-img"
              alt="Team Collaboration"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Team Collaboration</h5>
              <p>Enhance productivity with seamless teamwork.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&h=1000&q=80"
              className="d-block w-100 carousel-img"
              alt="Business Growth"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Business Growth</h5>
              <p>Empowering organizations for future success.</p>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  )
}