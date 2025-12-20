import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/Auth/LoginPage";
import Dashboard from "../pages/HomePage";
import FlightSearchPage from "../pages/FlightsPage";
import RosterWorkbench from "../pages/RosterWorkbench";
import RosterViewPage from "../pages/RosterViewPage";
import MainLayout from "../MainLayout";

import { rosterLoader as viewLoader } from "../pages/RosterViewPage";
import { flightsLoader } from "../pages/FlightsPage";
import { workbenchLoader } from "../pages/RosterWorkbench";

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  // login
  {
    path: "/login",
    element: <LoginPage />,
  },
  // Main
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <FlightSearchPage />
          </ProtectedRoute>
        ),
        loader: flightsLoader,
      },
      {
        path: "workbench/:flightNumber?",
        element: (
          <ProtectedRoute>
            <RosterWorkbench />
          </ProtectedRoute>
        ),
        loader: workbenchLoader,
      },
      {
        path: "view/:flightNumber",
        element: (
          <ProtectedRoute>
            <RosterViewPage />
          </ProtectedRoute>
        ),
        loader: viewLoader,
      },
    ],
  },
]);

export default router;
