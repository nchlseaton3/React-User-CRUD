import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

// Navbar is a reusable component.
// It reads auth state from context (useContext requirement) to show different links.
export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="nav-link">Profile</Link>

      {/* If there is NO token, user is not logged in */}
      {!token ? (
        <>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </>
      ) : (
        <>
          {/* If token exists, show logged-in navigation */}
          <Link to="/edit" className="nav-link">Edit</Link>
          <Link to="/my-tickets" className="nav-link">My Tickets</Link>

          {/* Logout clears token and user from context/localStorage */}
          <button className="nav-btn" onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
