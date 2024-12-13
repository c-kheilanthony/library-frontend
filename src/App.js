import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  const [role, setRole] = useState("");

  // Check localStorage for a stored role on app load
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    setRole(userRole);
    localStorage.setItem("role", userRole); // Persist role in localStorage
  };

  const handleLogout = () => {
    setRole("");
    localStorage.removeItem("role"); // Clear role from localStorage
    localStorage.removeItem("token"); // Clear token (if stored)
  };

  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route
          path="/login"
          element={
            !role ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to={`/${role.toLowerCase()}-dashboard`} />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            role === "Admin" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Librarian Dashboard */}
        <Route
          path="/librarian-dashboard"
          element={
            role === "Librarian" ? (
              <LibrarianDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            role === "Student" ? (
              <StudentDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
