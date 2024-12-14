import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableCaption,
  TableHeader,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

function InventoryTab() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading)
    return <p className="text-center text-gray-600">Loading inventory...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex">
      {/* Left: Table */}
      <div className="w-2/3 pr-4">
        <h1 className="text-3xl font-bold mb-6 text-header">Inventory</h1>
        <Table className="w-full border border-border bg-white/60 backdrop-blur-sm rounded-lg shadow">
          <TableCaption className="text-sm text-gray-500">
            A list of books available in the library.
          </TableCaption>
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
            {inventory.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-purple-50 cursor-pointer"
                onClick={() => setSelectedBook(item)}
              >
                <TableCell className="py-2 px-3 border-b truncate">
                  {item._id}
                </TableCell>
                <TableCell className="py-2 px-3 border-b">
                  {item.category.map((cat) => (
                    <Badge key={cat} variant="secondary" className="mr-1">
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
                  {new Date(item.datePublished).toLocaleDateString()}
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
      </div>

      {/* Right: Book Details Panel */}
      <div className="w-1/3 pl-4">
        {selectedBook ? (
          <Card className="border border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-header">
                {selectedBook.title}
              </CardTitle>
              <CardDescription className="text-sm text-text-primary">
                {selectedBook.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cover Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-gray-700 flex items-center justify-center rounded-lg">
                Cover Image Placeholder
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Category
                </span>
                <span className="text-base text-gray-800">
                  {selectedBook.category.join(", ")}
                </span>
              </div>

              {/* Date Published */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Date Published
                </span>
                <span className="text-base text-gray-800">
                  {new Date(selectedBook.datePublished).toLocaleDateString()}
                </span>
              </div>

              {/* ISBN */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">ISBN</span>
                <span className="text-base text-gray-800">
                  {selectedBook.isbn}
                </span>
              </div>

              {/* Copy Identifier */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Copy Identifier
                </span>
                <span className="text-base text-gray-800">
                  {selectedBook.copyIdentifier}
                </span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-gray-500 italic">
            Select a book to view details
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryTab;
