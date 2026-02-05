import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const BASE_URL = "http://127.0.0.1:5000";

// Login page:
// - Controlled form
// - POST to /mechanics/login
// - Save token to context/localStorage (useContext requirement)
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // from AuthContext

  const [error, setError] = useState("");

  // Controlled form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/mechanics/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Login failed");
      }

      // Backend returns: { message, token }
      if (!data.token) {
        throw new Error("No token returned from login.");
      }

      // Store token in context + localStorage
      login(data.token);

      // Go to profile page
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Mechanic Login</h2>

        {error && <p className="error">{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="btn-row">
            <button className="btn" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
