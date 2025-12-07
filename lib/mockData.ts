export interface Chain {
  id: string;
  name: string;
  icon: string;
  color: string;
  logoURI?: string;
}

export interface Token {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  balance?: string;
  logoURI?: string;
}

export const mockChains: Chain[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "⟠",
    color: "#627EEA",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    icon: "◆",
    color: "#28A0F0",
  },
  {
    id: "optimism",
    name: "Optimism",
    icon: "✨",
    color: "#FF0420",
  },
  {
    id: "polygon",
    name: "Polygon",
    icon: "◬",
    color: "#8247E5",
  },
  {
    id: "base",
    name: "Base",
    icon: "🔵",
    color: "#0052FF",
  },
  {
    id: "avalanche",
    name: "Avalanche",
    icon: "▲",
    color: "#E84142",
  },
  {
    id: "bsc",
    name: "BNB Chain",
    icon: "◆",
    color: "#F3BA2F",
  },
  {
    id: "solana",
    name: "Solana",
    icon: "◎",
    color: "#14F195",
  },
];

export const mockTokens: Token[] = [
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    icon: "⟠",
    balance: "2.45",
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    icon: "💵",
    balance: "1,250.00",
  },
  {
    id: "usdt",
    symbol: "USDT",
    name: "Tether USD",
    icon: "₮",
    balance: "850.50",
  },
  {
    id: "dai",
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "◈",
    balance: "500.00",
  },
  {
    id: "wbtc",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    icon: "₿",
    balance: "0.125",
  },
  {
    id: "arb",
    symbol: "ARB",
    name: "Arbitrum",
    icon: "◆",
    balance: "1,500.00",
  },
  {
    id: "op",
    symbol: "OP",
    name: "Optimism",
    icon: "✨",
    balance: "750.00",
  },
  {
    id: "matic",
    symbol: "MATIC",
    name: "Polygon",
    icon: "◬",
    balance: "3,200.00",
  },
];
