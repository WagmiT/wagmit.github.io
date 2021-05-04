import React from "react";
import { Row, Space, Typography } from "antd";
import { ConnectWalletButton } from "./ConnectWallet";

const { Title } = Typography;

export const ConnectWalletInstruction = () => {
  return (
    <Row justify="center">
      <Space size="large" direction="vertical">
        <Title level={2}>Please connect your wallet to continue</Title>
        <ConnectWalletButton />
      </Space>
    </Row>
  );
};
