import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import FlightsPage from '../pages/FlightsPage.jsx';
import PlaneStatusPage from '../pages/PlaneStatusPage.jsx';
import HelpPage from '../pages/Navbar-Footer/HelpPage.jsx';
import AboutPage from '../pages/Navbar-Footer/AboutPage.jsx';
import PrivacyPage from '../pages/Navbar-Footer/PrivacyPage.jsx';
import MyBookingsPage from '../pages/Navbar-Footer/MyBookingsPage.jsx';
import LoginPage from '../pages/Auth/LoginPage.jsx';
import RegisterPage from '../pages/Auth/RegisterPage.jsx';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage.jsx';
import TicketPurchasePage from '../pages/Ticket/TicketPurchasePage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx'; 

//========================================================

const AppRouter = () => {
  return (
    <Routes>
      {/* Ana Rotalar */}
      <Route path="/" element={<HomePage />} />
      <Route path="/flights" element={<FlightsPage />} />
      <Route path="/status" element={<PlaneStatusPage />} /> {}

      {/* Navbar/Footer Rotaları */}
      <Route path="/support" element={<HelpPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} /> {/* Eğer PrivacyPage.jsx varsa */}
      <Route path="/my-bookings" element={<MyBookingsPage />} /> {}

      {/* Auth Rotaları */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Bilet Rotası */}
      <Route path="/purchase-ticket" element={<TicketPurchasePage />} /> {}

      {/* Profil Rotası (Test için açık) */}
      <Route path="/profile" element={<ProfilePage />} /> {}

      {/* Örnek korumalı rota---> AUTH PAKETİ BİTİNCE: ---> DOĞA
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } /> 
      <Route path="/my-bookings" element={
        <ProtectedRoute>
          <MyBookingsPage />
        </ProtectedRoute>
      } /> 
      */}
    </Routes>
  );
};

export default AppRouter;

// Not: Auth Projesinin ProtectedRoute'u daha sonra eklenecek. -> DOĞA