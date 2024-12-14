import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableCaption,
  TableHeader,
} from "../ui/table";

function BorrowedBooksTab() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch borrowed books from backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/borrowed-books`)
      .then((response) => response.json())
      .then((data) => setBorrowedBooks(data))
      .catch((error) => console.error("Error fetching borrowed books:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-header mb-6">Borrowed Books</h2>
      <Table className="w-full border border-border bg-white/60 backdrop-blur-sm rounded-lg shadow">
        <TableCaption className="text-sm text-gray-500">
          List of currently borrowed books.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white">
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Book Title
            </TableHead>
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Borrowed By
            </TableHead>
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Due Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowedBooks.map((borrowed) => (
            <TableRow key={borrowed.id} className="hover:bg-purple-50">
              <TableCell className="py-2 px-3 border-b">
                {borrowed.bookTitle}
              </TableCell>
              <TableCell className="py-2 px-3 border-b">
                {borrowed.borrowedBy}
              </TableCell>
              <TableCell className="py-2 px-3 border-b">
                {new Date(borrowed.dueDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BorrowedBooksTab;
