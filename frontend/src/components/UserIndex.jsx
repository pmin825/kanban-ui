import React, { useState, useEffect } from 'react';
import UserIndexItem from '../components/UserIndexItem';
import axios from 'axios';

const UserIndex = ({ users, newUser, handleUserInput, addUser }) => {
  return (
    <div className="user-index-container">
      <h2>Users:</h2>
      <form className="user-form" onSubmit={addUser}>
        <input
          type="text"
          value={newUser.firstName}
          name="firstName"
          placeholder="first name..."
          onChange={handleUserInput}
        ></input>
        <input
          type="text"
          value={newUser.lastName}
          name="lastName"
          placeholder="last name..."
          onChange={handleUserInput}
        ></input>
        <button>Add User</button>
      </form>
      <div className="user-list-container">
        {users &&
          users.map((user) => {
            return <UserIndexItem key={user._id} user={user} />;
          })}
      </div>
    </div>
  );
};

export default UserIndex;
