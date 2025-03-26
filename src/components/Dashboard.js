import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Table from "./Table";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";

function Dashboard() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDeleteAccount = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter(u => u.email !== user.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    logout();
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <nav className="navbar">
          <div className="logo"></div>
          <div className="user-menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <FaUserCircle size={24} />
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