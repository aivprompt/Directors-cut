"use client";
import { useState, useEffect } from "react";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface LumaPromptFormProps {
  // The model prop is kept for consistency, though not used in this prompt builder
  model: string;
  onPromptGenerated: (prompt: string) => void;
}

const aspectOptions = ["16:9", "9:16", "1:1", "4:3", "3:2"];

export default function LumaDreamMachinePromptForm({ onPromptGenerated }: LumaPromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [seed, setSeed] = useState<number | null>(null);
  const [guidance, setGuidance] = useState(8);
  const [aspectRatio, setAspectRatio] = useState("16:9");

  useEffect(() => {
    // Luma responds well to natural language prompts with parameter flags
    const parts = [
      prompt,
      negativePrompt ? `--no ${negativePrompt}` : '',
      seed ? `--seed ${seed}` : '',
      aspectRatio ? `--ar ${aspectRatio}` : '',
      // Assuming a guidance scale parameter might exist as --gs or similar
      guidance ? `--gs ${guidance}` : '' 
    ];
    const finalPrompt = parts.filter(Boolean).join(' ').trim();
    onPromptGenerated(finalPrompt);
  }, [prompt, negativePrompt, seed, guidance, aspectRatio, onPromptGenerated]);

  return (
    <div className="space-y-6">
      {/* Main Prompt */}
      <div className="space-y-1">
        <Label className="font-medium text-lg">Prompt</Label>
        <div className="relative">
          <Textarea
            rows={5}
            className="w-full p-2 border rounded pr-10"
            placeholder="A highly detailed description of your scene, character, and action. e.g., 'A majestic eagle soaring through a stormy sky, cinematic lighting'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="button"
            onClick={() => console.log("Enhance Luma Prompt")}
            className="absolute top-2.5 right-2.5 p-1"
            title="Generate prompt variants"
          >
            <Target size={20} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Negative Prompt */}
      <div className="space-y-1">
        <Label className="font-medium">Negative Prompt</Label>
        <Input
          placeholder="e.g., blurry, watermark, text, deformed"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
        />
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Label htmlFor="luma-aspect-ratio">Aspect Ratio</Label>
          <Select value={aspectRatio} onValueChange={setAspectRatio}>
            <SelectTrigger id="luma-aspect-ratio">
              <SelectValue placeholder="Select ratio" />
            </SelectTrigger>
            <SelectContent>
              {aspectOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="luma-seed">Seed</Label>
          <Input
            id="luma-seed"
            type="number"
            placeholder="Random"
            value={seed ?? ""}
            onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : null)}
          />
        </div>
      </div>

      {/* Guidance Scale Slider */}
      <div className="space-y-1">
        <Label className="font-medium">Guidance Scale ({guidance})</Label>
        <p className="text-xs text-muted-foreground">
          Lower values increase creativity, higher values adhere more strictly to the prompt.
        </p>
        <Slider
          min={1}
          max={20}
          step={0.5}
          value={[guidance]}
          onValueChange={([v]) => setGuidance(v)}
          className="mt-2"
        />
      </div>

      <Button className="w-full py-6 text-base font-medium mt-4">
        Generate Prompt
      </Button>
    </div>
  );
}