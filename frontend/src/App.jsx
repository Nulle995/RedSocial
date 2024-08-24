import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import Index from "./pages/index/Index";
import Home from "./pages/home/Home";
import UserLayout from "./layouts/UserLayout";
import Profile from "./pages/profile/Profile";
import "./App.css";
import "./fonts.css";
import Following from "./pages/following/Following";

function App() {
  const { userData } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              <UserLayout>
                <Home />
              </UserLayout>
            ) : (
              <Index />
            )
          }
        />
        <Route
          path="/profile/:username"
          element={
            userData ? (
              <UserLayout>
                <Profile />
              </UserLayout>
            ) : (
              <Index />
            )
          }
        />
        <Route
          path="/profile/:username/following"
          element={
            userData ? (
              <UserLayout>
                <Following />
              </UserLayout>
            ) : (
              <Index />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
