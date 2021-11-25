import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconTwitter, IconDiscord, IconTelegram } from "../../constant/Icons";
import styles from "./Header.module.scss";

function Header() {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  return (
    <>
      <div className={styles.navbar}>
        <img src="img/logo.png" alt="logo" className={styles.logo} />
        <div className={`${styles.menu}  ${isHamburger && styles.active}`}>
          <ul>
            <li>
              <Link to="#nft">NFT</Link>
            </li>
            <li>
              <Link to="#roadmap" className="flex items-center">ROADMAP <img src="img/navdropdown.png" alt="drop" className="ml-4" /></Link>
            </li>
            <li>
              <Link to="#roadmap" className="flex items-center">TOKENOMICS</Link>
            </li>
            <li>
              <Link to="#chart" className="flex items-center">CHART</Link>
            </li>
            <li>
              <Link to="/whitepaper" className="flex items-center">WHITEPAPER</Link>
            </li>
          </ul>
        </div>
        <div className={styles.socialgroup}>
          <div className="relative">
            <img src="img/socialbg.png" alt="social" />
            <div className={styles.socialitems}>
              <div>
                <Link to="/">
                  <IconTwitter color='white' />
                </Link>
              </div>
              <div>
                <Link to="/">
                  <IconDiscord color='white' />
                </Link>
              </div>
              <div>
                <Link to="/">
                  <IconTelegram color='white' />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => setIsHamburger(!isHamburger)} className={`${isHamburger && styles.active}`}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </>
  );
};

export default Header;