import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useState } from "react";

const BASE_URL = "http://127.0.0.1:5000";

export default function Profile() {
  const navigate = useNavigate();
  const { token, user, loading, logout } = useAuth();
  const [error, setError] = useState("");

  if (!token) return <p style={{ padding: 16 }}>Please login to view your profile.</p>;
  if (loading) return <p style={{ padding: 16 }}>Loading profile...</p>;
  if (!user) return <p style={{ padding: 16 }}>No profile loaded.</p>;

  async function handleDelete() {
    setError("");

    // Optional: quick “are you sure?” to prevent accidents
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
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
    <div style={{ padding: 16 }}>
      <h2>Mechanic Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p><b>ID:</b> {user.id}</p>
      <p><b>Name:</b> {user.first_name} {user.last_name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Salary:</b> {user.salary}</p>
      <p><b>Address:</b> {user.address}</p>

      <button onClick={() => navigate("/edit")}>Update</button>{" "}
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}
