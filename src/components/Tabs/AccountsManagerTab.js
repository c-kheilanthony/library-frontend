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

function AccountsManagerTab() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-header mb-6">Accounts Manager</h2>
      <Table className="w-full border border-border bg-white/60 backdrop-blur-sm rounded-lg shadow">
        <TableCaption className="text-sm text-gray-500">
          Manage all user accounts and their roles.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white">
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Username
            </TableHead>
            <TableHead className="font-semibold text-left py-2 px-3 border-b">
              Role
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-purple-50">
              <TableCell className="py-2 px-3 border-b">
                {user.username}
              </TableCell>
              <TableCell className="py-2 px-3 border-b">{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AccountsManagerTab;
