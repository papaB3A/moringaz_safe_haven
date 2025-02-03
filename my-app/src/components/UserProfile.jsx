// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "../styles/style2.css";

export default function UserProfile(){
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="shadow w-350 p-3 text-center">
        <img 
          src="../images/popePic.jpg" 
          className="img-fluid rounded-circle" 
          style={{ width: '150px', height: '150px' }} 
          alt="Profile"
        />
        <h3 className="display-4"></h3>
        
        <a href="edit.php" className="btn btn-warning">
          Edit Profile
        </a>
        <a href="homePage.php" className="btn btn-warning">
          Home
        </a>
        <a href="logout2.php" className="btn btn-warning">
          Logout
        </a>
      </div>
    </div>
  );
};

// export default UserProfile;