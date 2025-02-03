import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import UsersList from './components/UsersList';
// import ChatBox from './components/ChatBox';
import AboutUs from './components/AboutUs';
// import Signup from './components/SignUp';
import Login from './components/Login';
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from './components/SignUp';

export default function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/aboutUs" element={<AboutUs/>} />
            <Route path="/appointments" element="" />
            <Route path="/resources" element="" />
            <Route path="/chats" element={<UsersList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
