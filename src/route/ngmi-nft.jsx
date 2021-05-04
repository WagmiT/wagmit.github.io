import React from "react";
import { Web3Context } from "../store/Web3Store";
import { Card, Col, Row, Space, Typography } from "antd";
import Web3 from "web3";
import { ConnectWalletInstruction } from "../component/ConnectWallet/ConnectWalletInstruction";
import { Loading } from "../component/Loading/Loading";
import { contracts } from "../constants";

const BN = Web3.utils.BN;

const { Title, Text } = Typography;

export const NgmiNftPage = () => {
  const { web3, account } = React.useContext(Web3Context);
  const [loading, setLoading] = React.useState(true);
  const [ngmiNft, setNgmiNft] = React.useState(null);

  React.useEffect(() => {
    if (!!web3 && !!account && loading) {
      (async () => {
        const ngmiContract = new web3.eth.Contract(
          contracts.ngmiAbiJson,
          contracts.NGMI_NFT_CONTRACT_ADDRESS
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
    return <ConnectWalletInstruction />;
  } else if (loading) {
    return <Loading />;
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
