import { useAuth } from "../contexts/AuthContext.jsx";

export default function Profile() {
  const { token, user, loading } = useAuth();

  // Not logged in yet
  if (!token) {
    return <p style={{ padding: 16 }}>Please login to view your profile.</p>;
  }

  // Loading profile request
  if (loading) {
    return <p style={{ padding: 16 }}>Loading profile...</p>;
  }

  // Token exists but user didn't load
  if (!user) {
    return <p style={{ padding: 16 }}>No profile loaded.</p>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Mechanic Profile</h2>

      <p><b>ID:</b> {user.id}</p>
      <p><b>Name:</b> {user.first_name} {user.last_name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Salary:</b> {user.salary}</p>
      <p><b>Address:</b> {user.address}</p>
    </div>
  );
}
