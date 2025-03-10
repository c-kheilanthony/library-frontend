import React from "react";
import StudentLayout from "../components/Layout/StudentLayout";
import { toast, Toaster } from "sonner";

function StudentDashboard({ onLogout, role, username }) {
  toast.success("Welcome, ", username);
  return (
    <StudentLayout onLogout={onLogout} role={role} username={username}>
      <h2>Student Dashboard</h2>
      {/* Add student-specific content here */}
      <Toaster />
    </StudentLayout>
  );
}

export default StudentDashboard;
