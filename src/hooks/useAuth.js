import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function useAuth() {
  const ctx = useContext(AuthContext);
  
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  
  // Hata kaynağı olan loginAsManager fonksiyonu buradan kaldırıldı.
  // Bu fonksiyonun tanımı AuthContext.jsx içinde bulunmaktadır.

  return ctx;
}