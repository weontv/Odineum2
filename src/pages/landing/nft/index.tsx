import React from "react";
import styles from "./NFT.module.scss";

function Nft() {
  return (
    <div className={styles.nfts}>
      <div className="flex justify-center relative" id="nft">
        <p className={styles.title}>NFT</p>
        <img src="img/nft_underbase.png" alt="base" className={styles.base} />
      </div>
      <div className={styles.items}>
        <img src="img/book_bg.png" alt="background" />
        <div className="flex justify-around">
          <div className={styles.hover}>
            <img src="img/nft_2.png" alt="nft4" />
          </div>
          <div className={styles.hover}>
            <img src="img/nft_3.png" alt="nft3" />
          </div>
          <div className={styles.hover}>
            <img src="img/nft_4.png" alt="nft2" />
          </div>
          <div className={styles.hover}>
            <img src="img/nft_1.png" alt="nft3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nft;