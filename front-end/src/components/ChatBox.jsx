import React, { useState, useEffect, useRef } from "react";
import "../styles/style.css"; // Assuming the CSS file is in the same directory
import { Helmet } from "react-helmet";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const chatBoxRef = useRef(null);
  const incomingId = "some-incoming-id"; // This would be passed or fetched dynamically
  
  // Handle typing input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Send message logic
  const handleSendMessage = () => {
    const formData = new FormData();
    formData.append("incoming_id", incomingId);
    formData.append("message", message);

    // Send the message to server
    fetch("insert-chat.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage(""); // Clear input field
          scrollToBottom();
        }
      });
  };

  // Fetch new chat data
  const fetchChatData = () => {
    const formData = new URLSearchParams();
    formData.append("incoming_id", incomingId);

    fetch("get-chat.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        setChatData(data); // Set chat data (you might need to parse it if JSON)
        if (!chatBoxRef.current.classList.contains("active")) {
          scrollToBottom();
        }
      });
  };

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  // Set up interval to fetch chat every 500ms
  useEffect(() => {
    const intervalId = setInterval(fetchChatData, 500);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []); // Empty dependency array to run once on mount

  // Handle mouse enter/leave on chat box
  const handleMouseEnter = () => {
    chatBoxRef.current.classList.add("active");
  };

  const handleMouseLeave = () => {
    chatBoxRef.current.classList.remove("active");
  };

  return (
    <div className="wrapper">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
        />
      </Helmet>

      <section className="chat-area">
        <header>
          <a href="users.php" className="back-icon">
            <i className="fas fa-arrow-left"></i>
          </a>
          <img src="images/" alt="" />
          <div className="details">
            <span></span>
            <p></p>
          </div>
        </header>
        <div
          className="chat-box"
          ref={chatBoxRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Render chat data */}
          {chatData && chatData.map((msg, index) => (
            <div key={index} className="message">
              {/* Render message */}
              {msg}
            </div>
          ))}
        </div>
        <form
          action="#"
          className="typing-area"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            className="incoming_id"
            name="incoming_id"
            value={incomingId}
            hidden
          />
          <input
            type="text"
            name="message"
            className="input-field"
            placeholder="Type a message here..."
            autoComplete="off"
            value={message}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleSendMessage}>
            <i className="fab fa-telegram-plane"></i>
          </button>
        </form>
      </section>
    </div>
  );
};

export default ChatBox;
