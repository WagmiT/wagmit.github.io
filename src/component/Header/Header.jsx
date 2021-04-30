import React from "react";
import {  PageHeader } from "antd";
import { ConnectWalletButton } from "../ConnectWallet/ConnectWallet";

export const MainHeader = () => {
  return (
    <PageHeader
      className="site-page-header"
      title="WAGMI"
      subTitle="We're all gonna make it"
      extra={[
        <ConnectWalletButton />
      ]}
    />
  );
};
