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
import BookDetails from "./BookDetails";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { toast, Toaster } from "sonner";

function BorrowedBooksTab({ role }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [borrowedRes, requestsRes, inventoryRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/borrowed`).then(
            (res) => res.json()
          ),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/requests`).then(
            (res) => res.json()
          ),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/inventory`).then(
            (res) => res.json()
          ),
        ]);

        setBorrowedBooks(borrowedRes);
        setRequests(requestsRes);
        setInventory(inventoryRes);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let mergedBorrowed = borrowedBooks.map((entry) => {
    const now = new Date();
    const dueDate = new Date(entry.dueDate);
    const borrowedAt = new Date(entry.borrowedAt);
    const daysLate = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));
    const penalty = daysLate > 0 ? daysLate * 10 : 0;

    return {
      ...entry,
      title: entry.bookId?.title || "Unknown",
      category: entry.bookId?.category || "Unknown",
      coverImage: entry.bookId?.coverImage,
      author: entry.bookId?.author || "Unknown",
      datePublished: entry.bookId?.datePublished || "Unknown",
      isbn: entry.bookId?.isbn || "Unknown",
      copyIdentifier: entry.bookId?.copyIdentifier || "Unknown",
      borrowedAt,
      dueDate,
      penalty,
      penaltyColor:
        penalty > 0
          ? "text-red-600"
          : now.toDateString() === dueDate.toDateString()
          ? "text-orange-500"
          : "text-green-600",
    };
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalRows = mergedBorrowed.length;
  const rowsPerPage = 10;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  mergedBorrowed = mergedBorrowed.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-header">Borrowed Books</h1>
      </div>
      <div className="flex flex-row items-start gap-4">
        <div className="w-2/3">
          <Table className="w-full border border-border bg-white/60 backdrop-blur-sm rounded-lg shadow">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white">
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[25%]">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[20%]">
                  Author
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[12%]">
                  Date Published
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[15%]">
                  ISBN
                </TableHead>
                {role === "Librarian" && (
                  <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[10%]">
                    Borrowed By
                  </TableHead>
                )}
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[10%]">
                  Borrowed At
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[10%]">
                  Due Date
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[8%]">
                  Penalty
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mergedBorrowed.map((entry) => (
                <TableRow
                  key={entry._id}
                  className="hover:bg-purple-50 cursor-pointer"
                  onClick={() => {
                    setSelectedBook(entry);
                    console.log("Books borrowed:", mergedBorrowed);
                    console.log("Selected book:", entry);
                  }}
                >
                  <TableCell className="py-2 px-3 border-b">
                    {entry.title}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {entry.author}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {(() => {
                      try {
                        return new Date(entry.datePublished)
                          .toISOString()
                          .split("T")[0];
                      } catch (error) {
                        console.error(
                          "Invalid date value:",
                          entry.datePublished,
                          error
                        );
                        return "Unknown"; // Fallback value
                      }
                    })()}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {entry.isbn}
                  </TableCell>
                  {role === "Librarian" && (
                    <TableCell className="py-2 px-3 border-b">
                      {entry.studentId}
                    </TableCell>
                  )}
                  <TableCell className="py-2 px-3 border-b">
                    {entry.borrowedAt.toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {entry.dueDate.toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell
                    className={`py-2 px-3 border-b font-semibold ${entry.penaltyColor}`}
                  >
                    ₱{entry.penalty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                    className={`py-2 px-3 rounded ${
                      currentPage === index + 1
                        ? "bg-purple-200 text-primary"
                        : "hover:bg-purple-100 hover:text-primary transition"
                    }`}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <BookDetails
            selectedBook={selectedBook}
            role={role}
            sourceTab={"borrowed"}
          />
        </div>
        <Toaster richColors position="top-center"></Toaster>
      </div>
    </div>
  );
}

export default BorrowedBooksTab;
