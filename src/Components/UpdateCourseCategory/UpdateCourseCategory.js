import React, { useState } from 'react';
import './UpdateCourseCategory.css'; // Import your CSS file for styling
 import axios from 'axios';
 import { useEffect } from 'react';
 import {  updateCourse,getcategory} from '../../axios/service/adminServices';
const UpdateCourseCategory = (props) => {

  const[name,setName]=useState(props.name);
   const[category,setCourseCategory]=useState()
   const[nameError,setNameError]=useState();
    const[categoryError,setCategoryError]=useState();
   const[categoryOptions,setCategoryOptions]=useState([])
  const [errorMessage, seterrorMessage] = useState('')
  const [errorMessage2, seterrorMessage2] = useState('')
  const [success, setsuccess] = useState(false)
  const jwtToken = localStorage.getItem("jwt");
  const updateCategoryId=props.categoryId;
  
  useEffect(() => {
    featchData(jwtToken)
    async function featchData(token) {

    

      const category = await getcategory(token);
    

      if ( category.statuscode === '200 OK') {

      
        setCategoryOptions(category.result);
        console.log(setCategoryOptions)

      }
    }


  }, []);
  const validateForm = () => {
    let isValid = true;
  
    // Email validation using regex
  
    if (category.trim() === '') {
      setCategoryError("Please provide Category");
      isValid = false;
    } else {
      setCategoryError("");
    }
  
    if (name.trim() === '') {
      setNameError("Please provide Course");
      isValid = false;
    } else {
      setNameError("");
    }
  
    return isValid;
  };

  async function categoryUpdate(event){
    event.preventDefault();
   if(validateForm()){ try{
      const updatedcategoryDetails={
          name:name,
          parentCategory:category
      }
      console.log("updateduserDetails--",updatedcategoryDetails)
      const  updateDetails =await updateCourse(jwtToken,updateCategoryId,updatedcategoryDetails)
      console.log("rtghjkl")
      console.log("details---",updateDetails)

      if(updateDetails.statuscode=== '200 OK')
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
        <div className="registration-error">{nameError}</div>
        <label htmlFor="username">Category Name</label>
        <select id="category" name="category" value={category} onChange={(e) => setCourseCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categoryOptions.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="registration-error">{categoryError}</div>
       
        <button onClick={categoryUpdate}className="update-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateCourseCategory;
