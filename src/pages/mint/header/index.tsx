import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { chainIdToHexString, shortenAddress } from '../../../utils/web3Functions';
import { useEagerConnect } from "../../../hooks/useEagerConnect";
import { useInactiveListener } from "../../../hooks/useInactiveListener";
import { DefaultNetwork, networkInfo } from '../../../constant';
import styles from "./NftHeader.module.scss";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [DefaultNetwork],
});

function NftHeader() {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  const { error, account, library, activate, active, connector } = useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;
  const [wrongNetwork, setWrongNetwork] = useState(false);

  const changeNetwork = async () => {
    const wa: any = window;
    const { ethereum } = wa;
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdToHexString(DefaultNetwork) }],
      });
    } catch (switchError) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const error = JSON.parse(JSON.stringify(switchError));
      if (
        error.code === 4902 ||
        (error.code === -32603 && error?.data?.originalError.code === 4902)
      ) {
        try {
          const item = networkInfo[DefaultNetwork];
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdToHexString(DefaultNetwork),
                chainName: item.label,
                rpcUrls: item.rpcUrl,
                nativeCurrency: item.nativeCurrency,
                blockExplorerUrls: item.explorer,
              },
            ],
          });
          console.log('done');
        } catch (addError) {
          console.log('addError', addError);
        }
      }
    }
  };

  useEffect(() => {
    setWrongNetwork(isUnsupportedChainIdError);
  }, [isUnsupportedChainIdError]);

  useEffect(() => {
    if (wrongNetwork) changeNetwork();
  }, [wrongNetwork]);

  const connectWallet = async () => {
    try {
      await activate(injectedConnector);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={styles.navbar}>
        <div className="flex items center">
          <div className="flex items-center z-10 mr-8">
            <Link to="/">
              <img src="img/logo_white.png" alt="logo" className={styles.logo} />
            </Link>
            <h1 className="ml-4">ODINEUM<span>NFTS</span></h1>
          </div>
        </div>
        <div className="flex items-center">
          <button
            type="button" className={styles.walletBtn}
            onClick={connectWallet}
          >
            {active && account ? `${shortenAddress(account)}` : 'CONNECT WALLET'}
          </button>
          <button type="button" onClick={() => setIsHamburger(!isHamburger)} className={`${styles.hamburger} ${isHamburger ? styles.active : ''}`}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </>
  );
};

export default NftHeader;