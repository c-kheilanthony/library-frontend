import React, { useState, useEffect } from "react";
import axios from "axios";
import BookDetails from "./BookDetails";
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

function InventoryTab({ role, username }) {
  console.log("Role in InventoryTab:", role);
  console.log("Name in InventoryTab:", username);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // Tracks add state
  const [isEditing, setIsEditing] = useState(false); // Tracks edit state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  useEffect(() => {
    if (isEditing && selectedBook) {
      setNewBook({ ...selectedBook });
    }
  }, [isEditing, selectedBook]);

  const handleRequestBook = async () => {
    if (!selectedBook || !selectedBook._id) {
      console.error("No book selected");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/requests`,
        {
          studentId: "AC2021-0786", // Replace this with dynamic student ID
          bookId: selectedBook._id,
        }
      );
      console.log("studentId:", username);
      console.log("Book request successful:", response.data);
    } catch (error) {
      console.error("Error requesting book:", error);
    }
  };

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

  const handleCategoryAdd = (event) => {
    if (event.key === "Enter" && event.target.value) {
      const category = event.target.value.trim();

      if (isAdding && !newBook.category.includes(category)) {
        // Adding category in adding mode
        setNewBook((prev) => ({
          ...prev,
          category: [...prev.category, category],
        }));
      } else if (isEditing && !selectedBook.category.includes(category)) {
        // Adding category in edit mode
        setSelectedBook((prev) => ({
          ...prev,
          category: [...prev.category, category],
        }));
      }
      event.target.value = ""; // Reset input field
    }
  };

  const handleCategoryRemove = (category, isEditingMode = false) => {
    if (isEditingMode) {
      // Remove category in edit mode
      setSelectedBook((prev) => ({
        ...prev,
        category: prev.category.filter((cat) => cat !== category),
      }));
    } else {
      // Remove category in add mode
      setNewBook((prev) => ({
        ...prev,
        category: prev.category.filter((cat) => cat !== category),
      }));
    }
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

  const handleSaveChanges = async () => {
    if (!selectedBook || !selectedBook._id) return;

    const formData = new FormData();
    Object.keys(newBook).forEach((key) => {
      if (key === "category") {
        newBook[key].forEach((cat) => formData.append(`${key}[]`, cat));
      } else {
        formData.append(key, newBook[key]);
      }
    });

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/inventory/${selectedBook._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Book updated:", response.data);

      // Update the inventory with the new data
      setInventory((prev) =>
        prev.map((book) =>
          book._id === response.data.book._id ? response.data.book : book
        )
      );

      setIsEditing(false); // Exit editing mode
      setSelectedBook(response.data.book); // Update selectedBook
    } catch (err) {
      console.error("Error saving changes:", err);
    }
  };

  const handleCancelEditing = () => {
    setIsEditing(false); // Exit editing mode
    setSelectedBook(null); // Clear selected book
  };

  const handleDeleteBook = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/inventory/${selectedBook._id}`
      );
      console.log("Book deleted:", selectedBook);

      // Remove the deleted book from the state
      setInventory((prev) =>
        prev.filter((book) => book._id !== selectedBook._id)
      );
      setSelectedBook(null); // Clear the selected book
      setShowDeleteModal(false); // Close the modal
    } catch (err) {
      console.error("Error deleting book:", err);
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
            {isEditing ? (
              <>
                <Button
                  variant="secondary"
                  onClick={handleCancelEditing}
                  className="hover:bg-red-100 transition"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
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
              </>
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
          <BookDetails
            selectedBook={selectedBook}
            newBook={newBook}
            isAdding={isAdding}
            isEditing={isEditing}
            role={role}
            handleSaveChanges={handleSaveChanges}
            handleCategoryAdd={handleCategoryAdd}
            handleCategoryRemove={handleCategoryRemove}
            handleImageUpload={handleImageUpload}
            setNewBook={setNewBook}
            setIsEditing={setIsEditing}
            setShowDeleteModal={setShowDeleteModal}
            handleDeleteBook={handleDeleteBook}
            showDeleteModal={showDeleteModal}
            formatISBN={formatISBN}
            setSelectedBook={setSelectedBook}
            handleRequestBook={handleRequestBook} // Pass the function
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryTab;
