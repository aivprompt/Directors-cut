"use client";
import { useState, useEffect } from "react";
import { Target, Lightbulb, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KlingPromptFormProps { model: string; onPromptGenerated: (prompt: string) => void; }

const InlineIcon = <Target className="inline h-3 w-3 stroke-red-600" />;

const PromptField = ({ label, placeholder, value, onChange, description }: { label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, description: React.ReactNode; }) => (
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

const styleOptions = ["Photorealistic", "Hyperrealistic", "Cinematic", "Unreal Engine 5"];
const shotOptions = ["Wide Shot", "Full Body Shot", "Medium Shot", "Close-up"];
const angleOptions = ["Eye-level", "Low Angle", "High Angle", "Dutch Angle"];
const motionOptions = ["Static", "Slow Dolly In", "Orbit Left", "Crane Up"];
const aspectRatioOptions = ["16:9", "9:16", "1:1", "2.39:1"];

export default function KlingPromptForm({ onPromptGenerated }: KlingPromptFormProps) {
  const [character, setCharacter] = useState("");
  const [scene, setScene] = useState("");
  const [style, setStyle] = useState("Photorealistic");
  const [shot, setShot] = useState("Medium Shot");
  const [angle, setAngle] = useState("Eye-level");
  const [motion, setMotion] = useState("Static");
  const [realism, setRealism] = useState(90);
  const [aspectRatio, setAspectRatio] = useState("16:9");

  useEffect(() => {
    const keywords = [style, angle, shot, motion].filter(Boolean).join(', ');
    const mainPrompt = `${character}, ${scene}, ${keywords}`.trim();
    const params = ` --ar ${aspectRatio} --realism ${realism}`;
    onPromptGenerated(mainPrompt + params);
  }, [character, scene, style, shot, angle, motion, realism, aspectRatio, onPromptGenerated]);

  return (
    <div className="space-y-6">
      <Alert><Lightbulb className="h-4 w-4" /><AlertTitle>How Kling Works</AlertTitle><AlertDescription>Kling excels at photorealism and complex physics. Be highly descriptive for the best results.</AlertDescription></Alert>
      <PromptField label="Character & Action" placeholder="e.g., A knight in detailed plate armor swinging a sword" value={character} onChange={(e) => setCharacter(e.target.value)} description={<>Click the {InlineIcon} to generate 3 character variants.</>} />
      <PromptField label="Scene & Environment" placeholder="e.g., A battlefield at sunset during a light rain" value={scene} onChange={(e) => setScene(e.target.value)} description={<>Click the {InlineIcon} to generate 3 scene variants.</>} />
      
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Camera className="w-5 h-5" />Cinematic Controls</CardTitle></CardHeader><CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Artistic Style" placeholder="Style" value={style} onChange={setStyle} options={styleOptions} />
        <SelectField label="Camera Shot" placeholder="Shot Type" value={shot} onChange={setShot} options={shotOptions} />
        <SelectField label="Camera Angle" placeholder="Angle" value={angle} onChange={setAngle} options={angleOptions} />
        <SelectField label="Camera Motion" placeholder="Motion" value={motion} onChange={setMotion} options={motionOptions} />
      </CardContent></Card>

      <div className="space-y-1.5"><Label>Physics Realism ({realism}%)</Label><Slider min={50} max={100} step={5} value={[realism]} onValueChange={([v]) => setRealism(v)} /></div>
      <div className="space-y-1.5"><Label>Aspect Ratio</Label><Select value={aspectRatio} onValueChange={setAspectRatio}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{aspectRatioOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>

      <Button className="w-full py-6 text-base font-medium mt-4">Generate Kling Prompt</Button>
    </div>
  );
};