import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NftHeader.module.scss";

function NftHeader() {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  return (
    <>
      <div className={styles.navbar}>
        <div className="flex items center">
          <div className="flex items-center z-10 mr-8">
            <Link to="/">
              <img src="img/logo_white.png" alt="logo" className={styles.logo} />
            </Link>
            <h1 className="ml-4">ODINEUM<span>NFTS</span></h1>
          </div>
        </div>
        <div className="flex items-center">
          <button type="button" className={styles.walletBtn}>CONNECT WALLET</button>
          <button type="button" onClick={() => setIsHamburger(!isHamburger)} className={`${styles.hamburger} ${isHamburger ? styles.active : ''}`}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </>
  );
};

export default NftHeader;