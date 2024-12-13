import React from "react";
import AdminLayout from "../components/Layout/AdminLayout";

function AdminDashboard({ onLogout }) {
  return <AdminLayout onLogout={onLogout} />;
}

export default AdminDashboard;
