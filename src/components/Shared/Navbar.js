import React from "react";
import { Button } from "../ui/button";

function Navbar({ role, onLogout }) {
  return (
    <nav className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-bold">Library System</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">{role}</span>
        <Button variant="destructive" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
