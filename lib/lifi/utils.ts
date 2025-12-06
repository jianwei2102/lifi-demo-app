// STEP 3: Li.Fi Utility Functions
// Helper functions for formatting and working with Li.Fi data

import type { Chain, Token } from '@/lib/mockData';

// Convert Li.Fi chain format to our Chain interface
export function formatLiFiChain(lifiChain: any): Chain {
  return {
    id: lifiChain.id.toString(),
    name: lifiChain.name,
    icon: getChainIcon(lifiChain.id),
    color: lifiChain.metadata?.color || '#627EEA',
  };
}

// Convert Li.Fi token format to our Token interface
export function formatLiFiToken(lifiToken: any, balance?: string): Token {
  return {
    id: lifiToken.address.toLowerCase(),
    symbol: lifiToken.symbol,
    name: lifiToken.name,
    icon: getTokenIcon(lifiToken.symbol),
    balance: balance || '0.00',
  };
}

// Get chain icon emoji based on chain ID
function getChainIcon(chainId: number): string {
  const iconMap: Record<number, string> = {
    1: '⟠', // Ethereum
    42161: '◆', // Arbitrum
    10: '✨', // Optimism
    137: '◬', // Polygon
    8453: '🔵', // Base
    43114: '▲', // Avalanche
    56: '◆', // BNB Chain
  };
  return iconMap[chainId] || '●';
}

// Get token icon emoji based on symbol
function getTokenIcon(symbol: string): string {
  const iconMap: Record<string, string> = {
    ETH: '⟠',
    USDC: '💵',
    USDT: '₮',
    DAI: '◈',
    WBTC: '₿',
    ARB: '◆',
    OP: '✨',
    MATIC: '◬',
  };
  return iconMap[symbol.toUpperCase()] || '●';
}

// Format token amount for display
export function formatTokenAmount(amount: string, decimals: number = 18): string {
  const num = parseFloat(amount) / Math.pow(10, decimals);
  return num.toFixed(6);
}

// Parse token amount from display format
export function parseTokenAmount(amount: string, decimals: number = 18): string {
  const num = parseFloat(amount) * Math.pow(10, decimals);
  return Math.floor(num).toString();
}

