"use client";

// STEP 3: Wallet Integration
// TODO: After installing wagmi, uncomment the useWallet import and usage

import { useState } from "react";
import BridgeCard from "@/components/BridgeCard";
import LifiWidget from "@/components/LifiWidget";
import IntegrationToggle from "@/components/IntegrationToggle";
// TODO: Uncomment after installing wagmi (Step 3)
// import { useWallet } from "@/hooks/useWallet";

export default function Home() {
  const [integrationMode, setIntegrationMode] = useState<"widget" | "sdk">(
    "widget"
  );

  // STEP 3: Wallet connection
  // TODO: Uncomment after installing wagmi (Step 3)
  // const { address, isConnected, connect, disconnect, connectors } = useWallet();

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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-primary to-blue-primary rounded-xl flex items-center justify-center font-bold text-xl">
              ⚡
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-primary to-blue-primary bg-clip-text text-transparent">
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
                // if (isConnected) {
                //   disconnect();
                // } else if (connectors.length > 0) {
                //   connect({ connector: connectors[0] });
                // }
                alert(
                  "Wallet connection will work after installing wagmi. Follow Step 3 in the integration guide."
                );
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-primary to-blue-primary rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-primary/20"
            >
              {/* TODO: Uncomment after installing wagmi (Step 3) */}
              {/* {isConnected && address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet"} */}
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pt-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-secondary to-blue-secondary bg-clip-text text-transparent">
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
