import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/style.css";
import axios from "axios";
import { Helmet } from "react-helmet";

const ChatBox = () => {
  // const API_URL = process.env.REACT_APP_API_URL;

  const { userId } = useParams();
  console.log("UserId from params:", userId);
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const chatBoxRef = useRef(null);

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        // `${API_URL}/send_message`
        // "http://localhost:5000/send_message"
        await axios.post(
          "http://localhost:5000/send_message",
          {
            outgoing_id: userId,
            msg: message,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessage("");
        fetchChatData();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const fetchChatData = async () => {
    try {
      // `${API_URL}/get_messages`
      // "http://localhost:5000/get_messages",
      const response = await axios.post(
        "http://localhost:5000/get_messages",
        { incoming_id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChatData(response.data.messages);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    fetchChatData();
    const intervalId = setInterval(fetchChatData, 500);
    return () => clearInterval(intervalId);
  }, [userId]);

  return (
    <div className="wrapper">
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
      </Helmet>

      <section className="chat-area">
        <header>
          <a href="/chats" className="back-icon">
            <i className="fas fa-arrow-left"></i>
          </a>
          <img src="../images/popePic.jpg" alt="Papa Akumu" className="user-img" />
          <div className="details">
            <span>Chat with User {userId}</span>
          </div>
        </header>

        <div className="chat-box" ref={chatBoxRef}>
          {chatData.map((chat, index) => (
            <div key={index} className="chat-message">
              <p>{chat.msg}</p>
            </div>
          ))}
        </div>

        <form className="typing-area" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Type a message here..."
            value={message}
            onChange={handleInputChange}
          />
          <button type="submit" disabled={!message.trim()} className={message ? "active" : ""}>
            <i className="fab fa-telegram-plane"></i>
          </button>
        </form>
      </section>
    </div>
  );
};

export default ChatBox;


// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom"; // Import useParams for dynamic routing
// import "../styles/style.css";
// import { Helmet } from "react-helmet";

// const ChatBox = () => {
//   const { userId } = useParams(); // Get the selected user ID from the URL
//   const [message, setMessage] = useState("");
//   const [chatData, setChatData] = useState("");
//   const chatBoxRef = useRef(null);

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       sendMessage();
//     }
//   };

//   const sendMessage = () => {
//     fetch("insert-chat.php", {
//       method: "POST",
//       body: new URLSearchParams({ message, incoming_id: userId }), // Use userId from URL
//     })
//       .then((response) => response.text())
//       .then(() => {
//         setMessage("");
//         scrollToBottom();
//       });
//   };

//   const scrollToBottom = () => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   };

//   useEffect(() => {
//     const fetchChatData = () => {
//       fetch("get-chat.php", {
//         method: "POST",
//         headers: { "Content-type": "application/x-www-form-urlencoded" },
//         body: `incoming_id=${userId}`,
//       })
//         .then((response) => response.text())
//         .then((data) => {
//           setChatData(data);
//           scrollToBottom();
//         });
//     };

//     const intervalId = setInterval(fetchChatData, 500);
//     return () => clearInterval(intervalId);
//   }, [userId]);

//   return (
//     <div className="wrapper">
//       <Helmet>
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
//       </Helmet>

//       <section className="chat-area">
//         <header>
//           <a href="/chats" className="back-icon">
//             <i className="fas fa-arrow-left"></i>
//           </a>
//           <img src="../images/popePic.jpg" alt="Papa Akumu" className="user-img" />
//           <div className="details">
//             <span>Chat with User {userId}</span>
//           </div>
//         </header>

//         <div className="chat-box" ref={chatBoxRef} dangerouslySetInnerHTML={{ __html: chatData }} />

//         <form className="typing-area" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className="input-field"
//             placeholder="Type a message here..."
//             value={message}
//             onChange={handleInputChange}
//           />
//           <button type="submit" disabled={!message.trim()} className={message ? "active" : ""}>
//             <i className="fab fa-telegram-plane"></i>
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default ChatBox;


// import React, { useState, useEffect, useRef } from "react";
// // import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css";
// // import "../styles/chatBox.css"; // Consider moving styles into a CSS file
// import "../styles/style.css";
// import { Helmet } from "react-helmet";

// const ChatBox = () => {
//   const [message, setMessage] = useState("");
//   const [chatData, setChatData] = useState("");
//   const [incomingId, setIncomingId] = useState("");
//   const chatBoxRef = useRef(null);

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       sendMessage();
//     }
//   };

//   const sendMessage = () => {
//     fetch("insert-chat.php", {
//       method: "POST",
//       body: new URLSearchParams({ message, incoming_id: incomingId }),
//     })
//       .then((response) => response.text())
//       .then(() => {
//         setMessage("");
//         scrollToBottom();
//       });
//   };

//   const scrollToBottom = () => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   };

//   useEffect(() => {
//     const fetchChatData = () => {
//       fetch("get-chat.php", {
//         method: "POST",
//         headers: { "Content-type": "application/x-www-form-urlencoded" },
//         body: `incoming_id=${incomingId}`,
//       })
//         .then((response) => response.text())
//         .then((data) => {
//           setChatData(data);
//           scrollToBottom();
//         });
//     };

//     const intervalId = setInterval(fetchChatData, 500);
//     return () => clearInterval(intervalId);
//   }, [incomingId]);

//   return (
//     <div className="wrapper">
//       <Helmet>
//          <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
//         />
//       </Helmet>

//       <section className="chat-area">
//         <header>
//           <a href="users.php" className="back-icon">
//             <i className="fas fa-arrow-left"></i>
//           </a>
//           <img src="../images/popePic.jpg" alt="Papa Akumu" className="user-img" />
//           <div className="details">
//             <span>Papa Akumu</span>
//             <p></p>
//           </div>
//         </header>

//         <div className="chat-box" ref={chatBoxRef} dangerouslySetInnerHTML={{ __html: chatData }} />

//         <form className="typing-area" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className="input-field"
//             placeholder="Type a message here..."
//             value={message}
//             onChange={handleInputChange}
//           />
//           <button type="submit" disabled={!message.trim()} className={message ? "active" : ""}>
//             <i className="fab fa-telegram-plane"></i>
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default ChatBox;


// import React, { useState, useEffect, useRef } from "react";
// import "../styles/style.css"; // Assuming the CSS file is in the same directory
// import { Helmet } from "react-helmet";

// const ChatBox = () => {
//   const [message, setMessage] = useState("");
//   const [chatData, setChatData] = useState([]);
//   const chatBoxRef = useRef(null);
//   const incomingId = "some-incoming-id"; // This would be passed or fetched dynamically
  
//   // Handle typing input change
//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
//   };

//   // Send message logic
//   const handleSendMessage = () => {
//     const formData = new FormData();
//     formData.append("incoming_id", incomingId);
//     formData.append("message", message);

//     // Send the message to server
//     fetch("insert-chat.php", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setMessage(""); // Clear input field
//           scrollToBottom();
//         }
//       });
//   };

//   // Fetch new chat data
//   const fetchChatData = () => {
//     const formData = new URLSearchParams();
//     formData.append("incoming_id", incomingId);

//     fetch("get-chat.php", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.text())
//       .then((data) => {
//         setChatData(data); // Set chat data (you might need to parse it if JSON)
//         if (!chatBoxRef.current.classList.contains("active")) {
//           scrollToBottom();
//         }
//       });
//   };

//   // Scroll to the bottom of the chat
//   const scrollToBottom = () => {
//     chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//   };

//   // Set up interval to fetch chat every 500ms
//   useEffect(() => {
//     const intervalId = setInterval(fetchChatData, 500);

//     return () => clearInterval(intervalId); // Cleanup on component unmount
//   }, []); // Empty dependency array to run once on mount

//   // Handle mouse enter/leave on chat box
//   const handleMouseEnter = () => {
//     chatBoxRef.current.classList.add("active");
//   };

//   const handleMouseLeave = () => {
//     chatBoxRef.current.classList.remove("active");
//   };

//   return (
//     <div className="wrapper">
//       <Helmet>
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
//         />
//       </Helmet>

//       <section className="chat-area">
//         <header>
//           <a href="users.php" className="back-icon">
//             <i className="fas fa-arrow-left"></i>
//           </a>
//           <img src="images/" alt="" />
//           <div className="details">
//             <span></span>
//             <p></p>
//           </div>
//         </header>
//         <div
//           className="chat-box"
//           ref={chatBoxRef}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           {/* Render chat data */}
//           {chatData && chatData.map((msg, index) => (
//             <div key={index} className="message">
//               {/* Render message */}
//               {msg}
//             </div>
//           ))}
//         </div>
//         <form
//           action="#"
//           className="typing-area"
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSendMessage();
//           }}
//         >
//           <input
//             type="text"
//             className="incoming_id"
//             name="incoming_id"
//             value={incomingId}
//             hidden
//           />
//           <input
//             type="text"
//             name="message"
//             className="input-field"
//             placeholder="Type a message here..."
//             autoComplete="off"
//             value={message}
//             onChange={handleInputChange}
//           />
//           <button type="button" onClick={handleSendMessage}>
//             <i className="fab fa-telegram-plane"></i>
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default ChatBox;
