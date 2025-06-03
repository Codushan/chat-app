import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage on initial load
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      return saved === "true"; // saved could be "true" or "false" as string
    }
    return false; // default
  });

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the context easily
export const useTheme = () => useContext(ThemeContext);
