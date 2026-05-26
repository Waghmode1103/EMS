import React from 'react'

import { useState,useEffect } from 'react'
import  axios  from 'axios';





export default function ViewEmployee() {

  let[employees ,setemployees]=useState([]);
  let[reload,setreload]=useState(false);
  let[showmodal ,setshowmodal]=useState(false);
  let[empid ,setempid]=useState(0);

  let[firstname,setfirstname]=useState("");
  let[lastname,setlastname]=useState("");
  let[middlename,setmiddlename]=useState("");
       let[email,setemail]=useState("");
         let[gender,setgender]=useState("");
           let[profile,setprofile]=useState("");
             let[contactno,setcontactno]=useState(0);
            let[adharno,setadharno]=useState(0);
            let[panno,setpanno]=useState("");
                   let[dob,setdob]=useState("");
   
         let[department,setdepartment]=useState("");
          let[designation,setdesignation]=useState("");
        let[salary,setsalary]=useState(0.0);
       let[joiningdate,setjoiningdate]=useState("");
       let[exp,setexp]=useState(0 );
          let[reportingmanager,setreportingmanager]=useState("");
         let[worklocation,setworklocation]=useState("");
             let[status,setstatus]=useState("");
            let[edu,setedu]=useState("");
            let[address,setaddress]=useState("");
            //searching variables

            let[searchby,setsearchby]=useState("");//seacrchun criteria
            let[keyword,setkeyword]=useState("");//user input for searching
            let[searchresult,setsearchresult]=useState([]);
            let app=process.env.REACT_APP_SERVER_IP;
         
   
    
    useEffect(()=>
    {
        axios.get(`${app}/getemplist`)
        .then((response)=>{
            console.log(response.data);
            setemployees(response.data);
            setreload(!reload)
            
        })
        .catch((error)=>{
            alert("Error in get Operation")
         })

    },[reload]);
   
    

    let deleteemp=(empid)=>
    {
      let permit=window.confirm("You want to delete this record permanently???")
    if(permit)
      {
      axios.delete(`${app}/deleteemp?empid=${empid}`)
      .then((response)=>{
        if(response.data=="Employee record deleted successfully")
        {
          alert(response.data);
          setreload(!reload)
        }
      })
      .catch((error)=>{
        alert("Error in delete operation..")
      })
    }
    
    }

    let readytoupdate=(emp)=>
    {
      setshowmodal(true)
      setempid(emp.empid)
      setfirstname(emp.firstname)
      setmiddlename(emp.middlename)
      setlastname(emp.lastname)
      setemail(emp.email)
      setgender(emp.gender)
      setprofile(emp.profile)
      setcontactno(emp.contactno)
      setadharno(emp.adharno)
      setpanno(emp.panno)
      setdob(emp.dob);
      setdepartment(emp.department)
      setdesignation(emp.designation)
      setsalary(emp.salary)
      setjoiningdate(emp.joiningdate)
      setexp(emp.exp)
      setreportingmanager(emp.reportingmanager)
      setworklocation(emp.worklocation)
      setstatus(emp.status)
      setedu(emp.edu)
      setaddress(emp.address)

        


    }
    let updateemp=(event)=>

  {
    event.preventDefault();
    let newemp={ empid,firstname,lastname,middlename,dob,email,gender,contactno,profile,edu,status,
        worklocation,designation,department,salary,exp,address,
      reportingmanager,joiningdate,adharno,panno}

    axios.put(`${app}/updateemp?empid=${empid}`,newemp)
    .then((response)=>{
        if(response.data=="Employee record updated successfully")
        {
          alert(response.data);
          setshowmodal(false);
          setreload(!reload);
        }
      })
      .catch((error)=>{
        alert("Error in update operation...")
      })
  
    
  
    }

    
    let handleprofile=(event)=>{
      let file=event.target.files[0]
      console.log(file)
      let filepath=`./assest/img/${file.name}`;
      console.log(filepath);
      setprofile(filepath)
    }

    let searchEmployees=()=>{
      let url;
      if(searchby=="firstname")
      {
        url=`${app}/findbyfirstname?firstname=${keyword}`
      }else if(searchby=="lastname")
      {
        url=`${app}/findbylastname?lastname=${keyword}`
      }else if(searchby=="department")
      {
        url=`${app}/findbydepartment?department=${keyword}`
      }else if(searchby=="designation")
      {
        url=`${app}/findbydesignation?designation=${keyword}`
      }
      else if(searchby=="empid")
      {
        let keyword1=parseInt(keyword);
        url=`${app}/findbyid?empid=${keyword1}`
      }
      else{
        alert("select search by  given option.")
      }
      axios.get(url)
      .then((response)=>{
        setsearchresult(response.data)
      //   if(response.data.length==0|| response.data==null ){
          
         
      //     alert(`No matching record found for given ${searchby} . we are showing all employee record..`)
      //   }
      //   else{
      //       setsearchresult([])
      //      setsearchresult([response.data]) 
           
      //     console.log(response.data);

      //   }
        
      // })
      // .catch((error)=>{
      //   alert("Error in search operation...")
      // })
      if (response.data.length == 0 || response.data == null) {
                    alert(`no recorde fount for given ${keyword}. wew are showing all employee list`);
                    setsearchresult([]);
                    //setrelode(!relode);
                }
                else {
                    setsearchresult([])
                    if (Array.isArray(response.data)) {
                        setsearchresult(response.data)
                    }
                    else {
                        setsearchresult([response.data]);
                    }
                    console.log(response.data);
                }
            })
            .catch((erroe) => { "server error" })
          
    }
  return (
    
    
      <div>
      <div className='d-flex gap-2'>
        Select searchby:<select onChange={(event)=>{setsearchby(event.target.value)}}>
          <option>select searchby</option>
          <option value="firstname">firstname</option>
          <option value="lastname">lastname</option>
          <option value="department">department</option>
          <option value="designation">designation</option>
          <option value="empid">empid</option>



        </select>
        {
             searchby && <div>
              <input type='text' placeholder={`enter ${searchby}`} onChange={(event)=>{setkeyword(event.target.value)}}></input>
              <button className="btn btn-warning" onClick={searchEmployees}>search</button>

              </div>}

          </div>
        
<div className="container-fluid">
  <div className="row mb-5 gy-3">
    {
    (searchresult.length > 0 ? searchresult : employees).map((emp)=>
    <div className="col-3">


       <div className="card" style={{"width":"18rem"}}>
  <img src={emp.profile} className="card-img-top" alt="Employee Profile"></img>
  <div className="card-body">
    <h5 className="card-title">{emp.firstname} {emp.middlename}{emp.lastname} {emp.empid}</h5>
    <p className="card-text">
      <p>Empid:<strong>{emp.empid}</strong></p>
      <p>Email:<strong>{emp.email}</strong></p>
      <p>Contactno:<strong>{emp.contactno}</strong></p>
      <p>Department:<strong>{emp.department}</strong></p>
      <p>Designation:<strong>{emp.designation}</strong></p>
      <p>DOB:<strong>{emp.dob}</strong></p>

      
      </p>
   <div className="d-flex gap-2 justify-content-center">
    <button className=" btn btn-warning" onClick={()=>{deleteemp(emp.empid)}}>Delete</button>
    <button className="btn btn-danger" onClick={()=>{readytoupdate(emp)}}>Update</button>
  </div>
</div>
</div>
    </div>

    
    
    
    )

}
  </div>
</div>

{

  showmodal?<div className="modal start d-block" tabindex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Employee Update Form</h5>
        <button type="button" className="btn-close" onClick={()=>{setshowmodal(false)}}   aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={updateemp}>

          {/* Main Title */}
         

          {/* Personal Info */}
          <h5 className="text-dark border-bottom pb-2 mb-3">
            Personal Details
          </h5>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control"  value={firstname} onChange={(event)=>{setfirstname(event.target.value)}}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Middle Name</label>
              <input type="text" className="form-control"  value={middlename} onChange={(event)=>{setmiddlename(event.target.value)}}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" value={lastname} onChange={(event)=>{setlastname(event.target.value)}} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(event)=>{setemail(event.target.value)}} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-control" value={dob}  onChange={(event)=>{setdob(event.target.value)}}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Contact No</label>
              <input type="number" className="form-control" value={contactno} onChange={(event)=>{setcontactno(event.target.value)}}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Gender</label>
              <select className="form-control" value={gender} onChange={(event)=>{setgender(event.target.value)}}>
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Education</label>
              <input type="text" className="form-control" value={edu} onChange={(event)=>{setedu(event.target.value)}} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" value={address}onChange={(event)=>{setaddress(event.target.value)}} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Aadhar No</label>
              <input type="number" className="form-control" value={adharno} onChange={(event)=>{setadharno(event.target.value)}}/>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">PAN No</label>
              <input type="text" className="form-control"  value={panno} onChange={(event)=>{setpanno(event.target.value)}}/>
            </div>
          </div>

          {/* Work Info */}
          <h5 className="text-dark border-bottom pb-2 mt-4 mb-3">
            Work Details
          </h5>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Designation</label>
              <input type="text" className="form-control"  value={designation} onChange={(event)=>{setdesignation(event.target.value)}}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Department</label>
              <input type="text" className="form-control"  value={department} onChange={(event)=>{setdepartment(event.target.value)}}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Experience (Years)</label>
              <input type="number" className="form-control"  value={exp} onChange={(event)=>{setexp(event.target.value)}}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Salary</label>
              <input type="number" className="form-control"value={salary} onChange={(event)=>{setsalary(event.target.value)}} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Work Location</label>
              <input type="text" className="form-control"  value={worklocation} onChange={(event)=>{setworklocation(event.target.value)}}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Reporting Manager</label>
              <input type="text" className="form-control" value={reportingmanager}  onChange={(event)=>{setreportingmanager(event.target.value)}}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select className="form-control" value={status} onChange={(event)=>{setstatus(event.target.value)}}>
                <option>Select Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Joining Date</label>
              <input type="date" className="form-control"  value={joiningdate} onChange={(event)=>{setjoiningdate(event.target.value)}}/>
            </div>
          </div>

          {/* Profile Image */}
          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input type="file" className="form-control" accept="image/*" 
            onChange={(event)=>{handleprofile(event)}}
            />
          </div>


           <div className="mb-3">
            <label className="form-label"> Profile Preview </label>
            <img src={profile} style={{"width":"200px","height":"200px"}}></img>
          </div>
 
          <div className="text-center">
            <button className="btn btn-primary px-4">Update Employee</button>
          </div>

        </form>
      </div>
     
    </div>
  </div>
</div>:null
}





    </div>

  
  )
}