import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import ErrorPage  from './pages/ErrorPage.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      { 
        path: "/error/:errorId", 
        element: <ErrorPage /> 
      },
      {
        path: "*", 
        element: (
          <ErrorPage/>
        ), 
      },
    ],
  },
]);