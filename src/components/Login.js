import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        { username, password }
      );
      const { token, role } = response.data;
      localStorage.setItem("token", token); // Store JWT token
      localStorage.setItem("role", role); // Store role for persistent login
      localStorage.setItem("username", username);
      onLogin(role, username);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate(`/${role.toLowerCase()}-dashboard`);
      }, 1000); // Redirect to the appropriate dashboard
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-primary">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-foreground"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
              placeholder="Enter your password"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded"
          >
            Login
          </Button>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </form>
      </div>
      <Toaster richColors position="top-right" />{" "}
      {/* Ensures toasts are rendered */}
      {/* Your other components */}
    </div>
  );
}

export default Login;
