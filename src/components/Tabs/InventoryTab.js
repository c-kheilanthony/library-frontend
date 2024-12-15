import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

function InventoryTab({ role }) {
  console.log("Role in InventoryTab:", role);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // Tracks add/edit state
  const [currentPage, setCurrentPage] = useState(1);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: [],
    datePublished: "",
    isbn: "",
    copyIdentifier: "",
    coverImage: null,
  });
  const rowsPerPage = 10;

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

  const handleToggleAddMode = () => {
    setSelectedBook(null); // Clear selected book
    setNewBook({
      title: "",
      author: "",
      category: [],
      datePublished: "",
      isbn: "",
      copyIdentifier: "",
      coverImage: null,
    });
    setIsAdding((prev) => !prev); // Toggle add mode
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryAdd = (e) => {
    const value = e.target.value.trim();
    if (
      e.key === "Enter" &&
      value !== "" &&
      !newBook.category.includes(value)
    ) {
      setNewBook((prev) => ({
        ...prev,
        category: [...prev.category, value],
      }));
      e.target.value = ""; // Clear the input field
    }
  };

  const handleCategoryRemove = (cat) => {
    setNewBook((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c !== cat),
    }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setNewBook((prev) => ({
        ...prev,
        coverImage: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(newBook).forEach((key) => {
      if (key === "category") {
        formData.append(key, newBook[key].join(","));
      } else {
        formData.append(key, newBook[key]);
      }
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/inventory/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Book added:", response.data);
      setIsAdding(false);
      setInventory((prev) => [...prev, response.data.book]);
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const formatISBN = (value) => {
    const formatted = value
      .replace(/[^0-9X]/gi, "")
      .replace(/(.{3})(.{1,5})(.{1,7})(.{1,7})(.{1})/, "$1-$2-$3-$4-$5");
    setNewBook((prev) => ({ ...prev, isbn: formatted }));
  };

  // Pagination Logic
  const totalRows = inventory.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const currentData = inventory.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loading)
    return <p className="text-center text-gray-600">Loading inventory...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-header">Inventory</h1>
        {role === "Librarian" && (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handleToggleAddMode}
              className="hover:bg-purple-100 transition"
            >
              {isAdding ? "Cancel" : "Add Book"}
            </Button>
            {isAdding && (
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="hover:bg-blue-500 transition"
              >
                Confirm
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-row items-start gap-4">
        {/* Left: Table */}
        <div className="w-2/3">
          <Table className="w-full border border-border bg-white/60 backdrop-blur-sm rounded-lg shadow">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white">
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[8%]">
                  ID
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[12%]">
                  Category
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[20%]">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[15%]">
                  Author
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[15%]">
                  Date Published
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[15%]">
                  ISBN
                </TableHead>
                <TableHead className="font-semibold text-black text-left py-2 px-3 border-b w-[15%]">
                  Copy Identifier
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-purple-50 cursor-pointer"
                  onClick={() => {
                    setSelectedBook(item);
                    if (role === "Librarian") {
                      setIsAdding(false);
                    }
                  }}
                >
                  <TableCell className="py-2 px-3 border-b truncate">
                    {item._id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {item.category.map((cat, index) => (
                      <Badge
                        key={`${cat}-${index}`}
                        variant="secondary"
                        className="mr-1"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {item.title}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {item.author}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {new Date(item.datePublished).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {item.isbn}
                  </TableCell>
                  <TableCell className="py-2 px-3 border-b">
                    {item.copyIdentifier}
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

        {/* Right: Book Details Panel */}
        <div className="w-1/3 flex flex-col items-center">
          <Card className="w-full border border-border shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-header">
                {isAdding && role === "Librarian" ? (
                  <input
                    type="text"
                    value={newBook.title}
                    onChange={(e) =>
                      setNewBook((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Enter book title"
                    className="w-full bg-gray-50 border border-gray-300 rounded p-2"
                  />
                ) : (
                  selectedBook?.title || "Select a book to view details"
                )}
              </CardTitle>
              <CardDescription className="text-sm text-text-primary">
                {isAdding && role === "Librarian" ? (
                  <input
                    type="text"
                    value={newBook.author}
                    onChange={(e) =>
                      setNewBook((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    placeholder="Enter author name"
                    className="w-full bg-gray-50 border border-gray-300 rounded p-2"
                  />
                ) : (
                  selectedBook?.author
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cover Image */}
              <div className="w-full h-96 bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to flex items-center justify-center rounded-lg overflow-hidden">
                {isAdding && role === "Librarian" ? (
                  newBook.coverImage ? (
                    <img
                      src={URL.createObjectURL(newBook.coverImage)}
                      alt={newBook.title || "Book Cover"}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full text-gray-700 cursor-pointer">
                      <span>Upload Cover Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )
                ) : selectedBook?.coverImage ? (
                  <img
                    src={selectedBook.coverImage}
                    alt={selectedBook?.title || "Book Cover"}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700">
                    No Cover Image
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Category
                </span>
                {isAdding && role === "Librarian" ? (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {newBook.category.map((cat, index) => (
                        <Badge
                          key={`${cat}-${index}`}
                          variant="secondary"
                          className="flex items-center gap-2 px-2 my-2"
                        >
                          {cat}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCategoryRemove(cat)}
                          >
                            &times;
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter category and press Enter"
                      onKeyDown={handleCategoryAdd}
                      className="w-full bg-gray-50 border border-gray-300 rounded p-2"
                    />
                  </>
                ) : (
                  <span className="text-base text-gray-800">
                    {selectedBook?.category.join(", ")}
                  </span>
                )}
              </div>

              {/* Date Published */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Date Published
                </span>
                {isAdding && role === "Librarian" ? (
                  <input
                    type="date"
                    value={newBook.datePublished}
                    onChange={(e) =>
                      setNewBook((prev) => ({
                        ...prev,
                        datePublished: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-50 border border-gray-300 rounded p-2"
                  />
                ) : (
                  <span className="text-base text-gray-800">
                    {selectedBook &&
                      new Date(selectedBook.datePublished)
                        .toISOString()
                        .split("T")[0]}
                  </span>
                )}
              </div>

              {/* ISBN */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">ISBN</span>
                {isAdding && role === "Librarian" ? (
                  <input
                    type="text"
                    value={newBook.isbn}
                    onChange={(e) => formatISBN(e.target.value)}
                    placeholder="Enter ISBN"
                    className="w-full bg-gray-50 border border-gray-300 rounded p-2"
                  />
                ) : (
                  <span className="text-base text-gray-800">
                    {selectedBook?.isbn}
                  </span>
                )}
              </div>

              {/* Copy Identifier */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Copy Identifier
                </span>
                {isAdding && role === "Librarian" ? (
                  <input
                    type="text"
                    value={newBook.copyIdentifier}
                    onChange={(e) =>
                      setNewBook((prev) => ({
                        ...prev,
                        copyIdentifier: e.target.value,
                      }))
                    }
                    placeholder="Enter copy identifier"
                    className="w-full bg-gray-50 border border-gray-300 rounded p-2"
                  />
                ) : (
                  <span className="text-base text-gray-800">
                    {selectedBook?.copyIdentifier}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default InventoryTab;
