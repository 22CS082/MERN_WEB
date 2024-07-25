import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn, user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">YashviTech</NavLink>
        </div>

        <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/service">Services</NavLink></li>
            {isLoggedIn ? (
              <>
                {user && user.isadmin && (
                  <li><NavLink to="/admin">Admin Dashboard</NavLink></li>
                )}
                <li>
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
