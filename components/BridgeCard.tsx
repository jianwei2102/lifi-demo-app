"use client";

// STEP 3: SDK Integration
// This component uses Li.Fi SDK to fetch real chain/token data and execute bridges
// TODO: After installing @lifi/sdk, uncomment the hooks and integrate them

import { useState, useEffect, useRef } from "react";
import { Chain, Token, mockChains, mockTokens } from "@/lib/mockData";
import ChainSelector from "./ChainSelector";
import TokenSelector from "./TokenSelector";
// TODO: Uncomment after installing @lifi/sdk
/*
import {
  useLiFiChains,
  useLiFiTokens,
  useLiFiQuote,
  useLiFiExecute,
  useLiFiTokenBalance,
} from "@/lib/lifi/hooks";
*/
// TODO: Uncomment after installing wagmi (Step 3)
// import { useWallet } from "@/hooks/useWallet";
// TODO: Uncomment after installing @lifi/sdk
// import { parseTokenAmount } from "@/lib/lifi/utils";
// Import Li.Fi SDK types
// TODO: Uncomment after installing @lifi/sdk
// import type { RouteExtended, LiFiStepExtended } from "@lifi/sdk";

// Define Quote type based on Li.Fi SDK structure (used for type safety in quoteDetails)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Quote = {
  estimate?: {
    toAmount?: string;
    toAmountUSD?: string;
    fromAmountUSD?: string;
    gasCosts?: Array<{ amountUSD?: string }>;
    executionDuration?: number;
  };
  action?: {
    fromToken?: { symbol?: string; decimals?: number };
    toToken?: { symbol?: string; decimals?: number; logoURI?: string };
    fromAmount?: string;
  };
  toolDetails?: {
    name?: string;
    logoURI?: string;
  };
  tool?: string;
};

export default function BridgeCard() {
  // Initialize state first before using in hooks
  const [fromChain, setFromChain] = useState<Chain>(mockChains[0]);
  const [toChain, setToChain] = useState<Chain>(mockChains[1]);
  const [fromToken, setFromToken] = useState<Token>(mockTokens[0]);
  const [toToken, setToToken] = useState<Token>(mockTokens[0]);

  // STEP 3: Use Li.Fi hooks to fetch real data
  // TODO: Uncomment after installing @lifi/sdk
  /*
  const { chains: lifiChains, error: chainsError } = useLiFiChains();
  const { tokens: lifiFromTokens, error: fromTokensError } = useLiFiTokens(
    fromChain.id
  );
  const { tokens: lifiToTokens, error: toTokensError } = useLiFiTokens(
    toChain.id
  );
  */

  // Use Li.Fi chains when available, fallback to mock chains
  // TODO: Uncomment after installing @lifi/sdk
  const availableChains = mockChains; // lifiChains.length > 0 ? lifiChains : mockChains;
  const availableFromTokens = mockTokens; // lifiFromTokens.length > 0 ? lifiFromTokens : mockTokens;
  const availableToTokens = mockTokens; // lifiToTokens.length > 0 ? lifiToTokens : mockTokens;

  // STEP 3: Debug logging for chains and tokens
  // TODO: Uncomment after installing @lifi/sdk
  /*
  useEffect(() => {
    if (chainsError) {
      console.error("❌ Chains error:", chainsError);
    }
    if (fromTokensError) {
      console.error("❌ From tokens error:", fromTokensError);
    }
    if (toTokensError) {
      console.error("❌ To tokens error:", toTokensError);
    }
    if (lifiChains.length > 0) {
      console.log(`✅ Loaded ${lifiChains.length} chains from Li.Fi`);
    }
    if (lifiFromTokens.length > 0) {
      console.log(
        `✅ Loaded ${lifiFromTokens.length} tokens for from chain ${fromChain.id}`
      );
    }
    if (lifiToTokens.length > 0) {
      console.log(
        `✅ Loaded ${lifiToTokens.length} tokens for to chain ${toChain.id}`
      );
    }
  }, [
    chainsError,
    fromTokensError,
    toTokensError,
    lifiChains.length,
    lifiFromTokens.length,
    lifiToTokens.length,
    fromChain.id,
    toChain.id,
  ]);
  */
  // STEP 3: Li.Fi hooks for quotes, execution, and balance
  // TODO: Uncomment after installing @lifi/sdk
  /*
  const {
    quote,
    loading: quoteLoading,
    error: quoteError,
    getQuote,
    clearQuote,
  } = useLiFiQuote();
  const { execute } = useLiFiExecute();
  */
  // TODO: Uncomment after installing wagmi (Step 3)
  // const { address, isConnected } = useWallet();
  // TODO: Uncomment after installing @lifi/sdk
  // const { getBalance: getTokenBalance } = useLiFiTokenBalance();
  
  // Placeholder values for tutorial mode
  const quote = null;
  const quoteLoading = false;
  const quoteError = null;
  const address = "";
  const isConnected = false;

  // State for token balance
  const [tokenBalance, setTokenBalance] = useState<string>("0.00");

  // Tooltip state for transaction notifications
  const [tooltip, setTooltip] = useState<{
    message: string;
    type: "loading" | "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  // State to trigger balance refresh after transaction
  const [balanceRefreshTrigger, setBalanceRefreshTrigger] = useState(0);

  // Refs to prevent duplicate requests and track debounce
  const quoteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isQuoteRequestInProgressRef = useRef<boolean>(false);
  const lastQuoteParamsRef = useRef<string>("");

  const [amount, setAmount] = useState("");
  const [showFromChainModal, setShowFromChainModal] = useState(false);
  const [showToChainModal, setShowToChainModal] = useState(false);
  const [showFromTokenModal, setShowFromTokenModal] = useState(false);
  const [showToTokenModal, setShowToTokenModal] = useState(false);

  // STEP 3: Update chains when Li.Fi data is loaded
  // TODO: Uncomment after installing @lifi/sdk
  /*
  useEffect(() => {
    if (lifiChains.length > 0) {
      // Check if we're using mock data (string IDs) or if chain ID is not numeric
      const isUsingMockData =
        mockChains.some((mc) => mc.id === fromChain.id) ||
        isNaN(parseInt(fromChain.id));

      if (isUsingMockData) {
        console.log("🔄 Switching from mock chains to Li.Fi chains");
        // Find Ethereum mainnet (chain ID 1) or use first available chain
        const ethereumChain = lifiChains.find((c) => parseInt(c.id) === 1);
        const firstChain = ethereumChain || lifiChains[0];
        const secondChain =
          lifiChains.find((c) => parseInt(c.id) === 42161) || // Arbitrum
          lifiChains.find((c) => parseInt(c.id) === 8453) || // Base
          lifiChains[1] ||
          firstChain;

        setFromChain(firstChain);
        setToChain(secondChain);
      }
    }
  }, [lifiChains]); // eslint-disable-line react-hooks/exhaustive-deps
  */

  // STEP 3: Update from tokens when from chain changes
  // TODO: Uncomment after installing @lifi/sdk
  /*
  useEffect(() => {
    if (lifiFromTokens.length > 0) {
      // Only update if we're still using mock data or token doesn't match current chain
      const currentTokenInList = lifiFromTokens.find(
        (t) => t.id === fromToken.id
      );
      if (!currentTokenInList) {
        setFromToken(lifiFromTokens[0]);
      }
    }
  }, [lifiFromTokens, fromChain.id]); // eslint-disable-line react-hooks/exhaustive-deps
  */

  // STEP 3: Update to tokens when to chain changes
  // TODO: Uncomment after installing @lifi/sdk
  /*
  useEffect(() => {
    if (lifiToTokens.length > 0) {
      // Only update if we're still using mock data or token doesn't match current chain
      const currentTokenInList = lifiToTokens.find((t) => t.id === toToken.id);
      if (!currentTokenInList) {
        setToToken(lifiToTokens[0]);
      }
    }
  }, [lifiToTokens, toChain.id]); // eslint-disable-line react-hooks/exhaustive-deps
  */

  // STEP 3: Fetch token balance when address, chain, token changes, or after transaction
  // TODO: Uncomment after installing @lifi/sdk and wagmi (Step 3)
  /*
  useEffect(() => {
    const fetchBalance = async () => {
      // Skip if LiFi chains haven't loaded yet (we need numeric chain IDs)
      // This prevents warnings about invalid chain IDs during initial load
      if (lifiChains.length === 0) {
        setTokenBalance("0.00");
        return;
      }

      if (!address || !isConnected || !fromToken || !fromChain.id) {
        setTokenBalance("0.00");
        return;
      }

      try {
        const chainIdNum = parseInt(fromChain.id);
        if (isNaN(chainIdNum) || chainIdNum <= 0) {
          // Silently skip if chain ID is not numeric (likely mock data or still loading)
          // This is expected during initial load before LiFi chains are available
          setTokenBalance("0.00");
          return;
        }

        const balance = await getTokenBalance(
          address,
          chainIdNum,
          fromToken.symbol
        );

        if (balance) {
          setTokenBalance(balance);
        } else {
          setTokenBalance("0.00");
        }
      } catch (error) {
        // Silently handle errors - they're expected if wallet isn't connected or token doesn't exist
        setTokenBalance("0.00");
        console.log("❌ Error fetching token balance:", error);
      }
    };

    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    isConnected,
    fromToken?.symbol,
    fromChain.id,
    balanceRefreshTrigger, // Trigger refresh after transaction
    lifiChains.length, // Wait for LiFi chains to load before fetching balance
    getTokenBalance, // This is now memoized with useCallback, so it's stable
  ]);
  */

  // Balance is only fetched when a token is selected (handled in the fetchBalance useEffect above)

  const handleSwapChains = () => {
    const tempChain = fromChain;
    const tempToken = fromToken;
    setFromChain(toChain);
    setToChain(tempChain);
    setFromToken(toToken);
    setToToken(tempToken);
  };

  // Handle Max button click - fill input with balance
  const handleMaxClick = () => {
    if (tokenBalance && parseFloat(tokenBalance) > 0) {
      setAmount(tokenBalance);
    }
  };

  // STEP 3: Get quote from Li.Fi when relevant parameters change
  // TODO: Uncomment after installing @lifi/sdk
  /*
  useEffect(() => {
    // Clear any pending timeout
    if (quoteTimeoutRef.current) {
      clearTimeout(quoteTimeoutRef.current);
      quoteTimeoutRef.current = null;
    }

    // Clear quote when amount is cleared or parameters change
    if (!amount || parseFloat(amount) <= 0) {
      clearQuote();
      lastQuoteParamsRef.current = ""; // Reset last request key
      return;
    }

    if (fromChain && toChain && fromToken && toToken && address) {
      // Get token decimals from token data if available, otherwise use defaults
      const fromTokenDecimals =
        fromToken.symbol === "USDC" || fromToken.symbol === "USDT" ? 6 : 18;
      const fromAmount = parseTokenAmount(amount, fromTokenDecimals);

      // Validate chain IDs are numeric before calling getQuote
      const fromChainId = parseInt(fromChain.id);
      const toChainId = parseInt(toChain.id);

      if (isNaN(fromChainId) || isNaN(toChainId)) {
        console.warn("Invalid chain IDs. Cannot fetch quote.");
        return;
      }

      // Use token address if available, otherwise use symbol
      const fromTokenAddress = fromToken.id.startsWith("0x")
        ? fromToken.id
        : fromToken.symbol;
      const toTokenAddress = toToken.id.startsWith("0x")
        ? toToken.id
        : toToken.symbol;

      // Create a unique key for this request to prevent duplicates
      const requestKey = `${fromChainId}-${toChainId}-${fromTokenAddress}-${toTokenAddress}-${fromAmount}`;

      // Skip if this is the same request as the last one
      if (lastQuoteParamsRef.current === requestKey) {
        return;
      }

      // Debounce the API call - wait 500ms after user stops typing/changing
      quoteTimeoutRef.current = setTimeout(async () => {
        // Check if a request is already in progress
        if (isQuoteRequestInProgressRef.current) {
          console.log(
            "⏭️ [BridgeCard] Quote request already in progress, skipping..."
          );
          return;
        }

        // Update the last request key
        lastQuoteParamsRef.current = requestKey;
        isQuoteRequestInProgressRef.current = true;

        console.log(`🔄 [BridgeCard] Fetching quote:`, {
          fromChain: fromChainId,
          toChain: toChainId,
          fromToken: fromTokenAddress,
          toToken: toTokenAddress,
          fromAmount,
        });

        try {
          await getQuote({
            fromChain: fromChainId,
            toChain: toChainId,
            fromToken: fromTokenAddress,
            toToken: toTokenAddress,
            fromAmount: fromAmount,
            fromAddress: address, // Include address for better quotes
          });
        } catch (error: unknown) {
          // Error is already handled by the hook, just log here
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          if (
            errorMessage.includes("429") ||
            errorMessage.includes("Rate limit")
          ) {
            console.warn(
              "⚠️ [BridgeCard] Rate limit exceeded. Please wait before trying again."
            );
          } else {
            console.error("❌ [BridgeCard] Error fetching quote:", error);
          }
        } finally {
          isQuoteRequestInProgressRef.current = false;
        }
      }, 500); // 500ms debounce delay
    }

    // Cleanup function
    return () => {
      if (quoteTimeoutRef.current) {
        clearTimeout(quoteTimeoutRef.current);
        quoteTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    amount,
    fromChain?.id,
    toChain?.id,
    fromToken?.id,
    toToken?.id,
    address,
    getQuote,
  ]);
  */

  // For now, use mock calculations
  // const estimatedReceive = amount ? (parseFloat(amount) * 0.998).toFixed(6) : '0.00';
  // const bridgeFee = amount ? (parseFloat(amount) * 0.002).toFixed(6) : '0.00';

  // STEP 3: Use real quote data when available
  // TODO: Uncomment after installing @lifi/sdk
  /*
  const formatQuoteAmount = (amount: string, decimals: number = 18): string => {
    const num = parseFloat(amount) / Math.pow(10, decimals);
    if (num === 0) return "0.00";
    if (num < 0.000001) return num.toFixed(12).replace(/\.?0+$/, "");
    if (num < 0.01) return num.toFixed(10).replace(/\.?0+$/, "");
    if (num < 1) return num.toFixed(8).replace(/\.?0+$/, "");
    return num.toFixed(6).replace(/\.?0+$/, "");
  };
  */

  // Extract quote details
  // TODO: Uncomment after installing @lifi/sdk
  const quoteDetails = null;
  /*
  const quoteDetails = quote
    ? {
        toAmount: quote.estimate?.toAmount
          ? formatQuoteAmount(
              quote.estimate.toAmount,
              quote.action?.toToken?.decimals || 18
            )
          : "0.00",
        toAmountUSD: quote.estimate?.toAmountUSD || "0.00",
        fromAmountUSD: quote.estimate?.fromAmountUSD || "0.00",
        percentageChange:
          quote.estimate?.fromAmountUSD && quote.estimate?.toAmountUSD
            ? (
                ((parseFloat(quote.estimate.toAmountUSD) -
                  parseFloat(quote.estimate.fromAmountUSD)) /
                  parseFloat(quote.estimate.fromAmountUSD)) *
                100
              ).toFixed(2)
            : "0.00",
        bridgeName: quote.toolDetails?.name || quote.tool || "Unknown",
        bridgeLogo: quote.toolDetails?.logoURI,
        gasCost: quote.estimate?.gasCosts?.[0]?.amountUSD || "0.00",
        executionDuration: quote.estimate?.executionDuration || 0,
        exchangeRate:
          quote.action?.fromToken &&
          quote.action?.toToken &&
          quote.estimate?.toAmount &&
          quote.action?.fromAmount
            ? (() => {
                const fromAmountNum =
                  parseFloat(quote.action.fromAmount) /
                  Math.pow(10, quote.action.fromToken.decimals || 18);
                const toAmountNum =
                  parseFloat(quote.estimate.toAmount) /
                  Math.pow(10, quote.action.toToken.decimals || 18);
                const rate = toAmountNum / fromAmountNum;
                return `1 ${quote.action.fromToken.symbol} ≈ ${rate.toFixed(
                  6
                )} ${quote.action.toToken.symbol}`;
              })()
            : null,
        toToken: quote.action?.toToken,
      }
    : null;
  */

  // Helper function to show tooltip
  const showTooltip = (
    message: string,
    type: "loading" | "success" | "error"
  ) => {
    setTooltip({ message, type, visible: true });

    // Auto-hide tooltip after delay (except for loading)
    if (type !== "loading") {
      setTimeout(
        () => {
          setTooltip((prev) => ({ ...prev, visible: false }));
        },
        type === "success" ? 5000 : 4000
      );
    }
  };

  // Check if balance is sufficient for the transaction
  const isBalanceSufficient = () => {
    if (!amount || parseFloat(amount) <= 0) return false;
    if (!tokenBalance) return false;
    const amountNum = parseFloat(amount);
    const balanceNum = parseFloat(tokenBalance);
    // Add a small buffer (0.1%) to account for fees
    return balanceNum >= amountNum * 1.001;
  };

  // STEP 3: Handle bridge execution
  // TODO: Uncomment after installing @lifi/sdk and wagmi (Step 3)
  const handleBridge = async () => {
    // TODO: Uncomment after installing @lifi/sdk and wagmi (Step 3)
    showTooltip("Please complete SDK integration to enable bridging", "error");
    /*
    if (!quote || !isConnected || !address) {
      showTooltip("Please connect your wallet first", "error");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      showTooltip("Please enter an amount to bridge", "error");
      return;
    }

    // Check balance before proceeding
    if (!isBalanceSufficient()) {
      showTooltip("Insufficient balance for this transaction", "error");
      return;
    }

    try {
      // Show loading tooltip
      showTooltip("Transaction in progress...", "loading");

      // Execute route with progress tracking
      const progressCallback = (updatedRoute: RouteExtended) => {
        // Progress callback - can be used to show transaction status
        console.log("🔄 Route update:", updatedRoute);

        // Track all steps and their status
        updatedRoute.steps?.forEach((step: LiFiStepExtended, index: number) => {
          const stepStatus = step.execution?.status;
          const process = step.execution?.process;

          if (process && process.length > 0) {
            const latestProcess = process[process.length - 1];
            console.log(`📊 Step ${index + 1} (${step.type}):`, {
              status: stepStatus,
              processType: latestProcess.type,
              processStatus: latestProcess.status,
              txHash: latestProcess.txHash,
              txLink: latestProcess.txLink,
            });

            // Show transaction hash when available
            if (latestProcess.txHash) {
              console.log(
                `✅ Transaction hash for step ${index + 1}:`,
                latestProcess.txHash
              );
              if (latestProcess.txLink) {
                console.log(`🔗 Explorer link:`, latestProcess.txLink);
              }
            }
          }
        });
      };

      console.log("🚀 Starting bridge execution...");
      const result = await execute(quote, progressCallback);

      // Hide loading tooltip
      setTooltip((prev) => ({ ...prev, visible: false }));

      // Check if execution was successful
      if (result) {
        const allStepsDone = result.steps?.every(
          (step: LiFiStepExtended) =>
            step.execution?.status === "DONE" ||
            step.execution?.status === "FAILED"
        );

        if (allStepsDone) {
          const hasFailures = result.steps?.some(
            (step: LiFiStepExtended) => step.execution?.status === "FAILED"
          );

          if (hasFailures) {
            showTooltip(
              "Transaction completed with some failures. Check console for details.",
              "error"
            );
          } else {
            // Success! Show tooltip, reset amount, and refresh balance
            showTooltip(
              "Transaction successful! Balance will update shortly.",
              "success"
            );

            // Reset amount input
            setAmount("");

            // Clear quote
            clearQuote();

            // Trigger balance refresh after transaction is confirmed (3 seconds delay)
            setTimeout(() => {
              // Trigger balance refresh by updating the trigger state
              setBalanceRefreshTrigger((prev) => prev + 1);
            }, 3000);
          }
        } else {
          showTooltip("Transaction submitted! Processing...", "success");
        }
      }
    } catch (error: unknown) {
      // Hide loading tooltip
      setTooltip((prev) => ({ ...prev, visible: false }));

      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorName = error instanceof Error ? error.name : "";

      // Handle user rejection silently (just log, don't show error)
      if (
        errorMessage.includes("user rejected") ||
        errorMessage.includes("User rejected") ||
        errorMessage.includes("User rejected the request") ||
        errorName.includes("UserRejectedRequestError")
      ) {
        console.log("ℹ️ User rejected the transaction request");
        return; // Don't show error tooltip for user rejection
      }

      // Handle balance too low error
      if (
        errorMessage.includes("balance is too low") ||
        errorMessage.includes("BalanceError") ||
        errorMessage.includes("The balance is too low")
      ) {
        console.error("❌ Bridge error: Balance too low");
        showTooltip("Insufficient balance for this transaction", "error");
        return;
      }

      console.error("❌ Bridge error:", error);

      // Provide more specific error messages for other errors
      if (
        errorMessage.includes("insufficient funds") ||
        errorMessage.includes("Insufficient")
      ) {
        showTooltip("Insufficient funds for this transaction", "error");
      } else if (
        errorMessage.includes("not connected") ||
        errorMessage.includes("Wallet is not connected")
      ) {
        showTooltip(
          "Wallet is not connected. Please connect your wallet first",
          "error"
        );
      } else {
        // Only show generic error if it's not a user rejection
        showTooltip(`Transaction failed: ${errorMessage}`, "error");
      }
    }
    */
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Main Bridge Card */}
      <div className="backdrop-blur-xl bg-card-bg border border-card-border rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-linear-to-r from-purple-primary to-blue-primary bg-clip-text text-transparent">
            Bridge Assets
          </h2>
          <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        {/* From Section */}
        <div className="space-y-4">
          <div className="bg-white/2 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">From</span>
              <span className="text-xs text-gray-500">
                Balance:{" "}
                {tokenBalance && parseFloat(tokenBalance) > 0
                  ? (() => {
                      const num = parseFloat(tokenBalance);
                      // For very small amounts, show more precision
                      if (num < 0.000001) {
                        return num.toFixed(12).replace(/\.?0+$/, "");
                      } else if (num < 0.01) {
                        return num.toFixed(10).replace(/\.?0+$/, "");
                      } else if (num < 1) {
                        return num.toFixed(8).replace(/\.?0+$/, "");
                      } else {
                        return num.toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 6,
                        });
                      }
                    })()
                  : "0.00"}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => {
                  // TODO: Uncomment after installing wagmi (Step 3)
                  // if (!isConnected || !address) {
                  //   showTooltip("Please connect your wallet first", "error");
                  //   return;
                  // }
                  setShowFromChainModal(true);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                {/* Chain Icon - Use image if available, otherwise use emoji */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {fromChain.logoURI ? (
                    <img
                      src={fromChain.logoURI}
                      alt={fromChain.name}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.parentElement?.querySelector(
                          ".chain-fallback"
                        ) as HTMLElement;
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                  ) : null}
                  <span
                    className={`text-xl chain-fallback ${
                      fromChain.logoURI ? "hidden" : "block"
                    }`}
                  >
                    {fromChain.icon}
                  </span>
                </div>
                <span className="font-medium">{fromChain.name}</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  // TODO: Uncomment after installing wagmi (Step 3)
                  // if (!isConnected || !address) {
                  //   showTooltip("Please connect your wallet first", "error");
                  //   return;
                  // }
                  setShowFromTokenModal(true);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                {/* Token Icon - Use image if available, otherwise use emoji */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {fromToken.logoURI ? (
                    <img
                      src={fromToken.logoURI}
                      alt={fromToken.symbol}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.parentElement?.querySelector(
                          ".token-fallback"
                        ) as HTMLElement;
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                  ) : null}
                  <span
                    className={`text-xl token-fallback ${
                      fromToken.logoURI ? "hidden" : "block"
                    }`}
                  >
                    {fromToken.icon}
                  </span>
                </div>
                <span className="font-medium">{fromToken.symbol}</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value.replace(/[^0-9.]/g, ""))
                }
                placeholder="0.00"
                className="flex-1 bg-transparent text-3xl font-semibold outline-none placeholder-gray-600"
              />
              <button
                onClick={handleMaxClick}
                className="px-3 py-1 text-xs font-medium text-purple-primary hover:text-purple-300 bg-purple-primary/10 hover:bg-purple-primary/20 rounded-lg transition-colors"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={handleSwapChains}
              className="p-3 bg-linear-to-r from-purple-primary to-blue-primary rounded-xl hover:scale-110 transition-transform shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </div>

          {/* To Section */}
          <div className="bg-white/2 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">To</span>
              {quoteDetails && (
                <span className="px-2 py-1 text-xs font-medium bg-purple-primary/20 text-purple-primary rounded-lg">
                  Best Return
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => {
                  // TODO: Uncomment after installing wagmi (Step 3)
                  // if (!isConnected || !address) {
                  //   showTooltip("Please connect your wallet first", "error");
                  //   return;
                  // }
                  setShowToChainModal(true);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                {/* Chain Icon - Use image if available, otherwise use emoji */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {toChain.logoURI ? (
                    <img
                      src={toChain.logoURI}
                      alt={toChain.name}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.parentElement?.querySelector(
                          ".chain-fallback"
                        ) as HTMLElement;
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                  ) : null}
                  <span
                    className={`text-xl chain-fallback ${
                      toChain.logoURI ? "hidden" : "block"
                    }`}
                  >
                    {toChain.icon}
                  </span>
                </div>
                <span className="font-medium">{toChain.name}</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  // TODO: Uncomment after installing wagmi (Step 3)
                  // if (!isConnected || !address) {
                  //   showTooltip("Please connect your wallet first", "error");
                  //   return;
                  // }
                  setShowToTokenModal(true);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                {/* Token Icon - Use image if available, otherwise use emoji */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {quoteDetails?.toToken?.logoURI || toToken.logoURI ? (
                    <img
                      src={quoteDetails?.toToken?.logoURI || toToken.logoURI}
                      alt={quoteDetails?.toToken?.symbol || toToken.symbol}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.parentElement?.querySelector(
                          ".token-fallback"
                        ) as HTMLElement;
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                  ) : null}
                  <span
                    className={`text-xl token-fallback ${
                      quoteDetails?.toToken?.logoURI || toToken.logoURI
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    {toToken.icon}
                  </span>
                </div>
                <span className="font-medium">
                  {quoteDetails?.toToken?.symbol || toToken.symbol}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Quote Details */}
            {quoteLoading ? (
              <div className="text-sm text-gray-500 py-4">Loading quote...</div>
            ) : quoteError ? (
              <div className="flex flex-col gap-1 py-4">
                <span className="text-sm text-red-400">
                  {quoteError.message.includes("429") ||
                  quoteError.message.includes("Rate limit")
                    ? "Rate limit exceeded. Please wait."
                    : quoteError.message.includes("404") ||
                      quoteError.message.includes("No available quotes")
                    ? "No quotes available for this route"
                    : "Error fetching quote"}
                </span>
                {quoteError.message.includes("429") && (
                  <span className="text-xs text-gray-500">
                    Try again in a few minutes
                  </span>
                )}
                {(quoteError.message.includes("404") ||
                  quoteError.message.includes("No available quotes")) && (
                  <span className="text-xs text-gray-500">
                    Try a different token or chain combination
                  </span>
                )}
              </div>
            ) : quoteDetails ? (
              <div className="space-y-3">
                {/* Amount Display */}
                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
                    {quoteDetails.toToken?.logoURI ? (
                      <img
                        src={quoteDetails.toToken.logoURI}
                        alt={quoteDetails.toToken.symbol}
                        className="w-10 h-10 rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const fallback = target.parentElement?.querySelector(
                            ".quote-token-fallback"
                          ) as HTMLElement;
                          if (fallback) fallback.style.display = "block";
                        }}
                      />
                    ) : null}
                    <span
                      className={`text-2xl quote-token-fallback ${
                        quoteDetails.toToken?.logoURI ? "hidden" : "block"
                      }`}
                    >
                      {toToken.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-semibold text-white mb-1">
                      {quoteDetails.toAmount}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        ${parseFloat(quoteDetails.toAmountUSD).toFixed(2)}
                      </span>
                      {parseFloat(quoteDetails.percentageChange) !== 0 && (
                        <span
                          className={`text-xs font-medium ${
                            parseFloat(quoteDetails.percentageChange) >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {parseFloat(quoteDetails.percentageChange) >= 0
                            ? "+"
                            : ""}
                          {quoteDetails.percentageChange}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bridge Provider */}
                {quoteDetails.bridgeName && (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    {quoteDetails.bridgeLogo ? (
                      <img
                        src={quoteDetails.bridgeLogo}
                        alt={quoteDetails.bridgeName}
                        className="w-4 h-4 rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    )}
                    <span>{quoteDetails.bridgeName}</span>
                  </div>
                )}

                {/* Additional Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-white/5">
                  {quoteDetails.gasCost &&
                    parseFloat(quoteDetails.gasCost) > 0 && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span>
                          &lt;${parseFloat(quoteDetails.gasCost).toFixed(2)}
                        </span>
                      </div>
                    )}
                  {quoteDetails.executionDuration > 0 && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{quoteDetails.executionDuration}s</span>
                    </div>
                  )}
                  {quoteDetails.exchangeRate && (
                    <div className="flex items-center gap-1 text-gray-400">
                      <span>{quoteDetails.exchangeRate}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-3xl font-semibold text-gray-400 py-4">
                0.00
              </div>
            )}
          </div>
        </div>

        {/* STEP 3: Bridge Button */}
        {/* TODO: Uncomment after installing @lifi/sdk and wagmi (Step 3) */}
        <button
          disabled={
            !amount ||
            parseFloat(amount) === 0
            // TODO: Uncomment after installing @lifi/sdk and wagmi (Step 3)
            // || !isBalanceSufficient() ||
            // !quote ||
            // !isConnected
          }
          onClick={() => {
            handleBridge();
          }}
          className="w-full mt-6 py-4 bg-linear-to-r from-purple-primary to-blue-primary rounded-xl font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-purple-primary/20"
        >
          {/* TODO: Uncomment after installing @lifi/sdk and wagmi (Step 3) */}
          {!amount || parseFloat(amount) === 0
            ? "Enter Amount"
            : "Bridge Tokens"}
          {/* {!isConnected
            ? "Connect Wallet"
            : !amount || parseFloat(amount) === 0
            ? "Enter Amount"
            : !isBalanceSufficient()
            ? "Insufficient Balance"
            : !quote
            ? "Loading Quote..."
            : "Bridge Tokens"} */}
        </button>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Review transaction details carefully before confirming
        </p>
      </div>

      {/* Tooltip Notification */}
      {tooltip.visible && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in">
          <div
            className={`px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
              tooltip.type === "loading"
                ? "bg-blue-500/20 border-blue-400/30 text-blue-200"
                : tooltip.type === "success"
                ? "bg-green-500/20 border-green-400/30 text-green-200"
                : "bg-red-500/20 border-red-400/30 text-red-200"
            } flex items-center gap-3 min-w-[300px] max-w-[90vw]`}
          >
            {tooltip.type === "loading" && (
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            )}
            {tooltip.type === "success" && (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {tooltip.type === "error" && (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span className="text-sm font-medium">{tooltip.message}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      {showFromChainModal && (
        <ChainSelector
          chains={availableChains.filter((c) => c.id !== toChain.id)}
          selectedChain={fromChain}
          onSelect={(chain) => {
            setFromChain(chain);
            setShowFromChainModal(false);
          }}
          onClose={() => setShowFromChainModal(false)}
        />
      )}

      {showToChainModal && (
        <ChainSelector
          chains={availableChains.filter((c) => c.id !== fromChain.id)}
          selectedChain={toChain}
          onSelect={(chain) => {
            setToChain(chain);
            setShowToChainModal(false);
          }}
          onClose={() => setShowToChainModal(false)}
        />
      )}

      {showFromTokenModal && (
        <TokenSelector
          tokens={availableFromTokens}
          selectedToken={fromToken}
          onSelect={(token) => {
            setFromToken(token);
            setShowFromTokenModal(false);
          }}
          onClose={() => setShowFromTokenModal(false)}
        />
      )}

      {showToTokenModal && (
        <TokenSelector
          tokens={availableToTokens}
          selectedToken={toToken}
          onSelect={(token) => {
            setToToken(token);
            setShowToTokenModal(false);
          }}
          onClose={() => setShowToTokenModal(false)}
        />
      )}
    </div>
  );
}
