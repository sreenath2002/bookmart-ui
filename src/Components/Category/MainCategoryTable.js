import React, { useState,useEffect } from 'react';
import './MainCAtegoryTable.css'; // Import your CSS file for styling

import {  deleteCategory, getcategory } from '../../axios/service/adminServices';
 import UpdateCategory from '../UpdateCategory/UpdateCategory'
 import AddCategory from '../AddCategory/AddCategory'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
const MainCategoryTable = () => {
  

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
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
      const categoryData= await getcategory(token);
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
    
    return <div className='erroor'>Please log in to access the Category</div>;
  }

 

  async function categoryDelete(id){
    try{
      console.log(id)
       const deleteResponse=await  deleteCategory(jwtToken,id)
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
       else{
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
   
    setShowUpdateCategory(true);
  };

  

  const handleAdd = () => {
    setShowAddCategory(true);
  };

  const handleBack = () => {
   setShowAddCategory(false);
    setShowUpdateCategory(false);
  };

  return (
    <div className="table-container">
      <AdminNavbar/>
      {deleteSuccesMessage && <div className='deleteSucces'>Deleted SUccesFully</div>}
      {/* {updateSuccesMessage && <div className='deleteSucces'>Updated SUccesFully</div>}
      {addSuccesMessage && <div className='deleteSucces'>Updated SUccesFully</div>} */}
      {wrongMessage1 && <div className='wrongMessage'>NOT FOUND</div>}
      {wrongMessage2 && <div className='wrongMessage'>Internal Server Error</div>}
      {showAddCategory ? (
        <AddCategory handleBack={handleBack} />
      ) : showUpdateCategory ? (
        <UpdateCategory categoryId={selectedCategoryId} name={selectedCategoryName}  handleBack={handleBack} />
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Name</th>
             
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.filter((category)=>category.showstatus!=='false') 
                .map((category) => (
              <tr key={category.id}>
                 <td>{category.id}</td>

                <td>{category.name}</td>
                
                <td>
                  <button onClick={() => handleUpdate(category.id,category.name)}>Update</button>
                  
                  <button onClick={() =>  categoryDelete(category.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!showAddCategory && !showUpdateCategory && (
        <button onClick={handleAdd} className="add-btn">
          Add Category
        </button>
      )}
    </div>
  );
};


export default MainCategoryTable