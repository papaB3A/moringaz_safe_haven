import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoggedInUser(response.data);
      } catch (err) {
        console.error("Error fetching logged-in user profile:", err.response?.data || err.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (err) {
        console.error("Error fetching users list:", err.response?.data || err.message);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedInUser();
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="userlist-wrapper">
      <div className="wrapper">
        <section className="users">
          <header>
            <div className="content">
              <img src="images/no-image.jpg" alt="User Profile" />
              <div className="details">
                <span>{loggedInUser ? `${loggedInUser.fname} ${loggedInUser.lname}` : 'Loading...'}</span>
                {/* <p>{loggedInUser?.status || 'Offline'}</p> */}
              </div>
            </div>
            <Link className="logout" to="/">Home</Link>
            <Link to="/login" className="logout" onClick={handleLogout}>Logout</Link>
          </header>

          <div className="search">
            <span className="text">Select a user to start chat</span>
            <input type="text" placeholder="Enter name to search..." />
            <button><i className="fas fa-search"></i></button>
          </div>

          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="users-list">
              {users.map((user, index) => (
                <a href="#" key={index}>
                  <img src={`images/${user.img}`} alt={`${user.fname} ${user.lname}`} />
                  <div className="content">
                    <div className="details">
                      <span>{`${user.fname} ${user.lname}`}</span>
                      {/* <p>{user.status}</p> */}
                    </div>
                    <div className={`status-dot ${user.status === 'online' ? '' : 'offline'}`} />
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UsersList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/style.css';

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:5000/chats", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(response.data.users);
//       } catch (err) {
//         console.error("Error fetching users list:", err.response?.data || err.message);
//         setError("Failed to load users.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//   };

//   return (
//     <div className="userlist-wrapper">
//       <div className="wrapper">
//         <section className="users">
//           <header>
//             <div className="content">
//               <img src="images/no-image.jpg" alt="User Profile" />
//               <div className="details">
//                 <span>Papa Akumu</span>
//                 {/* <p>Online</p> */}
//               </div>
//             </div>
//             <Link className="logout" to="/">Home</Link>
//             <Link to="/login" className="logout" onClick={handleLogout}>Logout</Link>
//           </header>

//           <div className="search">
//             <span className="text">Select a user to start chat</span>
//             <input type="text" placeholder="Enter name to search..." />
//             <button><i className="fas fa-search"></i></button>
//           </div>

//           {loading ? (
//             <p>Loading users...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : (
//             <div className="users-list">
//               {users.map((user, index) => (
//                 <a href="#" key={index}>
//                   <img src={`images/${user.img}`} alt={`${user.fname} ${user.lname}`} />
//                   <div className="content">
//                     <div className="details">
//                       <span>{`${user.fname} ${user.lname}`}</span>
//                       <p>{user.status}</p>
//                     </div>
//                     <div className={`status-dot ${user.status === 'online' ? '' : 'offline'}`} />
//                   </div>
//                 </a>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default UsersList;


// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap if needed
// import '../styles/style.css'; // Assuming the CSS file is named 'style.css'

// // rename it to Chats
// const UsersList = () => {
//   const [users] = useState([
//     {
//       img: "graduationPhoto.jpg",
//       fname: "John",
//       lname: "Doe",
//       message: "Hello, how are you?",
//       status: "online",
//     },
//     {
//       img: "popePic.jpg",
//       fname: "Jane",
//       lname: "Smith",
//       message: "Let's catch up soon!",
//       status: "offline",
//     },
//     {
//       img: "no-image.jpg",
//       fname: "Mike",
//       lname: "Johnson",
//       message: "Meeting at 5 PM?",
//       status: "online",
//     },
//   ]);

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Clear the token
//   };
  
//   return (
//     <div className="userlist-wrapper">
//       <div className="wrapper">
//         <section className="users">
//           <header>
//             <div className="content">
//               <img src="images/no-image.jpg" alt="User Profile" />
//               <div className="details">
//                 <span>Papa Akumu</span>
//                 {/* <p>Online</p> */}
//               </div>
//             </div>
//             {/* <a href="homePage.php" className="logout" style={{ backgroundColor: "#ffc107", color: "#000", borderColor: "#ffc107" }}>Home</a> */}
//             <Link className="logout" to="/">Home</Link>
//             <Link to="/login" className="logout" onClick={handleLogout}>Logout</Link>
//             {/* <a href="logout.php" className="logout" >Logout</a> */}
//           </header>

//           <div className="search">
//             <span className="text">Select a user to start chat</span>
//             <input type="text" placeholder="Enter name to search..." />
//             <button><i className="fas fa-search"></i></button>
//           </div>

//           <div className="users-list">
//             {users.map((user, index) => (
//               <a href="#" key={index}>
//                 <img src={`images/${user.img}`} alt={`${user.fname} ${user.lname}`} />
//                 <div className="content">
//                   <div className="details">
//                     <span>{`${user.fname} ${user.lname}`}</span>
//                     <p>{user.message}</p>
//                   </div>
//                   <div className={`status-dot ${user.status === 'online' ? '' : 'offline'}`} />
//                 </div>
//               </a>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default UsersList;
