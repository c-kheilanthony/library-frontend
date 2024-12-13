import React from "react";

function Sidebar({ tabs, activeTab, onTabChange }) {
  return (
    <div className="sidebar">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={activeTab === tab ? "active" : ""}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
