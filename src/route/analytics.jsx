import React from "react";
import { Web3Context } from "../store/Web3Store";
import { Card, Col, Row, Space, Spin, Typography } from "antd";
import { ConnectWalletButton } from "../component/ConnectWallet/ConnectWallet";
import Web3 from "web3";
import { Pie } from "react-chartjs-2";

const BN = Web3.utils.BN;

const { Title } = Typography;
const WAGMI_CONTRACT_ADDRESS = "0xcddb9f34d6a48e5d051561e6d9fbfc96050cd429";
const wagmiAbiJson = require("../abi/wagmi.json");

const numberFormat = new Intl.NumberFormat("en-GB");

export const AnalyticsPage = () => {
  const { web3 } = React.useContext(Web3Context);
  const [loading, setLoading] = React.useState(true);
  const [analytics, setAnalytics] = React.useState(null);

  React.useEffect(() => {
    if (!!web3 && loading) {
      (async () => {
        const wagmiContract = new web3.eth.Contract(
          wagmiAbiJson,
          WAGMI_CONTRACT_ADDRESS
        );
        const circulatingSupply = new BN(
          (await wagmiContract.methods.totalSupply().call()).toString()
        ).div(new BN(10).pow(new BN(18)));
        const maxSupply = new BN(10 ** 9);
        const totalBurnt = maxSupply.sub(circulatingSupply);
        setAnalytics({
          circulatingSupply: circulatingSupply.toNumber(),
          totalBurnt: totalBurnt.toNumber(),
          maxSupply: maxSupply.toNumber(),
        });
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
  return (
    <>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <Row justify="center">
          <Title level={1}>Were All Gonna Make It ($WAGMI)</Title>
        </Row>
        <Row justify="center">
          <Col>
            <Pie
              data={{
                labels: ["Circulating Supply", "Burnt $WAGMI"],
                datasets: [
                  {
                    label: "WAGMI",
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 99, 132, 0.2)",
                    ],
                    borderColor: [
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 99, 132, 1)",
                    ],
                    data: [analytics.circulatingSupply, analytics.totalBurnt],
                  },
                ],
              }}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Card title="Max Supply">
            {numberFormat.format(analytics.maxSupply)} $WAGMI
          </Card>
          <Card title="Circulating Supply">
            {numberFormat.format(analytics.circulatingSupply)} $WAGMI
          </Card>
          <Card title="Total Burnt">
            {numberFormat.format(analytics.totalBurnt)} $WAGMI
          </Card>
        </Row>
      </Space>
      <Space
        size="large"
        direction="vertical"
        style={{ width: "100%" }}
      ></Space>
    </>
  );
};
