'use client';

// STEP 1 & 3: Wagmi Provider
// This provider wraps the app to enable wallet functionality
// TODO: After installing wagmi, uncomment and use this provider

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { wagmiConfig } from '@/lib/wagmi';

// TODO: Uncomment after installing wagmi
// const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  // TODO: Wrap with WagmiProvider after installing wagmi
  // return (
  //   <WagmiProvider config={wagmiConfig}>
  //     <QueryClientProvider client={queryClient}>
  //       {children}
  //     </QueryClientProvider>
  //   </WagmiProvider>
  // );

  // Placeholder for now
  return <>{children}</>;
}

