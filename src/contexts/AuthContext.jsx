import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const BASE_URL = "http://127.0.0.1:5000";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load the logged-in mechanic whenever token changes
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    setLoading(true);

    fetch(`${BASE_URL}/mechanics/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || data?.message || "Failed to load profile");
        }
        return data;
      })
      .then((data) => setUser(data))
      .catch(() => {
        // If token is invalid/expired, clean up
        setToken("");
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  function login(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function logout() {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
