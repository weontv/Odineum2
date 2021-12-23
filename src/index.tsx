import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers';
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
