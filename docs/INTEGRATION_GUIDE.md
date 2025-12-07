# Li.Fi Integration Guide

This guide provides step-by-step instructions for integrating Li.Fi into your bridge application. We'll start with the simplest approach (Widget) , then move to the more advanced SDK integration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Installation](#step-1-installation)
3. [Step 2: Widget Integration (Simplest)](#step-2-widget-integration-simplest)
4. [Step 3: Wagmi Setup (For SDK Mode)](#step-3-wagmi-setup-for-sdk-mode)
5. [Step 4: SDK Integration (Advanced)](#step-4-sdk-integration-advanced)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18+ installed
- A basic understanding of React and Next.js
- A Web3 wallet (MetaMask recommended for testing)
- Test tokens on supported chains (for testing bridges)

## Step 1: Installation

### 1.1 Install Required Packages

First, install the necessary packages for Li.Fi integration:

```bash
npm install @lifi/widget @lifi/sdk
```

Or with yarn:

```bash
yarn add @lifi/widget @lifi/sdk
```

**Note:** The widget has its own wallet connection built-in, so you can start using it immediately without additional setup! Wagmi is only needed if you want to use SDK mode (Step 4).

If you plan to use SDK mode, you'll also need:

```bash
npm install wagmi viem @tanstack/react-query
```

Or with yarn:

```bash
yarn add wagmi viem @tanstack/react-query
```

**Why @tanstack/react-query?**

- Wagmi uses React Query internally for state management
- It handles caching, refetching, and synchronization of wallet data

## Step 2: Widget Integration (Simplest)

The Li.Fi widget is the easiest way to integrate cross-chain bridging. It handles all UI, wallet connection, and functionality internally - no additional setup required!

### 2.1 Enable the Widget Component

1. Open `components/LifiWidget.tsx`
2. The widget is already configured and ready to use
3. The widget will automatically appear when you select "Widget" mode in the UI

The widget component uses dynamic import to avoid SSR hydration issues and includes proper loading states.

### 2.2 Widget Features

The widget includes everything you need:

- **Built-in wallet connection** - No need to set up wagmi for widget mode
- Chain selection
- Token selection
- Quote fetching
- Transaction execution
- Status updates
- Transaction history

### 2.3 Configure Widget Theme (Optional)

You can customize the widget theme to match your design by editing the `widgetConfig` in `components/LifiWidget.tsx`:

```tsx
const widgetConfig: WidgetConfig = {
  integrator: "Your integrator name",
  theme: {
    container: {
      border: "none",
      borderRadius: "16px",
    },
    // Add more theme customization here
  },
};
```

See the [Li.Fi Widget documentation](https://docs.li.fi/widget/install-widget) for more customization options.

### 2.4 Test the Widget

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Click the "Widget" tab
4. The widget will appear with its own "Connect Wallet" button
5. Connect your wallet through the widget
6. Try bridging a small amount of tokens

**That's it!** The widget works completely independently and doesn't require any wagmi setup.

## Step 3: Wagmi Setup (For SDK Mode)

**Important:** This step is only needed if you want to use SDK mode (Step 4). The widget mode (Step 2) works without wagmi since it has its own wallet connection.

If you want to build a custom UI using the SDK, you'll need to set up wagmi for wallet management.

### 3.1 Configure WalletConnect (Optional - You Can Skip This)

**Note:** WalletConnect is completely optional! The default setup uses `injected()` and `metaMask()` connectors, which work with any browser wallet (MetaMask, Brave, etc.) without any additional configuration.

If you want to use WalletConnect (for mobile wallet connections), you'll need a project ID:

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your project ID
4. Add it to your `.env.local` file:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id-here
```

### 3.2 Enable Wagmi Provider

1. Open `lib/wagmi.ts` and uncomment the wagmi configuration:

   - Uncomment the imports (`createConfig`, `http`, chains, connectors)
   - Uncomment the `wagmiConfig` export
   - Remove or comment out the placeholder export

2. Open `app/providers.tsx` - the WagmiProvider is already configured with proper SSR handling:

   - The `QueryClient` is set up with proper SSR configuration to avoid hydration errors
   - The providers are already wrapped correctly

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

### 3.3 Enable Wallet Hook

1. Open `hooks/useWallet.ts` and uncomment the wallet hook:
   - Uncomment the import statement: `import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";`
   - Uncomment all the hook calls inside the function
   - Uncomment the return statement with actual values
   - Remove the placeholder return statement

### 3.4 Connect Wallet in Main Page (For SDK Mode)

1. Open `app/page.tsx`
2. The wallet connection button is already set up and will only show in SDK mode
3. The button automatically appears when you switch to SDK mode

After completing these steps, your wallet connection should work in SDK mode! The widget mode doesn't need this setup.

## Step 4: SDK Integration (Advanced)

The SDK approach gives you full control over the UI while using Li.Fi's routing and execution logic. This requires wagmi setup from Step 3.

### 4.1 Enable Li.Fi SDK Configuration

1. Open `lib/lifi/config.ts`
2. The SDK v3 configuration is already set up using `createConfig` from `@lifi/sdk`
3. Replace integrator with your actual app name
4. Optionally add an API key for higher rate limits: `apiKey: process.env.NEXT_PUBLIC_LIFI_API_KEY`
5. Optionally configure custom RPC URLs for better reliability

**Note:** SDK v3 uses `createConfig()` instead of instantiating a class. The configuration is global and doesn't need to be exported.

### 4.2 Enable Li.Fi Hooks

1. Open `lib/lifi/hooks.ts`
2. The hooks are already implemented using SDK v3 methods:
   - `getChains()` - fetches available chains
   - `getTokens()` - fetches tokens for a chain
   - `getQuote()` - gets bridge quotes
   - `executeRoute()` - executes bridge transactions
3. The hooks will now fetch real data from Li.Fi

### 4.3 Update BridgeCard Component

1. Open `components/BridgeCard.tsx`
2. Uncomment all the STEP 4 sections:
   - Import statements for Li.Fi hooks
   - Hook calls
   - Quote fetching logic
   - Bridge execution logic

### 4.4 Update Chain and Token Selectors

The ChainSelector and TokenSelector components will automatically use real data once the hooks are enabled. No changes needed!

### 4.5 Test SDK Integration

1. Make sure all STEP 4 sections are uncommented
2. Ensure wagmi is set up (Step 3)
3. Start your development server
4. Navigate to `http://localhost:3000`
5. Click the "SDK" tab
6. Connect your wallet using the header button
7. Select chains and tokens
8. Enter an amount
9. Click "Bridge Tokens"

## Testing

### Test Scenarios

1. **Widget Mode:**

   - No wagmi setup required
   - Connect wallet through widget's built-in button
   - Select source and destination chains
   - Select tokens
   - Enter amount
   - Execute bridge
   - Verify transaction on block explorer

2. **SDK Mode:**
   - Requires wagmi setup (Step 3)
   - Connect wallet using header button
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
- The widget uses dynamic import with `ssr: false` to avoid hydration issues

### Hydration Errors

- The widget component uses `dynamic` import with `ssr: false` to prevent SSR hydration mismatches
- If you see hydration errors, ensure the widget is only rendered client-side
- Check that `QueryClient` in `app/providers.tsx` uses the proper SSR-safe singleton pattern

### Widget Too Small

- The widget container is set to `max-w-[600px]` for optimal display
- You can adjust the container size in `components/LifiWidget.tsx`
- The widget will automatically size its content

### Wallet Not Connecting (SDK Mode)

- Verify wagmi is properly configured (Step 3)
- Check that `lib/wagmi.ts` is uncommented
- Ensure `app/providers.tsx` wraps your app
- Try a different wallet connector
- **Note:** Widget mode has its own wallet connection and doesn't need wagmi

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
- [Li.Fi Widget Docs](https://docs.li.fi/widget/install-widget)
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
