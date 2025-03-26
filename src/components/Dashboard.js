import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Table from "./Table";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";

function Dashboard() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDeleteAccount = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === user.email)) {
      users = users.filter(u => u.email !== user.email);
      localStorage.setItem("users", JSON.stringify(users));
      logout();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <nav className="navbar">
          <div className="logo"></div>
          <div className="user-menu" ref={dropdownRef}>
            <FaUserCircle size={24} onClick={() => setDropdownOpen(!dropdownOpen)} />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p>{user?.email}</p>
                <button onClick={logout}>Logout</button>
                <button onClick={handleDeleteAccount} className="delete">Delete Account</button>
              </div>
            )}
          </div>
        </nav>
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;
