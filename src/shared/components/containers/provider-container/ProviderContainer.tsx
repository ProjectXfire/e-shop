"use client";

import { Toaster } from "sonner";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { env } from "@/shared/config/env.config";

interface Props {
  children: React.ReactNode;
}

function ProviderContainer({ children }: Props): React.ReactElement {
  return (
    <>
      <Toaster richColors />
      <PayPalScriptProvider options={{ clientId: env.paypalClientId }}>
        {children}
      </PayPalScriptProvider>
    </>
  );
}
export default ProviderContainer;
