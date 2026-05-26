import axios from 'axios';
import React, { useState,useEffect,  } from 'react'


export default function ViewLeaveDetails () {

   let [firstname, setfirstname]=useState("");
      let [lastname, setlastname]=useState("");
      let [empid, setempid]=useState(0);
      let [fromdate, setfromdate]=useState("");
      let [todate, settodate]=useState("");
      let [reason, setreason]=useState("");
      let [allleave, setallleave]=useState([]);
      let[reload, setreload]=useState(false);
        let[leaves,setleaves]=useState([]);
        let[leaveid,setleaveid]=useState(0);
 
  let[showmodal,setshowmodal]=useState(false)

    let app=process.env.REACT_APP_SERVER_IP;
      
  

  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem("userinfo"));
    axios.get(`${app}/findleavebyempid?empid=${user.empid}`)
    .then((response)=>{
     
      setleaves(response.data);
    })
    .catch((error)=>{
      alert("Error in retrival operation")
    })
  },[reload])
  let cancleleave=(leaveid)=> {
    let permit=window.confirm(" you want to delete this record permanataly ")

    if(permit){
      axios.delete(`${app}/cancleleave?leaveid=${leaveid}`)
      .then((response)=>{
        if(response.data=="Leave cancle sucessfully"){
          alert(response.data);
          setreload(!reload);
        }
      })
      .catch((error)=>{
        alert(" Error in delete operation")
      })
    }
  }
let readytoupdate=(l)=>{
  setshowmodal(true);
  setempid(l.employee.empid);
  setfirstname(l.firstname);
  setlastname(l.lastname);
  setfromdate(l.fromdate);
  settodate(l.todate);  
  setreason(l.reason);
  setleaveid(l.leaveid);
}
 
let updateleave=(e)=>{
  e.preventDefault();
  let newleave={fromdate,todate,reason}
  axios.put(`${app}/updateleave?leaveid=${leaveid}`,newleave)
  .then((response)=>{
    if(response.data==" Leave application details updated sucessfully"){
      alert(response.data);
      setreload(!reload);
      setshowmodal(false);
    }
  })
  .catch((error)=>{
    alert("Error in update operation")
  })  
}
    return (
<div>
  <table className="table table-dark table-bordered">

    <thead >
      <tr >
        <th>leaveid</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>FromDate</th>
        <th>To Date</th>
        <th>Reason</th>
        <th>Status</th>
        <th>Empid</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody className=' table table-info table-boardered '>
      {
        leaves.map((l)=>
          <tr>
            <td>{l.leaveid}</td>
            <td>{l.firstname}</td>
            <td>{l.lastname}</td>
            <td>{l.fromdate}</td>
            <td>{l.todate}</td>
            <td>{l.reason}</td>
            <td>{l.status}</td>
            <td>{l.employee.empid}</td>
            <td className='d-flex gap-2'>
              <button className="btn btn-danger" onClick={()=>{cancleleave(l.leaveid)}}>Delete</button>
              <button className="btn btn-success" disabled={l.status=="approve"} onClick={()=>{readytoupdate(l)}}>Update</button>
            </td>
          </tr>
        )
      }
    </tbody>
  </table>
  {showmodal? <div class="modal start d-block" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Update leave form</h5>
        <button type="button" class="btn-close" onClick={()=>{setshowmodal(false)}} aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>

         <form  onSubmit={updateleave}>
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
                                    <input type="date" className="form-control"  value={fromdate} onChange={(e) => { setfromdate(e.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">To Date</label>
                                    <input type="date" className="form-control" value={todate} onChange={(e) => { settodate(e.target.value) }} />
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
  </div>
</div>:null}
</div>
        
    )
}