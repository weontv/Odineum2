import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import Header, { injectedConnector } from "./header";
import Footer from "../../components/footer";
import NFT_INFO from '../../artifacts/contracts/BCNFT.sol/BCNFT.json';
import Market_INFO from '../../artifacts/contracts/BCNFTMarketplace.sol/BCNFTMarketplace.json';
import styles from "./Mint.module.scss";
import { firestore } from "../../firebase";

require('dotenv').config();

function Mint(this: any) {
  // const [rangeVal, setRangeVal] = useState(0)
  const { account, library, active, activate } = useWeb3React();
  const [price, setPrice] = useState<number>(0.15);
  const [number, setNumber] = useState<number>(1);
  const [orderList, setOrder] = useState<number[]>([]);
  const [totalSupply, setTotalSupply] = useState<number>(1);
  const [isProcess, setIsProcessing] = useState<boolean>(false);
  const [user, setUser] = useState<any>({
    account,
    avatar: "assets/img/avatars/avatar.jpg",
    firstName: "User",
    lastName: "",
    nickName: "@user",
    bio: ""
  });
  // ======================= Randomization code for NFT mint ==================================//
  // const randomArrayShuffle = (array: number[]) =>  {
  //   let currentIndex = array.length;
  //   let temporaryValue;
  //   let randomIndex;
  //   const tempArray = [...array];
  //   while (currentIndex !== 0) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     temporaryValue = tempArray[currentIndex];
  //     tempArray[currentIndex] = tempArray[randomIndex];
  //     tempArray[randomIndex] = temporaryValue;
  //   }
  //   return tempArray;
  // }

  // const nftOrder = () => {
  //   const order = [];
  //   for (let i = 0; i < 3000; i+=1) {
  //     order.push(1);
  //   }
  //   for (let i = 0; i < 2500; i+=1) {
  //     order.push(2);
  //   }
  //   for (let i = 0; i < 2000; i+=1) {
  //     order.push(3);
  //   }
  //   for (let i = 0; i < 1500; i+=1) {
  //     order.push(4);
  //   }
  //   for (let i = 0; i < 1000; i+=1) {
  //     order.push(5);
  //   }
  //   const randomOrder = randomArrayShuffle(order);
  //   const userInfo = firestore.collection("nftOrder").doc("nftOrder").set({randomOrder});
  //   setOrder(randomOrder);
  //   console.log(randomOrder);
  // }


  const getUser = async (userId: any) => {
    if (userId) {
      const userInfo = (
        await firestore.collection("users").doc(userId).get()
      ).data();
      if (userInfo) {
        setUser(userInfo);
      } else if (active) {
        toast.info("Please set up your profile before you use the marketplace");
      }
    }
  };

  const getTotalSupply = async () => {
    if (active) {
      const nftContract = new Contract(
        process.env.REACT_APP_NFT_ADDRESS || '',
        NFT_INFO.abi,
        library.getSigner(),
      );
      const total = await nftContract.totalSupply();
      setTotalSupply(Number(total));
    } else {
      toast.warning("Wallet is not connected or you won't be able to do anything here");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getTotalSupply();
      getUser(account);
    }, 500);
  }, [active]);

  const mintNFTs = async () => {
    try {
      setIsProcessing(true);
      if (active) {
        const contract = new Contract(
          process.env.REACT_APP_MARKET_ADDRESS || '',
          Market_INFO.abi,
          library.getSigner(),
        );
        const nftContract = new Contract(
          process.env.REACT_APP_NFT_ADDRESS || '',
          NFT_INFO.abi,
          library.getSigner(),
        );

        // check if the wallet is approved to contract
        const isApproved = await nftContract.isApprovedForAll(
          account,
          process.env.REACT_APP_MARKET_ADDRESS,
        );
        if (!isApproved) {
          const approve = await nftContract.setApprovalForAll(
            process.env.REACT_APP_MARKET_ADDRESS,
            true,
          );
          await approve.wait();
        }

        const order = (await firestore.collection("nftOrder").doc("nftOrder").get()).data();
        if (order) {
          const level = order.randomOrder;
          try {
            const res = await contract.mint(number, level.splice(Number(totalSupply), number));
            toast.success('Successfully minted.');
            setIsProcessing(false);
            getTotalSupply();
          } catch (error) {
            console.log('mint err----', error);
            setIsProcessing(false);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="mint-bg">
      <Header />
      <div className="py-48 flex flex-col justify-center items-center px-4">
        <div className="flex mb-2 items-center justify-between w-full max-w-lg">
          <span className="text-2xl md:text-4xl inline-block py-1 px-2 uppercase rounded-full text-white">
            Total Minted
          </span>
          <div className="text-right">
            <span className="text-2xl inline-block text-white whitespace-nowrap">
              {totalSupply}
              /10,000
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-4 mb-12 flex rounded-xl bg-white w-full max-w-xl">
          <div style={{
            width: `${Math.max(1000 / 10000 * totalSupply, 1)}%`
          }} className="shadow-none rounded-xl flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow" />
        </div>
        <div className={`${styles.mintForm}`}>
          {active ?
            <button type="button" className={`${styles.mintBtn} ${isProcess ? styles.fontOther : styles.mintFont}`} onClick={mintNFTs}>
              {isProcess ? 'MINTING...' : 'MINT'}
            </button>
            :
            <button type="button" className={`${styles.mintBtn} ${styles.fontInactive}`} onClick={() => activate(injectedConnector)}>
              SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED
            </button>
          }
          <div id="mint" className="flex justify-start items-center mt-16 text-sm md:text-2xl">
            <span className="flex text-white items-center bg-grey-lighter rounded rounded-r-none px-3">PRICE:</span>
            <input type="number"
              min={0.15}
              value={price}
              disabled
              onChange={(e) => setPrice(Number(e.target.value))}
              className={styles.price}
            />
            <span className="flex text-white items-center bg-grey-lighter rounded rounded-r-none px-3 whitespace-nowrap">X {number} = {(price * number).toFixed(2)}</span>
            <span className={styles.yellow}>BNB</span>
          </div>
          <ReactSlider
            className="horizontal-slider"
            min={1}
            max={10}
            thumbClassName="example-thumb"
            trackClassName="example-track"
            onChange={(e) => setNumber(e)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mint;