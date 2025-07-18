"use client";
import { useState } from "react";
import { Target, Lightbulb, Mic, Film, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const InlineIcon = <Target className="inline h-3 w-3 stroke-red-600" />;
const PromptField = ({ label, placeholder, value, onChange, onBullseyeClick, description }) => (
  <div className="space-y-1.5">
    <Label htmlFor={label} className="font-semibold">{label}</Label>
    <div className="relative">
      <Textarea id={label} placeholder={placeholder} value={value} onChange={onChange} className="min-h-[80px] pr-10" />
      <button
        type="button"
        onClick={onBullseyeClick}
        className="absolute top-2.5 right-2.5 p-1 rounded-full bg-background/50"
        title={`Enhance ${label} with AI`}
      >
        <Target size={20} className="text-red-500" />
      </button>
    </div>
    <p className="text-xs text-muted-foreground pt-1">{description}</p>
  </div>
);
const SelectField = ({ label, placeholder, value, onChange, options }) => (
  <div className="space-y-1.5">
    <Label htmlFor={label}>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={label}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>
);

const styleOptions = ["Cinematic", "Photorealistic", "Anime", "Documentary", "3D Animation"];
const shotOptions = ["Wide Shot", "Medium Shot", "Close-up", "Drone Shot"];
const motionOptions = ["Slow Pan Left", "Dolly Zoom", "Static", "Handheld"];
const lightingOptions = ["Golden Hour", "Dramatic Lighting", "Soft Natural Light"];
const aspectRatioOptions = ["16:9", "9:16", "1:1", "4:3"];
const negativeOptions = ["None", "Blurry", "Low Quality", "Distorted", "Artifacts", "Text"];
const audioOptions = ["None", "Dialogue Only", "Ambient Sounds", "Background Music", "Full Audio Mix"];
const durationOptions = ["5 seconds", "8 seconds", "10 seconds", "15 seconds"];

export default function Veo3PromptForm({ onPromptGenerated = () => {} }) {
  const [character, setCharacter] = useState("");
  const [scene, setScene] = useState("");
  const [negative, setNegative] = useState("None");
  const [style, setStyle] = useState("Cinematic");
  const [shot, setShot] = useState("");
  const [motion, setMotion] = useState("");
  const [lighting, setLighting] = useState("");
  const [aspect, setAspect] = useState("16:9");
  const [duration, setDuration] = useState("8 seconds");
  const [audioDesc, setAudioDesc] = useState("None");
  const [dialogue, setDialogue] = useState("");
  const [variants, setVariants] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState("");

  const handleEnhance = async (fieldType) => {
    const inputText = fieldType === 'character' ? character : scene;
    if (!inputText) {
      alert("Please enter some text before enhancing.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-variants', { // Use mapped route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText, fieldType }) // Include fieldType
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! Status: ${response.status}`);
      }
      setVariants(data.variants || []);
      setActiveField(fieldType);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Enhance error:", error.message, error.stack);
      alert(`Failed to get suggestions: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariantSelect = (variant) => {
    if (activeField === 'character') setCharacter(variant);
    else if (activeField === 'scene') setScene(variant);
    setIsDialogOpen(false);
  };

  const handleGenerateClick = async () => {
    setIsLoading(true);
    setFinalPrompt("");
    const payload = { targetModel: 'Veo 3+ Studio', inputs: { character, scene, negative, style, shot, motion, lighting, aspect, duration, audioDesc, dialogue } };
    try {
      const response = await fetch('/api/generate-prompt.cjs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error: ${response.status}`);
      }
      setFinalPrompt(data.finalPrompt);
      onPromptGenerated(data.finalPrompt);
    } catch (error) {
      console.error("Generate error:", error.message, error.stack);
      alert(`Failed to generate prompt: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>How Veo Works</AlertTitle>
          <AlertDescription>Veo understands complex narratives. Be descriptive and leverage its unique audio and dialogue generation capabilities.</AlertDescription>
        </Alert>
        <Card>
          <CardHeader><CardTitle>Visual Foundation</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <PromptField
              label="Character & Action"
              placeholder="e.g., A brave explorer discovering a hidden waterfall"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              onBullseyeClick={() => handleEnhance('character')}
              description={<>Click the {InlineIcon} to generate 3 character variants.</>}
            />
            <PromptField
              label="Scene & Environment"
              placeholder="e.g., A lush, vibrant jungle with bioluminescent plants"
              value={scene}
              onChange={(e) => setScene(e.target.value)}
              onBullseyeClick={() => handleEnhance('scene')}
              description={<>Click the {InlineIcon} to generate 3 scene variants.</>}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Film className="w-5 h-5" />Cinematic & Style Controls</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="Artistic Style" placeholder="Style" value={style} onChange={setStyle} options={styleOptions} />
            <SelectField label="Lighting Style" placeholder="Lighting" value={lighting} onChange={setLighting} options={lightingOptions} />
            <SelectField label="Camera Shot" placeholder="Shot Type" value={shot} onChange={setShot} options={shotOptions} />
            <SelectField label="Camera Motion" placeholder="Motion" value={motion} onChange={setMotion} options={motionOptions} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Mic className="w-5 h-5" />Audio & Dialogue</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <SelectField label="Audio Inclusion" placeholder="Select audio type" value={audioDesc} onChange={setAudioDesc} options={audioOptions} />
            <div className="space-y-1.5">
              <Label>Dialogue (if applicable)</Label>
              <Textarea placeholder="Character A: 'We finally made it.'" value={dialogue} onChange={e => setDialogue(e.target.value)} className="min-h-[60px]" />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Negative Prompt" placeholder="Select what to avoid" value={negative} onChange={setNegative} options={negativeOptions} />
          <SelectField label="Aspect Ratio" placeholder="Select aspect ratio" value={aspect} onChange={setAspect} options={aspectRatioOptions} />
        </div>
        <SelectField label="Duration" placeholder="Select duration" value={duration} onChange={setDuration} options={durationOptions} />
        <Button
          onClick={handleGenerateClick}
          disabled={isLoading}
          className="w-full py-6 text-base font-medium mt-4"
        >
          {isLoading ? 'Generating...' : '✨ Generate Veo Prompt'}
        </Button>
        {finalPrompt && (
          <div className="space-y-1.5 pt-4">
            <Label className="font-medium text-lg">Final Veo Prompt</Label>
            <div className="relative">
              <Textarea value={finalPrompt} readOnly className="min-h-[100px] pr-10" />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(finalPrompt)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Choose a Variant</DialogTitle>
            <DialogDescription>Select one of the AI-generated variants below to replace your text.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {variants.map((variant, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto text-left whitespace-normal justify-start"
                onClick={() => handleVariantSelect(variant)}
              >
                {variant}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}