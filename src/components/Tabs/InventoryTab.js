import React, { useEffect, useState } from "react";
import Table from "../Shared/Table";

function InventoryTab() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/books`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  const columns = ["Title", "Author", "Available"];

  return (
    <div>
      <h2>Inventory</h2>
      <Table
        columns={columns}
        data={books.map((book) => ({
          Title: book.title,
          Author: book.author,
          Available: book.available ? "Yes" : "No",
        }))}
      />
    </div>
  );
}

export default InventoryTab;
