"use client";
import { useEffect, useState } from "react";
import { Target, Lightbulb, Camera } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RunwayPromptFormProps {
  onPromptGenerated: (prompt: string) => void;
}

const aspectOptions = ["16:9", "9:16", "1:1", "4:3"];
const styleOptions = ["Cinematic", "Claymation", "Watercolor", "Pixel Art", "Infrared", "Photorealistic"];
const shotStyleOptions = ["None", "Drone Follow Shot", "FPV Drone Shot", "Sweeping Crane Shot", "Handheld Shaky-Cam", "Low Angle Tracking Shot", "Dolly Zoom"];
const motionOptions = { Pan: ["None", "Left", "Right"], Tilt: ["None", "Up", "Down"], Roll: ["None", "Clockwise", "Counter-clockwise"], Zoom: ["None", "In", "Out"] };

const SelectField = ({ label, value, set, options }: { label: string, value: string, set: (v: string) => void, options: string[] }) => (
  <div className="space-y-1.5">
    <Label>{label}</Label>
    <Select value={value} onValueChange={set}>
      <SelectTrigger className="h-9 w-full truncate">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
    </Select>
  </div>
);

export default function RunwayGen4PromptForm({ onPromptGenerated }: RunwayPromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState<number | null>(null);
  const [upscale, setUpscale] = useState(false);
  const [aspect, setAspect] = useState("16:9");
  const [style, setStyle] = useState("Cinematic");
  const [shotStyle, setShotStyle] = useState("None");
  const [motionAmount, setMotionAmount] = useState(5); // Renamed from strength for clarity
  const [pan, setPan] = useState("None");
  const [tilt, setTilt] = useState("None");
  const [roll, setRoll] = useState("None");
  const [zoom, setZoom] = useState("None");

  useEffect(() => {
    // AI Engineer Logic for Runway
    const descriptivePrompt = [shotStyle !== "None" ? shotStyle : '', prompt].filter(Boolean).join(', ');
    const cameraMoves = [
      pan !== "None" && `pan ${pan.toLowerCase()}`,
      tilt !== "None" && `tilt ${tilt.toLowerCase()}`,
      roll !== "None" && `roll ${roll.toLowerCase()}`,
      zoom !== "None" && `zoom ${zoom.toLowerCase()}`
    ].filter(Boolean).join(' ');

    const finalPrompt = 
      `${descriptivePrompt} [Style: ${style}] [Camera: ${cameraMoves}] [Motion: ${motionAmount}]` +
      ` [Seed: ${seed ?? 'random'}] [AR: ${aspect}] [Upscale: ${upscale}]`;

    onPromptGenerated(finalPrompt);
  }, [prompt, seed, upscale, aspect, style, motionAmount, pan, tilt, roll, zoom, shotStyle, onPromptGenerated]);

  return (
    <div className="space-y-6">
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>How Runway Works</AlertTitle>
        <AlertDescription>
          Runway uses a mix of descriptive text and precise camera controls. Describe your vision, then use the controls below to refine it.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-1.5">
        <Label className="font-semibold">Main Prompt</Label>
        <Textarea placeholder="e.g., A futuristic city skyline at dusk, raining" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-[100px]" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField label="Style Preset" value={style} set={setStyle} options={styleOptions} />
        <SelectField label="Cinematic Shot Style" value={shotStyle} set={setShotStyle} options={shotStyleOptions} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Camera className="w-5 h-5" /> Mechanical Camera Motion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Amount of Motion (0-10)</Label>
            <Slider min={0} max={10} step={1} value={[motionAmount]} onValueChange={([v]) => setMotionAmount(v)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Pan" value={pan} set={setPan} options={motionOptions.Pan} />
            <SelectField label="Tilt" value={tilt} set={setTilt} options={motionOptions.Tilt} />
            <SelectField label="Roll" value={roll} set={setRoll} options={motionOptions.Roll} />
            <SelectField label="Zoom" value={zoom} set={setZoom} options={motionOptions.Zoom} />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <SelectField label="Aspect Ratio" value={aspect} set={setAspect} options={aspectOptions} />
        <div className="space-y-1.5">
          <Label htmlFor="runway-seed">Seed</Label>
          <Input id="runway-seed" type="number" placeholder="Random" value={seed ?? ""} onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : null)} />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="runway-upscale" checked={upscale} onCheckedChange={(c) => setUpscale(Boolean(c))} />
        <Label htmlFor="runway-upscale">Upscale to 4K</Label>
      </div>
      
      <Button className="w-full py-6 text-base font-medium mt-4">
        ✨ Generate Runway Prompt
      </Button>
    </div>
  );
}