import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'

export default function LeaveApplication() {

    let [firstname, setfirstname] = useState("");
    let [lastname, setlastname] = useState("");
    let [empid, setempid] = useState(0);
    let [fromdate, setfromdate] = useState("");
    let [todate, settodate] = useState("");
    let [reason, setreason] = useState("");
    let [allleave, setallleave] = useState([]);
    let[reload, setreload] = useState(false);
    let today=new Date().toISOString().split("T")[0];
    let app=process.env.REACT_APP_SERVER_IP;

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("userinfo"))
        setfirstname(user.firstname)
        setlastname(user.lastname)
        setempid(user.empid)
    }, [reload])


    
    let applyleave = (e) => {
        e.preventDefault();
         if (!validation())
      {
        return;
      }
        let leave = { firstname, lastname, fromdate, todate, reason, employee:{"empid":empid} }
        axios.post(`${app}/applyforleave`, leave)
            .then((response) => {
                alert(response.data);
                setreload(!reload);
            })
            .catch((error) => {
                alert("server error");
            })
    }
    let getallleave = () => {

        axios.get(`${app}/findallleaves`)
            .then((response) => {
                console.log(response.data);
                setallleave(response.data);
            })
            .catch((error) => {
                alert("find leaveapplication problem")
            })
    }


    
     let validation = () => {

    // Check empty fields
    if (firstname.trim() === "" || lastname.trim() === "" || empid === "" || fromdate === "" || todate === "" || reason.trim() === "") {
        alert("Please fill all details");
        return false;
    }

    // First name validation
    else if (!/^[A-Za-z]{2,20}$/.test(firstname)) {
        alert("Enter valid first name");
        return false;
    }

    // Last name validation
    else if (!/^[A-Za-z]{2,20}$/.test(lastname)) {
        alert("Enter valid last name");
        return false;
    }

    // Employee ID validation
    else if (!/^[0-9]{1,6}$/.test(empid)) {
        alert("Enter valid Employee ID");
        return false;
    }

    // Reason validation
    else if (!/^[A-Za-z ]{3,50}$/.test(reason)) {
        alert("Enter valid reason");
        return false;
    }

    // Date validation
    else if (todate < fromdate) {
        alert("To Date cannot be earlier than From Date");
        return false;
    }

    return true;
}
    
    return (
        <div  >

            <div className="container mt-5 mb-4">
                <div className="card shadow p-4 table-flex table-boardered table-boarder-dark table-animation-circular " style={{ "width": "50%", "margin": "auto", "backgroundColor": "lightgray" }}>
                    <h2 className="text-center mb-4">Leave Application</h2>

                    <form onSubmit={(e) => { applyleave(e) }}>
                        <div className="row">
                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label className="form-label">Emp Id</label>
                                    <input type="number" className="form-control" onChange={(e) => setempid(e.target.value)} value={empid} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" value={firstname} onChange={(e) => { setfirstname(e.target.value) }}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" value={lastname} onChange={(e) => { setlastname(e.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">From Date</label>
                                    <input type="date" className="form-control" min={today} onChange={(e) => { setfromdate(e.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">To Date</label>
                                    <input type="date" className="form-control"  min={today} onChange={(e) => { settodate(e.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Reason</label>
                                    <input type="text" className="form-control" value={reason} onChange={(e) => { setreason(e.target.value) }} />
                                </div>
                            </div>
                            <div className="mt-3">
                                <button type="submit" className="btn btn-info ">
                                    Apply Leave
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <button onClick={getallleave}>Show leave aplication</button> */}
            {/* <table className='table'>
                <thead>
                    Leave Applications
                    <tr>
                        <th>Empid</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>leave id</th>
                        <th>reason</th>
                        <th>fromdate</th>
                        <th>todate</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allleave.map((l) =>
                            <tr>
                                <td>{l.employee. empid}</td>
                                <td>{l.firstname}</td>
                                <td>{l.lastname}</td>
                                <td>{l.leaveid}</td>
                                <td>{l.reason}</td>
                                <td>{l.fromdate}</td>
                                <td>{l.todate}</td>
                                <td>{l.status}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table> */}
        </div>
    )
}