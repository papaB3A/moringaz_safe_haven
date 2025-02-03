import React from "react";
import { Link } from "react-router-dom";
import "../styles/aboutUs.css";
// import "./AboutUs.css"; 
export default function AboutUs() {
  return (
    <>
     <div className="about-wrapper">
        <div className="banner">
            <nav className="navbar">
                {/* <ul>
                <li className="right"><Link to="/signup">Sign Up</Link></li>
                <li className="right"><Link to="/upcoming-events">Upcoming Events</Link></li>
                <li className="right"><Link to="/home">Home</Link></li>
                <li className="right"><Link to="/login">Login</Link></li>
                </ul> */}
            </nav>
            <div className="container">
                <h1>About Moringa's Safe Haven</h1>
                <p>
                Welcome to Moringa's Safe Haven, a dedicated space within Moringa
                Institute designed to support students dealing with social anxiety
                disorder. Our mission is to provide a nurturing environment where
                students can access resources and connect with therapists to
                effectively manage their challenges.
                </p>
                <p>At Moringa's Safe Haven, we understand the importance of a supportive community and personalized care.</p>

                <h2>What to expect from our platform:</h2>
                <ul>
                <li>
                    <strong>User Profile Setup:</strong> Upon joining, users can create
                    personalized profiles to tailor their experience to their specific
                    needs and preferences.
                </li>
                <li>
                    <strong>Therapist Appointment Scheduling:</strong> We offer a
                    seamless appointment scheduling system that allows users to book
                    sessions with experienced therapists.
                </li>
                <li>
                    <strong>In-App Chat with Therapists:</strong> Our secure messaging
                    feature allows users to engage in confidential conversations with
                    qualified therapists.
                </li>
                <li>
                    <strong>Inspiration and Coping Mechanisms:</strong> Our platform
                    features inspirational quotes and coping mechanisms contributed by
                    peer mentors.
                </li>
                </ul>

                <p>
                At Moringa's Safe Haven, we're committed to empowering students to
                navigate their social anxiety with confidence and resilience. Join our
                community today and take the first step towards a brighter, more
                empowered future.
                </p>

                <Link to="/" className="home-button">
                Home
                </Link>
            </div>
        </div>
     </div>
    </>
  );
}
