import React, { useState,useEffect } from 'react';
import './CourseCategory.css'; // Import your CSS file for styling

import {  deleteCourse ,getAllCourses} from '../../axios/service/adminServices';

 import AddCourseCategory from '../AddCourseCategory/AddCourseCategory'
 import UpdateCourseCategory from '../UpdateCourseCategory/UpdateCourseCategory'
const CourseCategory= () => {
  

  const [showAddCourseCategory, setShowAddCourseCategory] = useState(false);
  const [showUpdateCourseCategory, setShowUpdateCourseCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  
  const [deleteSuccesMessage,setDeleteSuccesMessage]=useState(false);

  const[wrongMessage1,setWrongMessage1]=useState(false);
  const[wrongMessage2,setWrongMessage2]=useState(false);
  const[categories,setCategories]=useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const jwtToken = localStorage.getItem("jwt");

 

  useEffect(() => {
    
    featchData(jwtToken)
    console.log("fdsj")
    async function featchData(token){
      console.log("-------fist start-------")
      const categoryData= await getAllCourses(token);
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log("ejfsld")
      
      if(categoryData.statuscode ==='200 OK')
      {
        console.log("jfsd")
        console.log(categoryData.result)
        setCategories(categoryData.result)
        console.log("----books------");
      }
    }
    
  },[refresh]);

  if (!jwtToken) {
    
    return <div className='erooor'>Please log in to access the CourseCategory</div>;
  }

 
  

  async function coursecategoryDelete(id){
    try{
      console.log(id)
       const deleteResponse=await  deleteCourse(jwtToken,id)
       console.log(deleteResponse.statuscode);
       console.log("-------DELETED------")
       if(deleteResponse.statuscode==='200 OK')
       {
           setDeleteSuccesMessage(true);
           setTimeout(()=>{
            setDeleteSuccesMessage(false)
           },3000)
           setRefresh(!refresh);
        //    setUsers(users.filter((user) => user.id !== id));
       }
       if(deleteResponse.message=="Course not deleted "){
        setWrongMessage1(true);
        setTimeout(()=>{
         setWrongMessage1(false)
        },3000)

       }

    }
    catch(err){
      setWrongMessage2(true);
      setTimeout(()=>{
       setWrongMessage2(false)
      },3000)

    }
 
}

  const handleUpdate = (id,name) => {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
    console.log(name)
   
   setShowUpdateCourseCategory(true);
  };

  

  const handleAdd = () => {
   setShowAddCourseCategory(true);
  };

  const handleBack = () => {
  setShowAddCourseCategory(false);
    setShowUpdateCourseCategory(false);
  };

  return (
    <div className="table-container">
      {deleteSuccesMessage && <div className='deleteSucces'>Deleted SUccesFully</div>}
      {/* {updateSuccesMessage && <div className='deleteSucces'>Updated SUccesFully</div>}
      {addSuccesMessage && <div className='deleteSucces'>Updated SUccesFully</div>} */}
      {wrongMessage1 && <div className='wrongMessage'>NOT FOUND</div>}
      {wrongMessage2 && <div className='wrongMessage'>Internal Server Error</div>}
      {showAddCourseCategory? (
        <AddCourseCategory handleBack={handleBack} />
      ) : showUpdateCourseCategory ? (
        <UpdateCourseCategory categoryId={selectedCategoryId} name={selectedCategoryName}  handleBack={handleBack} />
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Name</th>
              <th>Course Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.filter((category)=>category.showStatus!=='false') 
                .map((category) => (
              <tr key={category.id}>
                 <td>{category.id}</td>

                <td>{category.courseName}</td>
                <td>{category.parentCategory.name}</td>
                
                <td>
                  <button onClick={() => handleUpdate(category.id,category.name)}>Update</button>
                  
                  <button onClick={() =>  coursecategoryDelete(category.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!showAddCourseCategory && !showUpdateCourseCategory && (
        <button onClick={handleAdd} className="add-btn">
          Add Category
        </button>
      )}
    </div>
  );
};

export default CourseCategory;