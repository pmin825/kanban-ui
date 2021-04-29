import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav>
        <Link to={'/'}>
          <span className="home-button">Home</span>
        </Link>
        <div className="title-container">
          <h1 className="app-title">Peter's Task app!</h1>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
