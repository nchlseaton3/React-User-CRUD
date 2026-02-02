import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: 16 }}>
      <h2>Register Mechanic</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          placeholder="First name"
          value={form.first_name}
          onChange={handleChange}
        />
        <br />

        <input
          name="last_name"
          placeholder="Last name"
          value={form.last_name}
          onChange={handleChange}
        />
        <br />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />

        <input
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />
        <br />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
