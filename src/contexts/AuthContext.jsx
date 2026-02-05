import { createContext, useContext, useEffect, useState } from "react";

// Context = "cloud of data" that can be used anywhere (useContext requirement)
const AuthContext = createContext(null);

// Base URL for your Flask backend
const BASE_URL = "http://127.0.0.1:5000";

export function AuthProvider({ children }) {
  // useState requirement:
  // token is saved to localStorage so refresh keeps you logged in
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // user holds the mechanic profile object returned from GET /mechanics/me
  const [user, setUser] = useState(null);

  // loading is used for UI feedback while fetching profile
  const [loading, setLoading] = useState(false);

  // useEffect requirement:
  // Whenever token changes, load the logged-in mechanic profile from the API
  useEffect(() => {
    // No token means not logged in
    if (!token) {
      setUser(null);
      return;
    }

    setLoading(true);

    // Authenticated request: Bearer token in the Authorization header
    fetch(`${BASE_URL}/mechanics/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();

        // If request failed (bad token, expired token, etc.)
        if (!res.ok) {
          throw new Error(data?.error || data?.message || "Failed to load profile");
        }

        return data; // mechanic object
      })
      .then((data) => setUser(data))
      .catch(() => {
        // If token is invalid/expired, clean up so app returns to logged-out state
        setToken("");
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  // Called after successful login
  function login(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  // Called on logout and after delete account
  function logout() {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    // Everything inside value is accessible anywhere via useAuth()
    <AuthContext.Provider value={{ token, user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook = cleaner way to consume context in any component
export function useAuth() {
  return useContext(AuthContext);
}
