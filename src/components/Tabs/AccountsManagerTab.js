import React, { useEffect, useState } from "react";
import Table from "../Shared/Table";

function AccountsManagerTab() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const columns = ["Username", "Role"];

  return (
    <div>
      <h2>Accounts Manager</h2>
      <Table
        columns={columns}
        data={users.map((user) => ({
          Username: user.username,
          Role: user.role,
        }))}
      />
    </div>
  );
}

export default AccountsManagerTab;
