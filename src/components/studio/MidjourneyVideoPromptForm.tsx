"use client";
import { useState, useEffect } from "react";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface MidjourneyVideoPromptFormProps { model: string; onPromptGenerated: (prompt: string) => void; }

const PromptField = ({ label, placeholder, value, onChange, onBullseyeClick }: { label: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; onBullseyeClick: () => void; }) => (
    <div className="space-y-1"><Label className="font-medium mb-1">{label}</Label><div className="relative"><Textarea rows={4} className="w-full p-2 border rounded pr-10" placeholder={placeholder} value={value} onChange={onChange} /><button type="button" onClick={onBullseyeClick} className="absolute top-2.5 right-2.5 p-1" title="Generate prompt variants"><Target size={20} className="text-red-500" /></button></div><p className="mt-1 text-sm text-gray-500">Click the <Target className="inline w-4 h-4 text-red-500" /> to generate 3 prompt variants.</p></div>
);

const SelectField = ({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (value: string) => void; options: string[]; placeholder: string; }) => (
  <div className="space-y-1"><Label>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{options.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select></div>
);

const options = { version: ["5.2", "niji"], chaos: ["0", "25", "50"], aspectRatio: ["16:9", "1:1"] };

export default function MidjourneyVideoPromptForm({ model, onPromptGenerated }: MidjourneyVideoPromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [version, setVersion] = useState("");
  const [chaos, setChaos] = useState("");
  const [aspectRatio, setAspectRatio] = useState("");
  const [videoToggle, setVideoToggle] = useState(false);

  useEffect(() => {
    // Simplified prompt builder for Midjourney
    const promptString = `${prompt} --ar ${aspectRatio} --v ${version} --c ${chaos} ${videoToggle ? '--video' : ''}`;
    onPromptGenerated(promptString);
  }, [prompt, version, chaos, aspectRatio, videoToggle, onPromptGenerated]);

  const askVariants = () => console.log("Ask variants for Midjourney");

  return (
    <div className="space-y-6">
      <PromptField label="Prompt Text" placeholder="Enter your video prompt..." value={prompt} onChange={(e) => setPrompt(e.target.value)} onBullseyeClick={askVariants} />
      <div className="grid grid-cols-3 gap-4">
        <SelectField label="Version" placeholder="Select Version" value={version} onChange={setVersion} options={options.version} />
        <SelectField label="Chaos" placeholder="Select Chaos" value={chaos} onChange={setChaos} options={options.chaos} />
        <SelectField label="Aspect Ratio" placeholder="Select Aspect Ratio" value={aspectRatio} onChange={setAspectRatio} options={options.aspectRatio} />
      </div>
      <div className="flex items-center">
        <Checkbox id="videoToggle-mj" checked={videoToggle} onCheckedChange={(checked) => setVideoToggle(Boolean(checked))} className="mr-2" />
        <Label htmlFor="videoToggle-mj" className="text-sm">Include video build-up (<code>--video</code>)</Label>
      </div>
      <Button className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-gray-900">Generate Prompt</Button>
    </div>
  );
}