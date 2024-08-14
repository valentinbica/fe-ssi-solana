"use client";
import React, { ReactNode, useEffect } from "react";
import { Button, Col, Layout, Menu, notification, Row, Typography } from "antd";
import cs from "classnames";
import {
  BankOutlined,
  FileDoneOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";

const { Content, Sider, Header } = Layout;

export default function Page({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { connected, connect, select, disconnect, publicKey } = useWallet();

  let location = useLocation();

  console.log({
    publicKey,
  });

  useEffect(() => {
    select(PhantomWalletName);
  }, [select]);

  return (
    <Layout className={styles.layout}>
      <Sider width={247} className={styles.sider}>
        <Typography.Title className={cs(["jersey-15-regular", styles.white])}>
          SSI Solana
        </Typography.Title>
        <Menu
          className={styles.menu}
          mode="vertical"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={["sub1"]}
          onClick={(e) => {
            console.log({ e });
          }}
        >
          <Menu.Item key="/">
            <Link to="/">
              <WalletOutlined />
              <span>Wallet</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/vc">
            <Link to="/vc">
              <FileDoneOutlined />
              <span>VC</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/issuer">
            <Link to="/issuer">
              <BankOutlined />
              <span>Issuer</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Row justify="space-between" align="middle">
            <Col lg="12">
              <Typography.Title className="jersey-15-regular primary-color no-mg">
                {title}
              </Typography.Title>
            </Col>
            <Col lg="12">
              <Button
                size="large"
                type={connected ? "link" : "primary"}
                onClick={async () => {
                  if (connected) {
                    await disconnect();
                    notification.info({
                      message: "Wallet disconnected",
                      placement: "bottomRight",
                    });
                  }
                  try {
                    await connect();
                  } catch (ex) {
                    console.log(ex);
                    notification.warning({
                      message: "Wallet not found",
                      description: "Please install Phantom wallet or enable it",
                      placement: "bottomRight",
                    });
                  }
                }}
              >
                {connected ? "Disconnect Wallet" : "Connect Wallet"}{" "}
              </Button>
            </Col>
          </Row>
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
}
