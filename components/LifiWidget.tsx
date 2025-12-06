'use client';

// STEP 2: Widget Integration
// This component wraps the Li.Fi widget for the simplest integration approach
// The widget handles all UI and functionality internally

import { useEffect, useRef } from 'react';

export default function LifiWidget() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // STEP 2: Load Li.Fi Widget
    // TODO: After installing @lifi/widget, uncomment and configure the widget below
    // 
    // import { LiFiWidget } from '@lifi/widget';
    // 
    // const widget = new LiFiWidget({
    //   containerStyle: {
    //     width: '100%',
    //     maxWidth: '480px',
    //     margin: '0 auto',
    //   },
    //   theme: {
    //     palette: {
    //       primary: {
    //         main: '#8b5cf6', // purple-primary
    //       },
    //       secondary: {
    //         main: '#3b82f6', // blue-primary
    //       },
    //     },
    //   },
    // });
    // 
    // widget.mount(widgetContainerRef.current);
    // 
    // return () => {
    //   widget.unmount();
    // };
  }, []);

  return (
    <div className="w-full max-w-[480px] mx-auto">
      <div className="backdrop-blur-xl bg-card-bg border border-card-border rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-primary to-blue-primary bg-clip-text text-transparent">
            Bridge Assets
          </h2>
        </div>

        {/* STEP 2: Widget Container */}
        {/* The Li.Fi widget will be mounted here after installation */}
        <div 
          ref={widgetContainerRef}
          className="min-h-[500px] flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl"
        >
          <div className="text-center p-8">
            <p className="text-gray-400 mb-4">
              Li.Fi Widget will appear here
            </p>
            <p className="text-sm text-gray-500">
              Follow Step 2 in the integration guide to install and configure the widget
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Li.Fi Widget will appear here after installation
        </p>
      </div>
    </div>
  );
}

