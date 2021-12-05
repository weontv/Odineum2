import React from "react";
import styles from "./NftItem.module.scss";

declare type NftProps = {
  imageUrl: string,
  title: string,
  price: number
}
const Nft = ({ imageUrl, title, price }: NftProps) => (
  <div className={`flex flex-col justify-center items-center ${styles.container}`}>
    <div className={styles.nft} style={{ backgroundImage: `url(${imageUrl})` }} />
    <h5>{title}</h5>
    <h6>{price}<span>BNB</span></h6>
  </div>
);

export default Nft;