import React from "react";
import StudentLayout from "../components/Layout/StudentLayout";

function StudentDashboard({ onLogout, role, username }) {
  console.log("Username in StudentDashboard: ", username);
  console.log("Role in StudentDashboard: ", role);
  return (
    <StudentLayout onLogout={onLogout} role={role} username={username}>
      <h2>Student Dashboard</h2>
      {/* Add student-specific content here */}
    </StudentLayout>
  );
}

export default StudentDashboard;
