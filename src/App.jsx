// src/App.jsx
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import AppRouter from "./router/AppRouter.jsx";

import AuthProvider from "./context/AuthContext.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import ToastProvider from "./context/ToastContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Navbar />

          <main style={{ minHeight: "80vh" }}>
            <AppRouter />
          </main>

          <Footer />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
