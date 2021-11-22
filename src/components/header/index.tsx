import React from "react";
import styles from "./Header.module.scss";

function Header() {
  return (
    <>
      <div className={`${styles.navbar} flex items-center`}>
        <img src="img/logo.png" alt="logo" className={styles.logo} />
        <ul>
          <li>NFT</li>
          <li className="flex items-center">ROADMAP <img src="img/navdropdown.png" alt="drop" className="ml-4"/></li>
          <li>TOKENOMICS</li>
          <li>CHART</li>
          <li>WHITEPAPER</li>
        </ul>
        <div className="hidden">
          <span />
          <span />
          <span />
        </div>
      </div>
    </>
  );
};

export default Header;