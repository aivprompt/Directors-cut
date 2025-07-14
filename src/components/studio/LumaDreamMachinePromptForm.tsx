"use client";
import { useState, useEffect } from "react";
import { Target, Lightbulb } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LumaPromptFormProps {
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
    const parts = [
      prompt,
      negativePrompt ? `--no ${negativePrompt}` : '',
      seed ? `--seed ${seed}` : '',
      aspectRatio ? `--ar ${aspectRatio}` : '',
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
            placeholder="Combine everything in one descriptive sentence: [Subject] [Action], [Scene], [Lighting], [Camera Move]"
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

      {/* Pro-Tip Alert Box */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Pro-Tip: Direct with Words</AlertTitle>
        <AlertDescription>
          For Luma, describe camera moves and lighting directly in your prompt. For example: "...the camera slowly zooms in" or "...in dramatic, high-contrast lighting."
        </AlertDescription>
      </Alert>

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