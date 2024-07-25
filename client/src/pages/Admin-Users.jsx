import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import "../css/adminuser.css";
const token=localStorage.getItem("token");
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false); // Loading indicator

  const getAllUserData = async () => {
    try {
      setIsLoading(true); // Start loading indicator
      if (!token) {
        console.log("Authorization token is missing!");
        return;
      }

      const response = await fetch("http://localhost:5005/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        return;
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5005/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      getAllUserData(); // Refresh user data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, [token]); // Fetch data whenever authorization token changes

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Users Data</h1>
      </div>
      <div className="container admin-users">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((curUser, index) => (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>
                      <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(curUser._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AdminUsers;
