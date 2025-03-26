/*import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      login(user);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}

export default Login;*/
import React, { useState, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { debounce } from "lodash"; // Assuming lodash is installed

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateCredentials = useCallback(() => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    setError(null);
    return true;
  }, [email, password]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateCredentials()) return;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        login(user);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials.");
      }
    },
    [email, password, login, navigate, validateCredentials]
  );

  const debouncedEmailChange = useMemo(
    () =>
      debounce((value) => {
        setEmail(value);
      }, 300),
    []
  );

  const debouncedPasswordChange = useMemo(
    () =>
      debounce((value) => {
        setPassword(value);
      }, 300),
    []
  );

  const handleEmailChange = useCallback((e) => {
    debouncedEmailChange(e.target.value);
  }, [debouncedEmailChange]);

  const handlePasswordChange = useCallback((e) => {
    debouncedPasswordChange(e.target.value);
  }, [debouncedPasswordChange]);

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default Login;