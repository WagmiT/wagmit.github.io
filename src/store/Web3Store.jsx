import React from "react";

export const Web3Context = React.createContext({});

export const Web3Store = ({ children }) => {
  const [account, setAccount] = React.useState(null);
  const [networkId, setNetworkId] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);

  return (
    <Web3Context.Provider
      value={{
        account,
        setAccount,
        networkId,
        setNetworkId,
        web3,
        setWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
