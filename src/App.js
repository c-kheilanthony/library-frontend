import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/`)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error connecting to the backend");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Library Frontend</h1>
      <p>Message from Backend: {message}</p>
    </div>
  );
}

export default App;
