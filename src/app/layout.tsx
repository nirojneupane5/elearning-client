import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryCLientProvider } from "@/provider/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";

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
        <div className="max-w-[1320px] mx-auto">
          <ReactQueryCLientProvider>
            {children}
            <Toaster />
          </ReactQueryCLientProvider>
        </div>
      </body>
    </html>
  );
}
