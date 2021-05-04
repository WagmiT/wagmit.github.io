import React from "react";
import { Row, Spin } from "antd";

export const Loading = () => {
  return (
    <Row justify="center">
      <Spin size="large" />
    </Row>
  );
};
