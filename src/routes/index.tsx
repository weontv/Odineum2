import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "../pages/landing";
import Header from "../components/header";
import Footer from "../components/footer";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;