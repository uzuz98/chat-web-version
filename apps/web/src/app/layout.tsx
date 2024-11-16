import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Coin98AdapterProvider from "../provider/adapters";
import Coin98AdapterModal from "~/provider/adapters/modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Super wallet chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Coin98AdapterProvider>
          {children}
          <Coin98AdapterModal />
        </Coin98AdapterProvider>
      </body>
    </html>
  );
}
