import React from "react";
import StudentLayout from "../components/Layout/StudentLayout";

function StudentDashboard({ onLogout }) {
  return (
    <StudentLayout onLogout={onLogout}>
      <h2>Student Dashboard</h2>
      {/* Add student-specific content here */}
    </StudentLayout>
  );
}

export default StudentDashboard;
