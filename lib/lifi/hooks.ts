// STEP 3: Li.Fi SDK Hooks
// Custom React hooks for interacting with Li.Fi SDK
// TODO: After installing @lifi/sdk, uncomment and use these hooks

import { useState, useEffect } from 'react';
import type { Chain, Token } from '@/lib/mockData';
import { formatLiFiChain, formatLiFiToken } from './utils';
// import { lifi } from './config';

// Hook to fetch available chains from Li.Fi
export function useLiFiChains() {
  const [chains, setChains] = useState<Chain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // TODO: Uncomment after installing @lifi/sdk
    // const fetchChains = async () => {
    //   try {
    //     setLoading(true);
    //     const chainsData = await lifi.getChains();
    //     const formattedChains = chainsData.map(formatLiFiChain);
    //     setChains(formattedChains);
    //     setError(null);
    //   } catch (err) {
    //     setError(err as Error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchChains();
    
    // Placeholder for now
    setLoading(false);
  }, []);

  return { chains, loading, error };
}

// Hook to fetch available tokens for a specific chain
export function useLiFiTokens(chainId?: string) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!chainId) {
      setTokens([]);
      return;
    }

    // TODO: Uncomment after installing @lifi/sdk
    // const fetchTokens = async () => {
    //   try {
    //     setLoading(true);
    //     const tokensData = await lifi.getTokens({ chainIds: [parseInt(chainId)] });
    //     const formattedTokens = tokensData.tokens.map((token: any) => 
    //       formatLiFiToken(token)
    //     );
    //     setTokens(formattedTokens);
    //     setError(null);
    //   } catch (err) {
    //     setError(err as Error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchTokens();
    
    // Placeholder for now
    setLoading(false);
  }, [chainId]);

  return { tokens, loading, error };
}

// Hook to get a quote for a bridge transaction
export function useLiFiQuote() {
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getQuote = async (params: {
    fromChain: string;
    toChain: string;
    fromToken: string;
    toToken: string;
    fromAmount: string;
  }) => {
    // TODO: Uncomment after installing @lifi/sdk
    // try {
    //   setLoading(true);
    //   setError(null);
    //   const quoteData = await lifi.getQuote({
    //     fromChain: parseInt(params.fromChain),
    //     toChain: parseInt(params.toChain),
    //     fromToken: params.fromToken,
    //     toToken: params.toToken,
    //     fromAmount: params.fromAmount,
    //   });
    //   setQuote(quoteData);
    //   return quoteData;
    // } catch (err) {
    //   setError(err as Error);
    //   throw err;
    // } finally {
    //   setLoading(false);
    // }
    
    // Placeholder for now
    setLoading(false);
    return null;
  };

  return { quote, loading, error, getQuote };
}

// Hook to execute a bridge transaction
export function useLiFiExecute() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const execute = async (route: any, signer: any) => {
    // TODO: Uncomment after installing @lifi/sdk
    // try {
    //   setLoading(true);
    //   setError(null);
    //   const result = await lifi.executeRoute(signer, route);
    //   setTxHash(result.txHash);
    //   return result;
    // } catch (err) {
    //   setError(err as Error);
    //   throw err;
    // } finally {
    //   setLoading(false);
    // }
    
    // Placeholder for now
    setLoading(false);
    return null;
  };

  return { loading, error, txHash, execute };
}


