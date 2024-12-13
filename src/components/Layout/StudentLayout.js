import React, { useState } from "react";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";
import InventoryTab from "../Tabs/InventoryTab";
import RequestsTab from "../Tabs/RequestsTab";
import BorrowedBooksTab from "../Tabs/BorrowedBooksTab";
import HistoryTab from "../Tabs/HistoryTab";

function StudentLayout() {
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
        return null;
    }
  };

  return (
    <div>
      <Navbar role="Student" />
      <div className="dashboard">
        <Sidebar
          tabs={["Collections", "Your Requests", "Borrowed Books", "History"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="content">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default StudentLayout;
