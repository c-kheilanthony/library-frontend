import React from "react";
import LibrarianLayout from "../components/Layout/LibrarianLayout";

function LibrarianDashboard({ onLogout, role, username }) {
  return (
    <LibrarianLayout onLogout={onLogout} role={role} username={username}>
      <h2>Librarian Dashboard</h2>
      {/* Add librarian-specific content here */}
    </LibrarianLayout>
  );
}

export default LibrarianDashboard;
