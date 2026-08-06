import React, { createContext, useContext, ReactNode } from "react";
import { TenantConfig, tenantConfig } from "./tenant";

// Create the context with a default value (useful for SSR or before provider loads, though we'll wrap the app)
const TenantContext = createContext<TenantConfig>(tenantConfig);

// Hook to easily use the tenant config anywhere in the app
export function useTenant() {
  return useContext(TenantContext);
}

// Provider component to wrap the application
export function TenantProvider({
  children,
  config = tenantConfig, // Default to our Lunfardo config
}: {
  children: ReactNode;
  config?: TenantConfig;
}) {
  return <TenantContext.Provider value={config}>{children}</TenantContext.Provider>;
}
