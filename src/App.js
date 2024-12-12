import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch books only if logged in
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/books`)
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        { username, password }
      );
      const { token, role } = response.data;
      localStorage.setItem("token", token); // Store token for authentication
      setRole(role);
      setIsLoggedIn(true);
      setError("");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const addBook = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        { title, author },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
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
      {!isLoggedIn ? (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      ) : (
        <div>
          <h1>Welcome</h1>
          <p>
            Logged in as <strong>{role}</strong>
          </p>
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
      )}
    </div>
  );
}

export default App;
