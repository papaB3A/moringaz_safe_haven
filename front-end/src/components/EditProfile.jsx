import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import "../styles/style2.css";

const EditProfile = () => {
  // Initializing the state with default values (using JSON data or API response)
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    img: null,
    old_pp: '',
  });

  // State for success or error messages
  const [message, setMessage] = useState({ type: '', text: '' });

  // Use effect to simulate loading user data (for now, hardcoding a sample JSON)
  useEffect(() => {
    const data = {
      user: {
        fname: "Papa",
        lname: "Akumu",
        old_pp: "/images/no-image.jpg",
      },
    };

    // Setting the form data with the loaded data
    setFormData({
      fname: data.user.fname,
      lname: data.user.lname,
      old_pp: data.user.old_pp,
    });
  }, []);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        img: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would normally handle the form submission, like sending it to a server
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="shadow w-450 p-3" onSubmit={handleSubmit} encType="multipart/form-data">
        <h4 className="display-4 fs-1">Edit Profile</h4>
        
        {/* Success message */}
        {message.type === 'success' && (
          <div className="alert alert-success" role="alert">
            {message.text}
          </div>
        )}

        {/* Error message */}
        {message.type === 'error' && (
          <div className="alert alert-danger" role="alert">
            {message.text}
          </div>
        )}

        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-3">
          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            name="img"
            onChange={handleChange}
          />
          
          {/* Displaying the old or new profile picture */}
          <img
            src={formData.img ? URL.createObjectURL(formData.img) : formData.old_pp}
            className="rounded-circle"
            style={{ width: '70px' }}
            alt="Profile Preview"
          />
          
          <input type="text" hidden name="old_pp" value={formData.old_pp} />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <a href="home.php" className="link-secondary">
          Back To Profile
        </a>
      </form>
    </div>
  );
};

export default EditProfile;
