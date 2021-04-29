import React from "react";
import { Button, PageHeader } from "antd";

export const MainHeader = () => {
  return (
    <PageHeader
      className="site-page-header"
      title="WAGMI"
      subTitle="We're all gonna make it"
      // extra={[
      //     <Button>Connect Wallet</Button>
      // ]}
    />
  );
};
