import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  async function login(token) {
    localStorage.setItem("token", token);

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      setUser(null);
      throw new Error("Failed to fetch user");
    }

    const userData = await res.json();
    setUser(userData);
    return userData;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
