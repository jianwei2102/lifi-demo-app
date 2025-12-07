"use client";

// STEP 3: Wagmi Provider
// This provider wraps the app to enable wallet functionality
// TODO: After installing wagmi, uncomment and use this provider

// TODO: Uncomment after installing wagmi
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/wagmi";

// STEP 3: Create QueryClient with proper SSR configuration to avoid hydration errors
// This pattern prevents the "getServerSnapshot should be cached" error
// TODO: Uncomment after installing wagmi
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: use singleton pattern to keep the same query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  // TODO: Uncomment after installing wagmi
  const queryClient = getQueryClient();

  // TODO: Uncomment after installing wagmi
  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );

  // Placeholder
  return <>{children}</>;
}
