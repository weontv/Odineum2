import React from "react";
import Banner from "./banner";
import Nft from "./nft";
import RoadMap from "./roadmap";
import Tokenomic from "./tokenomics";
import Chart from "./chart";
import Header from "../../components/header";
import Footer from "../../components/footer";

function Landing() {
  return (
    <div className="landing-bg">
      <Header />
      <Banner />
      <Nft />
      <RoadMap />
      <Tokenomic />
      <Chart />
      <Footer />
    </div>
  );
};

export default Landing;