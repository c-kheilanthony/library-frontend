import React from "react";

function Navbar({ role }) {
  return (
    <nav>
      <h2>Library System</h2>
      <p>Logged in as: {role}</p>
    </nav>
  );
}

export default Navbar;
