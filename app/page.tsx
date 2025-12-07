"use client";

// STEP 3: Wallet Integration
// TODO: After installing wagmi, uncomment the useWallet import and usage

import { useState, useEffect } from "react";
import BridgeCard from "@/components/BridgeCard";
import LifiWidget from "@/components/LifiWidget";
import IntegrationToggle from "@/components/IntegrationToggle";
// TODO: Uncomment after installing wagmi (Step 3)
import { useWallet } from "@/hooks/useWallet";

export default function Home() {
  const [integrationMode, setIntegrationMode] = useState<"widget" | "sdk">(
    "widget"
  );

  // STEP 3: Wallet connection
  // TODO: Uncomment after installing wagmi (Step 3)
  const { address, isConnected, connect, disconnect, connectors } = useWallet();

  // Tooltip state for notifications
  const [tooltip, setTooltip] = useState<{
    message: string;
    type: "loading" | "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

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

  // Disconnect wallet on page refresh/load to prevent MetaMask popup
  useEffect(() => {
    // Only disconnect if connected (to prevent unnecessary calls)
    if (isConnected) {
      // Small delay to ensure everything is initialized
      const timer = setTimeout(() => {
        disconnect();
      }, 100);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 -z-10">
        {/* Purple gradient blob - top left */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-primary/30 rounded-full blur-[120px] animate-pulse" />

        {/* Blue gradient blob - top right */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-primary/25 rounded-full blur-[130px] animate-pulse [animation-delay:1s]" />

        {/* Purple gradient blob - bottom */}
        <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-purple-secondary/20 rounded-full blur-[140px] animate-pulse [animation-delay:2s]" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size-[100px_100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-purple-primary to-blue-primary rounded-xl flex items-center justify-center font-bold text-xl">
              ⚡
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-purple-primary to-blue-primary bg-clip-text text-transparent">
              Li.Fi Bridge
            </span>
          </div>

          {/* STEP 3: Connect Wallet Button */}
          {/* Note: Widget mode has its own wallet connect button, so this is mainly for SDK mode */}
          {/* TODO: Uncomment after installing wagmi (Step 3) */}
          {integrationMode === "sdk" && (
            <button
              onClick={() => {
                // TODO: Uncomment after installing wagmi (Step 3)
                if (isConnected) {
                  disconnect();
                } else if (connectors.length > 0) {
                  connect({ connector: connectors[0] });
                } else {
                  showTooltip(
                    "Please install a wallet extension to connect",
                    "error"
                  );
                }
              }}
              className="px-6 py-2.5 bg-linear-to-r from-purple-primary to-blue-primary rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-primary/20"
            >
              {/* TODO: Uncomment after installing wagmi (Step 3) */}
              {isConnected && address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet"}
              {/* Connect Wallet */}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pt-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-white via-purple-secondary to-blue-secondary bg-clip-text text-transparent">
              Bridge Assets Across Chains
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Fast, secure, and seamless cross-chain transfers
            </p>

            {/* Integration Mode Toggle */}
            <div className="flex justify-center mb-8">
              <IntegrationToggle
                mode={integrationMode}
                onModeChange={setIntegrationMode}
              />
            </div>
          </div>

          {/* Conditional Rendering: Widget or SDK Mode */}
          {integrationMode === "widget" ? <LifiWidget /> : <BridgeCard />}

          {/* Features */}
        </div>
      </main>

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

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 mt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Li.Fi Bridge Tutorial. Learn how to integrate Li.Fi Widget &
            SDK.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-primary transition-colors"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-primary transition-colors"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-primary transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-primary transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
