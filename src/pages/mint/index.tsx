import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import Switch from "react-switch";
import moment from "moment";
import ReactDatePicker from 'react-datepicker';
import { parseUnits } from '@ethersproject/units';
import Header, { injectedConnector } from "./header";
import { IconClose } from "../../utils/Icons";
import Footer from "../../components/footer";
import NFT_INFO from '../../artifacts/contracts/BCNFT.sol/BCNFT.json';
import Market_INFO from '../../artifacts/contracts/BCNFTMarketplace.sol/BCNFTMarketplace.json';
import styles from "./Mint.module.scss";
import { firestore } from "../../firebase";
import { mintUsingPinata } from "../../utils/pinataAPI";
import Nft from "../../components/nft";
import { ModalDropdown } from "../../components/ui/modalDropdown";
import "react-datepicker/dist/react-datepicker.css";

require('dotenv').config();

export const durations: string[] = [
  '20 mins', // for only test
  '12 hours',
  '1 day',
  '3 days',
  '5 days',
  '7 days',
];

export const durationsTime: any = {
  '20 mins': 20 * 60, // for only test
  '12 hours': 12 * 3600,
  '1 day': 24 * 3600,
  '3 days': 3 * 24 * 3600,
  '5 days': 5 * 24 * 3600,
  '7 days': 7 * 24 * 3600,
};

export const paymentTypes: string[] = [
  'BNB',
  'BCTN'
];

function Mint(this: any) {
  // const [rangeVal, setRangeVal] = useState(0)
  const { account, library, active, activate } = useWeb3React();
  const [price, setPrice] = useState<number>(0.15);
  const [number, setNumber] = useState<number>(1);
  const [orderList, setOrder] = useState<number[]>([]);
  const [totalSupply, setTotalSupply] = useState<number>(1);
  const [isMintProcess, setIsMintProcessing] = useState<boolean>(false);
  const [nftLists, setNftLists] = useState<any>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [isSaleProcessing, setIsSaleProcessing] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isAuction, setIsAuction] = useState<boolean>(false);
  const [duration, setDuration] = useState<string>(durations[0]);
  const [selectedNFT, setSelectedNFt] = useState<any>({});
  const [paymentType, setPaymentType] = useState<string>(paymentTypes[0]);
  const [user, setUser] = useState<any>({
    account,
    avatar: "assets/img/avatars/avatar.jpg",
    firstName: "User",
    lastName: "",
    nickName: "@user",
    bio: ""
  });
  const [assetImages, setAssetImages] = useState<any>([]);

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

  const getAssetImages = async () => {
    const res = (await firestore.collection("assetImages").doc("assetImages").get()).data();
    if (res) {
      console.log(assetImages.imageUrls);
      setAssetImages(res.imageUrls);
    }
    const ress = await firestore.collection("nftCollection").where("tokenId", "==", 33);
    console.log(ress)
  }

  const getMyNFTs = async () => {
    firestore.collection("nftCollection").where("owner", "==", account).get().then((querySnapshot) => {
      const nftList: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const temp = { ...data };
        nftList.push(temp);
      });
      setNftLists(nftList);
    });
  }

  useEffect(() => {
    setTimeout(() => {
      if (active) {
        getTotalSupply();
        getUser(account);
        getAssetImages();
        getMyNFTs();
      }
    }, 1000);
  }, [active]);

  const mintNFTs = async () => {
    if (active) {
      if (account) {
        const checkUser = (await firestore.collection('users').doc(account).get()).data();
        if (!checkUser?.nickName) {
          toast.warning('Please complete your profile first!');
          return;
        }
      }
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
        await getTotalSupply();
        const level = order.randomOrder.splice(Number(totalSupply + 1), number);
        try {
          setIsMintProcessing(true);
          const res = await contract.mint(number, level);
          res
            .wait()
            .then(async (result: any) => {
              const events = result?.events;
              setIsMintProcessing(false);
              if (events.length > 0) {
                toast.success('Successfully minted.');
                console.log("number", number);
                for (let i = 0; i < number; i += 1) {
                  console.log(totalSupply + i);
                  let JSONBody;
                  switch (level[i]) {
                    case 1:
                      JSONBody = {
                        title: 'WOLVES',
                        level: level[i],
                        creator: account,
                        image: assetImages[0]
                      };
                      break;
                    case 2:
                      JSONBody = {
                        title: 'CROWS',
                        level: level[i],
                        creator: account,
                        image: assetImages[1]
                      };
                      break;
                    case 3:
                      JSONBody = {
                        title: 'ODINS STALLION',
                        level: level[i],
                        creator: account,
                        image: assetImages[2]
                      };
                      break;
                    case 4:
                      JSONBody = {
                        title: 'ODIN',
                        level: level[i],
                        creator: account,
                        image: assetImages[3]
                      };
                      break;
                    case 5:
                      JSONBody = {
                        title: 'ODINS FACE',
                        level: level[i],
                        creator: account,
                        image: assetImages[4]
                      };
                      break;

                    default:
                      break;
                  }

                  const pinataData = await mintUsingPinata(JSONBody);
                  console.log(JSONBody);
                  if (pinataData.success) {
                    const response = await firestore.collection("nftCollection").doc(String(parseInt(events[i * 2 + 1].args.nftID, 10))).set({
                      tokenId: parseInt(events[i * 2 + 1].args.nftID, 10),
                      tokenURI: pinataData.message,
                      ...JSONBody,
                      ownerAvatar:
                        user?.avatarImage || "img/nft_2.png",
                      owner: account,
                      price: 0,
                      saleType: "auction",
                      paymentType: 'BNB',
                      auctionLength: 0,
                      auctionCreator: account,
                      time: 0,
                      created: moment().valueOf(),
                      isSale: false,
                    });
                  }
                }
                await getTotalSupply();
                await getMyNFTs();
              }
            })
        } catch (error) {
          console.log('mint err----', error);
          setIsMintProcessing(false);
        }
      }
    }
  }


  const createTrade = async () => {
    if (!user?.nickName) {
      toast.info("Please set up your profile before you use the marketplace");
      setShowModal(false);
      return;
    }
    if (minPrice <= selectedNFT.price) {
      toast.error("The price should be more than the last price");
      return;
    }
    if (active) {
      setIsSaleProcessing(true);
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

      if (isAuction) {
        console.log("auction")
        console.log(
          selectedNFT.tokenId,
          parseUnits(durationsTime[duration].toString()),
          parseUnits(minPrice.toString()),
          paymentType,
          account
        )
        const res = await contract.createAuction(
          selectedNFT.tokenId,
          durationsTime[duration],
          parseUnits(minPrice.toString()),
          paymentType,
          account
        );

        res
          .wait()
          .then(async (result: any) => {
            setIsSaleProcessing(false);
            const events = result?.events;
            if (events.length > 0) {
              const { args } = await events[events.length - 1];
              const ress = await firestore.collection("nftCollection").doc(String(selectedNFT.tokenId)).update({
                price: parseFloat(minPrice.toString()),
                isSale: true,
                saleType: "auction",
                paymentType,
                auctionLength: durationsTime[duration],
                auctionCreator: account,
                time: (parseInt(args.duration, 10) + parseInt(args.auctionStart, 10)) * 1000,
              });
            }
            setShowModal(false);
            toast.success('Successfully created!');
            await getMyNFTs();
          })
          .catch((err: any) => {
            setIsSaleProcessing(false);
            setShowModal(false);
            toast.error("Create failed.");
            console.log("Put On Sale:", err);
          });
      } else {
        console.log("fixed")
        console.log(selectedNFT.tokenId, minPrice, parseUnits(minPrice.toString()), paymentType);
        try {
          const res = await contract.openTrade(
            selectedNFT.tokenId,
            parseUnits(minPrice.toString()),
            paymentType,
          );
          res
            .wait()
            .then(async (result: any) => {
              setIsSaleProcessing(false);
              const events = result?.events;
              if (events.length > 0) {
                const { args } = events[events.length - 1];
                const ress = await firestore.collection("nftCollection").doc(String(selectedNFT.tokenId)).update({
                  price: parseFloat(minPrice.toString()),
                  isSale: true,
                  saleType: "fixed",
                  paymentType
                });
              }
              setShowModal(false);
              toast.success('Successfully created!');
              await getMyNFTs();
            })
        } catch (err) {
          setIsSaleProcessing(false);
          toast.error("Creation failed.");
          console.log("Put on Sale:", err);
          setShowModal(false);
        }
      }
    }
  }

  const selectNft = async (item: any) => {
    if (item.isSale === true) {
      if (item.saleType === 'auction') {
        toast.success('This nft is already in auction');
      } else {
        toast.success('This nft is already put on fixed sale');
      }
    } else {
      setShowModal(true);
      setSelectedNFt(item);
    }
  }

  return (
    <div className="mint-bg">
      <Header />
      <div className="py-48 3xl:py-96 flex flex-col justify-center items-center px-4">
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
            <button type="button" className={`${styles.mintBtn} ${isMintProcess ? styles.fontOther : styles.mintFont}`} onClick={mintNFTs}>
              {isMintProcess ? 'MINTING...' : 'MINT'}
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
      {nftLists.length > 0 && <div className={styles.lists}>
        {nftLists.map((item: any, index: any) => (
          <div onClick={() => {
            selectNft(item);
            setMinPrice(item.price);
            // eslint-disable-next-line react/no-array-index-key
          }} key={`nft-${index}`}>
            <Nft imageUrl={item.image} title={item.title} price={item.price} />
          </div>
        ))}
      </div>}
      {showModal &&
        <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex outline-none focus:outline-none justify-center items-center">
          <div className="relative w-auto my-6 mx-auto max-w-2xl w-full">
            <div className="border border-gray-500 rounded-3xl shadow-lg relative flex flex-col w-full bg-white bg-body outline-none focus:outline-none py-4 px-8">
              <div className="flex items-start justify-between p-5 border-b border-create rounded-t">
                <h1 className="text-center text-white text-lg">
                  List On Sale
                </h1>
                <button
                  type="button"
                  className="p-1 ml-auto bg-transparent text-gray-300 float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  <IconClose />
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <div className="form-group text-md md:text-lg w-full mb-5">
                  <p className="mb-3 text-white text-md">Price:</p>
                  <div className="form-input size-auto w-full py-4 mb-5">
                    <input
                      type="number"
                      placeholder="Enter minimum bid"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="form-group text-md md:text-lg w-ful mb-14">
                  <p className="mb-4 text-white">Payment Type</p>
                  <div className="form-input dropdown z-20 size-auto w-full py-4">
                    <ModalDropdown
                      className="w-full text-white-important bg-transparent-important"
                      selected={paymentType}
                      lists={paymentTypes}
                      handleSelect={(item) => setPaymentType(item)}
                    />
                  </div>
                </div>

                <div className="flex items-center mb-5">
                  <p className="text-white text-md m-0 p-0 mr-4">Auction:</p>
                  <Switch
                    onChange={() => {
                      setIsAuction(!isAuction);
                    }}
                    checked={isAuction}
                    height={26}
                  />
                </div>

                {/* Starting date */}
                {isAuction &&
                  <div className="form-group text-md md:text-lg w-ful mb-14">
                    <p className="mb-4 text-white">Duration</p>
                    <div className="form-input dropdown z-20 size-auto w-full py-4">
                      <ModalDropdown
                        className="w-full text-white-important bg-transparent-important"
                        selected={duration}
                        lists={durations}
                        handleSelect={(item) => setDuration(item)}
                      />
                    </div>
                  </div>}

                <button
                  type="button"
                  className="bg-btn-main size-auto w-full text-2md py-4 text-white"
                  onClick={createTrade}
                >
                  {isSaleProcessing ? (
                    'Processing...'
                  ) : (
                    'List On Sale'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      <Footer />
    </div>
  );
};

export default Mint;