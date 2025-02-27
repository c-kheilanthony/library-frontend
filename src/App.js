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
  const [username, setUsername] = useState("");

  // Check localStorage for a stored role on app load
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (storedRole) setRole(storedRole);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogin = (userRole, username) => {
    setRole(userRole);
    setUsername(username);
    localStorage.setItem("role", userRole); // Persist role in localStorage
    localStorage.setItem("username", username);
  };

  const handleLogout = () => {
    setRole("");
    localStorage.removeItem("role"); // Clear role from localStorage
    localStorage.removeItem("username");
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
              (console.log("Role in App.js (LibrarianDashboard):", role),
              console.log("Username in App.js (LibrarianDashboard):", username),
              (
                <LibrarianDashboard
                  onLogout={handleLogout}
                  role={role}
                  username={username}
                />
              ))
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
              (console.log("Role in App.js (StudentDashboard):", role),
              console.log("Username in App.js (StudentDashboard):", username),
              (
                <StudentDashboard
                  onLogout={handleLogout}
                  role={role}
                  username={username}
                />
              ))
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
