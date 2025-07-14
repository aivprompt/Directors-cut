"use client";

import { useState } from "react";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LumaPromptFormProps {
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
  fieldType: "character" | "scene";
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

const LumaPromptForm: React.FC<LumaPromptFormProps> = ({ model, onPromptGenerated }) => {
  const [character, setCharacter] = useState("");
  const [scene, setScene] = useState("");
  // ... other Luma state hooks ...

  const askVariant = async (field: "character" | "scene") => { /* ... API call logic ... */ };
  const generatePrompt = async () => { /* ... API call logic ... */ };

  return (
    <div className="space-y-6">
      <PromptField
        label="Character Description"
        placeholder="Who or what is the focus? e.g. 'A curious fox exploring ancient ruins'"
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        onBullseyeClick={() => askVariant("character")}
        fieldType="character"
      />
      <PromptField
        label="Scene Description"
        placeholder="Describe the environment... e.g. 'A snowy mountain peak at sunrise'"
        value={scene}
        onChange={(e) => setScene(e.target.value)}
        onBullseyeClick={() => askVariant("scene")}
        fieldType="scene"
      />
      {/* ... Other Luma form controls ... */}
      <Button onClick={generatePrompt} className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-gray-900">
        Generate Prompt
      </Button>
    </div>
  );
}

export default LumaPromptForm;