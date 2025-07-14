"use client";
import { useState, useEffect } from "react";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface PixversePromptFormProps { model: string; onPromptGenerated: (prompt: string) => void; }

const PromptField = ({ label, placeholder, value, onChange, onBullseyeClick }: { label: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; onBullseyeClick: () => void; }) => (
    <div className="space-y-1"><Label className="font-medium">{label}</Label><div className="relative"><Textarea rows={3} className="w-full p-2 border rounded pr-10" placeholder={placeholder} value={value} onChange={onChange} /><button type="button" onClick={onBullseyeClick} className="absolute top-2.5 right-2.5 p-1" title="Generate variants"><Target size={20} className="text-red-500" /></button></div></div>
);

const SelectField = ({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (value: string) => void; options: string[]; placeholder: string; }) => (
  <div className="space-y-1"><Label>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{options.map((option) => (<SelectItem key={option} value={option}>{option}</SelectItem>))}</SelectContent></Select></div>
);

const options = { action: ["Static", "Zoom in", "Pan left"], shotSize: ["Wide", "Medium", "Close-up"], style: ["cinematic", "documentary", "fantasy"], negative: ["text", "blurry", "watermark"] };

export default function PixversePromptForm({ model, onPromptGenerated }: PixversePromptFormProps) {
  const [scene, setScene] = useState("");
  const [subject, setSubject] = useState("");
  const [action, setAction] = useState("");
  const [shotSize, setShotSize] = useState("");
  const [style, setStyle] = useState("");
  const [negative, setNegative] = useState<string[]>([]);

  useEffect(() => {
    // Simplified prompt builder for Pixverse
    const prompt = `${subject} ${action}. Scene: ${scene}. Style: ${style}. --no ${negative.join(" ")}`;
    onPromptGenerated(prompt);
  }, [scene, subject, action, shotSize, style, negative, onPromptGenerated]);

  const toggleNegative = (opt: string) => setNegative(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);

  return (
    <div className="space-y-6">
      <PromptField label="Scene Description" placeholder="Describe the environment & mood..." value={scene} onChange={(e) => setScene(e.target.value)} onBullseyeClick={() => console.log("Enhance Scene")} />
      <PromptField label="Subject / Character" placeholder="Who or what is the focus?" value={subject} onChange={(e) => setSubject(e.target.value)} onBullseyeClick={() => console.log("Enhance Subject")} />
      <div className="grid grid-cols-3 gap-4">
        <SelectField label="Action / Motion" placeholder="Action" value={action} onChange={setAction} options={options.action} />
        <SelectField label="Shot Size" placeholder="Shot Size" value={shotSize} onChange={setShotSize} options={options.shotSize} />
        <SelectField label="Style" placeholder="Style" value={style} onChange={setStyle} options={options.style} />
      </div>
      <div>
        <Label className="block font-medium mb-2">Negative Keywords</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{options.negative.map(opt => (<label key={opt} className="inline-flex items-center text-sm"><Checkbox value={opt} checked={negative.includes(opt)} onCheckedChange={() => toggleNegative(opt)} className="mr-2" />{opt}</label>))}</div>
      </div>
      <Button className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-gray-900">Generate Prompt</Button>
    </div>
  );
}