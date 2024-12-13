import React, { useEffect, useState } from "react";
import Table from "../Shared/Table";

function BorrowedBooksTab() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch borrowed books from backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/borrowed-books`)
      .then((response) => response.json())
      .then((data) => setBorrowedBooks(data))
      .catch((error) => console.error("Error fetching borrowed books:", error));
  }, []);

  const columns = ["Book Title", "Borrowed By", "Due Date"];

  return (
    <div>
      <h2>Borrowed Books</h2>
      <Table
        columns={columns}
        data={borrowedBooks.map((borrowed) => ({
          "Book Title": borrowed.bookTitle,
          "Borrowed By": borrowed.borrowedBy,
          "Due Date": borrowed.dueDate,
        }))}
      />
    </div>
  );
}

export default BorrowedBooksTab;
