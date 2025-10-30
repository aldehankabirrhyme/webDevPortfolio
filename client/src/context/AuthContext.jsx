import { createContext, useState, useEffect ,useContext} from "react";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [data, setData] = useState({
      user: null,
      projects: [],
      skills: [],
    });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
      try {
        // Axios GET request
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token to backend
          },
        });
  
        setData({
          user: response.data.user[0],
          projects: response.data.projects || [],
          skills: response.data.skills || [],
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.response?.data?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
  
    



  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (!token) return;
    // Optional: fetch user details if needed
  }, [token]);

  useEffect(() => {
      fetchDashboardData();
    }, []);

  useEffect(() => {
    if (token) fetchDashboardData();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, data, loading, error, login, logout, fetchDashboardData }}>
      {children}
    </AuthContext.Provider>
  );
};
