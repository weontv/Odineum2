import React from "react";
import styles from "./Detail.module.scss";

function Detail() {

  return (
    <div className={styles.container}>
      <div className={styles.nft}>
        {/* <img src="img/nft_2.png" alt="nft" /> */}
        <div style={{ backgroundImage: `url(img/nft_2.png)` }} />
      </div>
      <div className={styles.detail}>
        <div className="flex flex-col justify-center items-center">
          <h6>JOHNNY UTAH</h6>
          <img src="img/avatar.png" alt="avatar" />
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <h5>#0001</h5>
          <h4>&#34;ODINS STALLION&#34;</h4>
          <h1>250 BNB</h1>
          <button type="button" className={styles.buyBtn}>BUY NOW</button>
          <button type="button" className={styles.offerBtn}>MAKE AN OFFER</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;