import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:5000";

export default function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    salary: "",
    address: "",
    password: "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Convert salary to number (backend expects a numeric value)
    const payload = {
      ...form,
      salary: Number(form.salary),
    };

    try {
      const res = await fetch(`${BASE_URL}/mechanics/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Registration failed");
      }

      setSuccess("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Register Mechanic</h2>
        <p className="small">
          Create your mechanic account to access your profile and tickets.
        </p>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">First Name</label>
            <input
              className="input"
              name="first_name"
              placeholder="Rick"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Last Name</label>
            <input
              className="input"
              name="last_name"
              placeholder="James"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              name="email"
              placeholder="rjames@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Salary</label>
            <input
              className="input"
              name="salary"
              placeholder="60000"
              value={form.salary}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Address</label>
            <input
              className="input"
              name="address"
              placeholder="300 Hawthorne Ln"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="btn-row">
            <button className="btn" type="submit">
              Create Account
            </button>

            <Link className="btn btn-outline" to="/login">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
