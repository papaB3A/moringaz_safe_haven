import { useState } from "react";
import "../styles/style.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = () => {
  // const API_URL = process.env.REACT_APP_API_URL;
  // `${API_URL}/get_messages`

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      // "http://localhost:5000/login"
      // `${API_URL}/login`
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
      } else {
        // Store the token in local storage
        localStorage.setItem("token", data.token);
        alert("Login successful");
        navigate("/"); // Navigate to the home page
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
      </Helmet>
      <section className="form login">
        <header>Moringa's Safe Haven</header>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="error-text">{error}</div>
          <div className="field input">
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field input">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <div className="field button">
            <input
              type="submit"
              name="submit"
              value="Continue to Home Page"
              style={{
                borderColor: "#ffc107",
                backgroundColor: "#ffc107",
                color: "#000",
                height: "45px",
                fontSize: "17px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "13px",
              }}
            />
          </div>
        </form>
        <div className="link">
          {/* Not yet signed up? <a href="index.php">Signup now</a> */}
          Not yet signed up? <Link to="/sign-up">Signup now</Link>
        </div>
      </section>
    </div>
  );
};

export default Login;


// import { useState } from "react";
// import "../styles/style.css"
// import { Helmet } from 'react-helmet';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email:", email);
//     console.log("Password:", password);
//     // Add authentication logic here
//   };

//   return (
//     <div className="wrapper">
//       <Helmet>
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"/>
//       </Helmet>
//       <section className="form login">
//         <header>Strath's Safe Haven</header>
//         <form onSubmit={handleSubmit} autoComplete="off">
//           <div className="error-text"></div>
//           <div className="field input">
//             <label>Email Address</label>
//             <input
//               type="text"
//               name="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="field input">
//             <label>Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <i
//               className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
//               onClick={() => setShowPassword(!showPassword)}
//               style={{ cursor: "pointer" }}
//             ></i>
//           </div>
//           <div className="field button">
//             <input 
//               type="submit" 
//               name="submit" 
//               value="Continue to Home Page" 
//               style={{
//                 borderColor: "#ffc107",
//                 backgroundColor: "#ffc107",
//                 color: "#000",
//                 height: "45px",
//                 fontSize: "17px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 marginTop: "13px"
//               }}
//             />
//           </div>
//         </form>
//         <div className="link">
//           Not yet signed up? <a href="index.php">Signup now</a>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Login;