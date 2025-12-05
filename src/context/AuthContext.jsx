import {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext
} from "react";
import {
  getMe,
  login as apiLogin,
  refresh,
  _setUnauthorizedHandler,
} from "../api/authApi";
import { ToastContext } from "./ToastContext.jsx"; 

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  // Toast Context'i çağırarak beyaz ekran sorununu çözüyoruz
  const toastCtx = useContext(ToastContext); 
  const show = toastCtx ? toastCtx.show : () => {}; 
  
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  
  // 🔥 DÜZELTME 1: Sayfa yenilendiğinde user bilgisini localStorage'dan çek
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  
  const [loading, setLoading] = useState(Boolean(token));
  const refreshTimer = useRef(null);

  // ===================================================
  // 401 HANDLER
  // ===================================================
  useEffect(() => {
    _setUnauthorizedHandler(() => {
      logout(true);
      show("Session expired. Please log in again.", "error");
    });
    return () => _setUnauthorizedHandler(null);
  }, [show]);

  // ===================================================
  // TOKEN VARSA User'ı API'den Getir
  // ===================================================
  useEffect(() => {
    let mounted = true;

    async function fetchCurrentUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const data = await getMe();
        if (mounted) {
          // 🔥 DÜZELTME 2: API'den gelen user'ı hem state'e hem localStorage'a kaydet (daha güvenli)
          const newUser = data?.user ?? data ?? null;
          setUser(newUser);
          if (newUser) localStorage.setItem("user", JSON.stringify(newUser));

          startRefreshCycle();
        }
      } catch {
        logout(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCurrentUser();
    return () => (mounted = false);
  }, [token]);

  // ===================================================
  // NORMAL USER LOGIN
  // ===================================================
  async function login(credentials) {
    const data = await apiLogin(credentials);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }

    if (data?.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    startRefreshCycle();
    show("Login successful 🎉");
    return data;
  }

  // ===================================================
  // MANAGER LOGIN (LOCAL MOCK)
  // ===================================================
  async function loginAsManager({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password !== "1234") {
          reject(new Error("Incorrect manager password"));
          return;
        }

        const fakeToken = "manager-token-demo";
        const managerUser = {
            name: "Manager",
            email: email || "manager@demo.com",
            role: "manager",
        };

        localStorage.setItem("token", fakeToken);
        localStorage.setItem("user", JSON.stringify(managerUser));

        setToken(fakeToken);
        setUser(managerUser);

        show("Manager login successful 🔑");
        resolve();
      }, 500);
    });
  }

  // ===================================================
  // LOGOUT
  // ===================================================
  function logout(silent = false) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    stopRefreshCycle();
    if (!silent) show("Logged out successfully.");
  }

  // ===================================================
  // USER UPDATE
  // ===================================================
  function updateUser(patch) {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));

    const saved = localStorage.getItem("user");
    if (saved) {
      const merged = { ...JSON.parse(saved), ...patch };
      localStorage.setItem("user", JSON.stringify(merged));
    }
  }

  // ===================================================
  // REFRESH TOKEN MANTIĞI
  // ===================================================
  async function doRefresh() {
    try {
      const data = await refresh();
      if (data?.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
    } catch {
      logout(true);
      show("Session could not be renewed. Please log in again.", "error");
    }
  }

  function startRefreshCycle() {
    stopRefreshCycle();
    refreshTimer.current = setInterval(doRefresh, 14 * 60 * 1000); 
  }

  function stopRefreshCycle() {
    if (refreshTimer.current) {
      clearInterval(refreshTimer.current);
      refreshTimer.current = null;
    }
  }

  // ===================================================
  // CONTEXT VALUE
  // ===================================================
  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      isAuthenticated: !!token,
      loading,
      login,
      loginAsManager, 
      logout,
      updateUser,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}