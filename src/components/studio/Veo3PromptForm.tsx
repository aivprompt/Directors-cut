"use client";

import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface Veo3PromptFormProps {
  onPromptGenerated: (prompt: string) => void;
}

const BullseyeBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute top-2.5 right-2.5 p-1 bg-white rounded-full shadow focus:outline-none"
  >
    <Target className="w-4 h-4 stroke-red-600" />
  </button>
);

const TextAreaWithIcon = ({
  placeholder,
  value,
  onChange,
  onBullseyeClick,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBullseyeClick: () => void;
}) => (
  <div className="relative w-full">
    <Textarea
      rows={4}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="pr-12"
    />
    <BullseyeBtn onClick={onBullseyeClick} />
  </div>
);

const styleOptions = ["Cinematic", "Photorealistic", "Anime", "Documentary", "Stop-motion", "3D Animation"];
const aspectOptions = ["16:9","9:16","1:1","4:3","3:4"];
const motionLabels = ["Pan Left","Pan Right","Tilt Up","Tilt Down","Zoom In","Zoom Out","Dolly","Crane Shot","Aerial Shot"];

const helper: Record<string,string> = {
  "Style": "Overall visual aesthetic",
  "Aspect Ratio": "Canvas shape",
  "Duration": "Total seconds (1‑10 supported)",
  "Seed": "Fixed number to reproduce results",
  "Camera Motion": "Combine moves for dynamic shots",
};

const Veo3PromptForm: React.FC<Veo3PromptFormProps> = ({ onPromptGenerated }) => {
  const [scene,setScene]=useState("");
  const [character,setCharacter]=useState("");
  const [negative,setNegative]=useState("");
  const [style,setStyle]=useState("");
  const [aspect,setAspect]=useState("");
  const [duration,setDuration]=useState(5);
  const [seed,setSeed]=useState<number|null>(null);
  const [motions,setMotions]=useState<string[]>([]);
  const [audioDesc,setAudioDesc]=useState("");
  const [audioDialogue,setAudioDialogue]=useState(false);
  const [dialogueText,setDialogueText]=useState("");
  const [showHints,setShowHints]=useState(true);

  const promptParts = [
    style && `${style} style`,
    aspect,
    `${duration}s`,
    motions.length && motions.join(" + "),
    scene && `Scene: ${scene}`,
    character && `Character: ${character}`,
    negative && `--no ${negative}`,
    audioDesc && `Audio: ${audioDesc}`,
    audioDialogue && dialogueText && `Dialogue: ${dialogueText}`,
  ].filter(Boolean).join(" | ");

  useEffect(()=>onPromptGenerated(promptParts),[promptParts,onPromptGenerated]);

  const InlineIcon=<Target className="w-3 h-3 inline stroke-red-600"/>;
  const toggleMotion=(m:string)=>setMotions(prev=>prev.includes(m)?prev.filter(x=>x!==m):[...prev,m]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-end gap-2">
        <Switch checked={showHints} onCheckedChange={setShowHints} id="hint" />
        <Label htmlFor="hint" className="text-sm">Show hints</Label>
      </div>
      <div className="space-y-1">
        <TextAreaWithIcon
          placeholder="e.g. Brave explorer in steampunk diving suit"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          onBullseyeClick={() => console.log("Enhance Character")}
        />
        <p className="text-xs text-muted-foreground">Click the {InlineIcon} to generate 3 AI‑tuned character variants.</p>
      </div>
      <div className="space-y-1">
        <TextAreaWithIcon
          placeholder="e.g. Submerged temple ruins bathed in emerald light"
          value={scene}
          onChange={(e) => setScene(e.target.value)}
          onBullseyeClick={() => console.log("Enhance Scene")}
        />
        <p className="text-xs text-muted-foreground">Click the {InlineIcon} to generate 3 AI‑tuned scene variants.</p>
      </div>
      <div className="space-y-1">
        <Label>Negative Prompt {showHints&&<span className="text-xs text-muted-foreground">(undesired elements)</span>}</Label>
        <Input placeholder="blurry, watermark, low‑resolution" value={negative} onChange={e=>setNegative(e.target.value)} />
      </div>
      {/* ... Other form controls from Veo3 form ... */}
      <Button className="w-full py-6 mt-4" onClick={()=>onPromptGenerated(promptParts)}>Generate Prompt</Button>
    </section>
  );
};

export default Veo3PromptForm;