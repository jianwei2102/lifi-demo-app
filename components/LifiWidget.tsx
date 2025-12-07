"use client";

// STEP 2: Widget Integration
// This component wraps the Li.Fi widget for the simplest integration approach
// The widget handles all UI and functionality internally

// TODO: After installing @lifi/widget, uncomment the imports and widget code below
import dynamic from "next/dynamic";
import { WidgetConfig } from "@lifi/widget";

// STEP 2: Dynamically import widget to avoid SSR hydration issues
// This is the recommended approach for Next.js to prevent hydration errors
// TODO: Uncomment after installing @lifi/widget
const LiFiWidget = dynamic(
  () => import("@lifi/widget").then((mod) => mod.LiFiWidget),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading bridge widget...</p>
        </div>
      </div>
    ),
  }
);

// TODO: Uncomment after installing @lifi/widget
const widgetConfig: WidgetConfig = {
  integrator: "Your integrator name",
  theme: {
    container: {
      border: "none",
      borderRadius: "16px",
    },
  },
};

export default function LifiWidget() {
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="backdrop-blur-xl bg-card-bg border border-card-border rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-primary to-blue-primary bg-clip-text text-transparent">
            Bridge Assets
          </h2>
        </div>

        {/* STEP 2: Widget Container */}
        {/* TODO: After installing @lifi/widget, uncomment the widget below */}
        {/* <div className="min-h-[500px] flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="text-center p-8">
            <p className="text-gray-400 mb-4">Li.Fi Widget will appear here</p>
            <p className="text-sm text-gray-500">
              Follow Step 2 in the integration guide to install and configure
              the widget
            </p>
          </div>
        </div> */}
        {/* TODO: Uncomment after installing @lifi/widget */}
        <div className="w-full">
          <LiFiWidget integrator="Lifi-demo-tutorial" config={widgetConfig} />
        </div>
      </div>
    </div>
  );
}
