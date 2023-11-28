import React, { useState,useEffect } from 'react';
import './UserTable.css'; // Import your CSS file for styling
import AddUser from '../AddUser/AddUser';
import UpdateUser from '../UpdateUser/UpdateUser';
import { getUsers,deleteUser,updateUser, changeStatus } from '../../axios/service/adminServices';

const UserTable = () => {
  

  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserFirstName, setSelectedUserFirstName] = useState(null);
  const [selectedUserLastName, setSelectedUserLastName] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [selectedUserMobile, setSelectedUserMobile] = useState(null);
  const [deleteSuccesMessage,setDeleteSuccesMessage]=useState(false);
  const [statusChangeSuccesMessage,setStatusChangeMessage]=useState(false);
  const[wrongMessage1,setWrongMessage1]=useState(false);
  const[wrongMessage2,setWrongMessage2]=useState(false);
  const[users,setUsers]=useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const jwtToken = localStorage.getItem("jwt");

 

  useEffect(() => {
    
    featchData(jwtToken)
    console.log("fdsj")
    async function featchData(token){
      console.log("-------fist start-------")
      const usersData= await getUsers(token);
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log("ejfsld")
      
      if(usersData.statuscode ==='200 OK')
      {
        console.log("jfsd")
        console.log(usersData.result)
        setUsers(usersData.result)
        console.log("----books------");
      }
    }
    
  },[refresh]);

 

  async function userDelete(id){
    try{
      console.log(id)
       const deleteResponse=await  deleteUser(jwtToken,id)
       console.log(deleteResponse.statuscode);
       console.log("-------DELETED------")
       if(deleteResponse.statuscode==='200 OK')
       {
           setDeleteSuccesMessage(true);
           setTimeout(()=>{
            setDeleteSuccesMessage(false)
           },3000)
           setRefresh(!refresh);
           setUsers(users.filter((user) => user.id !== id));
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

  const handleUpdate = (id,firstName,lastName,email,mobile) => {
    setSelectedUserId(id);
    setSelectedUserFirstName(firstName);
    console.log(firstName)
    setSelectedUserLastName(lastName);
    setSelectedUserEmail(email);
    setSelectedUserMobile(mobile)
    setShowUpdateUser(true);
  };

  async function userChangeStatus(id){
    try{
      console.log(id)
       const statusResponse=await  changeStatus(jwtToken,id)
       console.log(statusResponse.result);

       console.log("-------Changes-----")
       if(statusResponse.statuscode==='200 OK')
       {
           setStatusChangeMessage(true);
           setTimeout(()=>{
            setStatusChangeMessage(false)
           },3000)
           setRefresh(!refresh);
        
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

//  const handleRender=()=>{
//    setRefresh(!refresh)
//  }

  const handleAdd = () => {
    setShowAddUser(true);
    console.log("dfghjk")
  };

  const handleBack = () => {
    setShowAddUser(false);
    setShowUpdateUser(false);
    setRefresh(!refresh)
  };

  return (
    <div className="table-container">
      {deleteSuccesMessage && <div className='deleteSucces'>Deleted SUccesFully</div>}
      {/* {updateSuccesMessage && <div className='deleteSucces'>Updated SUccesFully</div>}
      {addSuccesMessage && <div className='deleteSucces'>Updated SUccesFully</div>} */}
      {wrongMessage1 && <div className='wrongMessage'>NOT FOUND</div>}
      {wrongMessage2 && <div className='wrongMessage'>Internal Server Error</div>}
      {showAddUser ? (
        <AddUser handleBack={handleBack} />
      ) : showUpdateUser ? (
        <UpdateUser userId={selectedUserId} firstName={selectedUserFirstName} lastName={selectedUserLastName} email={selectedUserEmail} mobile={selectedUserMobile} handleBack={handleBack} />
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
                .filter((user) => user.role !== "ADMIN" && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
              <tr key={user.id}>
                 <td>{user.id}</td>

                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button onClick={() => handleUpdate(user.id,user.firstName,user.lastName,user.email,user.mobile)}>Update</button>
                  <button
                    onClick={() => userChangeStatus(user.id)}
                    className={user.blocked ? 'block-btn' : 'unblock-btn'}
                  >
                    {user.status=='UNBLOCK' ? 'BLOCK' : 'UNBLOCK'}
                  </button>
                  <button onClick={() => userDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!showAddUser && !showUpdateUser && (
        <button onClick={handleAdd} className="add-btn">
          Add User
        </button>
      )}
    </div>
  );
};

export default UserTable;
