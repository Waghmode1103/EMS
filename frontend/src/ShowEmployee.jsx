 import React from 'react'

import { useState,useEffect } from 'react'
import  axios  from 'axios';





export default function ShowEmployee() {

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

    },[]);
   
    

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
                    alert(`No record found for given ${keyword}. we are showing all employee list`);
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
            .catch((error) => { "server error" })
          
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
      <p>Joiningdate:<strong>{emp.joiningdate}</strong></p>

      
      </p>
  
</div>
</div>
    </div>

    
    
    
    )

}
  </div>
</div>





    </div>

  
  )
}