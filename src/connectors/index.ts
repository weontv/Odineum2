import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { PROVIDER_URL, supportedChainIds } from "../constant";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  137: PROVIDER_URL,
  80001: "https://polygon-mumbai.infura.io/v3/d8065d7ef4af41aca71f6a74a36d7be3",
  // 4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
};

export const network = new NetworkConnector({
  urls: { 137: RPC_URLS[137], 80001: RPC_URLS[80001] },
  // urls: { 80001: RPC_URLS[80001], 4: RPC_URLS[4] },
  defaultChainId: supportedChainIds[0],
});

export const injected = new InjectedConnector({
  supportedChainIds,
});
