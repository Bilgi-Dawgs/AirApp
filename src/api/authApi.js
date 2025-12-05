// src/api/authApi.js
import axios from "axios";

// .env içinden oku
const USE_MOCK = String(import.meta.env.VITE_USE_MOCK || "1") === "1";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Bu değişkeni AuthContext set edecek (401 olursa ne yapalım?)
let unauthorizedHandler = null;
export function _setUnauthorizedHandler(fn) {
  unauthorizedHandler = fn;
}

// ----------------------------------------------------
// 1) REAL MODE (backend varsa)
// ----------------------------------------------------
const realApi = axios.create({
  baseURL: BASE_URL,
});

// her istekten önce token ekle
realApi.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

// 401 yakala → handler varsa çağır + event gönder
realApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      if (typeof unauthorizedHandler === "function") {
        unauthorizedHandler();
      }
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    return Promise.reject(err);
  }
);

// ----------------------------------------------------
// 2) MOCK MODE (backend yoksa)
// ----------------------------------------------------
const MOCK_USER = {
  id: 1,
  name: "Demo User",
  email: "demo@example.com",
  role: "user",
};

function wait(ms = 500) {
  return new Promise((r) => setTimeout(r, ms));
}

// ----------------------------------------------------
// 3) PUBLIC FUNCTIONS
// ----------------------------------------------------

// LOGIN
export async function login(payload) {
  // payload: { email, password }
  if (USE_MOCK) {
    await wait(400);
    if (payload.email === "demo@example.com" && payload.password === "1234") {
      const fakeToken = "mock-token-123";
      return { token: fakeToken, user: MOCK_USER };
    }
    const err = new Error("Unauthorized");
    err.response = { status: 401, data: { message: "Email or password incorrect." } };
    throw err;
  }

  const { data } = await realApi.post("/auth/login", payload);
  return data;
}

// REGISTER
export async function register(payload) {
  if (USE_MOCK) {
    await wait(400);
    return { ok: true };
  }
  const { data } = await realApi.post("/auth/register", payload);
  return data;
}

// ME
export async function getMe() {
  if (USE_MOCK) {
    await wait(400);
    const token = localStorage.getItem("token");
    if (!token) {
      const err = new Error("Unauthorized");
      err.response = { status: 401 };
      throw err;
    }
    return { user: MOCK_USER };
  }
  const { data } = await realApi.get("/auth/me");
  return data;
}

// REFRESH
export async function refresh() {
  if (USE_MOCK) {
    await wait(200);
    return { token: "mock-token-123" };
  }
  const { data } = await realApi.post("/auth/refresh");
  return data;
}

// ----------------------------------------------------
// 4) CHANGE PASSWORD ✅
// ----------------------------------------------------
export async function changePassword({ currentPassword, newPassword }) {
  if (USE_MOCK) {
    await wait(400);
    if (currentPassword === "1234" && newPassword.length >= 6) {
      return { ok: true, message: "Password changed (mock)" };
    }
    const err = new Error("Invalid current password or weak new password.");
    err.response = { status: 400 };
    throw err;
  }

  const { data } = await realApi.post("/auth/change-password", {
    currentPassword,
    newPassword,
  });

  return data;
}
