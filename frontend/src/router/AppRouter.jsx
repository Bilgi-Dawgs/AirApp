import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/Auth/LoginPage";
import Dashboard from "../pages/HomePage";
import FlightSearchPage from "../pages/FlightsPage";
import RosterWorkbench from "../pages/RosterWorkbench";
import RosterViewPage from "../pages/RosterViewPage";

import RosterViewPage, { loader as viewLoader } from "../pages/RosterViewPage";
import { flightsLoader } from "./pages/FlightsPage";

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
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

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
