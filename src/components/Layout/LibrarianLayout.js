import React, { useState } from "react";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";
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
        return null;
    }
  };

  return (
    <div>
      <Navbar role="Librarian" onLogout={onLogout} />
      <div className="dashboard">
        <Sidebar
          tabs={["Inventory", "Requests", "Borrowed Books", "History"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="content">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default LibrarianLayout;
