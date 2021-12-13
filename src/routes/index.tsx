import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "../pages/landing";
import Nft from "../pages/nft";
import Mint from "../pages/mint";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/nft" element={<Nft />} />
        <Route path="/mint" element={<Mint />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;