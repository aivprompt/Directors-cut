"use client";
import { useEffect, useState } from "react";
import { Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RunwayPromptFormProps { onPromptGenerated: (prompt: string) => void; }

const aspectOptions = ["16:9", "9:16", "1:1", "4:3"];
const styleOptions = ["Cinematic", "Claymation", "Watercolor", "Pixel Art", "Infrared", "Photorealistic"];
const shotStyleOptions = ["None", "Drone Follow Shot", "FPV Drone Shot", "Sweeping Crane Shot", "Handheld Shaky-Cam", "Low Angle Tracking Shot", "Dolly Zoom"];
const motionOptions = { Pan: ["None", "Left", "Right"], Tilt: ["None", "Up", "Down"], Roll: ["None", "Clockwise", "Counter-clockwise"], Zoom: ["None", "In", "Out"] };

export default function RunwayGen4PromptForm({ onPromptGenerated }: RunwayPromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState<number | null>(null);
  const [upscale, setUpscale] = useState(false);
  const [aspect, setAspect] = useState("16:9");
  const [style, setStyle] = useState("Cinematic");
  const [shotStyle, setShotStyle] = useState("None");
  const [strength, setStrength] = useState(50);
  const [pan, setPan] = useState("None");
  const [tilt, setTilt] = useState("None");
  const [roll, setRoll] = useState("None");
  const [zoom, setZoom] = useState("None");

  useEffect(() => {
    const composedPrompt = [shotStyle !== "None" ? shotStyle : '', prompt].filter(Boolean).join(', ');
    const motionValue = Math.round(strength / 10);
    const cameraParams = [ pan !== "None" && `pan ${pan.toLowerCase()}`, tilt !== "None" && `tilt ${tilt.toLowerCase()}`, roll !== "None" && `roll ${roll.toLowerCase()}`, zoom !== "None" && `zoom ${zoom.toLowerCase()}` ].filter(Boolean).join(' ');
    const finalPrompt = `${composedPrompt} @camera{${cameraParams}} --style ${style.toLowerCase()} --motion ${motionValue} --ar ${aspect} ${seed ? `--seed ${seed}` : ''} ${upscale ? '--upscale' : ''}`.trim();
    onPromptGenerated(finalPrompt);
  }, [prompt, seed, upscale, aspect, style, strength, pan, tilt, roll, zoom, shotStyle, onPromptGenerated]);

  const Dropdown = ({ label, value, set, options }: { label: string, value: string, set: (v: string) => void, options: string[] }) => (
    <div className="space-y-1.5"><Label>{label}</Label><Select value={value} onValueChange={set}><SelectTrigger><SelectValue placeholder={`Select ${label}`} /></SelectTrigger><SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
  );

  return (
    <div className="space-y-6">
      <Alert><Lightbulb className="h-4 w-4" /><AlertTitle>How Runway Works</AlertTitle><AlertDescription>Describe your scene, then use the powerful sliders and dropdowns to control the camera and style precisely.</AlertDescription></Alert>
      <div className="space-y-1.5">
        <Label className="font-semibold">Prompt</Label>
        <div className="relative">
            <Textarea placeholder="e.g., A futuristic city skyline at dusk, raining" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-[100px] pr-10" />
            <button type="button" onClick={() => console.log(`Enhance Prompt`)} className="absolute top-2.5 right-2.5 p-1 rounded-full bg-background/50" title={`Enhance with AI`}><Target size={20} className="text-red-500" /></button>
        </div>
        <p className="text-xs text-muted-foreground pt-1">Click the <Target className="inline h-3 w-3 stroke-red-600" /> to generate 3 prompt variants.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Dropdown label="Style Preset" value={style} set={setStyle} options={styleOptions} />
        <Dropdown label="Cinematic Shot Style" value={shotStyle} set={setShotStyle} options={shotStyleOptions} />
      </div>
      <Card><CardHeader><CardTitle>Mechanical Camera Motion</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="space-y-1.5"><Label>Motion Strength ({strength}%)</Label><Slider min={0} max={100} step={1} value={[strength]} onValueChange={([v]) => setStrength(v)} /></div>
        <div className="grid grid-cols-2 gap-4">
          <Dropdown label="Pan" value={pan} set={setPan} options={motionOptions.Pan} />
          <Dropdown label="Tilt" value={tilt} set={setTilt} options={motionOptions.Tilt} />
          <Dropdown label="Roll" value={roll} set={setRoll} options={motionOptions.Roll} />
          <Dropdown label="Zoom" value={zoom} set={setZoom} options={motionOptions.Zoom} />
        </div>
      </CardContent></Card>
      <div className="grid grid-cols-2 gap-4">
        <Dropdown label="Aspect Ratio" value={aspect} set={setAspect} options={aspectOptions} />
        <div className="space-y-1.5"><Label htmlFor="runway-seed">Seed</Label><Input id="runway-seed" type="number" placeholder="Random" value={seed ?? ""} onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : null)} /></div>
      </div>
      <div className="flex items-center space-x-2"><Checkbox id="runway-upscale" checked={upscale} onCheckedChange={(c) => setUpscale(Boolean(c))} /><Label htmlFor="runway-upscale">Upscale to 4K</Label></div>
      <Button className="w-full py-6 text-base font-medium mt-4">Generate Runway Prompt</Button>
    </div>
  );
}