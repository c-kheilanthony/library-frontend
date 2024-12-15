import React from "react";
import LibrarianLayout from "../components/Layout/LibrarianLayout";

function LibrarianDashboard({ onLogout, role }) {
  console.log("Role in LibrarianDashboard:", role);

  return (
    <LibrarianLayout onLogout={onLogout} role={role}>
      <h2>Librarian Dashboard</h2>
      {/* Add librarian-specific content here */}
    </LibrarianLayout>
  );
}

export default LibrarianDashboard;
