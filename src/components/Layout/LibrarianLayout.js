import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
import InventoryTab from "../Tabs/InventoryTab";
import RequestsTab from "../Tabs/RequestsTab";
import BorrowedBooksTab from "../Tabs/BorrowedBooksTab";
import HistoryTab from "../Tabs/HistoryTab";

function LibrarianLayout({ onLogout }) {
  const [activeTab, setActiveTab] = useState("Inventory");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Inventory":
        return <InventoryTab />;
      case "Requests":
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
      <Navbar role="Librarian" onLogout={onLogout} />

      {/* Sidebar and Content Area */}
      <div className="flex flex-col md:flex-row flex-grow">
        <Sidebar
          tabs={["Inventory", "Requests", "Borrowed Books", "History"]}
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

export default LibrarianLayout;
