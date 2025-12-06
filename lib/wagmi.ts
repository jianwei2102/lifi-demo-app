// STEP 3: Wallet Configuration
// This file sets up wagmi for wallet connections
// TODO: After installing wagmi and viem, uncomment and configure

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

// WalletConnect is optional - you can skip it and just use injected() and metaMask()
// If you want WalletConnect later, uncomment and add project ID:
// import { walletConnect } from "wagmi/connectors";
// const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

// TODO: Uncomment after installing wagmi
// export const wagmiConfig = createConfig({
//   chains: [mainnet, arbitrum, optimism, polygon, base, avalanche, bsc],
//   connectors: [
//     injected(), // Works with any injected wallet (MetaMask, Brave, etc.)
//     metaMask(), // Specifically for MetaMask
//     // walletConnect({ projectId }), // Optional: Uncomment if you want WalletConnect
//   ],
//   transports: {
//     [mainnet.id]: http(),
//     [arbitrum.id]: http(),
//     [optimism.id]: http(),
//     [polygon.id]: http(),
//     [base.id]: http(),
//     [avalanche.id]: http(),
//     [bsc.id]: http(),
//   },
// });
