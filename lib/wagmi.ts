// STEP 1 & 3: Wallet Configuration
// This file sets up wagmi for wallet connections
// TODO: After installing wagmi and viem, uncomment and configure

import { createConfig, http } from 'wagmi';
import { mainnet, arbitrum, optimism, polygon, base, avalanche, bsc } from 'wagmi/chains';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';

// TODO: Add your WalletConnect project ID
// Get one from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrum, optimism, polygon, base, avalanche, bsc],
  connectors: [
    injected(),
    metaMask(),
    // walletConnect({ projectId }), // Uncomment after adding project ID
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [avalanche.id]: http(),
    [bsc.id]: http(),
  },
});

// For now, export a placeholder config
export const wagmiConfigPlaceholder = null;

