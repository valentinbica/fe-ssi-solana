"use client";
import React, { ReactNode } from "react";
import { Layout, Menu, Typography } from "antd";
import cs from "classnames";
import {
  BankOutlined,
  FileDoneOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import styles from "./styles.module.css";

const { Content, Sider } = Layout;

export default function Page({ children }: { children: ReactNode }) {
  return (
    <Layout className={styles.layout}>
      <Sider width={247} className={styles.sider}>
        <Typography.Title className={cs(["jersey-15-regular", styles.white])}>
          SSI Solana
        </Typography.Title>
        <Menu
          className={styles.menu}
          mode="vertical"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={[
            {
              label: "Wallet",
              key: "/wallet",
              icon: <WalletOutlined />,
            },
            {
              label: "VC",
              key: "/vc",
              icon: <FileDoneOutlined />,
            },
            {
              label: "Issuer",
              key: "/issuer",
              icon: <BankOutlined />,
            },
          ]}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
}
