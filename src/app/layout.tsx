import type { Metadata } from "next";
import "./globals.css";
import { errorFont, primaryFont } from "@/shared/assets/fonts";
import { Toaster } from "sonner";
import ProviderContainer from "@/shared/components/containers/provider-container/ProviderContainer";

export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Teslo App",
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
