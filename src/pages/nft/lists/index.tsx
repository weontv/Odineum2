import React, { useState } from "react";
import CustomDropdown from "../../../components/ui/customDropdown";
import Nft from "../../../components/nft";
import styles from './Nfts.module.scss';


const sortTypes = [
  'LATEST',
  'OLDEST',
  'MOST EXPENSIVE',
  'MOST LIKED'
];

const nftLists = [
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
  {
    imageUrl: 'img/nft_1.png',
    title: 'WOLVES',
    price: 55
  },
];

function Lists() {
  const [sortType, setSortType] = useState<string>(sortTypes[0]);
  return (
    <>
      <div className={styles.selection}>
        <div className={styles.line} />
        <CustomDropdown selected={sortType} forNftList classProps="mx-4" lists={sortTypes} handleSelect={(item) => setSortType(item)} />
      </div>
      <div className={styles.lists}>
        {nftLists.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Nft imageUrl={item.imageUrl} title={item.title} price={item.price} key={`nft-${index}`} />
        ))}
      </div>
    </>
  );
};

export default Lists;