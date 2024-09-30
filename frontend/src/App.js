import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import SIgnupPage from "./pages/Auth/SIgnupPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import axios from "axios";
import MatchPlayer from "./pages/Match/MatchPlayer";
import GroundOwner from "./pages/GroundOwner/GroundOwner";
import PlayerGrounds from "./pages/PlayerGrounds/PlayerGrounds";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      if (token && id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Set user data and authentication status
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user's data:", error);
          setIsAuthenticated(false); // If error occurs, ensure authentication is false
        } finally {
          setLoading(false); // Finish loading whether success or error
        }
      } else {
        setIsAuthenticated(false);
        setLoading(false); // Stop loading if no token/id is present
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  // Show a loading message while user data is being fetched
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SIgnupPage />} />

      {/* Protected Routes (only accessible if authenticated) */}
      {isAuthenticated && (
        <>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/matchPlayer" element={<MatchPlayer />} />
          <Route path="/ground" element={<GroundOwner />} />
          <Route path="/player" element={<PlayerGrounds />} />
        </>
      )}

      {/* Fallback for non-authenticated users */}
      {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}
    </Routes>
  );
};

export default App;
