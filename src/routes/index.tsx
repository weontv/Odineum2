import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "../pages/landing";

function Routes() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
      </BrowserRouter>
    </>
  );
};

export default Routes;