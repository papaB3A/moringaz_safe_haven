import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Link, Navigate} from "react-router-dom";
import "../styles/landingPage.css";

import 'bootstrap-icons/font/bootstrap-icons.css';

const slides = [
  {
    img: "/images/userProfilePage.jpg",
    title: "User Profile: Embrace Your Journey",
    description:
      "Your user profile is your safe haven—a space where you can express yourself at your own pace. Set a profile picture that resonates with you, whether it's a calming nature scene or a symbol of resilience.",
    icons: ["bi bi-emoji-kiss-fill", "bi bi-heart-fill"],
    link:"/profile"
  },
  {
    img: "/images/aboutUs.jpg",
    title: "About Us!",
    description:
      "Welcome to our About Us page! Here, you'll find a treasure trove of valuable resources curated just for you. Whether you're looking for inspiration, knowledge, or tools to empower yourself, you're in the right place!",
    icons: ["bi bi-hash", "bi bi-lightbulb-fill"],
    link:"/aboutUs"
  },
  {
    img: "/images/appointmentBooking.jpg",
    title: "Book an Appointment",
    description:
      "Scheduling an appointment has never been easier. Our platform allows you to book your therapy sessions seamlessly. Take control of your mental health journey today!",
    icons: ["bi bi-calendar-check-fill", "bi bi-person-lines-fill"],
    link:"/appointments"
  },
  {
    img: "/images/supportiveCommunity.jpg",
    title: "Community Corner",
    description:
      "Scheduling an appointment has never been easier. Our platform allows you to book your therapy sessions seamlessly. Take control of your mental health journey today!",
    icons: ["bi bi-calendar-check-fill", "bi bi-person-lines-fill"],
    link:"/resources"
  },
  {
    img: "/images/chatTherapySession.jpg",
    title: "Welcome to Chats",
    description:
      "Scheduling an appointment has never been easier. Our platform allows you to book your therapy sessions seamlessly. Take control of your mental health journey today!",
    icons: ["bi bi-calendar-check-fill", "bi bi-person-lines-fill"],
    link:"/chats"
  }
];

// const LandingPage = () => {
export default function LandingPage(){
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };
    
    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handleLogout = () => {
      localStorage.removeItem("token"); // Clear the token
      // navigate("/login"); // Redirect to the login page
      // <Navigate to="/login" />
    };

  return (
    <div className="dancing-script">
      <header>
        <h1 className="logo">
          SAFE~HAVEN
        </h1>
        <ul className="menu">
          {/* <li><a href="home.php">Profile</a></li>
          <li><a href="aboutUs.php">About~Us</a></li>
          <li><a href="appointments.php">Appointments</a></li>
          <li><a href="resources.php">Community</a></li>
          <li><a href="users.php">Chats</a></li> */}
          <li><Link to="/profile">Profile</Link></li> 
          <li><Link to="/aboutUs">About Us</Link></li> 
          <li><Link to="/appointments">Appointments</Link></li> 
          <li><Link to="/resources">Community</Link></li> 
          <li><Link to="/chats">Chats</Link></li> 
          {/* <li><a onClick={handleLogout} className="logout-btn">Logout</a></li> */}
          <li><Link to="/login" className="logout-btn" onClick={handleLogout}>Logout</Link></li> 
        </ul>
      </header>

      <div className="slider">
        <div className="list">
          {slides.map((slide, index) => (
            <div key={index} className={`item ${index === activeIndex ? "active" : ""}`}>
              <img src={slide.img} alt="Slide" />
              <div className="content">
                <p>We're glad you made it!!</p>
                <h2>
                  {slide.icons.map((icon, idx) => (
                    <span key={idx} className={icon} style={{ marginRight: "5px" }}></span>
                  ))}
                  {slide.title}
                </h2>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
          
        </div>

        <div className="thumbnail">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`item ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {/* <a href="redirect_to_home.php">
               <img src={slide.img} alt="Thumbnail" />
              </a> */}
              <Link to={slide.link}>
                <img src={slide.img} alt="Thumbnail" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="arrows">
        <button onClick={prevSlide}><i className="bi bi-chevron-left"></i></button>
        <button onClick={nextSlide}><i className="bi bi-chevron-right"></i></button>
      </div>
    </div>
  );
};

// export default LandingPage;

// const images = [
//     {
//         // src: "userProfilePage.jpg",
//         src: "/images/userProfilePage.jpg",
//         heading: "User Profile: Embrace Your Journey",
//         description:
//         "Your user profile is your safe haven—a space where you can express yourself at your own pace. Set a profile picture that resonates with you, whether it's a calming nature scene or a symbol of resilience.",
//     },
//     {
//         // src: "aboutUs.jpg",
//         src: "/images/aboutUs.jpg",
//         heading: "About Us!",
//         description:
//         "Welcome to our About Us page! Here, you'll find a treasure trove of valuable resources curated just for you. Whether you're looking for inspiration, knowledge, or tools to empower yourself, you're in the right place!",
//     },
//     {
//         // src: "appointmentBooking.jpg",
//         src: "/images/appointmentBooking.jpg",
//         heading: "Book an Appointment Now!",
//         description:
//         "Scheduling a therapy session has never been easier. Book an appointment with a professional today and take the first step towards personal growth and emotional well-being.",
//     },
//     {
//         // src: "appointmentBooking.jpg",
//         src: "/images/supportiveCommunity.jpg",
//         heading: "Community Corner",
//         description:
//         "Scheduling a therapy session has never been easier. Book an appointment with a professional today and take the first step towards personal growth and emotional well-being.",
//     },
//     {
//         // src: "appointmentBooking.jpg",
//         src: "/images/chatTherapySession.jpg",
//         heading: "Welcome to Chats",
//         description:
//         "Scheduling a therapy session has never been easier. Book an appointment with a professional today and take the first step towards personal growth and emotional well-being.",
//     }
// ];

// export default function LandingPage(){
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, []);

//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === 0 ? images.length - 1 : prevIndex - 1
//         );
//     };

//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     return (
//       <>
//         <header>
//             <h1 className="logo"><a href="#">SAFE~HAVEN</a></h1>
//             <ul className="menu">
//                 <li><a href="home.php">Profile</a></li>
//                 <li><a href="aboutUs.php">About~Us</a></li>
//                 <li><a href="appointments.php">Appointments</a></li>
//                 <li><a href="resources.php">Community</a></li>
//                 <li><a href="users.php">Chats</a></li>
//                 <li><a href="logout2.php">LogOut</a></li>
                 
//             </ul>
//         </header>

//         <div className="slider">
//             <div className="list">
//             {images.map((image, index) => (
//                 <div
//                 key={index}
//                 className={`item ${index === currentIndex ? "active" : ""}`}
//                 >
//                 <img src={image.src} alt={`Slide ${index + 1}`} />
//                 <div className="content">
//                     <p>We're glad you made it!!</p>
//                     <h2>{image.heading}</h2>
//                     <p>{image.description}</p>
//                 </div>
//                 </div>
//             ))}
//             </div>

//             <div className="arrows">
//             <button onClick={prevSlide}>&lt;</button>
//             <button onClick={nextSlide}>&gt;</button>
//             </div>
//       </div>
//       </>
//     );
// }