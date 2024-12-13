import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
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
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <Navbar role="Admin" onLogout={onLogout} />

      {/* Sidebar and Content Area */}
      <div className="flex flex-col md:flex-row flex-grow">
        <Sidebar
          tabs={["Accounts Manager", "Log History"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="w-full md:w-64 bg-secondary text-secondary-foreground p-4 shadow-lg"
        />
        <div className="flex-grow p-6">
          {/* Content Area */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
