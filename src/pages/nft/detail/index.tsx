import React, { useEffect, useState } from "react";
import { firestore } from "../../../firebase";
import styles from "./Detail.module.scss";

function Detail({ nft }: any) {

  const [user, setUser] = useState<any>();

  const getUser = async () => {
    if (nft) {
      const res = await (await firestore.collection("users").doc(nft.owner).get()).data();
      if (res) {
        setUser(res);
      }
    }
  }
  useEffect(() => {
    getUser();
  }, [nft])

  return (
    <div className={styles.container}>
      {nft &&
        <>
          <div className={styles.nft}>
            {/* <img src="img/nft_2.png" alt="nft" /> */}
            <div style={{ backgroundImage: `url(${nft.image})` }} />
          </div>
          <div className={styles.detail}>
            <div className="flex flex-col justify-center items-center">
              {user && <>
                <h6>{`${user.firstName}${user.lastName}`}</h6>
                <img src={user.avatarImage} alt="avatar" />
              </>
              }
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
              <h5>#{nft.tokenId}</h5>
              <h4>&#34;{nft.title}&#34;</h4>
              <h1>{nft.price} {nft.paymentType}</h1>
              <button type="button" className={styles.buyBtn}>BUY NOW</button>
              <button type="button" className={styles.offerBtn}>MAKE AN OFFER</button>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Detail;