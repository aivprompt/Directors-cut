"use client";
import { useEffect, useState } from "react";
import { Target, Lightbulb, Mic, MessageSquare, Film } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";

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

const SelectField = ({ label, placeholder, value, onChange, options }: { label: string, placeholder: string, value: string, onChange: (value: string) => void, options: string[] }) => (
  <div className="space-y-1.5"><Label htmlFor={label}>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger id={label}><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>
);

const styleOptions = ["Cinematic", "Photorealistic", "Anime", "Documentary", "3D Animation", "Vibrant Color"];
const shotOptions = ["Wide Shot", "Medium Shot", "Close-up", "Drone Shot"];
const motionOptions = ["Slow Pan Left", "Dolly Zoom", "Static", "Handheld"];
const lightingOptions = ["Golden Hour", "Dramatic Lighting", "Soft Natural Light"];
const aspectRatioOptions = ["16:9", "9:16", "1:1", "4:3"];

export default function Veo3PromptForm({ onPromptGenerated }: Veo3PromptFormProps) {
  const [character, setCharacter] = useState("");
  const [scene, setScene] = useState("");
  const [negative, setNegative] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [shot, setShot] = useState("");
  const [motion, setMotion] = useState("");
  const [lighting, setLighting] = useState("");
  const [aspect, setAspect] = useState("16:9");
  const [duration, setDuration] = useState(5);
  const [audioDesc, setAudioDesc] = useState("");
  const [dialogue, setDialogue] = useState("");

  useEffect(() => {
    const visualPrompt = [character, scene, shot, motion, lighting, style].filter(Boolean).join(', ');
    const audioPrompt = [audioDesc && `Audio: ${audioDesc}`, dialogue && `Dialogue: "${dialogue}"`].filter(Boolean).join('. ');
    const params = [negative && `--no ${negative}`, aspect && `--ar ${aspect}`, duration && `--duration ${duration}s`].filter(Boolean).join(' ');
    
    const finalPrompt = `${visualPrompt}. ${audioPrompt} ${params}`.trim().replace(/\. /g, '. ').replace(/, \./g, '.');
    onPromptGenerated(finalPrompt);
  }, [character, scene, negative, style, shot, motion, lighting, aspect, duration, audioDesc, dialogue, onPromptGenerated]);

  return (
    <div className="space-y-6">
      <Alert><Lightbulb className="h-4 w-4" /><AlertTitle>How Veo Works</AlertTitle><AlertDescription>Veo understands complex narratives. Describe your vision, and leverage its unique audio and dialogue capabilities.</AlertDescription></Alert>
      
      <Card><CardHeader><CardTitle>Visual Foundation</CardTitle></CardHeader><CardContent className="space-y-4">
        <PromptField label="Character & Action" placeholder="e.g., A brave explorer discovering a hidden waterfall" value={character} onChange={(e) => setCharacter(e.target.value)} description={<>Click the {InlineIcon} to generate 3 character variants.</>} />
        <PromptField label="Scene & Environment" placeholder="e.g., A lush, vibrant jungle filled with bioluminescent plants" value={scene} onChange={(e) => setScene(e.target.value)} description={<>Click the {InlineIcon} to generate 3 scene variants.</>} />
      </CardContent></Card>
      
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Film className="w-5 h-5" />Cinematic & Style Controls</CardTitle></CardHeader><CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Artistic Style" placeholder="Style" value={style} onChange={setStyle} options={styleOptions} />
        <SelectField label="Lighting Style" placeholder="Lighting" value={lighting} onChange={setLighting} options={lightingOptions} />
        <SelectField label="Camera Shot" placeholder="Shot Type" value={shot} onChange={setShot} options={shotOptions} />
        <SelectField label="Camera Motion" placeholder="Motion" value={motion} onChange={setMotion} options={motionOptions} />
      </CardContent></Card>

      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Mic className="w-5 h-5" /> Audio & Dialogue</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="space-y-1.5"><Label>Audio Description</Label><Input placeholder="e.g., sound of rushing water, birds chirping" value={audioDesc} onChange={e => setAudioDesc(e.target.value)} /></div>
        <div className="space-y-1.5"><Label>Dialogue</Label><Textarea placeholder="Character A: 'We finally made it.'" value={dialogue} onChange={e => setDialogue(e.target.value)} className="min-h-[60px]" /></div>
      </CardContent></Card>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><Label>Negative Prompt</Label><Input placeholder="e.g., blurry, cartoon, text" value={negative} onChange={e => setNegative(e.target.value)} /></div>
        <div className="space-y-1.5"><Label>Aspect Ratio</Label><Select value={aspect} onValueChange={setAspect}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{aspectOptions.map(a => (<SelectItem key={a} value={a}>{a}</SelectItem>))}</SelectContent></Select></div>
      </div>
      
      <div className="space-y-1.5"><Label>Duration ({duration}s)</Label><Slider min={2} max={15} step={1} value={[duration]} onValueChange={([v]) => setDuration(v)} /></div>
      
      <Button className="w-full py-6 text-base font-medium mt-4">Generate Veo Prompt</Button>
    </div>
  );
};