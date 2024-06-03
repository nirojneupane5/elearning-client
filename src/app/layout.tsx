import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryCLientProvider } from "@/provider/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elearning platform",
  description: "Elearning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryCLientProvider>
          <Navbar />
          {children}
          <Toaster />
        </ReactQueryCLientProvider>
      </body>
    </html>
  );
}
