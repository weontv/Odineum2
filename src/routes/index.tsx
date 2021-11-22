import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/landing";
import Header from "../components/header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">{Landing}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;