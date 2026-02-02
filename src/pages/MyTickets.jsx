import { useEffect, useState } from "react";
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
        if (!res.ok) {
          throw new Error(data?.error || data?.message || "Failed to load tickets");
        }
        return data;
      })
      .then((data) => setTickets(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  
  if (!token) {
    return <p style={{ padding: 16 }}>Please login to view your tickets.</p>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>My Tickets</h2>

      {loading && <p>Loading tickets...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && tickets.length === 0 && (
        <p>No tickets assigned to you yet.</p>
      )}

      <ul>
        {tickets.map((t) => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            <p>
              <b>Ticket #{t.id}</b>
            </p>
            <p><b>Service:</b> {t.service_desc}</p>
            <p><b>Date:</b> {t.service_date}</p>
            <p><b>VIN:</b> {t.vin}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
