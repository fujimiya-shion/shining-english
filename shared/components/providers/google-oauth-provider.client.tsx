"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

type GoogleOAuthProviderClientProps = {
  clientId: string;
  children: ReactNode;
};

export function GoogleOAuthProviderClient({
  clientId,
  children,
}: GoogleOAuthProviderClientProps) {
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}
