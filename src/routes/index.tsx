import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "../pages/landing";
import Footer from "../components/footer";
import Nft from "../pages/nft";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/nft" element={<Nft />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;