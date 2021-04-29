import React from 'react';

const UserIndexItem = ({ user }) => {
  const firstName = user.firstName.replace(/^"|"$/g, '');
  const lastName = user.lastName.replace(/^"|"$/g, '');
  return (
    <div className="user-index-item-container">
      <span>{firstName + ' ' + lastName}</span>
    </div>
  );
};

export default UserIndexItem;
