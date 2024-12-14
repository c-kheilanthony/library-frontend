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

function RequestsTab() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/requests`)
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-header mb-6">Requests</h2>
      <Table className="w-full border border-border bg-white/60 backdrop-blur-sm rounded-lg shadow">
        <TableCaption className="text-sm text-gray-500">
          Manage book borrowing requests.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white">
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Book Title
            </TableHead>
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Requested By
            </TableHead>
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} className="hover:bg-purple-50">
              <TableCell className="py-2 px-3 border-b">
                {request.bookTitle}
              </TableCell>
              <TableCell className="py-2 px-3 border-b">
                {request.requestedBy}
              </TableCell>
              <TableCell className="py-2 px-3 border-b">
                {request.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RequestsTab;
