import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function UpdateLeaveStatus() {
    let [employeeleave, setemployeeleave] = useState([]);
    let [reload, setreload] = useState(false);
      let app=process.env.REACT_APP_SERVER_IP;

    useEffect(() => {

        axios.get(`${app}/findallleaves`)
            .then((response) => {
                setemployeeleave(response.data)

            })
            .catch((error) => {
                alert("get all employee leave error")
            })
    }, [reload])

   let update = (leaveid, s) => {
    axios.put(`${app}/updateleavestatus?leaveid=${leaveid}&action=${s}`)
        .then((response) => {
            alert(response.data);

            axios.get(`${app}/findallleaves`)
                .then((response) => {
                    setemployeeleave(response.data);
                    setreload(!reload);
                });
        })
        .catch((error) => {
            alert("status update error");
        });
}

    return (
        <div className="container mt-3">
            <table className="table table-bordered table-hover text-center">
                <thead className="table-dark">
                    <tr>
                        <th>Leave Id</th>
                        <th>Employee Id</th>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>FromDate</th>
                        <th>ToDate</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employeeleave.map((l) =>
                            <tr>
                                <td>{l.leaveid}</td>
                                <td>{l.employee.empid}</td>
                                <td>{l.employee.firstname}</td>
                                <td>{l.employee.lastname}</td>
                                <td>{l.fromdate}</td>
                                <td>{l.todate}</td>
                                <td>{l.reason}</td>
                                <td>{l.status}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => { update(l.leaveid, "approve") }} disabled={l.status=="approve"}>Approve</button>
                                    <button className='btn btn-danger' onClick={() => { update(l.leaveid, "reject") }} disabled={l.status=="approve"}>Reject</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}