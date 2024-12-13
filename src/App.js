import React, { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./components/Login";

function App() {
  const [role, setRole] = useState("");

  const handleLogin = (role) => {
    setRole(role);
  };

  const renderDashboard = () => {
    switch (role) {
      case "Admin":
        return <AdminDashboard />;
      case "Librarian":
        return <LibrarianDashboard />;
      case "Student":
        return <StudentDashboard />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return <div>{renderDashboard()}</div>;
}

export default App;
