import React from "react";
import NftHeader from "./nftheader";
import Detail from "./detail";
import Footer from "../../components/footer";
import Lists from "./lists";

function Landing() {
  return (
    <div className="nft-bg">
      <NftHeader />
      <Detail />
      <Lists />
      <Footer />
    </div>
  );
};

export default Landing;