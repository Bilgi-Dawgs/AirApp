// src/api/userApi.js
import axios from "axios";

const USE_MOCK = String(import.meta.env.VITE_USE_MOCK || "1") === "1";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
});

// her isteğe token ekle
api.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

// basit demo user
const MOCK_USER = {
  id: 1,
  name: "Demo User",
  email: "demo@example.com",
  role: "user",
};

function wait(ms = 400) {
  return new Promise((r) => setTimeout(r, ms));
}

// profili getir
export async function getProfile() {
  if (USE_MOCK) {
    await wait();
    // eğer auth context user'ı localStorage'a yazdıysa onu oku
    const saved = localStorage.getItem("user");
    if (saved) return { user: JSON.parse(saved) };
    return { user: MOCK_USER };
  }

  const { data } = await api.get("/users/me");
  return data; // { user: {...} }
}

// profili güncelle
export async function updateProfile(payload) {
  if (USE_MOCK) {
    await wait();
    // mock'ta sadece localStorage'a yazarız
    const current = JSON.parse(localStorage.getItem("user") || "null") || MOCK_USER;
    const updated = { ...current, ...payload };
    localStorage.setItem("user", JSON.stringify(updated));
    return { user: updated };
  }

  const { data } = await api.put("/users/me", payload);
  return data;
}
