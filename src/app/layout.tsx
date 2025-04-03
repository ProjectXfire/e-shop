import type { Metadata } from "next";
import "./globals.css";
import { errorFont, primaryFont } from "@/shared/assets/fonts";
import ProviderContainer from "@/shared/components/containers/provider-container/ProviderContainer";

export const metadata: Metadata = {
  title: { template: "%s E-Shop", default: "E-Shop" },
  description: "E-Shop App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${primaryFont.variable} ${errorFont.variable} antialiased`}>
        <ProviderContainer>{children}</ProviderContainer>
      </body>
    </html>
  );
}
