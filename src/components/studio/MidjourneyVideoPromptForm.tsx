"use client";

import { useState } from "react";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MidjourneyVideoPromptFormProps {
  model: string;
  onPromptGenerated: (prompt: string) => void;
}

const PromptField = ({
  label,
  placeholder,
  value,
  onChange,
  onBullseyeClick,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBullseyeClick: () => void;
}) => {
  const InlineIcon = <Target className="inline h-4 w-4 text-red-500" />;
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <div className="relative">
        <textarea
          rows={4}
          className="w-full p-2 border rounded pr-10"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={onBullseyeClick}
          className="absolute top-2.5 right-2.5 p-1"
          title="Generate prompt variants"
        >
          <Target size={20} className="text-red-500" />
        </button>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Click the {InlineIcon} to generate 3 prompt variants.
      </p>
    </div>
  );
};

const MidjourneyVideoPromptForm: React.FC<MidjourneyVideoPromptFormProps> = ({ model, onPromptGenerated }) => {
  const [prompt, setPrompt] = useState("");
  // ... other Midjourney state hooks ...

  const askVariants = async () => { /* ... API call logic ... */ };
  const generatePrompt = async () => { /* ... API call logic ... */ };

  return (
    <div className="space-y-6">
      <PromptField
        label="Prompt Text"
        placeholder="Enter your video prompt... e.g. 'A serene waterfall at sunrise...'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onBullseyeClick={askVariants}
      />
      {/* ... Other Midjourney form controls ... */}
      <Button onClick={generatePrompt} className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-gray-900">
        Generate Prompt
      </Button>
    </div>
  );
}

export default MidjourneyVideoPromptForm;