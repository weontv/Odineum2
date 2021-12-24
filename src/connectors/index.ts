import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { PROVIDER_URL, supportedChainIds } from "../constant";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  97: PROVIDER_URL,
  56: "https://bsc-dataseed.binance.org/",
  // 4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
};

export const network = new NetworkConnector({
  urls: { 97: RPC_URLS[97], 56: RPC_URLS[56] },
  // urls: { 80001: RPC_URLS[80001], 4: RPC_URLS[4] },
  defaultChainId: supportedChainIds[0],
});

export const injected = new InjectedConnector({
  supportedChainIds,
});
