import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
import InventoryTab from "../Tabs/InventoryTab";
import RequestsTab from "../Tabs/RequestsTab";
import BorrowedBooksTab from "../Tabs/BorrowedBooksTab";
import HistoryTab from "../Tabs/HistoryTab";

function StudentLayout({ onLogout }) {
  const [activeTab, setActiveTab] = useState("Collections");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Collections":
        return <InventoryTab />;
      case "Your Requests":
        return <RequestsTab />;
      case "Borrowed Books":
        return <BorrowedBooksTab />;
      case "History":
        return <HistoryTab />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <Navbar role="Student" onLogout={onLogout} />

      {/* Sidebar and Content Area */}
      <div className="flex flex-col md:flex-row flex-grow">
        <Sidebar
          tabs={["Collections", "Your Requests", "Borrowed Books", "History"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="w-full md:w-64 bg-secondary text-secondary-foreground p-4 shadow-lg h-full"
        />
        <div className="flex-grow p-6">
          {/* Content Area */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default StudentLayout;
