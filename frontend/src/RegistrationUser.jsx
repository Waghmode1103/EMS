import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function RegisterUser() {

    let [isregistration, setisregistration] = useState(true);
    let [firstname, setfirstname] = useState("");
    let [lastname, setlastname] = useState("");
    let [email, setemail] = useState("");
    let [username, setusername] = useState("");
    let [password, setpassword] = useState("");
    let [confirmpassword, setconfirmpassword] = useState("");
    let [role, setrole] = useState("");
    let [contactno, setcontactno] = useState(0);
    let [empid, setempid] = useState(0);
    let [gender, setgender] = useState("");

      let app=process.env.REACT_APP_SERVER_IP;

    let navigate = useNavigate();
  

    let userlogin = (event) => {
        event.preventDefault();
        let userlogin = { username, password };
        axios.post(`${app}/login`, userlogin)
            .then((response) => {
             if (response.data)
             {
                let user=response.data;
                console.log(user);
                alert(`Welcome ${user.username}`)

                localStorage.setItem("userinfo",JSON.stringify(response.data))
                localStorage.setItem("isloggedin","true")

                if(user.role.toLowerCase()=="admin")
                {
                    navigate("/admindashboard")
                }
                else{
                    navigate("/employeedashboard")
                }
             }
            })
            .catch((error) => {
                alert("Invalid Username or Password");
            })
    }
    let register1=(event)=>
    {
        event.preventDefault();
        if (validation()){
            registration(event);
        }
    }


    let validation =()=>
    {
        if (firstname == "" || lastname == "" || email == "" || username == "" || password == "" ||
            confirmpassword == "" || role == "" || contactno == 0 || gender == ""
        )
        {
            alert("Please fill all details")
            return false;
        }
        else if (!/^[A-Za-z]{2,10}$/.test(firstname))
        {
            alert("Enter Valid Firstname");
            return false;
        }
        else if (!/^[A-Za-z]{2,10}$/.test(lastname))
        {
            alert ("Enter Valid Lastname");
            return false;
        }
         else if (!/^[A-Za-z0-9]+@[a-z]+[.][a-z]{2,}$/.test(email)) {
            alert("Enter valid email id");
            return false;
        }
         else if (username.length < 4) {
            alert("Username must be at least 4 characters");
            return false;
        }
        
        else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))
        {
            alert("Password must be at least 8 characters and include uppercase, lowercase, number, and special character");
            return false;
        }
        else if (password !== confirmpassword) {
            alert("Passwords do not match");
             return false;
        }
        else if(!/^[A-Za-z]{2,15}$/.test(role))
        {
            alert("Enter Valid Role");
            return false;
        }
        else if (!/^[0-9]{10}$/.test(contactno))
        {
            alert("Contact no must be 10 digit");
            return false;
        }

        
        else{
            return true;
        }
    }




    

    let registration = (event) => {
        event.preventDefault();

        axios.get(`${app}/findbyid?empid=${empid}`)
        .then((response)=>{
            let arr = Object.keys(response.data);
            //let user={"empid":1,}
            if(arr.length==0){
                alert("please enter valid empid")
            }
            else{
let newuser = { firstname, lastname, email, username, password, confirmpassword, role, contactno, empid, gender };

        axios.post(`${app}/register`, newuser)
            .then((response) => {
               if(response.data=="Registration Succesfully")
               {
                alert(response.data)
                setisregistration(true)
               }
               else{
                alert(response.data)
               }
            })
            .catch((error) => {
                alert("Error in registration")

            });
            }
        })
        .catch((error)=>{
            alert("Error in empid get method");
        })
        

            


    }
    return (
    <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <div className="container-fluid">
            <div className="row shadow-lg" style={{ borderRadius: "20px", overflow: "hidden" }}>

                {/* LEFT SIDE IMAGE */}
                <div className="col-md-6 d-none d-md-block p-0">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                        alt="office"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="col-md-6 p-5"
                    style={{
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)"
                    }}>

                    {
                        isregistration ?

                            <form onSubmit={(event) => { userlogin(event) }}
                                className='d-flex flex-column align-items-center gap-3'>

                                <h2 className="text-primary mb-3">Welcome Back 👋</h2>

                                <input type='text' placeholder='Username'
                                    className='form-control rounded-pill px-3'
                                    onChange={(event) => { setusername(event.target.value) }} />

                                <input type='password' placeholder='Password'
                                    className='form-control rounded-pill px-3'
                                    onChange={(event) => { setpassword(event.target.value) }} />

                                <button type='submit'
                                    className='btn btn-primary w-100 rounded-pill mt-2'>
                                    Login
                                </button>

                                <p className="text-muted">
                                    New user?
                                    <span
                                        style={{ color: "#2a5298", cursor: "pointer", marginLeft: "5px" }}
                                        onClick={() => { setisregistration(false) }}>
                                        Register here
                                    </span>
                                </p>
                            </form>

                            :

                            <form onSubmit={(event) => { registration(event) }}
                                className='d-flex flex-column gap-3'>

                                <h2 className="text-success text-center">Create Account 🚀</h2>

                                <div className='row g-2'>
                                    <div className='col'>
                                        <input type='text' placeholder='First Name'
                                            className='form-control rounded-pill'
                                            onChange={(event) => { setfirstname(event.target.value) }} />
                                    </div>
                                    <div className='col'>
                                        <input type='text' placeholder='Last Name'
                                            className='form-control rounded-pill'
                                            onChange={(event) => { setlastname(event.target.value) }} />
                                    </div>
                                </div>

                                <input type="email" placeholder='Email'
                                    className='form-control rounded-pill'
                                    onChange={(event) => { setemail(event.target.value) }} />

                                <input type="text" placeholder='Username'
                                    className='form-control rounded-pill'
                                    onChange={(event) => { setusername(event.target.value) }} />

                                <div className='row g-2'>
                                    <div className='col'>
                                        <input type="password" placeholder='Password'
                                            className='form-control rounded-pill'
                                            onChange={(event) => { setpassword(event.target.value) }} />
                                    </div>
                                    <div className='col'>
                                        <input type="password" placeholder='Confirm Password'
                                            className='form-control rounded-pill'
                                            onChange={(event) => { setconfirmpassword(event.target.value) }} />
                                    </div>
                                </div>

                                <div className='row g-2'>
                                    <div className='col'>
                                        <select className='form-control rounded-pill'
                                            onChange={(event) => { setrole(event.target.value) }}>
                                            <option value="">Select Role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Employee">Employee</option>
                                        </select>
                                    </div>
                                    <div className='col'>
                                        <input type='number' placeholder='Mobile'
                                            className='form-control rounded-pill'
                                            onChange={(event) => { setcontactno(event.target.value) }} />
                                    </div>
                                </div>

                                <input type='number' placeholder='Employee ID'
                                    className='form-control rounded-pill'
                                    onChange={(event) => { setempid(event.target.value) }} />

                                <div className='d-flex gap-3'>
                                    <label>Gender:</label>
                                    <input type="radio" name="gender" value="Male"
                                        onChange={(event) => { setgender(event.target.value) }} /> Male
                                    <input type="radio" name="gender" value="Female"
                                        onChange={(event) => { setgender(event.target.value) }} /> Female
                                </div>

                                <button type="submit"
                                    className='btn btn-success w-100 rounded-pill mt-2'>
                                    Register
                                </button>

                                <p className="text-center text-muted">
                                    Already have account?
                                    <span
                                        style={{ color: "green", cursor: "pointer", marginLeft: "5px" }}
                                        onClick={() => { setisregistration(true) }}>
                                        Login
                                    </span>
                                </p>

                            </form>
                    }

                </div>
            </div>
        </div>
    </div>
)
}