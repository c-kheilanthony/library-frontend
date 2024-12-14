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

function HistoryTab() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch history from backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/history`)
      .then((response) => response.json())
      .then((data) => setHistory(data))
      .catch((error) => console.error("Error fetching history:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-header mb-6">History</h2>
      <Table className="w-full border border-border bg-white/60 backdrop-blur-sm rounded-lg shadow">
        <TableCaption className="text-sm text-gray-500">
          A record of all actions performed in the system.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white">
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Action
            </TableHead>
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Performed By
            </TableHead>
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((entry) => (
            <TableRow key={entry.id} className="hover:bg-purple-50">
              <TableCell className="py-2 px-3 border-b">
                {entry.action}
              </TableCell>
              <TableCell className="py-2 px-3 border-b">
                {entry.performedBy}
              </TableCell>
              <TableCell className="py-2 px-3 border-b">
                {new Date(entry.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTab;
