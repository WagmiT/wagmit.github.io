import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { Button, Card } from "antd";
import { Web3Context } from "../../store/Web3Store";
import "./ConnectWallet.css";

const providerOptions = {
  /* See Provider Options Section */
  injected: {
    options: {
      rpc: {
        56: 'https://bsc-dataseed.binance.org/'
      },
      network: 'binance',
      chainId: 56,
    }
  },
};

const web3Modal = new Web3Modal({
  network: "biannce", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

export const ConnectWalletButton = () => {
  const { account, setAccount, setNetworkId, setWeb3} = React.useContext(Web3Context);

  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const networkId = await web3.eth.net.getId();
    setWeb3(web3);
    setAccount(address);
    setNetworkId(networkId);
  };

  if(account) {
    return <div className="connect-wallet" disabled>{account}</div>
  }

  return <Button onClick={connectWallet}>Connect Wallet</Button>;
};
