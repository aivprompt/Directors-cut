"use client";
import { useState } from "react";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface LumaPromptFormProps { model: string; onPromptGenerated: (prompt: string) => void; }

const PromptField = ({ label, placeholder, value, onChange, onBullseyeClick }: { label: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; onBullseyeClick: () => void; }) => (
  <div className="space-y-1">
    <Label className="font-medium">{label}</Label>
    <div className="relative">
      <Textarea rows={3} className="w-full p-2 border rounded pr-10" placeholder={placeholder} value={value} onChange={onChange} />
      <button type="button" onClick={onBullseyeClick} className="absolute top-2.5 right-2.5 p-1" title="Generate variants"><Target size={20} className="text-red-500" /></button>
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options, placeholder }: { label:string; value: string; onChange: (value: string) => void; options: string[]; placeholder: string; }) => (
  <div className="space-y-1"><Label>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{options.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select></div>
);

const options = { cameraPath: ["Static", "Linear", "Circular"], cameraMotion: ["Pan Left", "Zoom In", "Orbit"] };

export default function LumaPromptForm({ model, onPromptGenerated }: LumaPromptFormProps) {
  const [character, setCharacter] = useState("");
  const [scene, setScene] = useState("");
  const [cameraPath, setCameraPath] = useState("");
  const [cameraMotion, setCameraMotion] = useState("");

  useEffect(() => {
    // This is a simplified prompt builder for Luma
    const prompt = `${scene}. Character: ${character}. Camera: ${cameraPath} ${cameraMotion}.`;
    onPromptGenerated(prompt);
  }, [character, scene, cameraPath, cameraMotion, onPromptGenerated]);

  const askVariant = (field: "character" | "scene") => console.log(`Ask variant for ${field}`);

  return (
    <div className="space-y-6">
      <PromptField label="Character Description" placeholder="e.g., 'A curious fox exploring ancient ruins'" value={character} onChange={(e) => setCharacter(e.target.value)} onBullseyeClick={() => askVariant("character")} />
      <PromptField label="Scene Description" placeholder="e.g., 'A snowy mountain peak at sunrise'" value={scene} onChange={(e) => setScene(e.target.value)} onBullseyeClick={() => askVariant("scene")} />
      <div className="grid grid-cols-2 gap-4">
        <SelectField label="Camera Path" placeholder="Select Camera Path" value={cameraPath} onChange={setCameraPath} options={options.cameraPath} />
        <SelectField label="Camera Motion" placeholder="Select Camera Motion" value={cameraMotion} onChange={setCameraMotion} options={options.cameraMotion} />
      </div>
      <Button className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-gray-900">Generate Prompt</Button>
    </div>
  );
}