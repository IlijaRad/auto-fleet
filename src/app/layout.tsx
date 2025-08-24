import { VehicleProvider } from "@/lib/context/vehicle-context";
import Header from "@/ui/header/header";
import HeaderMobile from "@/ui/header/header-mobile";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "AuoFleet",
  description:
    "AutoFleet is an application for vehicle management and services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <HeaderMobile />
        <VehicleProvider> {children}</VehicleProvider>
      </body>
    </html>
  );
}
