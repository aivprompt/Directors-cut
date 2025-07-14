"use client";

import { useState } from "react";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PixversePromptFormProps {
  model: string;
  onPromptGenerated: (prompt: string) => void;
}

const PromptField = ({
  label,
  placeholder,
  value,
  onChange,
  onBullseyeClick,
  fieldType,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBullseyeClick: () => void;
  fieldType: "scene" | "subject";
}) => {
  const InlineIcon = <Target className="inline h-4 w-4 text-red-500" />;
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <div className="relative">
        <textarea
          rows={3}
          className="w-full p-2 border rounded pr-10"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={onBullseyeClick}
          className="absolute top-2.5 right-2.5 p-1"
          title={`Generate ${fieldType} variants`}
        >
          <Target size={20} className="text-red-500" />
        </button>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Click the {InlineIcon} to generate 3 {fieldType} variants.
      </p>
    </div>
  );
};

const PixversePromptForm: React.FC<PixversePromptFormProps> = ({ model, onPromptGenerated }) => {
  const [scene, setScene] = useState("");
  const [subject, setSubject] = useState("");
  // ... other Pixverse state hooks ...

  const askVariant = async (field: "scene" | "subject") => { /* ... API call logic ... */ };
  const generatePrompt = async () => { /* ... API call logic ... */ };

  return (
    <div className="space-y-6">
      <PromptField
        label="Scene Description"
        placeholder="Describe the environment & mood... e.g. 'A misty forest at dawn...'"
        value={scene}
        onChange={(e) => setScene(e.target.value)}
        onBullseyeClick={() => askVariant("scene")}
        fieldType="scene"
      />
      <PromptField
        label="Subject / Character"
        placeholder="Who or what is the focus? e.g. 'A weary samurai...'"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        onBullseyeClick={() => askVariant("subject")}
        fieldType="subject"
      />
      {/* ... Other Pixverse form controls ... */}
      <Button onClick={generatePrompt} className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-gray-900">
        Generate Prompt
      </Button>
    </div>
  );
}

export default PixversePromptForm;