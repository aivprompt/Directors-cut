"use client";
import { useState, useEffect } from "react";
import { Target, Lightbulb, User, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PixversePromptFormProps {
  model: string;
  onPromptGenerated: (prompt: string) => void;
}

const InlineIcon = <Target className="inline h-3 w-3 stroke-red-600" />;

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

const SelectField = ({ label, placeholder, value, onChange, options }: { label: string, placeholder: string, value: string, onChange: (value: string) => void, options: string[] }) => (
  <div className="space-y-1.5">
    <Label htmlFor={label}>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={label}><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
    </Select>
  </div>
);

const styleOptions = ["Realistic", "Anime", "3D Animation", "Cinematic"];
const shotOptions = ["Wide Shot", "Medium Shot", "Close-up", "Portrait Shot"];
const lightingOptions = ["Vibrant", "Dramatic", "Studio Lighting", "Natural Light"];

export default function PixversePromptForm({ onPromptGenerated }: PixversePromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [characterRef, setCharacterRef] = useState("");
  const [shot, setShot] = useState("Medium Shot");
  const [style, setStyle] = useState("Realistic");
  const [lighting, setLighting] = useState("Cinematic");
  const [seed, setSeed] = useState<number | null>(null);

  useEffect(() => {
    const keywords = [shot, lighting, style].filter(Boolean).join(', ');
    const fullPrompt = `${prompt}, ${keywords}`.trim();
    const params = [
      negativePrompt ? `--no ${negativePrompt}` : '',
      seed ? `--seed ${seed}` : '',
      characterRef ? `--cref ${characterRef}` : ''
    ].filter(Boolean).join(' ');
    onPromptGenerated(`${fullPrompt} ${params}`.trim());
  }, [prompt, negativePrompt, shot, style, lighting, seed, characterRef, onPromptGenerated]);

  return (
    <div className="space-y-6">
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>How Pixverse Works</AlertTitle>
        <AlertDescription>
          Pixverse is excellent for consistent characters and anime styles. Use the Character Reference field for best results.
        </AlertDescription>
      </Alert>
      
      <PromptField
        label="Main Prompt"
        placeholder="e.g., A girl with pink hair smiling, sitting in a cafe by the window"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        description={<>Click the {InlineIcon} to generate 3 prompt variants.</>}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Character Consistency</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="pix-cref">Character Reference (URL or Description)</Label>
          <Input 
            id="pix-cref" 
            placeholder="e.g., https://.../character.png or 'the same girl'" 
            value={characterRef} 
            onChange={e => setCharacterRef(e.target.value)} 
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Film className="w-5 h-5" /> Style & Cinematography</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectField label="Artistic Style" placeholder="Style" value={style} onChange={setStyle} options={styleOptions} />
          <SelectField label="Shot Type" placeholder="Shot" value={shot} onChange={setShot} options={shotOptions} />
          <SelectField label="Lighting" placeholder="Lighting" value={lighting} onChange={setLighting} options={lightingOptions} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="pix-negative">Negative Prompt</Label>
          <Input id="pix-negative" placeholder="e.g., ugly, deformed hands" value={negativePrompt} onChange={e => setNegativePrompt(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pix-seed">Seed</Label>
          <Input id="pix-seed" type="number" placeholder="Random" value={seed ?? ""} onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : null)} />
        </div>
      </div>
      
      <Button className="w-full py-6 text-base font-medium mt-4">
        Generate Pixverse Prompt
      </Button>
    </div>
  );
}