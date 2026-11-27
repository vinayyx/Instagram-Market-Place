import { createContext, useCallback, useEffect, useState } from "react";

import {
  loginUser,
  registerBrand as registerBrandAPI,
  getCurrentUser,
} from "../services/authService";
import { registerCreator as registerCreatorAPI } from "../services/creatorService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  const [loading, setLoading] = useState(true);

  const role = user?.role || null;
  const isAuthenticated = Boolean(token && user);

  // Save authentication data
  const saveAuthData = (data) => {
    const userData = {
      ...(data.user || data.brand || data.creator),
      role: data.role,
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(data.token);
    setUser(userData);

    return userData;
  };

  // Login
  const login = async (credentials) => {
    const data = await loginUser(credentials);

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    saveAuthData(data);

    return data;
  };

  // Brand Registration
  const registerBrand = async (payload) => {
    const data = await registerBrandAPI(payload);

    console.log(payload);

    if (!data.success) {
      throw new Error(data.message || "Brand registration failed");
    }

    saveAuthData(data);

    return data;
  };

  const registerCreator = async (payload) => {
    const data = await registerCreatorAPI(payload);

    if (!data.success) {
      throw new Error(data.message || "Creator registration failed");
    }

    saveAuthData(data);

    return data;
  };

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setToken(null);
    setUser(null);

    window.location.href = "/login";
  }, []);

  // Get Current User
  const fetchCurrentUser = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      setUser(null);
      setToken(null);
      return;
    }

    try {
      const data = await getCurrentUser();

      if (!data.success) {
        throw new Error(data.message || "Unable to fetch user");
      }

      const userData = {
        ...data.user,
        role: data.role || data.user?.role,
      };

      setUser(userData);
      setToken(localStorage.getItem("token"));

      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Current user error:", error);

      const status = error.response?.status;

      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        setToken(null);
        setUser(null);
      }
    }
  }, []);

  // Initialize Authentication
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await fetchCurrentUser();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchCurrentUser]);

  const value = {
    user,
    token,
    role,
    loading,
    isAuthenticated,

    login,
    registerBrand,
    registerCreator,
    logout,

    setUser,
    fetchCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
