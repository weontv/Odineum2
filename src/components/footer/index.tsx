import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.links}>
        <div className="flex flex-col">
          <Link to="/" className="font-bold">ABOUT</Link>
          <Link to="/">TEAM</Link>
          <Link to="/">WHITEPAPER</Link>
          <Link to="/">ROADMAP</Link>
        </div>
        <div className="flex flex-col">
          <Link to="/" className="font-bold">TOKEN</Link>
          <Link to="/">NFTS</Link>
          <Link to="/">TOKENOMICS</Link>
          <Link to="/">HOWTOBUY</Link>
        </div>
        <div className="flex flex-col">
          <Link to="/" className="font-bold">LEGAL</Link>
          <Link to="/">TERMS & CONDITIONS</Link>
          <Link to="/">PRIVACY POLICY</Link>
          <Link to="/">DMCA</Link>
        </div>
      </div> */}
      <img src="img/footerLeftBase.png" alt="leftbase" className={styles.left} />
      <img src="img/footerRightBase.png" alt="leftbase" className={styles.right} />
    </div>
  );
};

export default Footer;