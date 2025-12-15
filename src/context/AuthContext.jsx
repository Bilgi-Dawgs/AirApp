import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Varsayılan olarak giriş yapılmamış kabul et
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // KRİTİK NOKTA: Başlangıçta loading TRUE olmalı.
  // Çünkü henüz localStorage'a bakmadık.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa yenilendiğinde çalışır
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          // Token varsa içeri al
          setIsAuthenticated(true);
          setUser({ name: "Flight Ops Admin" });
        }
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        // Token olsa da olmasa da kontrol bitti, loading'i kapat.
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    setUser({ name: "Flight Ops Admin" });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
