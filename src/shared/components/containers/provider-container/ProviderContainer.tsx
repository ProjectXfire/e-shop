"use client";

import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

function ProviderContainer({ children }: Props): React.ReactElement {
  return (
    <>
      <Toaster richColors />
      {children}
    </>
  );
}
export default ProviderContainer;
