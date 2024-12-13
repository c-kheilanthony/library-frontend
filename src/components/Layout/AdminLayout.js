import React, { useState } from "react";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";
import AccountsManagerTab from "../Tabs/AccountsManagerTab";
import HistoryTab from "../Tabs/HistoryTab";

function AdminLayout({ onLogout }) {
  const [activeTab, setActiveTab] = useState("Accounts Manager");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Accounts Manager":
        return <AccountsManagerTab />;
      case "Log History":
        return <HistoryTab />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar role="Admin" onLogout={onLogout} />
      <div className="dashboard">
        <Sidebar
          tabs={["Accounts Manager", "Log History"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="content">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
