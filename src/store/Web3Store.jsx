import React from "react";

export const Web3Context = React.createContext({});

export const Web3Store = ({ children }) => {
  const [account, setAccount] = React.useState(null);
  const [networkId, setNetworkId] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    if (initialized) {
      window.ethereum.on("accountsChanged", function (accounts) {
        // Time to reload your interface with accounts[0]!
        const address = accounts[0];
        setAccount(address);
      });

      window.ethereum.on("networkChanged", function (networkId) {
        // Time to reload your interface with the new networkId
        setNetworkId(Number(networkId));
      });
    }
  }, [initialized]);

  return (
    <Web3Context.Provider
      value={{
        account,
        setAccount,
        networkId,
        setNetworkId,
        web3,
        setWeb3,
        initialized,
        setInitialized,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
