import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "../pages/landing";
import Nft from "../pages/nft";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/nft" element={<Nft />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;