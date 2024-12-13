import React from "react";

function Navbar({ role, onLogout }) {
  return (
    <nav>
      <h2>Library System</h2>
      <p>Logged in as: {role}</p>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
