import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa"; // Use any icon library like FontAwesome

function BookDetails({
  selectedBook,
  newBook,
  isAdding,
  isEditing,
  role,
  handleSaveChanges,
  handleCategoryAdd,
  handleCategoryRemove,
  handleImageUpload,
  setNewBook,
  setIsEditing,
  setShowDeleteModal,
  handleDeleteBook,
  showDeleteModal,
  formatISBN,
  setSelectedBook,
  handleRequestBook,
  sourceTab,
}) {
  return (
    <Card className="w-full border border-border shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg font-semibold text-header">
          {/* Book Title */}
          {isAdding && role === "Librarian" ? (
            // Add mode: Empty field
            <input
              type="text"
              value={newBook.title}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter book title"
              className="w-full bg-gray-50 border border-gray-300 rounded p-2"
            />
          ) : isEditing && role === "Librarian" ? (
            // Edit mode: Prefilled with selected book's title
            <input
              type="text"
              value={newBook.title || ""}
              onChange={(e) =>
                setNewBook((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter book title"
              className="w-full bg-gray-50 border border-gray-300 rounded p-2"
            />
          ) : (
            // View mode: Display the book's title
            <span className="text-left truncate">
              {selectedBook?.title || "Select a book to view details"}
            </span>
          )}

          {/* Buttons Container */}
          <div className="flex items-center gap-2 ml-4">
            {/* Edit Button */}
            {selectedBook && role === "Librarian" && (
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSaveChanges();
                  } else {
                    setIsEditing(true);
                    setNewBook({ ...selectedBook }); // Pre-fill form with book details
                  }
                }}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                {isEditing ? <FaCheck /> : <FaPencilAlt />}
              </button>
            )}

            {/* Delete Button */}
            {selectedBook && role === "Librarian" && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-500 hover:text-red-800 transition"
              >
                {isEditing ? null : <FaTrash />}
              </button>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Confirm Deletion
                </h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete the book "
                  {selectedBook?.title}"? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => setShowDeleteModal(false)}
                    className="hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteBook}
                    className="hover:bg-red-600"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardTitle>

        {/* Author */}
        <CardDescription className="text-sm text-text-primary">
          {isAdding && role === "Librarian" ? (
            // Add mode: Empty field
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
          ) : isEditing && role === "Librarian" ? (
            // Edit mode: Prefilled with selected book's author
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
            // View mode: Display the book's author
            selectedBook?.author || "Select a book to view details"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cover Image */}
        <div className="w-full h-96 bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to flex items-center justify-center rounded-lg overflow-hidden relative">
          {isAdding && role === "Librarian" ? (
            newBook.coverImage ? (
              <img
                src={
                  newBook.coverImage instanceof Blob
                    ? URL.createObjectURL(newBook.coverImage)
                    : newBook.coverImage
                }
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
          ) : isEditing && role === "Librarian" ? (
            newBook.coverImage || selectedBook?.coverImage ? (
              <div className="relative w-full h-full">
                <img
                  src={
                    newBook.coverImage instanceof Blob
                      ? URL.createObjectURL(newBook.coverImage)
                      : newBook.coverImage || selectedBook.coverImage
                  }
                  alt={newBook.title || selectedBook?.title || "Book Cover"}
                  className="w-full h-full object-contain opacity-70"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white cursor-pointer">
                  <span>Upload New Cover Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white cursor-pointer">
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
              src={selectedBook.coverImage} // Directly use the URL here for existing cover image
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
          <span className="text-sm font-medium text-gray-500">Category</span>
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
          ) : isEditing && role === "Librarian" ? (
            <>
              <div className="flex flex-wrap gap-2">
                {selectedBook?.category.map((cat, index) => (
                  <Badge
                    key={`${cat}-${index}`}
                    variant="secondary"
                    className="flex items-center gap-2 px-2 my-2"
                  >
                    {cat}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCategoryRemove(cat, true)} // true to indicate removal in edit mode
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
              {selectedBook?.category?.join(", ") || "No category"}
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
          ) : isEditing && role === "Librarian" ? (
            <input
              type="date"
              value={
                selectedBook.datePublished
                  ? new Date(selectedBook.datePublished)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setSelectedBook((prev) => ({
                  ...prev,
                  datePublished: e.target.value,
                }))
              }
              className="w-full bg-gray-50 border border-gray-300 rounded p-2"
            />
          ) : (
            <span className="text-base text-gray-800">
              {selectedBook?.datePublished &&
              !isNaN(new Date(selectedBook.datePublished))
                ? new Date(selectedBook.datePublished)
                    .toISOString()
                    .split("T")[0]
                : "No Date Published"}
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
              onChange={(e) => formatISBN(e.target.value)} // Use formatter for adding mode
              placeholder="Enter ISBN"
              className="w-full bg-gray-50 border border-gray-300 rounded p-2"
            />
          ) : isEditing && role === "Librarian" ? (
            <input
              type="text"
              value={newBook.isbn || ""} // Ensure we use newBook in edit mode
              onChange={(e) => formatISBN(e.target.value)} // Use formatter for editing mode
              placeholder="Edit ISBN"
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
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/[^0-9]/g, ""); // Allow numbers only
                setNewBook((prev) => ({
                  ...prev,
                  copyIdentifier: sanitizedValue,
                }));
              }}
              placeholder="Enter copy identifier"
              className="w-full bg-gray-50 border border-gray-300 rounded p-2"
            />
          ) : isEditing && role === "Librarian" ? (
            <input
              type="text"
              value={selectedBook.copyIdentifier || ""}
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/[^0-9]/g, ""); // Allow numbers only
                setSelectedBook((prev) => ({
                  ...prev,
                  copyIdentifier: sanitizedValue,
                }));
              }}
              placeholder="Enter copy identifier"
              className="w-full bg-gray-50 border border-gray-300 rounded p-2"
            />
          ) : (
            <span className="text-base text-gray-800">
              {selectedBook?.copyIdentifier}
            </span>
          )}
        </div>
        {sourceTab === "inventory" && role === "Student" && (
          <Button
            variant="secondary"
            className="w-full mt-2"
            onClick={handleRequestBook}
          >
            Request this book
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default BookDetails;
