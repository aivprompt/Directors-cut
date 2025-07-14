"use client";
import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface RunwayPromptFormProps { onPromptGenerated: (prompt: string) => void; }

const TextAreaWithIcon = ({ label, placeholder, value, onChange, onBullseye }: { label: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; onBullseye: () => void; }) => (
  <div className="space-y-1">
    <Label className="font-semibold">{label}</Label>
    <div className="relative w-full">
      <Textarea rows={4} className="pr-12 mt-1" placeholder={placeholder} value={value} onChange={onChange} />
      <button type="button" onClick={onBullseye} className="absolute top-2.5 right-2.5 p-1 bg-white rounded-full shadow focus:outline-none">
        <Target className="w-4 h-4 stroke-red-600" />
      </button>
    </div>
  </div>
);

const aspectOptions = ["16:9", "9:16", "1:1", "4:3"];
const styleOptions = ["Cinematic", "Claymation", "Watercolor", "Pixel Art", "Infrared"];
const panOptions = ["None", "Left", "Right"];
const tiltOptions = ["None", "Up", "Down"];
const rollOptions = ["None", "Clockwise", "Counter-clockwise"];
const zoomOptions = ["None", "In", "Out"];

const helper: Record<string, string> = { "Aspect Ratio": "Canvas shape", Duration: "Total seconds (1-4)", Seed: "Fixed number for reproducible output", "Style Preset": "Overall aesthetic treatment", "Style Strength": "How intensely the preset is applied", Pan: "Horizontal camera move", Tilt: "Vertical camera move", Roll: "Rotate camera (Dutch angle)", Zoom: "Move in or out" };

export default function RunwayGen4PromptForm({ onPromptGenerated }: RunwayPromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState<number | null>(null);
  const [upscale, setUpscale] = useState(false);
  const [duration, setDuration] = useState(4);
  const [aspect, setAspect] = useState("");
  const [style, setStyle] = useState("");
  const [strength, setStrength] = useState(50);
  const [pan, setPan] = useState("None");
  const [tilt, setTilt] = useState("None");
  const [roll, setRoll] = useState("None");
  const [zoom, setZoom] = useState("None");
  const [showHints, setShowHints] = useState(true);

  useEffect(() => {
    const motion = [ pan !== "None" && `Pan ${pan}`, tilt !== "None" && `Tilt ${tilt}`, roll !== "None" && `Roll ${roll}`, zoom !== "None" && `Zoom ${zoom}` ].filter(Boolean).join(" | ");
    const composed = [ prompt, aspect, `${duration}s`, style && `style:${style}`, `strength:${strength}%`, motion, upscale ? "Upscale:on" : "", seed !== null ? `seed ${seed}` : "" ].filter(Boolean).join(" | ");
    onPromptGenerated(composed);
  }, [prompt, seed, upscale, duration, aspect, style, strength, pan, tilt, roll, zoom, onPromptGenerated]);

  const Dropdown = (label: string, value: string, set: (v: string) => void, options: string[]) => (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Select value={value} onValueChange={set}>
        <SelectTrigger className="h-9 w-full truncate"><SelectValue placeholder={`Select ${label}`} /></SelectTrigger>
        <SelectContent>{options.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}</SelectContent>
      </Select>
      {showHints && helper[label] && <p className="text-xs text-muted-foreground">{helper[label]}</p>}
    </div>
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-end gap-2"><Switch checked={showHints} onCheckedChange={setShowHints} id="hints-toggle-runway" /><Label htmlFor="hints-toggle-runway" className="text-sm">Show hints</Label></div>
      <TextAreaWithIcon label="Prompt" placeholder="e.g. Impressionist painting of a bustling Paris street..." value={prompt} onChange={(e) => setPrompt(e.target.value)} onBullseye={() => console.log("Enhance prompt")} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <Label>Seed</Label>
          <Input type="number" placeholder="Optional" value={seed ?? ""} onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : null)} />
          {showHints && <p className="text-xs text-muted-foreground">{helper["Seed"]}</p>}
        </div>
        <div className="flex items-center gap-2 pt-6"><Checkbox id="upscale-runway" checked={upscale} onCheckedChange={(checked) => setUpscale(Boolean(checked))} /><Label htmlFor="upscale-runway">Upscale (4K)</Label></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <Label>Duration ({duration}s)</Label>
          <Slider min={1} max={4} step={1} value={[duration]} onValueChange={([v]) => setDuration(v)} />
          {showHints && <p className="text-xs text-muted-foreground">{helper.Duration}</p>}
        </div>
        {Dropdown("Aspect Ratio", aspect, setAspect, aspectOptions)}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Dropdown("Style Preset", style, setStyle, styleOptions)}
        <div className="space-y-1">
          <Label>Style Strength ({strength}%)</Label>
          <Slider min={0} max={100} step={1} value={[strength]} onValueChange={([v]) => setStrength(v)} />
          {showHints && <p className="text-xs text-muted-foreground">{helper["Style Strength"]}</p>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Dropdown("Pan", pan, setPan, panOptions)}{Dropdown("Tilt", tilt, setTilt, tiltOptions)}{Dropdown("Roll", roll, setRoll, rollOptions)}{Dropdown("Zoom", zoom, setZoom, zoomOptions)}
      </div>
      <Button className="w-full py-6 mt-4">Generate Prompt</Button>
    </section>
  );
}