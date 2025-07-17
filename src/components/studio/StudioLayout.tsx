import React from 'react';

interface StudioLayoutProps {
  controls: React.ReactNode;
  preview: React.ReactNode;
  tips: React.ReactNode;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ controls, preview, tips }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Column: All user inputs */}
      <div className="md:col-span-2 space-y-6">
        {controls}
      </div>

      {/* Right Column: Prompt preview and tips */}
      <div className="space-y-6">
        {preview}
        {tips}
      </div>
    </div>
  );
};