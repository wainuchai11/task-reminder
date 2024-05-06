"use client";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { ConfigProvider } from "antd";
import theme from "./theme/themeConfig";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <main>
            <AntdRegistry>
              <ConfigProvider theme={theme}>
                <div className="container">
                  <div className="wrapper">
                    <Navbar />
                    {children}
                  </div>
                </div>
              </ConfigProvider>
            </AntdRegistry>
          </main>
        </Provider>
      </body>
    </html>
  );
}
