import React, { useEffect, useState } from "react";
import axios from "axios";
import BookDetails from "./BookDetails";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableCaption,
  TableHeader,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";

function RequestsTab({ role, username }) {
  console.log("Username in RequestsTab:", username);
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/inventory`
        );
        setInventory(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch inventory data");
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let url = `${process.env.REACT_APP_BACKEND_URL}/api/requests`;

        if (role === "Student") {
          url += `/${username}`;
        }

        const response = await axios.get(url);
        console.log("Fetched requests data:", response.data);
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch requests data");
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // Merge requests with book details
  let mergedRequests = requests.map((request) => {
    const book = inventory.find((item) => item._id === request.bookId) || {};
    return {
      ...request,
      title: book.title || "Unknown",
      category: book.category || "Unknown",
      coverImage: book.coverImage || "",
      author: book.author || "Unknown",
      isbn: book.isbn || "Unknown",
      datePublished: book.datePublished || "Unknown",
      copyIdentifier: book.copyIdentifier || "Unknown",
    };
  });
  const totalRows = mergedRequests.length;
  const rowsPerPage = 10;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  mergedRequests = mergedRequests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loading) return <p>Loading requests...</p>;
  if (error)
    return (
      <Alert
        variant="destructive"
        className="rounded-2xl bg-red-100 border-red-300 shadow-md"
      >
        <AlertCircle className="h-5 w-5 text-red-500" />
        <AlertTitle className="text-red-600 font-semibold">Oops!</AlertTitle>
        <AlertDescription className="text-red-500">
          You have no requests yet!
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-header">Requests</h1>
      </div>
      <div className="flex flex-row items-start gap-4">
        <div className="w-2/3">
          <Table className="w-full border border-border bg-white/60 backdrop-blur-sm rounded-lg shadow">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white">
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[30%]">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[20%]">
                  Author
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[15%]">
                  Date Published
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[15%]">
                  ISBN
                </TableHead>
                {role === "Librarian" && (
                  <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[20%]">
                    Requested By
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mergedRequests.map((request) => (
                <TableRow
                  key={request.id}
                  className="hover:bg-purple-50 cursor-pointer"
                  onClick={() => {
                    setSelectedBook(request);
                    console.log("Merged request:", mergedRequests);
                    console.log("Selected book:", request);
                  }}
                >
                  <TableCell className="py-2 px-3 border-b">
                    {request.title}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {request.author}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {(() => {
                      try {
                        return new Date(request.datePublished)
                          .toISOString()
                          .split("T")[0];
                      } catch (error) {
                        console.error(
                          "Invalid date value:",
                          request.datePublished,
                          error
                        );
                        return "Unknown"; // Fallback value
                      }
                    })()}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {request.isbn}
                  </TableCell>
                  {role === "Librarian" && (
                    <TableCell className="py-2 px-3 border-b">
                      {request.studentId}
                    </TableCell>
                  )}
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
            sourceTab={"requests"}
          />
        </div>
      </div>
    </div>
  );
}

export default RequestsTab;
