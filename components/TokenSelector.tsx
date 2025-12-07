'use client';

// STEP 3: Token Selector Component
// This component displays available tokens for selection
// TODO: After installing @lifi/sdk, this will use real token data from useLiFiTokens hook

import { useState, useMemo } from 'react';
import { Token } from '@/lib/mockData';

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token;
  onSelect: (token: Token) => void;
  onClose: () => void;
}

export default function TokenSelector({ tokens, selectedToken, onSelect, onClose }: TokenSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tokens based on search query
  const filteredTokens = useMemo(() => {
    if (!searchQuery.trim()) {
      return tokens;
    }
    const query = searchQuery.toLowerCase();
    return tokens.filter(token => 
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query) ||
      token.id.toLowerCase().includes(query)
    );
  }, [tokens, searchQuery]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-card-bg border border-card-border rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Select Token</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tokens..."
            className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl outline-none focus:border-purple-primary/50 transition-colors placeholder-gray-500"
          />
        </div>

        {/* Token List */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {filteredTokens.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No tokens found matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredTokens.map((token) => (
            <button
              key={token.id}
              onClick={() => onSelect(token)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all hover:bg-white/5 ${
                selectedToken.id === token.id
                  ? 'bg-white/10 border border-purple-primary/30'
                  : 'border border-transparent'
              }`}
            >
              {/* Token Icon - Use image if available, otherwise use emoji */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                {token.logoURI ? (
                  <img 
                    src={token.logoURI} 
                    alt={token.symbol}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.token-fallback') as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                ) : null}
                <span 
                  className={`text-2xl token-fallback ${token.logoURI ? 'hidden' : 'block'}`}
                >
                  {token.icon}
                </span>
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">{token.symbol}</div>
                <div className="text-xs text-gray-400">{token.name}</div>
              </div>
              {selectedToken.id === token.id && (
                <svg className="w-5 h-5 text-purple-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
