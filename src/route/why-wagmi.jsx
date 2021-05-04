import React from "react";
import { ConnectWalletInstruction } from "../component/ConnectWallet/ConnectWalletInstruction";
import { Loading } from "../component/Loading/Loading";
import { contracts } from "../constants";
import { Web3Context } from "../store/Web3Store";
import {
  Col,
  Row,
  Typography,
  Comment,
  List,
  Input,
  Space,
  Button,
  message as AntDesignMessage,
} from "antd";
import Web3 from "web3";

const BN = Web3.utils.BN;

const { Title, Text } = Typography;

export const WhyWAGMIPage = () => {
  const { web3, account } = React.useContext(Web3Context);
  const [loading, setLoading] = React.useState(true);
  const [whyWagmiData, setWhyWagmiData] = React.useState(null);
  const [whyWagmiMessages, setWhyWagmiMessages] = React.useState([]);

  const getWhyWagmi = async () => {
    setWhyWagmiMessages((v) => []);
    const whyWAGMIContract = new web3.eth.Contract(
      contracts.whyWagmiAbiJson,
      contracts.WHY_WAGMI_CONTRACT_ADDRESS
    );
    const messagesCount = await whyWAGMIContract.methods.messagesCount().call();
    setWhyWagmiData((v) => ({ ...v, messagesCount }));
    for (let i = Number(messagesCount) - 1; i >= 0; i--) {
      const message = await whyWAGMIContract.methods.messages(i).call();
      setWhyWagmiMessages((v) => [...v, message]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    const whyWAGMIContract = new web3.eth.Contract(
      contracts.whyWagmiAbiJson,
      contracts.WHY_WAGMI_CONTRACT_ADDRESS
    );
    whyWAGMIContract.methods
      .sendMessage(message)
      .send({ from: account })
      .then(() => {
        AntDesignMessage.success("Message send!", 10);
        getWhyWagmi();
      })
      .catch((error) => {
        AntDesignMessage.error(error.message, 10);
      });
  };

  const handleApproval = async () => {
    const WAGMIContract = new web3.eth.Contract(
      contracts.wagmiAbiJson,
      contracts.WAGMI_CONTRACT_ADDRESS
    );
    WAGMIContract.methods
      .approve(
        contracts.WHY_WAGMI_CONTRACT_ADDRESS,
        "115792089237316195423570985008687907853269984665640564020457584007913129639935"
      )
      .send({
        from: account,
      })
      .then(() => {
        AntDesignMessage.success("$WAGMI Contract Approved!", 10);
        mainFunc();
      })
      .catch((error) => {
        AntDesignMessage.error(error.message, 10);
      });
  };

  const mainFunc = async () => {
    const whyWAGMIContract = new web3.eth.Contract(
      contracts.whyWagmiAbiJson,
      contracts.WHY_WAGMI_CONTRACT_ADDRESS
    );
    const WAGMIContract = new web3.eth.Contract(
      contracts.wagmiAbiJson,
      contracts.WAGMI_CONTRACT_ADDRESS
    );
    const fee = await whyWAGMIContract.methods.feeCost().call();
    const approvalLimit = await WAGMIContract.methods
      .allowance(account, contracts.WHY_WAGMI_CONTRACT_ADDRESS)
      .call();
    setWhyWagmiData({
      fee,
      hasApproved: new BN(fee)
        .mul(new BN(10).pow(new BN(18)))
        .lt(new BN(approvalLimit)),
    });
    setLoading(false);
    await getWhyWagmi();
  };

  React.useEffect(() => {
    if (!!web3 && !!account) {
      mainFunc();
    }
  }, [account]);

  if (!web3) {
    return <ConnectWalletInstruction />;
  } else if (loading) {
    return <Loading />;
  }

  return (
    <Row justify="center">
      <Space direction="vertical">
        <Row justify="center">
          <Col>
            <Title level={2}>Why $WAGMI?</Title>
          </Col>
        </Row>
        <Row>
          <Text>1000 $WAGMI is needed for sending a message</Text>
        </Row>
        <Row justify="center">
          {whyWagmiData.hasApproved ? (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Input name="message" placeholder="Enter messages" />
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
          ) : (
            <Button onClick={handleApproval}>Approve $WAGMI</Button>
          )}
        </Row>
        <Row justify="center">
          <Col>
            <List
              header={`${whyWagmiData.messagesCount || "-"} replies`}
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
      </Space>
    </Row>
  );
};
