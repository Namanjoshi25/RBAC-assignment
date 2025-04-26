
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  console.log(user);

  const onLogout = () => {
    logout();
  };

  const navLinks = (
    <div className="flex items-center space-x-4">
      <Link to="/" className=" nav-link">
        Home
      </Link>
  
  
      
    </div>
  );

  const guestLinks = (
    <div className="flex items-center space-x-4">
      <Link to="/register" className="nav-link">
        Register
      </Link>
      <Link to="/login" className="nav-link">
        Login
      </Link>
    </div>
  );
  const authLinks = (
    <div className="flex items-center space-x-4">
      {!user?.isVerified && ( <p>"Not verified"</p>)}
     {isAdmin && (
        <Link to="/admin" className="nav-link ">
          Admin
        </Link>
      )}
      <button 
        onClick={onLogout} 
        className="nav-link"
      >
        Logout
      </button>
    </div>
  );

  return (
    <nav className=" border-2 flex items-center justify-center border-gray-200  w-full top-0 z-10">
      <div className=" w-full px-4 lg:px-8 ml-4">
        <div className="flex justify-between items-center  h-14">
          <div className=" flex items-center   ">
            <Link to="/" className=" font-bold text-xl">
              B<span className=' text-blue-500 '>l</span>oginn
            </Link>
          </div>
          <div className=' '>
          {user && navLinks}
          </div>
          <div className= ' '>
            {user ? authLinks  : guestLinks}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;