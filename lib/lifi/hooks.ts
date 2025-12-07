// ============================================================================
// STEP 3: Li.Fi SDK Hooks
// ============================================================================
// Custom React hooks for interacting with Li.Fi SDK
// SDK v3 uses direct imports instead of instance methods
//
// Tutorial Steps:
// 1. Install @lifi/sdk package
// 2. Uncomment the imports below
// 3. Uncomment each hook function as you need them
// ============================================================================

// STEP 3.1: Import dependencies
// TODO: Uncomment after installing @lifi/sdk
import { useState, useEffect, useCallback } from "react";
import type { Chain, Token } from "@/lib/mockData";
import { formatLiFiChain, formatLiFiToken } from "./utils";
import { initializeLiFiSDK } from "./config";

// ============================================================================
// Hook 1: Fetch Available Chains
// ============================================================================
// STEP 3.2: Uncomment this hook to fetch chains from Li.Fi
// TODO: Uncomment after installing @lifi/sdk
export function useLiFiChains() {
  const [chains, setChains] = useState<Chain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchChains = async () => {
      try {
        setLoading(true);
        initializeLiFiSDK();

        const { getChains } = await import("@lifi/sdk");
        const chainsData = await getChains();

        const formattedChains = chainsData.map(formatLiFiChain);
        setChains(formattedChains);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching chains:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchChains();
  }, []);

  return { chains, loading, error };
}

// ============================================================================
// Hook 2: Fetch Tokens for a Chain
// ============================================================================
// STEP 3.3: Uncomment this hook to fetch tokens for a specific chain
// TODO: Uncomment after installing @lifi/sdk
export function useLiFiTokens(chainId?: string) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!chainId) {
      setTokens([]);
      return;
    }

    const fetchTokens = async () => {
      try {
        setLoading(true);
        initializeLiFiSDK();

        const { getTokens } = await import("@lifi/sdk");
        const chainIdNum = parseInt(chainId);

        // Validate chain ID is numeric
        if (isNaN(chainIdNum) || chainIdNum <= 0) {
          setTokens([]);
          setError(null);
          setLoading(false);
          return;
        }

        const tokensData = await getTokens({ chains: [chainIdNum] });
        const chainTokens = tokensData.tokens[chainIdNum] || [];
        const formattedTokens = chainTokens.map((token: any) =>
          formatLiFiToken(token)
        );

        setTokens(formattedTokens);
        setError(null);
      } catch (err) {
        console.error(`❌ Error fetching tokens for chain ${chainId}:`, err);
        setError(err as Error);
        setTokens([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, [chainId]);

  return { tokens, loading, error };
}

// ============================================================================
// Hook 3: Get Quote for Bridge Transaction
// ============================================================================
// STEP 3.4: Uncomment this hook to get quotes for bridge transactions
// TODO: Uncomment after installing @lifi/sdk
export function useLiFiQuote() {
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearQuote = () => {
    setQuote(null);
    setError(null);
  };

  const getQuote = async (params: {
    fromChain: number;
    toChain: number;
    fromToken: string; // Token symbol (e.g., 'USDC') or address
    toToken: string; // Token symbol (e.g., 'DAI') or address
    fromAmount: string; // Amount in smallest unit (wei for ETH)
    fromAddress?: string;
    slippage?: number; // Optional slippage (default: 0.005 = 0.5%)
  }) => {
    try {
      setLoading(true);
      setError(null);
      const { getQuote } = await import("@lifi/sdk");

      const quoteParams: any = {
        fromChain: params.fromChain,
        toChain: params.toChain,
        fromToken: params.fromToken,
        toToken: params.toToken,
        fromAmount: params.fromAmount,
        slippage: params.slippage ?? 0.005, // Default 0.5% slippage
      };

      // Include fromAddress if provided (recommended for better quotes)
      if (params.fromAddress) {
        quoteParams.fromAddress = params.fromAddress;
      }

      const quoteData = await getQuote(quoteParams);
      setQuote(quoteData);
      setError(null);
      return quoteData;
    } catch (err: unknown) {
      const error = err as { status?: number; message?: string; name?: string };
      const errorMessage = error?.message?.toLowerCase() || "";

      // Handle 404 errors (no quotes available) gracefully
      if (
        error?.status === 404 ||
        errorMessage.includes("404") ||
        errorMessage.includes("not found") ||
        errorMessage.includes("no available quotes")
      ) {
        setError(new Error("No available quotes for the requested transfer"));
        setQuote(null);
        return null;
      }

      const errorObj = err as Error;
      setError(errorObj);
      console.error("❌ Error fetching quote:", errorObj);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { quote, loading, error, getQuote, clearQuote };
}

// ============================================================================
// Hook 4: Execute Bridge Transaction
// ============================================================================
// STEP 3.5: Uncomment this hook to execute bridge transactions
// TODO: Uncomment after installing @lifi/sdk
export function useLiFiExecute() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const execute = async (
    quote: any,
    updateRouteHook?: (route: any) => void
  ) => {
    try {
      setLoading(true);
      setError(null);
      const { convertQuoteToRoute, executeRoute } = await import("@lifi/sdk");

      // Convert quote to route
      const route = await convertQuoteToRoute(quote);

      // Execute the route
      const result = await executeRoute(route, {
        updateRouteHook: updateRouteHook || (() => {}),
        async acceptExchangeRateUpdateHook() {
          // Accept exchange rate updates by default
          return true;
        },
      });

      // Extract transaction hash from result
      if (result.steps && result.steps.length > 0) {
        const firstStep = result.steps[0];
        if (
          firstStep.execution?.process &&
          firstStep.execution.process.length > 0
        ) {
          const latestProcess =
            firstStep.execution.process[firstStep.execution.process.length - 1];
          if (latestProcess?.txHash) {
            setTxHash(latestProcess.txHash);
          }
        }
      }
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, txHash, execute };
}

// ============================================================================
// Hook 5: Get Token Balance
// ============================================================================
// STEP 3.6: Uncomment this hook to get token balances
// TODO: Uncomment after installing @lifi/sdk
export function useLiFiTokenBalance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Memoize function to prevent infinite loops
  const getBalance = useCallback(
    async (address: string, chainId: number, tokenSymbol: string) => {
      try {
        setLoading(true);
        setError(null);
        const { getToken, getTokenBalance } = await import("@lifi/sdk");

        // Get token info first
        let token;
        try {
          token = await getToken(chainId, tokenSymbol);
        } catch (tokenError: unknown) {
          // Handle 404 errors (token not found) gracefully
          const error = tokenError as {
            status?: number;
            message?: string;
          };
          if (
            error?.status === 404 ||
            error?.message?.toLowerCase().includes("not found")
          ) {
            return null; // Token not found on this chain
          }
          throw tokenError;
        }

        // Get balance
        const balance = await getTokenBalance(address, token);

        if (!balance) {
          return null;
        }

        // Format balance using token decimals
        const { formatTokenAmount } = await import("./utils");
        const formattedBalance = formatTokenAmount(
          String(balance.amount || "0"),
          token.decimals
        );

        return formattedBalance;
      } catch (err: unknown) {
        // Handle errors gracefully
        const error = err as {
          status?: number;
          message?: string;
        };
        if (
          error?.status === 404 ||
          error?.message?.toLowerCase().includes("not found")
        ) {
          return null; // Token not found
        }
        console.error(`❌ Error fetching balance:`, err);
        setError(err as Error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, getBalance };
}
