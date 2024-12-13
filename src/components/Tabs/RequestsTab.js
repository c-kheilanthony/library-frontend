import React, { useEffect, useState } from "react";
import Table from "../Shared/Table";

function RequestsTab() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/requests`)
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  const columns = ["Book Title", "Requested By", "Status"];

  return (
    <div>
      <h2>Requests</h2>
      <Table
        columns={columns}
        data={requests.map((request) => ({
          "Book Title": request.bookTitle,
          "Requested By": request.requestedBy,
          Status: request.status,
        }))}
      />
    </div>
  );
}

export default RequestsTab;
