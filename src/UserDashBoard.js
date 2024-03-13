import React from "react";
import "./UserDashboard.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UserDashboard = () => {
  const { state } = useLocation();

  // Extract user object from state, if available
  const user = state && state.res;
  console.log(user);

  return (
    <>
      <div className="user-dashboard">
        <ul className="sidebar">
          <li><span className="text-primary fw-bolder">Pramod-App</span></li>
          <li><span></span><span>Home</span></li>
          <li><span></span><span>Dashboard</span></li>
          <li><span></span><span>Users <i className="bi bi-person-hearts"></i></span></li>
          {/* Link to View Files */}
          <li><span></span><span><Link to="/viewfiles">View Files <i className="bi bi-eyeglasses"></i></Link></span></li>
          {/* Link to Upload File */}
          <li><span></span><span><Link to="/fileupload">Upload File <i className="bi bi-cloud-arrow-up-fill"></i></Link></span></li>
          <li><span></span><span>Logout <i className="bi bi-box-arrow-left"></i></span></li>
        </ul>
        
        <div className="content">
          <div>
            {/* Display welcome message with user's name */}
            <h2 className="mt-3 text-center text-danger-emphasis">Welcome, {user ? user.userName : 'User'}</h2>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default UserDashboard;
