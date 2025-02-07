import React, { createContext, useState, useContext, useEffect } from "react";
import { clearCookie, getCookie, setCookie } from "../utils/auth.js";

// Create the context
const UserContext = createContext();

// Create the provider component
export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if the user is logged in by looking in localStorage
    return JSON.parse(localStorage.getItem("token")) || false;
  });


  // On component mount, check if the user is logged in (i.e., check for userInfo cookie)
  useEffect(() => {
    const userFromCookie = getCookie("userInfo");
    if (userFromCookie) {
      setUserInfo(JSON.parse(userFromCookie))
      setIsLoggedIn(true);
    }
  }, []);

  // Function to log the user in (set the cookie and update state)
  const login = (data) => {
    setCookie("userInfo", JSON.stringify(data), 7); // Set cookie with user info
    setUserInfo(data); // Udate teh userInfo state
    setIsLoggedIn(true);
    localStorage.setItem("token", JSON.stringify(true)); // Store the state in localStorage
  };

  // Function to log the user out (remove the cookie and update state)
  const logout = () => {
    clearCookie("userInfo"); // Remove the cookie
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // Remove the login state from localStorage
    window.location.reload();
    window.location.href = "/";
  };

  // Provide the context value to children components
  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to access the UserContext in any component
export const useUserContext = () => useContext(UserContext);
