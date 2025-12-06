'use client';

interface IntegrationToggleProps {
  mode: 'widget' | 'sdk';
  onModeChange: (mode: 'widget' | 'sdk') => void;
}

export default function IntegrationToggle({ mode, onModeChange }: IntegrationToggleProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-white/[0.02] border border-white/10 rounded-xl">
      <button
        onClick={() => onModeChange('widget')}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          mode === 'widget'
            ? 'bg-gradient-to-r from-purple-primary to-blue-primary text-white shadow-lg'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        Widget
      </button>
      <button
        onClick={() => onModeChange('sdk')}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          mode === 'sdk'
            ? 'bg-gradient-to-r from-purple-primary to-blue-primary text-white shadow-lg'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        SDK
      </button>
    </div>
  );
}

