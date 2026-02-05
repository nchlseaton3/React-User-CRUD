import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const BASE_URL = "http://127.0.0.1:5000";

export default function MyTickets() {
  const { token } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError("");

    fetch(`${BASE_URL}/mechanics/my-tickets`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok)
          throw new Error(
            data?.error || data?.message || "Failed to load tickets",
          );
        return data;
      })
      .then((data) => setTickets(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  // Not logged in
  if (!token) {
    return (
      <div className="page">
        <div className="card">
          <h2>My Tickets</h2>
          <p className="small">Please login to view tickets assigned to you.</p>
          <div className="btn-row">
            <Link className="btn" to="/login">
              Go to Login
            </Link>
            <Link className="btn btn-outline" to="/">
              Back to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h2>My Tickets</h2>
        <p className="small">
          Tickets currently assigned to your mechanic account.
        </p>

        {loading && <p className="small">Loading tickets...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && tickets.length === 0 && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <p style={{ fontSize: "3rem" }}>🛠️</p>
            <p className="small">
              No tickets assigned yet — shop’s quiet for now.
            </p>
          </div>
        )}

        <ul className="list" style={{ marginTop: 12 }}>
          {tickets.map((t) => (
            <li key={t.id} className="card">
              <p style={{ marginTop: 0 }}>
                <b>Ticket #{t.id}</b>
              </p>
              <p>
                <b>Service:</b> {t.service_desc}
              </p>
              <p>
                <b>Date:</b> {t.service_date}
              </p>
              <p>
                <b>VIN:</b> {t.vin}
              </p>
            </li>
          ))}
        </ul>

        <div className="btn-row" style={{ marginTop: 14 }}>
          <Link className="btn btn-outline" to="/">
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
