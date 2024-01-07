import React, { useState,useEffect } from 'react';
import './UserTable.css'; // Import your CSS file for styling
import AddUser from '../AddUser/AddUser';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import UpdateUser from '../UpdateUser/UpdateUser';
import { getUsers,deleteUser,updateUser, changeStatus } from '../../axios/service/adminServices';
import { useSelector } from 'react-redux/es/hooks/useSelector';
const UserTable = () => {
  

  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const[blockUserId,setBlockUserId]=useState();
  const[blockUserStatus,setBlockUserStatus]=useState();
  const[blockUserName,setBlockUserName]=useState();
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
  const [showAlert, setShowAlert] = useState(false);
  const jwtToken = localStorage.getItem("jwt");
  const role = useSelector((state) => state.user.role);
 

  useEffect(() => {
    
    featchData(jwtToken)
    console.log("fdsj")
    async function featchData(token){
      console.log("-------fist start-------")
      const allusersData= await getUsers(token);
      console.log(allusersData.result)
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log("ejfsld")
      
      if(allusersData.statuscode ==='200 OK')
      {
        console.log("jfsd")
        console.log(allusersData.result)
        setUsers(allusersData.result)
        console.log("----books------");
      }
    }
    
  },[refresh]);

  const handleBlockUser = (userId,status,nameofUser) => {
    setBlockUserId(userId);
    if(status=='UNBLOCK'){
      setBlockUserStatus('BLOCK')
    }
    else{
      setBlockUserStatus('UNBLOCK')
    }
    setBlockUserName(nameofUser)
    setShowAlert(true);
    // ...other logic for blocking user
  };

  const confirmBlockUser = () => {
   
    setShowAlert(false);
    userChangeStatus(blockUserId);
    // ...logic to block user
  };

  const cancelBlockUser = () => {
    setShowAlert(false);
    // ...other cancel logic if needed
  };

  if (!jwtToken) {
    
    return <div className='erooor'>Please log in to access the UserDetails</div>;
  }
  
  if (role=='USER') {
    
    return <div className='erooor'>You can't access this page</div>;
  }
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
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
    <div className="userdetailstable-container">
      
       
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
         <div>
          {!showAddUser && !showUpdateUser && (
        <button onClick={handleAdd} className="add-btn">
          Add User
        </button>
        
      )}<br></br>
           <div className="search-bar">
            <input type="text" placeholder="Search by Book Name" value={searchQuery} onChange={handleSearchInputChange} />
          </div>
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
                .filter((user) => user.role !== "ADMIN" && user.showstatus !='false' && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
              <tr key={user.id}>
                 <td>{user.id}</td>

                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td>
                  <div className='buttons'>
                  <button className='upadtebtn' onClick={() => handleUpdate(user.id,user.firstName,user.lastName,user.email,user.mobile)}>Update</button>
                  <button
                    onClick={() => handleBlockUser(user.id,user.status,user.firstName)}
                    className={user.status=='UNBLOCK'? 'unblock-btn' : 'block-btn'}
                  >
                    {user.status=='UNBLOCK' ? 'BLOCK' : 'UNBLOCK'}
                  </button>
                  <button className='deletebtn'onClick={() => userDelete(user.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {users.filter((user) => user.firstName.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
      
      <div className="no-user-message">No User Exists</div>
    )}
        </table>
        {showAlert && (
        <div className="custom-alert">
          <div className="alert-content">
            <p>Are you sure you want to {blockUserStatus} {blockUserName}?</p>
            <div className="alert-buttons">
              <button onClick={confirmBlockUser}>OK</button>
              <button onClick={cancelBlockUser}>Cancel</button>
            </div>
          </div>
        </div>
      )}
        </div>
        
      )}
     
     
    </div>
  );
};

export default UserTable;
