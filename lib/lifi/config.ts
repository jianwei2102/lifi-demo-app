// ============================================================================
// STEP 3: Li.Fi SDK Configuration
// ============================================================================
// This file configures the Li.Fi SDK for use throughout the application.
// SDK v3 uses createConfig() instead of instantiating a class.
//
// Tutorial Steps:
// 1. Install @lifi/sdk package
// 2. Uncomment the imports below
// 3. Uncomment the initializeLiFiSDK function
// 4. Replace "Your-integrator-name" with your actual app name
// 5. Add your API key to .env.local (optional but recommended)
// ============================================================================

// STEP 3.1: Import Li.Fi SDK
// TODO: Uncomment after installing @lifi/sdk
import { createConfig, EVM } from "@lifi/sdk";
import { wagmiConfig } from "@/lib/wagmi";

// STEP 3.2: Track if SDK is already configured (prevents duplicate initialization)
let isConfigured = false;

// STEP 3.3: Initialize Li.Fi SDK Configuration
// TODO: Uncomment after installing @lifi/sdk
export function initializeLiFiSDK() {
  if (isConfigured) {
    return; // Already configured, skip
  }

  createConfig({
    // Replace with your actual app/company name (max 23 chars, alphanumeric, hyphens, underscores, dots only)
    integrator: "Your-integrator-name",

    // Optional: Add API key for higher rate limits
    // Get your API key from: https://li.fi/products/api
    apiKey: process.env.NEXT_PUBLIC_LIFI_API_KEY,

    // STEP 3.4: Configure EVM Provider
    // This connects Li.Fi SDK to your wallet (via wagmi)
    providers: [
      EVM({
        // Get wallet client from wagmi
        getWalletClient: async () => {
          const { getWalletClient, getAccount } = await import("wagmi/actions");
          const account = getAccount(wagmiConfig);

          if (!account.isConnected || !account.address) {
            throw new Error("Wallet is not connected");
          }

          const walletClient = await getWalletClient(wagmiConfig);
          if (!walletClient) {
            throw new Error("Failed to get wallet client");
          }

          return walletClient;
        },

        // Switch chain using wagmi
        switchChain: async (chainId: number) => {
          const { switchChain, getWalletClient, getAccount } = await import(
            "wagmi/actions"
          );

          const account = getAccount(wagmiConfig);
          if (!account.isConnected || !account.address) {
            throw new Error("Wallet is not connected");
          }

          // Type assertion needed because LiFi supports more chains than wagmi's predefined list
          await switchChain(wagmiConfig, {
            chainId: chainId as unknown as
              | 1
              | 10
              | 56
              | 42161
              | 137
              | 8453
              | 43114,
          });

          const walletClient = await getWalletClient(wagmiConfig, {
            chainId: chainId as unknown as
              | 1
              | 10
              | 56
              | 42161
              | 137
              | 8453
              | 43114,
          });

          if (!walletClient) {
            throw new Error("Failed to get wallet client after chain switch");
          }

          return walletClient;
        },
      }),
    ],
  });

  isConfigured = true;
}

// STEP 3.5: Auto-initialize SDK on client-side
// TODO: Uncomment after installing @lifi/sdk
if (typeof window !== "undefined") {
  try {
    initializeLiFiSDK();
    console.log("✅ Li.Fi SDK initialized with EVM provider");
  } catch (error) {
    // Silently handle initialization errors (expected if wallet not connected)
    if (
      error instanceof Error &&
      !error.message.includes("Wallet is not connected")
    ) {
      console.error("❌ Failed to initialize Li.Fi SDK:", error);
    }
  }

  // Handle unhandled promise rejections from MetaMask SDK
  window.addEventListener("unhandledrejection", (event) => {
    const error = event.reason;
    if (
      error?.message?.includes("Cannot read properties of undefined") ||
      error?.message?.includes("reading 'on'") ||
      error?.stack?.includes("MetaMaskSDK")
    ) {
      event.preventDefault(); // Prevent error from showing in console
      console.log(
        "ℹ️ MetaMask SDK initialization warning (can be safely ignored)"
      );
    }
  });
}
