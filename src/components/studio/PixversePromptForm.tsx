"use client";
import { useState, useEffect } from "react";
import { Target, Lightbulb, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PixversePromptFormProps { model: string; onPromptGenerated: (prompt: string) => void; }

const styleOptions = ["Realistic", "Anime", "3D Animation"];
const shotOptions = ["Wide Shot", "Medium Shot", "Close-up"];
const lightingOptions = ["Cinematic", "Daylight", "Vibrant", "Dramatic"];

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
    const params = [ negativePrompt ? `--no ${negativePrompt}` : '', seed ? `--seed ${seed}` : '', characterRef ? `--cref ${characterRef}` : '' ].filter(Boolean).join(' ');
    onPromptGenerated(`${fullPrompt} ${params}`);
  }, [prompt, negativePrompt, shot, style, lighting, seed, characterRef, onPromptGenerated]);
  
  const SelectField = ({ label, value, set, options }: { label: string, value: string, set: (v: string) => void, options: string[] }) => (
    <div className="space-y-1.5"><Label>{label}</Label><Select value={value} onValueChange={set}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
  );

  return (
    <div className="space-y-6">
      <Alert><Lightbulb className="h-4 w-4" /><AlertTitle>How Pixverse Works</AlertTitle><AlertDescription>Pixverse is excellent for consistent characters and anime styles. Use the Character Reference field for best results.</AlertDescription></Alert>
      <div className="space-y-1.5">
        <Label htmlFor="pix-prompt" className="font-semibold">Main Prompt</Label>
        <div className="relative">
          <Textarea id="pix-prompt" placeholder="e.g., A girl with pink hair smiling, sitting in a cafe by the window" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-[100px] pr-10" />
          <button type="button" onClick={() => console.log(`Enhance Prompt`)} className="absolute top-2.5 right-2.5 p-1 rounded-full bg-background/50" title={`Enhance with AI`}><Target size={20} className="text-red-500" /></button>
        </div>
        <p className="text-xs text-muted-foreground pt-1">Click the <Target className="inline h-3 w-3 stroke-red-600" /> to generate 3 prompt variants.</p>
      </div>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Character Consistency</CardTitle></CardHeader><CardContent>
        <Label htmlFor="pix-cref">Character Reference (URL or Description)</Label>
        <Input id="pix-cref" placeholder="e.g., https://.../character.png or 'same girl as before'" value={characterRef} onChange={e => setCharacterRef(e.target.value)} />
      </CardContent></Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField label="Style" value={style} set={setStyle} options={styleOptions} />
        <SelectField label="Shot Type" value={shot} set={setShot} options={shotOptions} />
        <SelectField label="Lighting" value={lighting} set={setLighting} options={lightingOptions} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><Label>Negative Prompt</Label><Input placeholder="e.g., ugly, deformed hands" value={negativePrompt} onChange={e => setNegativePrompt(e.target.value)} /></div>
        <div className="space-y-1.5"><Label htmlFor="pix-seed">Seed</Label><Input id="pix-seed" type="number" placeholder="Random" value={seed ?? ""} onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : null)} /></div>
      </div>
      <Button className="w-full py-6 text-base font-medium mt-4">Generate Pixverse Prompt</Button>
    </div>
  );
}