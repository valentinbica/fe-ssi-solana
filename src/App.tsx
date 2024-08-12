import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Wallet from "./pages/Wallet/Wallet";
import Issuer from "./pages/Issuer/Issuer";
import VC from "./pages/VC/VC";
import { AntdThemeProvider } from "./components/Antd/AntdThemeProvider";
import WalletContextProvider from "./components/Wallet/WalletContextProvider";

function App() {
  return (
    <WalletContextProvider>
      <AntdThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Wallet />} />
            <Route path="/issuer" element={<Issuer />} />
            <Route path="/vc" element={<VC />} />
          </Routes>
        </Router>
      </AntdThemeProvider>
    </WalletContextProvider>
  );
}

export default App;
