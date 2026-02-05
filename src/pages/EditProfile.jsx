import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const BASE_URL = "http://127.0.0.1:5000";

export default function EditProfile() {
  const navigate = useNavigate();
  const { token, user, setUser } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    salary: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // When user loads, prefill the form
  useEffect(() => {
    if (!user) return;

    setForm({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      salary: user.salary ?? "",
      address: user.address || "",
    });
  }, [user]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    const payload = {
      ...form,
      salary: Number(form.salary),
    };

    try {
      const res = await fetch(`${BASE_URL}/mechanics/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Update failed");
      }

      // Update context user so Profile updates immediately
      setUser(data);

      setMessage("Profile updated!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  if (!token) {
    return (
      <div className="page">
        <div className="card">
          <h2>Edit Profile</h2>
          <p className="error">Please login to edit your profile.</p>
          <div className="btn-row">
            <Link className="btn" to="/login">Go to Login</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page">
        <div className="card">
          <h2>Edit Profile</h2>
          <p className="small">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Edit Profile</h2>
        <p className="small">Update your mechanic information below.</p>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">First Name</label>
            <input
              className="input"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Last Name</label>
            <input
              className="input"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>

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
            <label className="label">Salary</label>
            <input
              className="input"
              name="salary"
              value={form.salary}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Address</label>
            <input
              className="input"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="btn-row">
            <button className="btn" type="submit">
              Save Changes
            </button>

            <Link className="btn btn-outline" to="/">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
