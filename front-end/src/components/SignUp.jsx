import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import "../styles/style.css";

const SignUp = () => {
  // const API_URL = process.env.REACT_APP_API_URL;
  // `${API_URL}/get_messages`

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fname || !formData.lname || !formData.email || !formData.password || !formData.image) {
      setErrorText('Please fill out all fields.');
      return;
    }

    setErrorText('');
    
    // Create FormData object for file upload
    const data = new FormData();
    data.append('fname', formData.fname);
    data.append('lname', formData.lname);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('img', formData.image);

    try {
      // `${API_URL}/signup`
      // "http://localhost:5000/signup"
      const response = await fetch("http://localhost:5000/signup", {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorText(errorData.error || 'Signup failed.');
        return;
      }

      const result = await response.json();
      localStorage.setItem('token', result.token); // Save JWT to local storage
      console.log('Signup successful:', result);

      navigate('/'); // Redirect to home page
    } catch (error) {
      setErrorText('An error occurred. Please try again.');
      console.error('Error during signup:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="wrapper">
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
      </Helmet>
      <section className="form signup">
        <header>Moringa's Safe Haven</header>
        <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
          {errorText && <div className="error-text">{errorText}</div>}
          <div className="name-details">
            <div className="field input">
              <label>First Name</label>
              <input
                type="text"
                name="fname"
                placeholder="First name"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field input">
              <label>Last Name</label>
              <input
                type="text"
                name="lname"
                placeholder="Last name"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field input">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field input">
            <label>Password</label>
            <div className="password-toggle">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}></i>
            </div>
          </div>
          <div className="field image">
            <label>Select Image</label>
            <input
              type="file"
              name="image"
              accept="image/x-png,image/gif,image/jpeg,image/jpg"
              onChange={handleChange}
              required
            />
          </div>
          <div className="field button">
            <input
              type="submit"
              name="submit"
              value="Continue to Home Page"
              style={{
                borderColor: '#ffc107',
                backgroundColor: '#ffc107',
                color: '#000',
              }}
            />
          </div>
        </form>
        <div className="link">
          Already signed up? <Link to="/login">Login now</Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Helmet } from "react-helmet";
// import "../styles/style.css";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     fname: '',
//     lname: '',
//     email: '',
//     password: '',
//     image: null,
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorText, setErrorText] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'file' ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.fname || !formData.lname || !formData.email || !formData.password || !formData.image) {
//       setErrorText('Please fill out all fields.');
//       return;
//     }
//     setErrorText('');
//     // Perform sign-up logic here (e.g., API call)
//     console.log('Sign-up form data:', formData);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="wrapper">
//       <Helmet>
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
//       </Helmet>
//       <section className="form signup">
//         <header>Moringa's Safe Haven</header>
//         <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
//           {errorText && <div className="error-text">{errorText}</div>}
//           <div className="name-details">
//             <div className="field input">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="fname"
//                 placeholder="First name"
//                 value={formData.fname}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="field input">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 name="lname"
//                 placeholder="Last name"
//                 value={formData.lname}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//           <div className="field input">
//             <label>Email Address</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="field input">
//             <label>Password</label>
//             <div className="password-toggle">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Enter new password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}></i>
//             </div>
//           </div>
//           <div className="field image">
//             <label>Select Image</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/x-png,image/gif,image/jpeg,image/jpg"
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="field button">
//             <input
//               type="submit"
//               name="submit"
//               value="Continue to Home Page"
//               style={{
//                 borderColor: '#ffc107',
//                 backgroundColor: '#ffc107',
//                 color: '#000',
//               }}
//             />
//           </div>
//         </form>
//         <div className="link">
//           Already signed up? <Link to="/login">Login now</Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SignUp;
