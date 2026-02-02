import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // Load user data into the form once user exists
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

      // Update the user in context so Profile updates immediately
      setUser(data);

      setMessage("Profile updated!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  if (!token) return <p style={{ padding: 16 }}>Please login.</p>;
  if (!user) return <p style={{ padding: 16 }}>Loading...</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Edit Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}

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

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
