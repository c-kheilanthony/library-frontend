import React from "react";
import LibrarianLayout from "../components/Layout/LibrarianLayout";

function LibrarianDashboard({ onLogout }) {
  return (
    <LibrarianLayout onLogout={onLogout}>
      <h2>Librarian Dashboard</h2>
      {/* Add librarian-specific content here */}
    </LibrarianLayout>
  );
}

export default LibrarianDashboard;
