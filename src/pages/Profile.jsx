import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useState } from "react";

const BASE_URL = "http://127.0.0.1:5000";

export default function Profile() {
  const navigate = useNavigate();
  const { token, user, loading, logout } = useAuth();

  const [error, setError] = useState("");

  // Not logged in
 if (!token) {
  return (
    <div className="page">
      <div className="card" style={{ textAlign: "center" }}>
        <h2>Mechanic Profile</h2>

        {/* Emoji placeholder */}
        <div style={{ fontSize: "3rem", margin: "10px 0" }}>
          🔒
        </div>

        <p className="small">
          You must be logged in to view your mechanic profile.
        </p>

        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link className="btn" to="/login">
            Login
          </Link>
          <Link className="btn btn-outline" to="/register">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}


  // Loading state while AuthContext fetches /mechanics/me
  if (loading) {
    return (
      <div className="page">
        <div className="card">
          <h2>Mechanic Profile</h2>
          <p className="small">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Token exists but user didn’t load for some reason
  if (!user) {
    return (
      <div className="page">
        <div className="card">
          <h2>Mechanic Profile</h2>
          <p className="small">No profile data found.</p>
          <div className="btn-row">
            <button className="btn btn-outline" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }

  async function handleDelete() {
    setError("");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/mechanics/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Delete failed");
      }

      logout();
      navigate("/register");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Mechanic Profile</h2>
        <p className="small">Welcome back! Here’s your account info.</p>

        {error && <p className="error">{error}</p>}

        <div style={{ display: "grid", gap: 6, marginTop: 10 }}>
          <p><b>ID:</b> {user.id}</p>
          <p><b>Name:</b> {user.first_name} {user.last_name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Salary:</b> {user.salary}</p>
          <p><b>Address:</b> {user.address}</p>
        </div>

        <div className="btn-row" style={{ marginTop: 14 }}>
          <button className="btn" onClick={() => navigate("/edit")}>
            Update Profile
          </button>

          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Account
          </button>

          <Link className="btn btn-outline" to="/my-tickets">
            View My Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
