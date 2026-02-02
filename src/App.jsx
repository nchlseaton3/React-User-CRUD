import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import MyTickets from "./pages/MyTickets.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/my-tickets" element={<MyTickets />} />
      </Routes>
    </>
  );
}
