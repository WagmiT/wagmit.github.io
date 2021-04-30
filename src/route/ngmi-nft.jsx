import React from "react";
import { Web3Context } from "../store/Web3Store";
import { Card, Col, Row, Space, Typography } from "antd";
import { ConnectWalletButton } from "../component/ConnectWallet/ConnectWallet";
import Web3 from "web3";

const BN = Web3.utils.BN;

const { Title, Text } = Typography;
const NGMI_NFT_CONTRACT_ADDRESS = "0x854Bd71322Cd05e30E88e04549F91a728F49dEC7";
const ngmiAbiJson = require("../abi/ngmi_nft.json");

export const NgmiNftPage = () => {
  const { web3, account } = React.useContext(Web3Context);
  const [loading, setLoading] = React.useState(true);
  const [ngmiNft, setNgmiNft] = React.useState(null);

  React.useEffect(() => {
    if (!!web3 && !!account && loading) {
      (async () => {
        const ngmiContract = new web3.eth.Contract(
          ngmiAbiJson,
          NGMI_NFT_CONTRACT_ADDRESS
        );
        const balanceOf = await ngmiContract.methods.balanceOf(account).call();
        if (balanceOf !== "0") {
          setNgmiNft({
            name: "NGMI NFT",
            description: "You're not gonna make it since u sold WAGMI",
            image: "https://wagmit.github.io/dicpic.jpg",
          });
        }

        setLoading(false);
      })();
    }
  }, [account]);

  if (!web3) {
    return (
      <Row justify="center">
        <Space size="large" direction="vertical">
          <Title level={2}>Please connect your wallet to continue</Title>
          <ConnectWalletButton />
        </Space>
      </Row>
    );
  }

  if (ngmiNft) {
    return (
      <Row justify="center">
        <Card title="Shame on you">
          <img
            style={{ maxWidth: "300px" }}
            className="cover"
            src={ngmiNft.image}
            alt={ngmiNft.description}
          />
          <br />
          <Text strong>{ngmiNft.name}</Text>
          <br />
          <Text>{ngmiNft.description}</Text>
        </Card>
      </Row>
    );
  }
  return (
    <Row justify="center">
      <Col>
        <Title level={2}>You don't own any NGMI NFT</Title>
        <Text>WAGMI!</Text>
      </Col>
    </Row>
  );
};
