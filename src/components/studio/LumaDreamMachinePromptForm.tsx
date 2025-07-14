"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface LumaPromptFormProps {
  model: string;
  onPromptGenerated: (prompt: string) => void;
}

export default function LumaDreamMachinePromptForm({ onPromptGenerated }: LumaPromptFormProps) {
  // State for each separate input field
  const [character, setCharacter] = useState("");
  const [scene, setScene] = useState("");
  const [lighting, setLighting] = useState("");
  const [camera, setCamera] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    // This temporarily combines the fields. Later, this data will be sent to your AI.
    const parts = [
      character,
      scene,
      lighting,
      camera,
      style,
    ];
    const finalPrompt = parts.filter(Boolean).join(', ');
    onPromptGenerated(finalPrompt);
  }, [character, scene, lighting, camera, style, onPromptGenerated]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Describe the key elements of your video. Our AI Prompt Engineer will weave them into a perfect, descriptive prompt for Luma.
      </p>

      {/* Character Field */}
      <div className="space-y-1.5">
        <Label htmlFor="luma-character" className="font-semibold">Character / Subject</Label>
        <Textarea
          id="luma-character"
          placeholder="e.g., A grizzled old fisherman mending his nets"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          className="min-h-[60px]"
        />
      </div>

      {/* Scene Field */}
      <div className="space-y-1.5">
        <Label htmlFor="luma-scene" className="font-semibold">Scene / Environment</Label>
        <Textarea
          id="luma-scene"
          placeholder="e.g., Inside a rustic, weathered cabin on a stormy night"
          value={scene}
          onChange={(e) => setScene(e.target.value)}
          className="min-h-[60px]"
        />
      </div>

      {/* Lighting Field */}
      <div className="space-y-1.5">
        <Label htmlFor="luma-lighting" className="font-semibold">Lighting</Label>
        <Textarea
          id="luma-lighting"
          placeholder="e.g., Warm, dusty sunlight streaming through a single window"
          value={lighting}
          onChange={(e) => setLighting(e.target.value)}
          className="min-h-[60px]"
        />
      </div>

      {/* Camera Field */}
      <div className="space-y-1.5">
        <Label htmlFor="luma-camera" className="font-semibold">Camera Shot / Motion</Label>
        <Textarea
          id="luma-camera"
          placeholder="e.g., The camera slowly pushes in on his face, capturing his thoughtful expression"
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
          className="min-h-[60px]"
        />
      </div>
      
      {/* Style Field */}
      <div className="space-y-1.5">
        <Label htmlFor="luma-style" className="font-semibold">Artistic Style</Label>
        <Textarea
          id="luma-style"
          placeholder="e.g., Cinematic, 35mm film, hyperrealistic, anime aesthetic"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="min-h-[60px]"
        />
      </div>

      <Button className="w-full py-6 text-base font-medium mt-4">
        Generate Luma Prompt
      </Button>
    </div>
  );
}