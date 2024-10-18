import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import UserList from "./components/UserList";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search/:name",
      element: (
        <>
          <Navbar />
          <UserList />
        </>
      ),
    },
    {
      path: "/user/:username",
      element: (
        <>
          <Navbar />
          <Profile />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
