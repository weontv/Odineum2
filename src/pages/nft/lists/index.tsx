import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import CustomDropdown from "../../../components/ui/customDropdown";
import Nft from "../../../components/nft";
import styles from './Nfts.module.scss';
import { firestore } from "../../../firebase";


const sortTypes = [
  'LATEST',
  'OLDEST',
  'MOST EXPENSIVE',
  'MOST LIKED'
];

// const nftLists = [
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
//   {
//     imageUrl: 'img/nft_1.png',
//     title: 'WOLVES',
//     price: 55
//   },
// ];

interface SelectFunction {
  selectNft: (e: any) => void
}

function Lists({ selectNft }: SelectFunction) {
  const [sortType, setSortType] = useState<string>(sortTypes[0]);
  const { account, library, active, activate } = useWeb3React();
  const [auctionList, setAuctionList] = useState<any>([]);
  const [fixedList, setFixedList] = useState<any>([]);
  const [selectedNft, setSelectedNft] = useState<any>();
  const [nftLists, setNftLists] = useState<any>();

  const getMyNFTs = async () => {
    await firestore.collection("nftCollection").where("isSale", "==", true).get().then((querySnapshot) => {
      const nftList: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const temp = { ...data };
        nftList.push(temp);
      });
      // selectNft(nftList[0]);
      setNftLists(nftList);
    });
  }

  useEffect(() => {
    getMyNFTs();
  }, [])
  return (
    <>
      <div className={styles.selection}>
        <div className={styles.line} />
        <CustomDropdown selected={sortType} forNftList classProps="mx-4" lists={sortTypes} handleSelect={(item) => setSortType(item)} />
      </div>
      {nftLists && nftLists.length > 0 ?
        <div className={styles.lists}>
          {nftLists.map((item: any, index: any) => (
            // eslint-disable-next-line react/no-array-index-key
            <div onClick={() => selectNft(item)} key={`nft-${index}`}>
              <Nft imageUrl={item.image} title={item.title} price={item.price} />
            </div>
          ))}
        </div> :
        <div className="py-16">
          <p className="text-2xl text-white m-48">Loading...</p>
        </div>
      }
    </>
  );
};

export default Lists;