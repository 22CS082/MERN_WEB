import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to store the token in localStorage and state
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const isLoggedIn = !!token;

  // Function to log out the user
  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
    setServices([]);
  };

  // Function to authenticate the user with the provided token
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        setUser(null);
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get services
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.msg);
      } else {
        console.error("Error fetching services:", response.statusText);
      }
    } catch (error) {
      console.error(`Error fetching services:${error}`);
    }
  };

  // useEffect to fetch data on component mount or token change
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          await Promise.all([userAuthentication(), getServices()]);
        } else {
          setUser(null);
          setServices([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setUser(null);
        setServices([]);
      }
    };

    fetchData();
  }, [token]);

  // Return the AuthContext.Provider with the necessary values
  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser, user, services, isLoading, getServices }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
