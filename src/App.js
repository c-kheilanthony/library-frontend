import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const addBook = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/books`, { title, author })
      .then((response) => {
        setBooks([...books, response.data]);
        setTitle("");
        setAuthor("");
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Library Frontend</h1>
      <div>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>
      <h2>Books List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
