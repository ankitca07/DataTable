/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
      alert("User already exists!");
      return;
    }
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! You can now log in.");
    navigate("/login");
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Signup;*/

import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash"; // Assuming lodash is installed
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
      if (users.some((user) => user.email === email)) {
        setError("User already exists!");
        return;
      }
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! You can now log in.");
      navigate("/login");
    },
    [email, password, navigate, validateCredentials]
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
    <div className="Signup">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;