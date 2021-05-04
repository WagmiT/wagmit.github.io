import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export const HeaderMenu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/analytics">Analytics</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/ngmi-nft">NGMI NFT</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/why-wagmi">Why $WAGMI?</Link>
    </Menu.Item>
  </Menu>
);
