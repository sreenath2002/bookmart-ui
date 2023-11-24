import React, { useState } from 'react';
import './UserTable.css'; // Import your CSS file for styling
import AddUser from '../AddUser/AddUser';
import UpdateUser from '../UpdateUser/UpdateUser';

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'User1', email: 'user1@example.com', mobile: '1234567890', blocked: false },
    { id: 2, username: 'User2', email: 'user2@example.com', mobile: '9876543210', blocked: false },
    // Add more user data as needed
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUpdate = (id) => {
    setSelectedUserId(id);
    setShowUpdateUser(true);
  };

  const handleBlock = (id) => {
    // Logic to block/unblock user with 'id'
    console.log(`Block/Unblock user with ID: ${id}`);
    // Implement the block/unblock functionality
  };

  const handleAdd = () => {
    setShowAddUser(true);
  };

  const handleBack = () => {
    setShowAddUser(false);
    setShowUpdateUser(false);
  };

  return (
    <div className="table-container">
      {showAddUser ? (
        <AddUser handleBack={handleBack} />
      ) : showUpdateUser ? (
        <UpdateUser userId={selectedUserId} handleBack={handleBack} />
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button onClick={() => handleUpdate(user.id)}>Update</button>
                  <button
                    onClick={() => handleBlock(user.id)}
                    className={user.blocked ? 'block-btn' : 'unblock-btn'}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </button>
                  <button>Delete</button>
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
