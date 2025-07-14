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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MidjourneyPromptFormProps {
  model: string;
  onPromptGenerated: (prompt: string) => void;
}

// Reusable component for the main prompt text area
const PromptField = ({ label, placeholder, value, onChange, description }: { label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, description: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label htmlFor={label} className="font-semibold">{label}</Label>
    <div className="relative">
      <Textarea id={label} placeholder={placeholder} value={value} onChange={onChange} className="min-h-[80px] pr-10" />
      <button type="button" onClick={() => console.log(`Enhance ${label}`)} className="absolute top-2.5 right-2.5 p-1 rounded-full bg-background/50" title={`Enhance ${label} with AI`}>
        <Target size={20} className="text-red-500" />
      </button>
    </div>
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

// Options for Midjourney parameters
const versionOptions = ["6", "5.2", "5.1", "niji 6"];
const aspectRatioOptions = ["16:9", "1:1", "9:16", "4:3", "3:2", "7:4"];
const qualityOptions = ["0.25", "0.5", "1"];
const shotOptions = ["Medium Shot", "Close-up", "Wide Shot", "Establishing Shot", "Full Body Shot"];
const angleOptions = ["Eye-level", "Low Angle Shot", "High Angle Shot", "Bird's-Eye View", "Dutch Angle"];
const lightingOptions = ["Cinematic Lighting", "Volumetric Lighting", "Rim Lighting", "Golden Hour", "Studio Lighting"];

export default function MidjourneyVideoPromptForm({ onPromptGenerated }: MidjourneyPromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [shot, setShot] = useState("");
  const [angle, setAngle] = useState("");
  const [lighting, setLighting] = useState("");
  const [version, setVersion] = useState("6");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [chaos, setChaos] = useState(0);
  const [quality, setQuality] = useState("1");
  const [stylize, setStylize] = useState(100);
  const [seed, setSeed] = useState<number | null>(null);
  const [video, setVideo] = useState(true);

  useEffect(() => {
    // Assemble the Midjourney prompt with keywords and parameters
    const keywords = [shot, angle, lighting].filter(Boolean).join(', ');
    const mainPrompt = [prompt, keywords].filter(Boolean).join(', ');
    
    const params = [
      negativePrompt ? `--no ${negativePrompt}` : '',
      aspectRatio ? `--ar ${aspectRatio}` : '',
      version ? `--v ${version}` : '',
      chaos > 0 ? `--c ${chaos}` : '',
      quality !== "1" ? `--q ${quality}` : '',
      stylize !== 100 ? `--s ${stylize}` : '',
      seed ? `--seed ${seed}` : '',
      video ? '--video' : ''
    ];
    
    const finalPrompt = `${mainPrompt} ${params.filter(Boolean).join(' ')}`.trim();
    onPromptGenerated(finalPrompt);
  }, [prompt, negativePrompt, shot, angle, lighting, version, aspectRatio, chaos, quality, stylize, seed, video, onPromptGenerated]);

  return (
    <div className="space-y-6">
       <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>How Midjourney Works</AlertTitle>
        <AlertDescription>
          Midjourney creates video from descriptive text and special parameters. Choose your options below and we'll build the perfect prompt.
        </AlertDescription>
      </Alert>

      <PromptField label="Prompt Text" placeholder="e.g., A futuristic detective in a trench coat on a rainy, neon-lit street" value={prompt} onChange={(e) => setPrompt(e.target.value)} description={<>Click the <Target className="inline h-3 w-3 stroke-red-600" /> to generate prompt variants.</>} />

      <div className="space-y-1.5">
        <Label htmlFor="mj-negative">Negative Prompt</Label>
        <Input id="mj-negative" placeholder="e.g., text, people, watermark" value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Camera Shot" placeholder="Shot Type" value={shot} onChange={setShot} options={shotOptions} />
        <SelectField label="Camera Angle" placeholder="Angle" value={angle} onChange={setAngle} options={angleOptions} />
        <SelectField label="Lighting Style" placeholder="Lighting" value={lighting} onChange={setLighting} options={lightingOptions} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Version" placeholder="Version" value={version} onChange={setVersion} options={versionOptions} />
        <SelectField label="Aspect Ratio" placeholder="Aspect Ratio" value={aspectRatio} onChange={setAspectRatio} options={aspectRatioOptions} />
        <SelectField label="Quality" placeholder="Quality" value={quality} onChange={setQuality} options={qualityOptions} />
      </div>

      <div className="space-y-1.5">
        <Label>Stylize (0-1000)</Label>
        <Slider min={0} max={1000} step={10} value={[stylize]} onValueChange={([v]) => setStylize(v)} />
      </div>

      <div className="space-y-1.5">
        <Label>Chaos (0-100)</Label>
        <Slider min={0} max={100} step={1} value={[chaos]} onValueChange={([v]) => setChaos(v)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="mj-seed">Seed</Label>
          <Input id="mj-seed" type="number" placeholder="Random" value={seed ?? ""} onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : null)} />
        </div>
        <div className="flex items-end pb-1 space-x-4">
            <div className="flex items-center space-x-2"><Checkbox id="mj-video" checked={video} onCheckedChange={(checked) => setVideo(Boolean(checked))} /><Label htmlFor="mj-video">Video</Label></div>
        </div>
      </div>

      <Button className="w-full py-6 text-base font-medium mt-4">
        Generate Midjourney Prompt
      </Button>
    </div>
  );
}