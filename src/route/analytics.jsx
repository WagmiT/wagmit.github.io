import React from "react";
import { Web3Context } from "../store/Web3Store";
import { Row, Space, Spin, Typography } from "antd";
import { ConnectWalletButton } from "../component/ConnectWallet/ConnectWallet";

const { Title } = Typography;
const WAGMI_CONTRACT_ADDRESS = "0x854bd71322cd05e30e88e04549f91a728f49dec7";

export const AnalyticsPage = () => {
  const { web3 } = React.useContext(Web3Context);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (web3) {
      (async () => {
        setLoading(false);
      })();
    }
  }, [web3]);

  if (!web3) {
    return (
      <Row justify="center">
        <Space size="large" direction="vertical">
          <Title level={2}>Please connect your wallet to continue</Title>
          <ConnectWalletButton />
        </Space>
      </Row>
    );
  } else if (loading) {
    return (
      <Row justify="center">
        <Spin size="large" />
      </Row>
    );
  }
  return <Row></Row>;
};
