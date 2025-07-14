"use client";
import { useState, useEffect } from "react";
import { Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RunwayPromptFormProps { onPromptGenerated: (prompt: string) => void; }

const aspectOptions = ["16:9", "9:16", "1:1", "4:3"];
const styleOptions = ["Cinematic", "Claymation", "Watercolor", "Pixel Art", "Infrared", "Photorealistic"];
const motionOptions = { Pan: ["None", "Left", "Right"], Tilt: ["None", "Up", "Down"], Roll: ["None", "Clockwise", "Counter-clockwise"], Zoom: ["None", "In", "Out"] };

export default function RunwayGen4PromptForm({ onPromptGenerated }: RunwayPromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState<number | null>(null);
  const [upscale, setUpscale] = useState(false);
  const [aspect, setAspect] = useState("16:9");
  const [style, setStyle] = useState("Cinematic");
  const [strength, setStrength] = useState(50);
  const [pan, setPan] = useState("None");
  const [tilt, setTilt] = useState("None");
  const [roll, setRoll] = useState("None");
  const [zoom, setZoom] = useState("None");

  useEffect(() => {
    const motion = [ pan !== "None" && `pan ${pan.toLowerCase()}`, tilt !== "None" && `tilt ${tilt.toLowerCase()}`, roll !== "None" && `roll ${roll.toLowerCase()}`, zoom !== "None" && `zoom ${zoom.toLowerCase()}` ].filter(Boolean).join(' ');
    const composed = `${prompt} ${style ? `in the style of ${style}` : ''} ${motion}`.trim();
    const params = ` --ar ${aspect} --motion ${Math.round(strength / 10)} ${seed ? `--seed ${seed}` : ''} ${upscale ? '--upscale' : ''}`;
    onPromptGenerated(composed + params);
  }, [prompt, seed, upscale, aspect, style, strength, pan, tilt, roll, zoom, onPromptGenerated]);

  const Dropdown = ({ label, value, set, options }: { label: string, value: string, set: (v: string) => void, options: string[] }) => (
    <div className="space-y-1.5"><Label>{label}</Label><Select value={value} onValueChange={set}><SelectTrigger><SelectValue placeholder={`Select ${label}`} /></SelectTrigger><SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
  );

  return (
    <div className="space-y-6">
      <Alert><Lightbulb className="h-4 w-4" /><AlertTitle>How Runway Works</AlertTitle><AlertDescription>Describe your scene, then use the powerful sliders and dropdowns to control the camera and style precisely.</AlertDescription></Alert>
      <div className="space-y-1.5"><Label className="font-semibold">Prompt</Label><Textarea placeholder="e.g., A futuristic city skyline at dusk, raining" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-[100px]" /></div>
      <div className="p-4 border rounded-lg space-y-4 bg-muted/30">
        <h3 className="font-semibold text-foreground">Camera Motion</h3>
        <div className="grid grid-cols-2 gap-4">
          <Dropdown label="Pan" value={pan} set={setPan} options={motionOptions.Pan} />
          <Dropdown label="Tilt" value={tilt} set={setTilt} options={motionOptions.Tilt} />
          <Dropdown label="Roll" value={roll} set={setRoll} options={motionOptions.Roll} />
          <Dropdown label="Zoom" value={zoom} set={setZoom} options={motionOptions.Zoom} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Dropdown label="Style Preset" value={style} set={setStyle} options={styleOptions} />
        <div className="space-y-1.5"><Label>Style Strength ({strength}%)</Label><Slider min={0} max={100} step={1} value={[strength]} onValueChange={([v]) => setStrength(v)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Dropdown label="Aspect Ratio" value={aspect} set={setAspect} options={aspectOptions} />
        <div className="space-y-1.5"><Label htmlFor="runway-seed">Seed</Label><Input id="runway-seed" type="number" placeholder="Random" value={seed ?? ""} onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : null)} /></div>
      </div>
      <div className="flex items-center space-x-2"><Checkbox id="runway-upscale" checked={upscale} onCheckedChange={(c) => setUpscale(Boolean(c))} /><Label htmlFor="runway-upscale">Upscale to 4K</Label></div>
      <Button className="w-full py-6 text-base font-medium mt-4">Generate Runway Prompt</Button>
    </div>
  );
}