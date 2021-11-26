import React from "react";
import styles from "./Tokenomic.module.scss";

function Tokenomic() {
  return (
    <>
      <div className="flex justify-center relative" id="tokenomic">
        <p className={styles.title}>TOKENOMICS</p>
        <img src="img/tokenomicBase.png" alt="base" className={styles.base} />
      </div>
      <div className={styles.tokenomic}>
        <div className={styles.lottery}>
          {/* <img src="img/tokenomicChart.png" alt="tokenomic" /> */}
          <div className={styles.steps}>
            <h1>Tax breakdown :</h1>
            <h2>15% slippage<br />
              1% Auto Liquidity</h2>
            <h5>Base rewards are  5% and incrementally<br />
              increase through owning the NFTs</h5>
            <div>
              <h6>Stage 1 would give you 5.5% rewards<br />
                Stage 2 would give you 6% rewards<br />
                Stage 3 would give you 6.5% rewards<br />
                Stage 4 would give you 7% rewards<br />
                Stage 5 would give you 8% rewards</h6>
            </div>
            <h5>Stage 6 (owning the full set) will give you 10% rewards</h5>
          </div>
          <h3>LOTTERY SYSTEM</h3>
          <p>
            A portion of the tax will also be going towards a fully automated lottery system that picks out unique winners 24 times a day <br />
            Meaning by simply holding the required amount of Odineum you will have chances every hour to win a significant amount of tokens.<br />
            A larger daily prize will be given out once every 24 hours as well. The lottery will be based off a percentage of the hourly/daily volume.<br /><br />
            Remaining tax will be a marketting tax that gives the project ample means to market Odineum throughout the cryptosphere. </p>
        </div>
        <div className={styles.stages}>
          <img src="img/tokenomicStage.png" alt="stages" />
          <p>Odineum is a reflectionary token that earns you passive income that is paid out in USDT
            The token is geared towards benefitting investors via 2 streams of payouts/rewards
            Our NFT&apos;s will augment this income in a tiered fashion.Investors can maximize the amount of
            money they earn through this system by owning either a single NFT, or collecting the entire set.
            Owning the entire set will not only give you maximum rewards, but it will also give the owners
            of the full set an exclusive whitelist spot and when the full platform is built,
            they will also become the first dividend recipients which will further give them
            income based on the entire projects profits. </p>
        </div>
      </div>
    </>
  );
};

export default Tokenomic;