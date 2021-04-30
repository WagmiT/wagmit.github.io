import React from "react";
import { Col, Row, Space, Typography } from "antd";
import { grey } from '@ant-design/colors';

const { Title } = Typography;

export const IndexPage = () => {
  return (
    <div>
      <Space direction="vertical" size="large">
        <Row>
          <Col span={12}>
            <a
              href="https://bscscan.com/token/0xcddb9f34d6a48e5d051561e6d9fbfc96050cd429"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="image-zoom cover" src="wagmi.png" alt="WAGMI" />
            </a>
          </Col>
          <Col span={12}>
            <a
              href="https://bscscan.com/token/0xbe218b17bbf76e8d957e83265087115e2056c5a7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="image-zoom cover" src="ngmi.png" alt="NGMI" />
            </a>
          </Col>
        </Row>
      </Space>
      <Row type="flex" justify="center">
        <Col>
          <Title level={2}>Here's what happens to WAGMI over time</Title>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col>
          <img src="chart.jpg" alt="chart" className="cover" />
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
          <Col>
            <Title level={1}>
              <a
                href="https://github.com/WagmiT"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: grey.primary}}
              >
                <i className="bi bi-github"></i>
              </a>
            </Title>
          </Col>
          <Col>
            <Title level={1}>
              <a
                href="https://twitter.com/wagmit"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: grey.primary}}
              >
                <i className="bi bi-twitter"></i>
              </a>
            </Title>
          </Col>
          <Col>
            <Title level={1}>
              <a
                href="https://t.me/wagmi_together"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: grey.primary}}
              >
                <i className="bi bi-telegram"></i>
              </a>
            </Title>
          </Col>
          <Col>
            <Title level={1}>
              <a
                href="https://t.me/wagmi_together"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: grey.primary}}
              >
                <i className="bi bi-telegram"></i>
              </a>
            </Title>
          </Col>
      </Row>
    </div>
  );
};
