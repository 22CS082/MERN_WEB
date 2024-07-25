import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "../css/adminContact.css";
 const token=localStorage.getItem("token");
const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  
  
  const [isLoading, setIsLoading] = useState(false); // Loading indicator

  const getContactData = async () => {
    try {
      setIsLoading(true); // Start loading indicator

      const response = await fetch("http://localhost:5005/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
      }

      const data = await response.json();
      setContactData(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5005/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.statusText}`);
      }

      getContactData(); // Refresh contact data after deletion
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  useEffect(() => {
    getContactData();
  }, [token]); // Fetch data whenever authorization token changes

  return (
    <section className="admin-contacts-section">
      <h1>Admin Contact Data</h1>
      <div className="container admin-users">
        {Array.isArray(contactData) && contactData.length > 0 ? (
          contactData.map((curContactData, index) => {
            const { username, email, message, _id } = curContactData;
            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className="btn" onClick={() => deleteContactById(_id)}>
                  Delete
                </button>
              </div>
            );
          })
        ) : (
          <p>No contacts found</p>
        )}
      </div>
    </section>
  );
};

export default AdminContacts;
