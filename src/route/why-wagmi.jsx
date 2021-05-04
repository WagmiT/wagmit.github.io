import React from "react";
import { ConnectWalletInstruction } from "../component/ConnectWallet/ConnectWalletInstruction";
import { Loading } from "../component/Loading/Loading";
import { contracts } from "../constants";
import { Web3Context } from "../store/Web3Store";
import { Col, Row, Typography, Comment, List } from "antd";

const { Title } = Typography;

export const WhyWAGMIPage = () => {
  const { web3, account } = React.useContext(Web3Context);
  const [loading, setLoading] = React.useState(true);
  const [whyWagmiData, setWhyWagmiData] = React.useState(null);
  const [whyWagmiMessages, setWhyWagmiMessages] = React.useState([]);

  React.useEffect(() => {
    if (!!web3 && !!account && loading) {
      (async () => {
        const whyWAGMIContract = new web3.eth.Contract(
          contracts.whyWagmiAbiJson,
          contracts.WHY_WAGMI_CONTRACT_ADDRESS
        );
        const WAGMIContract = new web3.eth.Contract(
          contracts.wagmiAbiJson,
          contracts.WAGMI_CONTRACT_ADDRESS
        );

        const fee = await whyWAGMIContract.methods.feeCost().call();
        const messagesCount = await whyWAGMIContract.methods
          .messagesCount()
          .call();
        setWhyWagmiData({
          fee: Number(fee),
          messagesCount: Number(messagesCount),
        });
        setLoading(false);
        for (let i = Number(messagesCount) - 1; i >= 0; i--) {
          const message = await whyWAGMIContract.methods.messages(i).call();
          setWhyWagmiMessages((v) => [...v, message]);
        }
      })();
    }
  }, [account]);

  if (!web3) {
    return <ConnectWalletInstruction />;
  } else if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={2}>Why $WAGMI?</Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <List
            header={`${whyWagmiData.messagesCount} replies`}
            itemLayout="horizontal"
            dataSource={whyWagmiMessages}
            renderItem={(item) => (
              <li>
                <Comment author={item.author} content={item.message} />
              </li>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
