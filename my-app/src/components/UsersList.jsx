import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap if needed
import '../styles/style.css'; // Assuming the CSS file is named 'style.css'

const UsersList = () => {
  const [users] = useState([
    {
      img: "graduationPhoto.jpg",
      fname: "John",
      lname: "Doe",
      message: "Hello, how are you?",
      status: "online",
    },
    {
      img: "popePic.jpg",
      fname: "Jane",
      lname: "Smith",
      message: "Let's catch up soon!",
      status: "offline",
    },
    {
      img: "no-image.jpg",
      fname: "Mike",
      lname: "Johnson",
      message: "Meeting at 5 PM?",
      status: "online",
    },
  ]);

  return (
    <div className="wrapper">
      <section className="users">
        <header>
          <div className="content">
            <img src="images/no-image.jpg" alt="User Profile" />
            <div className="details">
              <span>Papa Akumu</span>
              <p>Online</p>
            </div>
          </div>
          <a href="homePage.php" className="logout" style={{ backgroundColor: "#ffc107", color: "#000", borderColor: "#ffc107" }}>Home</a>
          <a href="logout.php" className="logout" style={{ backgroundColor: "#ffc107", color: "#000", borderColor: "#ffc107" }}>Logout</a>
        </header>

        <div className="search">
          <span className="text">Select a user to start chat</span>
          <input type="text" placeholder="Enter name to search..." />
          <button><i className="fas fa-search"></i></button>
        </div>

        <div className="users-list">
          {users.map((user, index) => (
            <a href="#" key={index}>
              <img src={`images/${user.img}`} alt={`${user.fname} ${user.lname}`} />
              <div className="content">
                <div className="details">
                  <span>{`${user.fname} ${user.lname}`}</span>
                  <p>{user.message}</p>
                </div>
                <div className={`status-dot ${user.status === 'online' ? '' : 'offline'}`} />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UsersList;
