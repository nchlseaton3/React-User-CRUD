import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import MyTickets from "./pages/MyTickets.jsx";

// App sets up the page routes (Pages/Views requirement).
// Each Route maps a URL path to a page component.
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Profile page: shows mechanic profile if logged in */}
        <Route path="/" element={<Profile />} />

        {/* Register + Login pages: controlled form components */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Update mechanic page */}
        <Route path="/edit" element={<EditProfile />} />

        {/* Bonus: tickets assigned to logged-in mechanic */}
        <Route path="/my-tickets" element={<MyTickets />} />
      </Routes>
    </>
  );
}
