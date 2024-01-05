import React from 'react';
import './AddCategory.css'; // Import your CSS file for styling
import { addCategory } from '../../axios/service/adminServices';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
const AddUser= () => {
  const[name,setCategoryName]=useState();
 
  const [errorMessage, seterrorMessage] = useState('')
  const [errorMessage2, seterrorMessage2] = useState('')
  const [success, setsuccess] = useState(false)
   const[categoryError,setCategoryError]=useState(false)
 

  const jwtToken = localStorage.getItem("jwt");
  const validateForm = () => {
    let isValid = true;

    // Email validation using regex
    
    if(name.trim()==='')
    {
      setCategoryError("Please provide Category")
      isValid=false;
    }
    
    else{
      setCategoryError("")
    }
    

    
    

    return isValid;
  };

  async function categoryadd(event){
    event.preventDefault();
   if( validateForm()) {try{
      const categoryDetails={
        name:name
      }
      console.log("userDetails--", categoryDetails)
      const  addedCategoryDetails =await addCategory(jwtToken,categoryDetails)
      console.log("rtghjkl")
      console.log("details---",addedCategoryDetails)

      if(addedCategoryDetails.statuscode=== '201 CREATED')
      {
        setsuccess(true);
        seterrorMessage2('');
        setTimeout(()=>{
          setsuccess(false)
        },3000)
      }
      else{
        seterrorMessage2('');
        seterrorMessage(true)
        setTimeout(()=>{
          seterrorMessage(false);
        },3000)
      }

    } catch(err){
               seterrorMessage2(true);
               setTimeout(()=>{
                seterrorMessage2(true);
              },3000)
    }
  }
}

  return (
    <div className="update-addcategory-form-container">
      <form  className="update-addcategory-form">
        <div className="addcategoryform-group">
          
        {success && <div className="registration-success">Added SuccesFully</div>}
        {errorMessage && <div className="registration-error">Category Already</div>}
        {errorMessage2 && <div className="registration-error">Ineternal Server Error!</div>}
          <label htmlFor="username">Category Name</label>
          <input type="text" id="username" value={name} name="username" onChange={(e)=>{setCategoryName(e.target.value)}} required />
         <div  className="registration-error">{categoryError}</div>
        </div>
        
        <button onClick={categoryadd}className="update-btn">Add</button>
      </form>
    </div>
  );
};

export default AddUser;
