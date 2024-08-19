'use client';
import { ReactNode } from "react";
import { ConfigProvider, theme } from "antd";

export const AntdThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          fontFamily: "Poppins, sans-serif;",
          fontSizeSM: 16,
        },
        components: {
          Card: {},
          Layout: {
            headerHeight: 94,
            bodyBg: "#001529",
          },
          Menu: {
            padding: 28,
            itemSelectedBg: "#1A2E3B",
            itemSelectedColor: "#ff4931",
            fontSize: 16,
            lineHeight: 24,
            itemPaddingInline: "24px",
            itemBg: "transparent",
            darkItemBg: "transparent",
            colorBorderBg: "transparent",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
