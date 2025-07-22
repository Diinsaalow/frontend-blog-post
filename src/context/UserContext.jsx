import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    fullName: "",
    email: "",
    profileImageUrl: "",
    role: "",
    token: "",
    isAuthenticated: false,
    isLoading: true,
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL + "/api/v1/auth";

  // Check for existing token on app load
  useEffect(() => {
    setUser((prev) => ({ ...prev, isLoading: true }));

    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        const restoredUser = {
          ...parsedUserData,
          token,
          isAuthenticated: true,
          isLoading: false,
        };
        setUser(restoredUser);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        setUser((prev) => ({
          ...prev,
          isAuthenticated: false,
          isLoading: false,
        }));
      }
    } else {
      console.log("No stored user data found, starting with empty state");
      setUser((prev) => ({
        ...prev,
        isAuthenticated: false,
        isLoading: false,
      }));
    }
  }, []);

  const login = async (credentials) => {
    setUser((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const userData = {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
        role: data.role,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      };

      // Store in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(userData));

      // Set user state
      setUser(userData);
      return { success: true, data: userData };
    } catch (error) {
      console.error("Login error:", error);
      setUser((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (userData) => {
    setUser((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password,
          profileImageUrl: userData.profileImageUrl || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      const newUserData = {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
        role: data.role,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      };
      // Store in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(newUserData));

      // Set user state
      setUser(newUserData);
      return { success: true, data: newUserData };
    } catch (error) {
      console.error("Registration error:", error);
      setUser((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Reset user state
    const resetUser = {
      id: null,
      fullName: "",
      email: "",
      profileImageUrl: "",
      role: "",
      token: "",
      isAuthenticated: false,
      isLoading: false,
    };

    setUser(resetUser);
  };

  // Helper function to get auth headers for API calls
  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        getAuthHeaders,
        isLoading: user.isLoading,
        isAuthenticated: user.isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
