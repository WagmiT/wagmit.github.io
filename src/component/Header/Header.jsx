import React from "react";
import { Col, Dropdown, PageHeader, Row, Space } from "antd";
import { ConnectWalletButton } from "../ConnectWallet/ConnectWallet";
import { Link } from "react-router-dom";
import { HeaderMenu } from "./Menu";

export const MainHeader = () => {
  return (
    <PageHeader
      className="site-page-header"
      title={
        <>
          <Dropdown overlay={HeaderMenu} trigger={["click"]} arrow>
            <i className="bi bi-list"></i>
          </Dropdown>
          <Link style={{ color: "black" }} to="/">
            WAGMI
          </Link>
        </>
      }
      extra={[<ConnectWalletButton />]}
    />
  );
};
