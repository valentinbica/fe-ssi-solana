import React, { ReactNode } from "react";
import { Card as AntdCard } from "antd";

import styles from "./styles.module.css";

export const Card = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <AntdCard
      title={<h2 className="jersey-15-regular">{title}</h2>}
      className={styles.card}
      bordered
    >
      {children}
    </AntdCard>
  );
};
