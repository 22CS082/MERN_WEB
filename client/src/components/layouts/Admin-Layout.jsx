import React from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage />
                  Contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/service">
                  <FaRegListAlt />
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <FaHome />
                  Home
                </NavLink>
              </li>
              {user && user.isadmin && (  // Ensure 'isAdmin' is correctly checked
                <li>
                  <NavLink to="/admin">
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
