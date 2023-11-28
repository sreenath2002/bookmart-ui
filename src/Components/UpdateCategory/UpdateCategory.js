import React, { useState } from 'react';
import './UpdateCategory.css'; // Import your CSS file for styling
 import axios from 'axios';
 import { updateCategory} from '../../axios/service/adminServices';
const UpdateUser = (props) => {

  const[name,setName]=useState(props.name);
  
  const [errorMessage, seterrorMessage] = useState('')
  const [errorMessage2, seterrorMessage2] = useState('')
  const [success, setsuccess] = useState(false)
  const jwtToken = localStorage.getItem("jwt");
  const updateCategoryId=props.categoryId;
  

  async function categoryUpdate(event){
    event.preventDefault();
    try{
      const updatedcategoryDetails={
          name:name
      }
      console.log("updateduserDetails--",updatedcategoryDetails)
      const  updateDetails =await updateCategory(jwtToken,updateCategoryId,updatedcategoryDetails)
      console.log("rtghjkl")
      console.log("details---",updateDetails)

      if(updateDetails.statuScode=== '200 OK')
      {
        setsuccess(true);
        setTimeout(()=>{
          setsuccess(false)
        },3000)
      }
      else{
        seterrorMessage(true)
        setTimeout(()=>{
          seterrorMessage(false);
        },3000)
      }

    } catch(err){
               seterrorMessage2(true);
    }
  }

  return (
    <div className="update-user-form-container">
      <form  className="update-user-form">
        <div className="form-group">
          
        {success && <div className="registration-success">Updated Successfully!</div>}
        {errorMessage && <div className="registration-error"> Category Not Updated!</div>}
        {errorMessage2 && <div className="registration-error">Ineternal Server Error</div>}
          <label htmlFor="username">Category Name</label>
          <input type="text" id="username" value={name} name="username" onChange={(e)=>{setName(e.target.value)}} required />
        </div>
        
        
        
       
        <button onClick={categoryUpdate}className="update-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
