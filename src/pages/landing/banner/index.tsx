import React from "react";
import styles from "./Banner.module.scss";

function Banner() {
  return (
    <>
      <div className={`flex justify-around py-24 px-8 md:px-28 ${styles.banner}`}>
        <div className={`flex flex-col justify-center ${styles.bannerIntro}`}>
          <h3 className="shadow-lg">WELCOME TO</h3>
          <div className="relative">
            <p>ODINEUM</p>
            <img src="img/Vektor-Smartobjekt.png" alt="smartobject" />
          </div>
          <h4>A NFT BASED REWARDS
            MULTIPLIER TOKEN ON THE
            BINANCE SMART CHAIN</h4>
        </div>
        <div className="relative">
          <img src="img/Ebene 6.png" alt="nftBg" />
          <img src="img/Ebene 7.png" alt="nft" className={styles.bannerNft} />
        </div>
      </div>
    </>
  );
};

export default Banner;