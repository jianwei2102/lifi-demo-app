# Web3 Bridge - Li.Fi Integration Starter

A modern, production-ready cross-chain bridge interface built with Next.js, TypeScript, and Tailwind CSS. This starter template demonstrates how to integrate Li.Fi using both the Widget (simplest) and SDK (advanced) approaches.

![Bridge Interface](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Li.Fi](https://img.shields.io/badge/Li.Fi-Integrated-purple)

## Features

- 🎨 **Beautiful UI**: Modern, gradient-based design inspired by Jumper
- 🔄 **Dual Integration Modes**: Toggle between Widget and SDK implementations
- 🔌 **Wallet Support**: Integrated with wagmi for multi-wallet connectivity
- ⚡ **Type-Safe**: Full TypeScript support
- 📚 **Well Documented**: Step-by-step integration guide included
- 🎯 **Production Ready**: Error handling, loading states, and best practices

## Project Structure

```
lifi-bridge-tutorial/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page with toggle
│   ├── providers.tsx      # Wagmi provider setup
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── BridgeCard.tsx     # Main bridge UI (SDK mode)
│   ├── LifiWidget.tsx     # Li.Fi widget wrapper
│   ├── IntegrationToggle.tsx  # Widget/SDK toggle
│   ├── ChainSelector.tsx  # Chain selection modal
│   └── TokenSelector.tsx  # Token selection modal
├── hooks/                  # Custom React hooks
│   └── useWallet.ts       # Wallet connection hook
├── lib/                   # Utilities and configurations
│   ├── lifi/              # Li.Fi integration
│   │   ├── config.ts      # SDK configuration
│   │   ├── hooks.ts       # Custom Li.Fi hooks
│   │   └── utils.ts       # Helper functions
│   ├── wagmi.ts           # Wagmi configuration
│   └── mockData.ts        # Mock data (replaced by Li.Fi)
├── docs/                  # Documentation
│   ├── INTEGRATION_GUIDE.md  # Step-by-step integration
│   └── VIDEO_SCRIPT.md    # Video tutorial script
└── public/                # Static assets
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- A Web3 wallet (MetaMask recommended)
- Basic knowledge of React and Next.js

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd lifi-bridge-tutorial
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Li.Fi packages** (Follow Step 1 in Integration Guide)

```bash
npm install wagmi viem @tanstack/react-query
npm install @lifi/widget
npm install @lifi/sdk
```

4. **Configure environment variables** (Optional, for WalletConnect)

Create a `.env.local` file:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Integration Steps

This project is structured with step-by-step integration in mind. All integration points are marked with comments:

- **STEP 1**: Installation and wallet setup
- **STEP 2**: Widget integration (simplest approach)
- **STEP 3**: SDK integration (advanced approach)

### Quick Integration Overview

1. **Step 1: Installation**

   - Install required packages
   - Configure wagmi
   - Enable wallet providers

2. **Step 2: Widget Integration** (5 minutes)

   - Uncomment widget code in `components/LifiWidget.tsx`
   - Widget handles everything automatically

3. **Step 3: SDK Integration** (15 minutes)
   - Uncomment SDK configuration
   - Enable Li.Fi hooks
   - Connect BridgeCard to real data
   - Test bridge transactions

For detailed instructions, see [docs/INTEGRATION_GUIDE.md](./docs/INTEGRATION_GUIDE.md).

## Usage

### Widget Mode

The Widget mode provides a complete, ready-to-use bridge interface:

1. Click the "Widget" tab
2. Connect your wallet
3. Select chains and tokens
4. Enter amount and bridge

The widget handles all complexity internally.

### SDK Mode

The SDK mode gives you full control over the UI:

1. Click the "SDK" tab
2. Connect your wallet
3. Use the custom UI to select chains and tokens
4. View real-time quotes
5. Execute bridge transactions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Structure

The codebase is organized for easy understanding:

- **Components**: UI components with clear separation of concerns
- **Hooks**: Reusable logic for wallet and Li.Fi integration
- **Lib**: Configuration and utility functions
- **Docs**: Comprehensive documentation

All integration code is commented with step markers (STEP 1, STEP 2, STEP 3) to guide you through the process.

## Testing

### Test Networks

Start with testnets to avoid spending real funds:

- Sepolia (Ethereum testnet)
- Arbitrum Sepolia
- Optimism Sepolia
- Polygon Mumbai

### Test Scenarios

1. Connect wallet on different chains
2. Switch between Widget and SDK modes
3. Test chain and token selection
4. Verify quote calculations
5. Execute test bridge transactions

## Troubleshooting

### Common Issues

**Widget not loading**

- Check browser console for errors
- Verify `@lifi/widget` is installed
- Check CSP settings in `next.config.ts`

**Wallet not connecting**

- Verify wagmi configuration is uncommented
- Check that Providers wrap your app
- Try a different wallet connector

**Chains/tokens not loading**

- Ensure `@lifi/sdk` is installed
- Verify hooks are uncommented
- Check network tab for API errors

See [docs/INTEGRATION_GUIDE.md](./docs/INTEGRATION_GUIDE.md) for more troubleshooting tips.

## Documentation

- **[Integration Guide](./docs/INTEGRATION_GUIDE.md)** - Detailed step-by-step integration instructions
- **[Video Script](./docs/VIDEO_SCRIPT.md)** - Script for recording tutorial videos

## Resources

- [Li.Fi Documentation](https://docs.li.fi/)
- [Li.Fi Widget Docs](https://docs.li.fi/integration-guides/widget-integration)
- [Li.Fi SDK Docs](https://docs.li.fi/integration-guides/sdk-integration)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Next.js Documentation](https://nextjs.org/docs)

## Contributing

This is a starter template. Feel free to:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.

## Support

If you encounter issues:

1. Check the [Integration Guide](./docs/INTEGRATION_GUIDE.md)
2. Review [Li.Fi Documentation](https://docs.li.fi/)
3. Check GitHub issues
4. Reach out to the community

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Li.Fi](https://li.fi/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Wallet integration via [Wagmi](https://wagmi.sh/)

---

**Happy Bridging! 🌉**
