import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (emailOrMobile, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, {
      emailOrMobile,
      password,
    });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
    return user;
  };

  const register = async (userData) => {
    const res = await axios.post(`${API_URL}/auth/register`, userData);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
    return user;
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  const getCategoryLabel = (cat) => {
    const labels = {
      user: "सदस्य (Member)",
      facilitating_agency: "सुविधा एजेंसी (Facilitating Agency)",
      local_group: "स्थानीय समूह (Local Group)",
      farmer_consumer_group: "किसान उपभोक्ता समूह (Farmer Consumer Group)",
      farmer_member: "किसान सदस्य (Farmer Member)",
      consumer_member: "उपभोक्ता सदस्य (Consumer Member)",
      admin: "व्यवस्थापक (Admin)",
    };
    return labels[cat] || cat;
  };

  const getCategoryIcon = (cat) => {
    const icons = {
      facilitating_agency: "🏢",
      local_group: "👥",
      farmer_consumer_group: "🌿",
      farmer_member: "👨‍🌾",
      consumer_member: "🛒",
      admin: "⚙️",
      user: "👤",
    };
    return icons[cat] || "👤";
  };

  const isAdmin = () => user?.role === "admin";
  const isLoggedIn = () => !!user;
  const hasCategory = (...categories) => categories.includes(user?.category);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    getCategoryLabel,
    getCategoryIcon,
    isAdmin,
    isLoggedIn,
    hasCategory,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
