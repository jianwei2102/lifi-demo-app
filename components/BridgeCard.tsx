'use client';

// STEP 3: SDK Integration
// This component uses Li.Fi SDK to fetch real chain/token data and execute bridges
// TODO: After installing @lifi/sdk, uncomment the hooks and integrate them

import { useState, useEffect } from 'react';
import { Chain, Token, mockChains, mockTokens } from '@/lib/mockData';
import ChainSelector from './ChainSelector';
import TokenSelector from './TokenSelector';
// TODO: Uncomment after installing @lifi/sdk
// import { useLiFiChains, useLiFiTokens, useLiFiQuote, useLiFiExecute } from '@/lib/lifi/hooks';
// import { useWallet } from '@/hooks/useWallet';
// import { parseTokenAmount } from '@/lib/lifi/utils';

export default function BridgeCard() {
  // STEP 3: Use Li.Fi hooks to fetch real data
  // TODO: Uncomment after installing @lifi/sdk
  // const { chains: lifiChains, loading: chainsLoading } = useLiFiChains();
  // const { tokens: lifiTokens, loading: tokensLoading } = useLiFiTokens(fromChain.id);
  // const { quote, loading: quoteLoading, getQuote } = useLiFiQuote();
  // const { loading: executeLoading, execute } = useLiFiExecute();
  // const { address, isConnected, chain } = useWallet();

  // For now, use mock data until SDK is installed
  const [fromChain, setFromChain] = useState<Chain>(mockChains[0]);
  const [toChain, setToChain] = useState<Chain>(mockChains[1]);
  const [selectedToken, setSelectedToken] = useState<Token>(mockTokens[0]);
  const [availableChains] = useState<Chain[]>(mockChains);
  const [availableTokens] = useState<Token[]>(mockTokens);
  
  const [amount, setAmount] = useState('');
  const [showFromChainModal, setShowFromChainModal] = useState(false);
  const [showToChainModal, setShowToChainModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  
  // STEP 3: Update chains when Li.Fi data is loaded
  // TODO: Uncomment after installing @lifi/sdk
  // useEffect(() => {
  //   if (lifiChains.length > 0 && !fromChain) {
  //     setFromChain(lifiChains[0]);
  //     setToChain(lifiChains[1] || lifiChains[0]);
  //   }
  // }, [lifiChains]);

  // STEP 3: Update tokens when chain changes
  // TODO: Uncomment after installing @lifi/sdk
  // useEffect(() => {
  //   if (lifiTokens.length > 0 && !selectedToken) {
  //     setSelectedToken(lifiTokens[0]);
  //   }
  // }, [lifiTokens, fromChain.id]);

  const handleSwapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  // STEP 3: Get quote from Li.Fi when amount changes
  // TODO: Uncomment after installing @lifi/sdk
  // useEffect(() => {
  //   if (amount && parseFloat(amount) > 0 && fromChain && toChain && selectedToken) {
  //     const fromAmount = parseTokenAmount(amount, 18); // Adjust decimals based on token
  //     getQuote({
  //       fromChain: fromChain.id,
  //       toChain: toChain.id,
  //       fromToken: selectedToken.id,
  //       toToken: selectedToken.id, // Use same token for now, or allow selection
  //       fromAmount: fromAmount,
  //     }).catch(console.error);
  //   }
  // }, [amount, fromChain, toChain, selectedToken]);

  // For now, use mock calculations
  const estimatedReceive = amount ? (parseFloat(amount) * 0.998).toFixed(6) : '0.00';
  const bridgeFee = amount ? (parseFloat(amount) * 0.002).toFixed(6) : '0.00';
  
  // STEP 3: Use real quote data when available
  // TODO: Uncomment after installing @lifi/sdk
  // const estimatedReceive = quote?.estimate?.toAmount 
  //   ? (parseFloat(quote.estimate.toAmount) / Math.pow(10, quote.estimate.toToken.decimals)).toFixed(6)
  //   : '0.00';
  // const bridgeFee = quote?.estimate?.fee?.amount
  //   ? (parseFloat(quote.estimate.fee.amount) / Math.pow(10, quote.estimate.fee.token.decimals)).toFixed(6)
  //   : '0.00';

  // STEP 3: Handle bridge execution
  // TODO: Uncomment after installing @lifi/sdk
  // const handleBridge = async () => {
  //   if (!quote || !isConnected || !address) {
  //     alert('Please connect your wallet first');
  //     return;
  //   }
  //   
  //   try {
  //     // Get signer from wagmi
  //     const { getWalletClient } = await import('wagmi/actions');
  //     const walletClient = await getWalletClient();
  //     if (!walletClient) throw new Error('Wallet not connected');
  //     
  //     await execute(quote, walletClient);
  //     alert('Bridge transaction submitted!');
  //   } catch (error) {
  //     console.error('Bridge error:', error);
  //     alert('Bridge transaction failed');
  //   }
  // };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Main Bridge Card */}
      <div className="backdrop-blur-xl bg-card-bg border border-card-border rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-primary to-blue-primary bg-clip-text text-transparent">
            Bridge Assets
          </h2>
          <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* From Section */}
        <div className="space-y-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">From</span>
              <span className="text-xs text-gray-500">Balance: {selectedToken.balance}</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setShowFromChainModal(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                <span className="text-xl">{fromChain.icon}</span>
                <span className="font-medium">{fromChain.name}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <button
                onClick={() => setShowTokenModal(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                <span className="text-xl">{selectedToken.icon}</span>
                <span className="font-medium">{selectedToken.symbol}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              className="w-full bg-transparent text-3xl font-semibold outline-none placeholder-gray-600"
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={handleSwapChains}
              className="p-3 bg-gradient-to-r from-purple-primary to-blue-primary rounded-xl hover:scale-110 transition-transform shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Section */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">To</span>
              <span className="text-xs text-gray-500">Estimated</span>
            </div>

            <button
              onClick={() => setShowToChainModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 mb-3"
            >
              <span className="text-xl">{toChain.icon}</span>
              <span className="font-medium">{toChain.name}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="text-3xl font-semibold text-gray-400">
              {estimatedReceive}
            </div>
          </div>
        </div>

        {/* Bridge Info */}
        {amount && parseFloat(amount) > 0 && (
          <div className="mt-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Bridge Fee (0.2%)</span>
              <span className="text-white">{bridgeFee} {selectedToken.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimated Time</span>
              <span className="text-white">~2-5 minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Route</span>
              <span className="text-purple-primary font-medium">Optimal</span>
            </div>
          </div>
        )}

        {/* Bridge Button */}
        {/* STEP 3: Update button to use handleBridge function after SDK integration */}
        <button
          disabled={!amount || parseFloat(amount) === 0}
          onClick={() => {
            // TODO: Uncomment after installing @lifi/sdk
            // handleBridge();
            alert('Bridge functionality will work after installing @lifi/sdk. Follow Step 3 in the integration guide.');
          }}
          className="w-full mt-6 py-4 bg-gradient-to-r from-purple-primary to-blue-primary rounded-xl font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-purple-primary/20"
        >
          {!amount || parseFloat(amount) === 0 ? 'Enter Amount' : 'Bridge Tokens'}
        </button>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Review transaction details carefully before confirming
        </p>
      </div>

      {/* Modals */}
      {showFromChainModal && (
        <ChainSelector
          chains={availableChains.filter(c => c.id !== toChain.id)}
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
          chains={availableChains.filter(c => c.id !== fromChain.id)}
          selectedChain={toChain}
          onSelect={(chain) => {
            setToChain(chain);
            setShowToChainModal(false);
          }}
          onClose={() => setShowToChainModal(false)}
        />
      )}

      {showTokenModal && (
        <TokenSelector
          tokens={availableTokens}
          selectedToken={selectedToken}
          onSelect={(token) => {
            setSelectedToken(token);
            setShowTokenModal(false);
          }}
          onClose={() => setShowTokenModal(false)}
        />
      )}
    </div>
  );
}
