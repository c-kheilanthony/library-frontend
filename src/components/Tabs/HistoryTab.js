import React, { useEffect, useState } from "react";
import Table from "../Shared/Table";

function HistoryTab() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch history from backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/history`)
      .then((response) => response.json())
      .then((data) => setHistory(data))
      .catch((error) => console.error("Error fetching history:", error));
  }, []);

  const columns = ["Action", "Performed By", "Date"];

  return (
    <div>
      <h2>History</h2>
      <Table
        columns={columns}
        data={history.map((entry) => ({
          Action: entry.action,
          "Performed By": entry.performedBy,
          Date: entry.date,
        }))}
      />
    </div>
  );
}

export default HistoryTab;
