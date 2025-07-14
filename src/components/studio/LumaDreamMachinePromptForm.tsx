"use client";
import { useState, useEffect } from "react";
import { Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LumaPromptFormProps {
  model: string;
  onPromptGenerated: (prompt: string) => void;
}

// Helper for the small inline bullseye icon
const InlineIcon = <Target className="inline h-3 w-3 stroke-red-600" />;

// Updated PromptField component that now includes the description
const PromptField = ({ label, placeholder, value, onChange, description }: { label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, description: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label htmlFor={label} className="font-semibold">{label}</Label>
    <div className="relative">
      <Textarea
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="min-h-[80px] pr-10"
      />
      <button
        type="button"
        onClick={() => console.log(`Enhance ${label}`)}
        className="absolute top-2.5 right-2.5 p-1 rounded-full bg-background/50"
        title={`Enhance ${label} with AI`}
      >
        <Target size={20} className="text-red-500" />
      </button>
    </div>
    {/* The description is now rendered here */}
    <p className="text-xs text-muted-foreground pt-1">{description}</p>
  </div>
);

// Reusable component for dropdown menus
const SelectField = ({ label, placeholder, value, onChange, options }: { label: string, placeholder: string, value: string, onChange: (value: string) => void, options: string[] }) => (
  <div className="space-y-1.5">
    <Label htmlFor={label}>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={label}><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
    </Select>
  </div>
);

const lightingOptions = ["Cinematic Lighting", "Natural Daylight", "Film Noir", "Golden Hour", "Blue Hour", "High-Key Lighting", "Low-Key Lighting", "Neon Lit", "Dramatic Rim Lighting"];
const cameraShotOptions = ["Medium Shot", "Close-up", "Extreme Close-up", "Wide Shot", "Establishing Shot", "Full Shot", "Cowboy Shot", "Point of View (POV)"];
const cameraMotionOptions = ["Static Camera", "Slow Pan Left", "Slow Pan Right", "Tilt Up", "Tilt Down", "Dolly Zoom In", "Handheld Shaky Cam", "Sweeping Aerial Shot"];
const artisticStyleOptions = ["Photorealistic", "Cinematic 35mm film", "Anime Aesthetic", "Watercolor Style", "Claymation", "Surrealism", "Impressionistic", "Cyberpunk"];

export default function LumaDreamMachinePromptForm({ onPromptGenerated }: LumaPromptFormProps) {
  const [character, setCharacter] = useState("");
  const [scene, setScene] = useState("");
  const [lighting, setLighting] = useState("");
  const [cameraShot, setCameraShot] = useState("");
  const [cameraMotion, setCameraMotion] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    const parts = [ character, scene, lighting, cameraShot, cameraMotion, style ];
    const finalPrompt = parts.filter(Boolean).join(', ');
    onPromptGenerated(finalPrompt);
  }, [character, scene, lighting, cameraShot, cameraMotion, style, onPromptGenerated]);

  return (
    <div className="space-y-6">
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>How Luma Works</AlertTitle>
        <AlertDescription>
          Luma creates video from a single descriptive sentence. Fill out the fields below and our AI will engineer the perfect prompt for you.
        </AlertDescription>
      </Alert>

      <PromptField
        label="Character Description"
        placeholder="Who or what is the focus? e.g. 'A curious fox exploring ancient ruins'"
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        description={
          <>Click the {InlineIcon} to generate 3 character variants.</>
        }
      />

      <PromptField
        label="Scene Description"
        placeholder="Describe the environment... e.g. 'A snowy mountain peak at sunrise'"
        value={scene}
        onChange={(e) => setScene(e.target.value)}
        description={
          <>Click the {InlineIcon} to generate 3 scene variants.</>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Lighting Style" placeholder="Select a lighting style" value={lighting} onChange={setLighting} options={lightingOptions} />
        <SelectField label="Artistic Style" placeholder="Select an artistic style" value={style} onChange={setStyle} options={artisticStyleOptions} />
        <SelectField label="Camera Shot" placeholder="Select a shot type" value={cameraShot} onChange={setCameraShot} options={cameraShotOptions} />
        <SelectField label="Camera Motion" placeholder="Select a camera motion" value={cameraMotion} onChange={setCameraMotion} options={cameraMotionOptions} />
      </div>

      <Button className="w-full py-6 text-base font-medium mt-4">
        ✨ Enhance and Generate Prompt
      </Button>
    </div>
  );
}