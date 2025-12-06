# Video Script: Getting Started with Li.Fi Integration

This script is designed for recording a tutorial video on integrating Li.Fi into a Next.js bridge application.

## Video Structure

1. Introduction (30 seconds)
2. Project Overview (1 minute)
3. Step 1: Installation (2 minutes)
4. Step 2: Widget Integration (3 minutes)
5. Step 3: SDK Integration (5 minutes)
6. Testing & Demo (3 minutes)
7. Conclusion (30 seconds)

**Total Estimated Time: ~15 minutes**

---

## Script

### 1. Introduction (0:00 - 0:30)

**[Screen: Project repository]**

"Hey everyone! Welcome to this tutorial on getting started with Li.Fi integration. Today, we're going to build a cross-chain bridge application using Next.js and Li.Fi. We'll cover both the widget approach, which is the simplest way to get started, and the SDK approach, which gives you more control.

Let me show you what we're building today."

**[Screen: Show running application with toggle]**

"This is our bridge application. Notice we have a toggle here that lets us switch between Widget mode and SDK mode. We'll implement both approaches step by step."

---

### 2. Project Overview (0:30 - 1:30)

**[Screen: File structure]**

"Let's start by understanding the project structure. This is a Next.js application with TypeScript. We have:

- Components for the bridge UI
- Mock data that we'll replace with real Li.Fi data
- Hooks and utilities ready for Li.Fi integration
- Documentation files with step-by-step guides

The project is structured so you can follow along easily. All the integration points are marked with comments like 'STEP 1', 'STEP 2', and 'STEP 3'."

**[Screen: Show key files]**

"Notice that most of the Li.Fi integration code is commented out with TODO markers. This is intentional - we'll uncomment and configure it step by step as we go through the integration."

---

### 3. Step 1: Installation (1:30 - 3:30)

**[Screen: Terminal]**

"Let's start with Step 1: Installation. We need to install several packages:

1. Wagmi and Viem for wallet connections
2. React Query for state management
3. The Li.Fi widget package
4. The Li.Fi SDK package"

**[Type in terminal]**

```bash
npm install wagmi viem @tanstack/react-query
npm install @lifi/widget
npm install @lifi/sdk
```

**[Screen: package.json]**

"Great! Now let's check our package.json to see the new dependencies. You can see all the packages we just installed."

**[Screen: lib/wagmi.ts]**

"Next, we need to configure wagmi. Let's open the wagmi configuration file. Notice it's currently commented out. We'll uncomment it now."

**[Uncomment wagmi config]**

"I'm uncommenting the wagmi configuration. This sets up support for multiple chains and wallet connectors. If you want to use WalletConnect, you'll need to add a project ID to your environment variables."

**[Screen: app/providers.tsx]**

"Now let's enable the WagmiProvider. This wraps our app and enables wallet functionality throughout the application."

**[Uncomment Providers]**

"Perfect! Now we need to make sure our app uses this provider. Let's check the layout file."

**[Screen: app/layout.tsx]**

"If it's not already wrapped, we need to add the Providers component here. Let me check... Good, it looks like it's already set up or we need to add it."

**[Add Providers if needed]**

"Excellent! Step 1 is complete. We've installed all the necessary packages and configured wallet support."

---

### 4. Step 2: Widget Integration (3:30 - 6:30)

**[Screen: components/LifiWidget.tsx]**

"Now let's move to Step 2: Widget Integration. This is the simplest approach. The Li.Fi widget handles all the UI and functionality for us.

Let's open the LifiWidget component. You can see there's commented code here that we need to uncomment."

**[Uncomment widget code]**

"I'm uncommenting the widget initialization code. This creates a new Li.Fi widget instance with our custom styling to match the app's theme."

**[Screen: Show widget configuration]**

"Notice how we're configuring the widget with our brand colors - purple and blue. The widget will automatically handle:
- Chain selection
- Token selection  
- Quote fetching
- Transaction execution
- Status updates

All of this is built into the widget, so we don't need to implement any of this ourselves."

**[Screen: Running app, Widget tab]**

"Let's test it! I'll start the dev server and navigate to the Widget tab."

**[Run npm run dev, show widget]**

"Perfect! The widget is now loaded. Let me connect my wallet and show you how it works."

**[Connect wallet, demonstrate widget]**

"As you can see, the widget provides a complete interface for bridging. I can select chains, choose tokens, enter amounts, and execute bridges - all without writing any custom bridge logic."

"This is perfect if you want a quick integration or if you're happy with Li.Fi's default UI."

---

### 5. Step 3: SDK Integration (6:30 - 11:30)

**[Screen: Switch to SDK tab]**

"Now let's move to Step 3: SDK Integration. This gives us full control over the UI while using Li.Fi's powerful routing and execution logic.

Let's switch to the SDK tab. You can see our custom UI, but it's currently using mock data. Let's connect it to real Li.Fi data."

**[Screen: lib/lifi/config.ts]**

"First, let's enable the Li.Fi SDK configuration. I'll uncomment this and add our app name."

**[Uncomment and configure]**

"Good! Now the SDK is initialized."

**[Screen: lib/lifi/hooks.ts]**

"Next, let's enable the custom hooks. These hooks will fetch real data from Li.Fi:
- useLiFiChains - gets available chains
- useLiFiTokens - gets tokens for a chain
- useLiFiQuote - gets bridge quotes
- useLiFiExecute - executes bridge transactions"

**[Uncomment hooks one by one]**

"I'm uncommenting each hook. Notice how they handle loading states and errors - this is important for a good user experience."

**[Screen: hooks/useWallet.ts]**

"Now let's enable the wallet hook. This connects our UI to wagmi for wallet functionality."

**[Uncomment wallet hook]**

"Perfect! Now our wallet connection will work."

**[Screen: components/BridgeCard.tsx]**

"Now for the main part - let's update the BridgeCard component to use these hooks. I'll uncomment all the STEP 3 sections."

**[Uncomment imports]**

"First, the imports..."

**[Uncomment hook calls]**

"Then the hook calls to fetch real data..."

**[Uncomment quote logic]**

"The quote fetching logic that runs when the user enters an amount..."

**[Uncomment bridge execution]**

"And finally, the bridge execution function that will actually perform the transaction."

**[Screen: app/page.tsx - Connect Wallet button]**

"Let's also update the Connect Wallet button in the header to actually work. I'll import the useWallet hook and connect it."

**[Update Connect Wallet button]**

"Perfect! Now the wallet connection will work properly."

**[Screen: Running app, SDK tab]**

"Let's test the SDK integration. I'll refresh the page and switch to SDK mode."

**[Show SDK mode working]**

"Great! Now you can see:
- Real chains loading from Li.Fi
- Real tokens for the selected chain
- Real quotes when entering amounts
- The ability to execute actual bridge transactions

This gives us complete control over the UI while leveraging Li.Fi's routing intelligence."

---

### 6. Testing & Demo (11:30 - 14:30)

**[Screen: Both modes side by side]**

"Let's do a quick comparison and test both approaches."

**[Switch between Widget and SDK]**

"You can see both modes working. The Widget mode is simpler and faster to implement, while SDK mode gives you more customization options."

**[Screen: Execute a test bridge]**

"Let me demonstrate a test bridge. I'll use a small amount on a testnet."

**[Show bridge flow]**

"Notice how:
1. I select the source chain and token
2. Enter an amount
3. The quote appears automatically
4. I can see the estimated receive amount and fees
5. When I click Bridge, it prompts my wallet
6. After confirmation, the transaction is submitted

The transaction will be processed by Li.Fi's routing system, which finds the best path across chains."

**[Screen: Transaction status]**

"You can monitor the transaction status. Li.Fi handles the complexity of cross-chain transfers, including any necessary swaps or intermediate steps."

---

### 7. Conclusion (14:30 - 15:00)

**[Screen: Final overview]**

"That's it! We've successfully integrated Li.Fi using both the Widget and SDK approaches.

**Key Takeaways:**
- Widget mode is perfect for quick integration
- SDK mode gives you full UI control
- Both approaches use Li.Fi's powerful routing
- The code is well-documented with step-by-step comments

**Next Steps:**
- Customize the UI to match your brand
- Add error handling and user feedback
- Implement transaction history
- Deploy to production

Check out the integration guide in the docs folder for more details, and don't forget to star the Li.Fi repository if you found this helpful!

Thanks for watching, and happy bridging!"

---

## Production Notes

### Things to Highlight

1. **Code Comments**: Emphasize how the code is marked with STEP 1, STEP 2, STEP 3 comments
2. **Progressive Enhancement**: Show how you can start with Widget and move to SDK
3. **Error Handling**: Mention that production apps should add more error handling
4. **Testing**: Always test on testnets first
5. **Security**: Remind viewers to never commit private keys or API keys

### Common Questions to Address

- "Which approach should I use?" → Widget for speed, SDK for control
- "Do I need both?" → No, choose based on your needs
- "Can I customize the widget?" → Limited customization, use SDK for full control
- "What chains are supported?" → Check Li.Fi docs for the latest list
- "How do I handle errors?" → Add try-catch blocks and user feedback

### Editing Tips

- Add text overlays showing which step you're on
- Use split screen to show code and running app
- Add zoom-ins for important code sections
- Include timestamps in the description
- Add chapter markers for easy navigation


