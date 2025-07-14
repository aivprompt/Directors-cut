"use client";
import { useEffect, useState } from "react";
import { Target, Lightbulb, Mic, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Veo3PromptFormProps { onPromptGenerated: (prompt: string) => void; }

const InlineIcon = <Target className="inline h-3 w-3 stroke-red-600" />;

const PromptField = ({ label, placeholder, value, onChange, description }: { label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, description: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label htmlFor={label} className="font-semibold">{label}</Label>
    <div className="relative">
      <Textarea id={label} placeholder={placeholder} value={value} onChange={onChange} className="min-h-[80px] pr-10" />
      <button type="button" onClick={() => console.log(`Enhance ${label}`)} className="absolute top-2.5 right-2.5 p-1 rounded-full bg-background/50" title={`Enhance ${label} with AI`}><Target size={20} className="text-red-500" /></button>
    </div>
    <p className="text-xs text-muted-foreground pt-1">{description}</p>
  </div>
);

const styleOptions = ["Cinematic", "Photorealistic", "Anime", "Documentary", "3D Animation"];
const aspectOptions = ["16:9", "9:16", "1:1", "4:3"];

export default function Veo3PromptForm({ onPromptGenerated }: Veo3PromptFormProps) {
  const [scene, setScene] = useState("");
  const [character, setCharacter] = useState("");
  const [negative, setNegative] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [aspect, setAspect] = useState("16:9");
  const [audioDesc, setAudioDesc] = useState("");
  const [dialogue, setDialogue] = useState("");

  useEffect(() => {
    const parts = [ style && `${style} style`, aspect, scene, character, negative && `--no ${negative}`, audioDesc && `Audio: ${audioDesc}`, dialogue && `Dialogue: "${dialogue}"` ].filter(Boolean).join(" | ");
    onPromptGenerated(parts);
  }, [scene, character, negative, style, aspect, audioDesc, dialogue, onPromptGenerated]);

  return (
    <div className="space-y-6">
      <Alert><Lightbulb className="h-4 w-4" /><AlertTitle>How Veo Works</AlertTitle><AlertDescription>Veo understands complex, narrative prompts. Be descriptive and leverage its unique audio and dialogue generation capabilities.</AlertDescription></Alert>
      <PromptField label="Character & Action" placeholder="e.g., A brave explorer discovering a hidden waterfall" value={character} onChange={(e) => setCharacter(e.target.value)} description={<>Click the {InlineIcon} to generate 3 character variants.</>} />
      <PromptField label="Scene & Environment" placeholder="e.g., A lush, vibrant jungle with bioluminescent plants" value={scene} onChange={(e) => setScene(e.target.value)} description={<>Click the {InlineIcon} to generate 3 scene variants.</>} />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><Label>Style</Label><Select value={style} onValueChange={setStyle}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{styleOptions.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select></div>
        <div className="space-y-1.5"><Label>Aspect Ratio</Label><Select value={aspect} onValueChange={setAspect}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{aspectOptions.map(a => (<SelectItem key={a} value={a}>{a}</SelectItem>))}</SelectContent></Select></div>
      </div>
      <div className="space-y-1.5"><Label>Negative Prompt</Label><Input placeholder="e.g., blurry, cartoon, text" value={negative} onChange={e => setNegative(e.target.value)} /></div>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Mic className="w-5 h-5" /> Audio & Dialogue</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="space-y-1.5"><Label>Audio Description</Label><Input placeholder="e.g., sound of rushing water, birds chirping" value={audioDesc} onChange={e => setAudioDesc(e.target.value)} /></div>
        <div className="space-y-1.5"><Label>Dialogue</Label><Textarea placeholder="Character A: 'We finally made it.'" value={dialogue} onChange={e => setDialogue(e.target.value)} className="min-h-[60px]" /></div>
      </CardContent></Card>
      <Button className="w-full py-6 text-base font-medium mt-4">Generate Veo Prompt</Button>
    </div>
  );
};