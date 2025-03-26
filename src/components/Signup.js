import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      navigate("/login"); // Works with HashRouter
    },
    [email, password, navigate, validateCredentials]
  );

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
