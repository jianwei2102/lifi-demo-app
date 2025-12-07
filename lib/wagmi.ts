// ============================================================================
// STEP 2: Wallet Configuration
// ============================================================================
// This file sets up wagmi for wallet connections
//
// Tutorial Steps:
// 1. Install wagmi and viem packages
// 2. Uncomment the imports below
// 3. Uncomment the wagmiConfig export
// 4. Configure your chains and connectors
// ============================================================================

// STEP 2.1: Import wagmi and chains
// TODO: Uncomment after installing wagmi
// import { createConfig, http } from "wagmi";
// import {
//   mainnet,
//   arbitrum,
//   optimism,
//   polygon,
//   base,
//   avalanche,
//   bsc,
// } from "wagmi/chains";
// import { injected, metaMask } from "wagmi/connectors";

// STEP 2.2: Helper function to get connectors
// Only initialize MetaMask connector on client side to avoid SSR/build errors
// TODO: Uncomment after installing wagmi
/*
const getConnectors = () => {
  if (typeof window === "undefined") {
    // Server-side: only use injected connector (safer for SSR)
    return [injected()];
  }
  // Client-side: use both injected and MetaMask connectors
  return [
    injected(), // Works with any injected wallet (MetaMask, Brave, etc.)
    metaMask(), // Specifically for MetaMask
    // walletConnect({ projectId }), // Optional: Uncomment if you want WalletConnect
  ];
};
*/

// STEP 2.3: Create wagmi configuration
// TODO: Uncomment after installing wagmi
/*
export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrum, optimism, polygon, base, avalanche, bsc],
  connectors: getConnectors(),
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [avalanche.id]: http(),
    [bsc.id]: http(),
  },
  // Disable auto-reconnect to prevent MetaMask popup on refresh
  ssr: false,
});
*/

// Placeholder export (for tutorial - comment out when uncommenting above)
export const wagmiConfig = null as any;
