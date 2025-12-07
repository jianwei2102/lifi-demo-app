// ============================================================================
// STEP 2: Wallet Hook
// ============================================================================
// This hook provides wallet connection functionality using wagmi
//
// Tutorial Steps:
// 1. Install wagmi and viem packages
// 2. Uncomment the imports below
// 3. Uncomment the hook implementation
// ============================================================================

// STEP 2.1: Import wagmi hooks
// TODO: Uncomment after installing wagmi
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";

export function useWallet() {
  // STEP 2.2: Use wagmi hooks
  // TODO: Uncomment after installing wagmi
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  // STEP 2.3: Return wallet data
  // TODO: Uncomment after installing wagmi
  return {
    address,
    isConnected,
    chain,
    connect,
    connectors,
    isPending,
    disconnect,
    balance: balance?.formatted,
  };

  // Placeholder (for tutorial - comment out when uncommenting above)
  // return {
  //   address: undefined,
  //   isConnected: false,
  //   chain: undefined,
  //   connect: () => {},
  //   connectors: [],
  //   isPending: false,
  //   disconnect: () => {},
  //   balance: undefined,
  // };
}
