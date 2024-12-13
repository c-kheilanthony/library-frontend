import React from "react";
import { cn } from "../../lib/utils";

function Sidebar({ tabs, activeTab, onTabChange }) {
  return (
    <aside className="w-64 bg-secondary text-secondary-foreground p-4 shadow-lg h-full">
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "cursor-pointer p-2 rounded-md hover:bg-secondary/80",
              activeTab === tab && "bg-secondary/70 font-bold"
            )}
          >
            {tab}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
