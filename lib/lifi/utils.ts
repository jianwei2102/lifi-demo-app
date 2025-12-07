// STEP 3: Li.Fi Utility Functions
// Helper functions for formatting and working with Li.Fi data

import type { Chain, Token } from "@/lib/mockData";

// Convert Li.Fi chain format to our Chain interface
// Using Record type for flexibility since exact Li.Fi types may not match our usage
export function formatLiFiChain(lifiChain: Record<string, unknown>): Chain {
  const chainId =
    typeof lifiChain.id === "number"
      ? lifiChain.id
      : parseInt(String(lifiChain.id || "0"));
  const metadata = lifiChain.metadata as Record<string, unknown> | undefined;
  return {
    id: String(lifiChain.id || ""), // Store as string for compatibility, but keep numeric ID accessible
    name: String(lifiChain.name || ""),
    icon: getChainIcon(chainId),
    color: (metadata?.color as string) || "#627EEA",
    logoURI: (lifiChain.logoURI as string) || (metadata?.logoURI as string), // Include chain image URL from LiFi
  };
}

// Convert Li.Fi token format to our Token interface
// Using Record type for flexibility since exact Li.Fi types may not be exported
export function formatLiFiToken(
  lifiToken: Record<string, unknown>,
  balance?: string
): Token {
  // Use address as ID to ensure uniqueness (multiple tokens can have same symbol)
  const address = lifiToken.address as string | undefined;
  const symbol = lifiToken.symbol as string | undefined;
  const tokenId = address?.toLowerCase() || symbol || "unknown";

  return {
    id: tokenId,
    symbol: symbol || "",
    name: (lifiToken.name as string) || "",
    icon: getTokenIcon(symbol || ""),
    balance: balance || "0.00",
    logoURI: lifiToken.logoURI as string | undefined, // Include token image URL from LiFi
  };
}

// Get chain icon emoji based on chain ID
function getChainIcon(chainId: number): string {
  const iconMap: Record<number, string> = {
    1: "⟠", // Ethereum
    42161: "◆", // Arbitrum
    10: "✨", // Optimism
    137: "◬", // Polygon
    8453: "🔵", // Base
    43114: "▲", // Avalanche
    56: "◆", // BNB Chain
  };
  return iconMap[chainId] || "●";
}

// Get token icon emoji based on symbol
function getTokenIcon(symbol: string): string {
  const iconMap: Record<string, string> = {
    ETH: "⟠",
    USDC: "💵",
    USDT: "₮",
    DAI: "◈",
    WBTC: "₿",
    ARB: "◆",
    OP: "✨",
    MATIC: "◬",
  };
  return iconMap[symbol.toUpperCase()] || "●";
}

// Format token amount for display with higher precision for small amounts
export function formatTokenAmount(
  amount: string,
  decimals: number = 18
): string {
  const num = parseFloat(amount) / Math.pow(10, decimals);

  // Use more decimal places for small amounts
  if (num === 0) {
    return "0.00";
  } else if (num < 0.000001) {
    // For very small amounts, show up to 12 decimal places
    return num.toFixed(12).replace(/\.?0+$/, ""); // Remove trailing zeros
  } else if (num < 0.01) {
    // For small amounts, show up to 10 decimal places
    return num.toFixed(10).replace(/\.?0+$/, ""); // Remove trailing zeros
  } else if (num < 1) {
    // For amounts less than 1, show up to 8 decimal places
    return num.toFixed(8).replace(/\.?0+$/, ""); // Remove trailing zeros
  } else {
    // For larger amounts, show 6 decimal places
    return num.toFixed(6).replace(/\.?0+$/, ""); // Remove trailing zeros
  }
}

// Parse token amount from display format
export function parseTokenAmount(
  amount: string,
  decimals: number = 18
): string {
  const num = parseFloat(amount) * Math.pow(10, decimals);
  return Math.floor(num).toString();
}
