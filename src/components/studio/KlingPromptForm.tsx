"use client";

import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface KlingPromptFormProps {
  model: string;
  onPromptGenerated: (prompt: string) => void;
}

const BullseyeBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute top-2.5 right-2.5 rounded-full bg-white/80 p-1 shadow focus:outline-none"
  >
    <Target className="h-4 w-4 stroke-red-600" />
  </button>
);

const PromptField = ({
  placeholder,
  value,
  onChange,
  onBullseyeClick,
  fieldType,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBullseyeClick: () => void;
  fieldType: "character" | "scene";
}) => {
  const InlineIcon = <Target className="inline h-3 w-3 stroke-red-600" />;

  return (
    <div className="space-y-1">
      <div className="relative">
        <Textarea
          rows={6}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pr-12"
        />
        <BullseyeBtn onClick={onBullseyeClick} />
      </div>
      <p className="text-xs text-muted-foreground">
        Click the {InlineIcon} to generate 3 AI-tuned {fieldType} variants.
      </p>
    </div>
  );
};

const aspectRatioOptions = ["16:9", "9:16", "1:1", "4:3"];
// ... other Kling options ...

const KlingPromptForm: React.FC<KlingPromptFormProps> = ({ onPromptGenerated }) => {
  const [scene, setScene] = useState("");
  const [character, setCharacter] = useState("");
  // ... other Kling state hooks ...

  const composed = [
    // ... prompt composing logic ...
    scene ? `. Scene: ${scene}.` : "",
    character ? ` Character: ${character}.` : ""
  ].filter(Boolean).join(" ");

  useEffect(() => {
    onPromptGenerated(composed.trim());
  }, [composed, onPromptGenerated]);

  const enhanceField = (field: "scene" | "character") => console.log(`Enhance ${field}`);

  return (
    <section className="space-y-8">
      <PromptField
        placeholder="Character Description — who or what is the focus?"
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        onBullseyeClick={() => enhanceField("character")}
        fieldType="character"
      />
      <PromptField
        placeholder="Scene Description — describe the environment"
        value={scene}
        onChange={(e) => setScene(e.target.value)}
        onBullseyeClick={() => enhanceField("scene")}
        fieldType="scene"
      />
      {/* ... Other Kling form controls ... */}
      <Button className="w-full py-6 text-base font-medium" onClick={() => onPromptGenerated(composed.trim())}>
        Generate Prompt
      </Button>
    </section>
  );
};

export default KlingPromptForm;