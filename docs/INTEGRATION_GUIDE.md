# Li.Fi Integration Guide

This guide provides step-by-step instructions for integrating Li.Fi into your bridge application. We'll start with the simplest approach (Widget) and then move to the more advanced SDK integration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Installation](#step-1-installation)
3. [Step 2: Widget Integration (Simplest)](#step-2-widget-integration-simplest)
4. [Step 3: SDK Integration (Advanced)](#step-3-sdk-integration-advanced)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18+ installed
- A basic understanding of React and Next.js
- A Web3 wallet (MetaMask recommended for testing)
- Test tokens on supported chains (for testing bridges)

## Step 1: Installation

### 1.1 Install Required Packages

First, install the necessary packages for wallet connection and Li.Fi integration:

```bash
npm install wagmi viem @tanstack/react-query
npm install @lifi/widget
npm install @lifi/sdk
```

Or with yarn:

```bash
yarn add wagmi viem @tanstack/react-query
yarn add @lifi/widget
yarn add @lifi/sdk
```

**Why @tanstack/react-query?**

- Wagmi uses React Query internally for state management
- It handles caching, refetching, and synchronization of wallet data
- It's a required dependency - you don't need to use it directly, wagmi handles it

### 1.2 Configure WalletConnect (Optional - You Can Skip This)

**Note:** WalletConnect is completely optional! The default setup uses `injected()` and `metaMask()` connectors, which work with any browser wallet (MetaMask, Brave, etc.) without any additional configuration.

If you want to use WalletConnect (for mobile wallet connections), you'll need a project ID:

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your project ID
4. Add it to your `.env.local` file:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id-here
```

### 1.3 Enable Wagmi Provider

1. Open `lib/wagmi.ts` and uncomment the wagmi configuration:

   - Uncomment the imports (`createConfig`, `http`, chains, connectors)
   - Uncomment the `wagmiConfig` export
   - Remove or comment out the placeholder export

2. Open `app/providers.tsx` and uncomment the WagmiProvider setup:

   - Uncomment the imports (`WagmiProvider`, `QueryClient`, `QueryClientProvider`)
   - Uncomment the `queryClient` initialization
   - Uncomment the return statement with `WagmiProvider` and `QueryClientProvider`
   - Remove the placeholder return statement

3. Verify `app/layout.tsx` wraps your app with the Providers component (it should already be there):

```tsx
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 1.4 Enable Wallet Hook

1. Open `hooks/useWallet.ts` and uncomment the wallet hook:
   - Uncomment the import statement: `import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";`
   - Uncomment all the hook calls inside the function
   - Uncomment the return statement with actual values
   - Remove the placeholder return statement

### 1.5 Connect Wallet in Main Page

1. Open `app/page.tsx` and uncomment the wallet integration:
   - Uncomment the import: `import { useWallet } from "@/hooks/useWallet";`
   - Uncomment the hook call: `const { address, isConnected, connect, disconnect, connectors } = useWallet();`
   - In the Connect Wallet button's onClick handler, uncomment the connection logic
   - In the button's content, uncomment the conditional display of address

After completing these steps, your wallet connection should work! Try clicking the "Connect Wallet" button.

## Step 2: Widget Integration (Simplest)

The Li.Fi widget is the easiest way to integrate cross-chain bridging. It handles all UI and functionality internally.

### 2.1 Enable the Widget Component

1. Open `components/LifiWidget.tsx`
2. Uncomment the widget import and configuration code
3. The widget will automatically appear when you select "Widget" mode in the UI

### 2.2 Configure Widget Theme (Optional)

You can customize the widget theme to match your design:

```tsx
const widget = new LiFiWidget({
  theme: {
    palette: {
      primary: {
        main: "#8b5cf6", // Your primary color
      },
      secondary: {
        main: "#3b82f6", // Your secondary color
      },
    },
  },
});
```

### 2.3 Test the Widget

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Click the "Widget" tab
4. Connect your wallet
5. Try bridging a small amount of tokens

The widget handles:

- Chain selection
- Token selection
- Quote fetching
- Transaction execution
- Status updates

## Step 3: SDK Integration (Advanced)

The SDK approach gives you full control over the UI while using Li.Fi's routing and execution logic.

### 3.1 Enable Li.Fi SDK Configuration

1. Open `lib/lifi/config.ts`
2. Uncomment the Li.Fi SDK initialization
3. Replace `'your-app-name'` with your actual app name

### 3.2 Enable Li.Fi Hooks

1. Open `lib/lifi/hooks.ts`
2. Uncomment all the hook implementations
3. The hooks will now fetch real data from Li.Fi

### 3.3 Enable Wallet Hook

1. Open `hooks/useWallet.ts`
2. Uncomment the wagmi hooks
3. The wallet connection will now work

### 3.4 Update BridgeCard Component

1. Open `components/BridgeCard.tsx`
2. Uncomment all the STEP 3 sections:
   - Import statements for Li.Fi hooks
   - Hook calls
   - Quote fetching logic
   - Bridge execution logic

### 3.5 Update Chain and Token Selectors

The ChainSelector and TokenSelector components will automatically use real data once the hooks are enabled. No changes needed!

### 3.6 Connect Wallet in Header

1. Open `app/page.tsx`
2. Import and use the `useWallet` hook
3. Update the "Connect Wallet" button to use the wallet connection:

```tsx
import { useWallet } from "@/hooks/useWallet";

// In your component:
const { address, isConnected, connect, disconnect, connectors } = useWallet();

// Update button:
<button
  onClick={() =>
    isConnected ? disconnect() : connect({ connector: connectors[0] })
  }
>
  {isConnected
    ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
    : "Connect Wallet"}
</button>;
```

### 3.7 Test SDK Integration

1. Make sure all STEP 3 sections are uncommented
2. Start your development server
3. Navigate to `http://localhost:3000`
4. Click the "SDK" tab
5. Connect your wallet
6. Select chains and tokens
7. Enter an amount
8. Click "Bridge Tokens"

## Testing

### Test Scenarios

1. **Widget Mode:**

   - Connect wallet
   - Select source and destination chains
   - Select tokens
   - Enter amount
   - Execute bridge
   - Verify transaction on block explorer

2. **SDK Mode:**
   - Connect wallet
   - Verify chains load from Li.Fi
   - Verify tokens load for selected chain
   - Enter amount and verify quote appears
   - Execute bridge transaction
   - Monitor transaction status

### Test Networks

Start with testnets to avoid spending real funds:

- Sepolia (Ethereum testnet)
- Arbitrum Sepolia
- Optimism Sepolia
- Polygon Mumbai

## Troubleshooting

### Widget Not Loading

- Check browser console for errors
- Verify `@lifi/widget` is installed
- Check if there are CSP (Content Security Policy) issues in `next.config.ts`

### Wallet Not Connecting

- Verify wagmi is properly configured
- Check that `lib/wagmi.ts` is uncommented
- Ensure `app/providers.tsx` wraps your app
- Try a different wallet connector

### Chains/Tokens Not Loading

- Check network tab in browser dev tools
- Verify `@lifi/sdk` is installed
- Ensure hooks are uncommented in `lib/lifi/hooks.ts`
- Check Li.Fi API status

### Transaction Fails

- Ensure you have enough tokens for gas fees
- Verify you're on the correct network
- Check that the token is supported on both chains
- Review transaction in wallet before confirming

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## Additional Resources

- [Li.Fi Documentation](https://docs.li.fi/)
- [Li.Fi Widget Docs](https://docs.li.fi/integration-guides/widget-integration)
- [Li.Fi SDK Docs](https://docs.li.fi/integration-guides/sdk-integration)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)

## Next Steps

After completing the integration:

1. Customize the UI to match your brand
2. Add error handling and user feedback
3. Implement transaction history
4. Add analytics tracking
5. Optimize for production

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Li.Fi documentation
3. Check GitHub issues for known problems
4. Reach out to Li.Fi support
