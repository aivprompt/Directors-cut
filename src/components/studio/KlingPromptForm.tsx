"use client";
import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface KlingPromptFormProps { model: string; onPromptGenerated: (prompt: string) => void; }

const PromptField = ({ label, placeholder, value, onChange, onBullseyeClick }: { label: string, placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; onBullseyeClick: () => void; }) => (
  <div className="space-y-1">
    <Label>{label}</Label>
    <div className="relative">
      <Textarea rows={6} placeholder={placeholder} value={value} onChange={onChange} className="pr-12" />
      <button type="button" onClick={onBullseyeClick} className="absolute top-2.5 right-2.5 rounded-full bg-white/80 p-1 shadow focus:outline-none"><Target className="w-4 h-4 stroke-red-600" /></button>
    </div>
  </div>
);

const aspectRatioOptions = ["16:9", "9:16", "1:1", "4:3"];
const durationOptions = ["5s", "10s"];
const cameraMotionOptions = ["Static", "Tilt", "Horizontal Zoom", "Vertical Zoom"];
const creativityOptions = ["Max Relevance", "Balanced", "Max Creativity"];

export default function KlingPromptForm({ onPromptGenerated }: KlingPromptFormProps) {
  const [scene, setScene] = useState("");
  const [character, setCharacter] = useState("");
  const [aspect, setAspect] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [cameraMotion, setCameraMotion] = useState<string>("");
  const [creativity, setCreativity] = useState<string>("");

  useEffect(() => {
    const composed = [ cameraMotion, creativity, aspect, duration, scene ? `. Scene: ${scene}.` : "", character ? ` Character: ${character}.` : "" ].filter(Boolean).join(", ");
    onPromptGenerated(composed.trim());
  }, [scene, character, aspect, duration, cameraMotion, creativity, onPromptGenerated]);

  const enhanceField = (field: "scene" | "character") => console.log(`Enhance ${field}`);
  const Field = ({ label, value, set, options }: { label: string; value: string; set: (v: string) => void; options: string[] }) => (
    <div className="space-y-1"><Label>{label}</Label><Select value={value} onValueChange={set}><SelectTrigger className="h-9 w-full truncate"><SelectValue placeholder={`Select ${label}`} /></SelectTrigger><SelectContent>{options.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}</SelectContent></Select></div>
  );

  return (
    <section className="space-y-6">
      <PromptField label="Character Description" placeholder="Who or what is the focus?" value={character} onChange={(e) => setCharacter(e.target.value)} onBullseyeClick={() => enhanceField("character")} />
      <PromptField label="Scene Description" placeholder="Describe the environment" value={scene} onChange={(e) => setScene(e.target.value)} onBullseyeClick={() => enhanceField("scene")} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Aspect Ratio" value={aspect} set={setAspect} options={aspectRatioOptions} />
        <Field label="Video Duration" value={duration} set={setDuration} options={durationOptions} />
        <Field label="Camera Motion" value={cameraMotion} set={setCameraMotion} options={cameraMotionOptions} />
        <Field label="Creativity vs Relevance" value={creativity} set={setCreativity} options={creativityOptions} />
      </div>
      <Button className="w-full py-6 text-base font-medium">Generate Prompt</Button>
    </section>
  );
};