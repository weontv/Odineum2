import React from "react";
import Banner from "../../components/banner";
import Nft from "../../components/nft";
import RoadMap from "../../components/roadmap";
import Tokenomic from "../../components/tokenomics";
import Chart from "../../components/chart";
import Header from "../../components/header";

function Landing() {
  return (
    <>
      <Header />
      <Banner />
      <Nft />
      <RoadMap />
      <Tokenomic />
      <Chart />
    </>
  );
};

export default Landing;