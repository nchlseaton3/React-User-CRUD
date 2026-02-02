import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="nav-link">Profile</Link>

      {!token ? (
        <>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </>
      ) : (
        <>
          <Link to="/edit" className="nav-link">Edit</Link>
          <Link to="/my-tickets" className="nav-link">My Tickets</Link>
          <button className="nav-btn" onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
