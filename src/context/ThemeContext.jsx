import { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // değişken tabanlı stil için :root.dark sınıfını yönetiyoruz
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme, isDark]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const value = useMemo(() => ({ theme, isDark, toggleTheme }), [theme, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
