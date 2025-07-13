import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Sparkles, Target, Shuffle } from 'lucide-react';

interface MidjourneyStudioProps {
  onClose?: () => void;
}

const MidjourneyStudio = ({ onClose }: MidjourneyStudioProps) => {
  const [prompt, setPrompt] = useState('');
  const [seed, setSeed] = useState('');

  const tips = [
    { icon: Target, title: "Anchor Start Frame", desc: "Drag an image into the prompt bar." },
    { icon: Sparkles, title: "Extend in Chunks", desc: "After 5s, use --duration flags to extend." },
    { icon: Shuffle, title: "Static vs Dynamic", desc: 'Use "static camera" + --chaos 0.' },
    { icon: Target, title: "Subtle Prompts", desc: 'e.g. "slow dolly," "gentle pan."' },
    { icon: Sparkles, title: "Lock Seed", desc: "--seed for consistency." },
    { icon: Shuffle, title: "Stylize", desc: "Low/Medium for realism; High for drama." }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Midjourney Video Studio
        </h1>
        <p className="text-xl text-muted-foreground">
          Professional AI video generation with cinematic control
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Prompt & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prompt Text */}
          <Card className="p-6 bg-gradient-card border-border">
            <Label htmlFor="prompt" className="text-lg font-semibold text-foreground mb-4 block">
              Prompt Text
            </Label>
            <Textarea
              id="prompt"
              placeholder="Enter your video prompt... e.g. 'A serene waterfall at sunrise with golden light'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
            />
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-muted-foreground">Click the</span>
              <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                <Sparkles className="h-3 w-3" />
              </Button>
              <span className="text-sm text-muted-foreground">to generate 3 prompt variants.</span>
            </div>
          </Card>

          {/* Generation Controls */}
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Generation Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Row 1 */}
              <div className="space-y-2">
                <Label className="text-foreground">Version</Label>
                <Select defaultValue="latest">
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="v6">Version 6</SelectItem>
                    <SelectItem value="v5">Version 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground">Chaos</Label>
                <Select defaultValue="25">
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 (Static)</SelectItem>
                    <SelectItem value="25">25 (Low)</SelectItem>
                    <SelectItem value="50">50 (Medium)</SelectItem>
                    <SelectItem value="100">100 (High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Stylize</Label>
                <Select defaultValue="100">
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50 (Realistic)</SelectItem>
                    <SelectItem value="100">100 (Balanced)</SelectItem>
                    <SelectItem value="250">250 (Stylized)</SelectItem>
                    <SelectItem value="750">750 (Artistic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 2 */}
              <div className="space-y-2">
                <Label className="text-foreground">Quality</Label>
                <Select defaultValue="standard">
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="high">High Quality</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Aspect Ratio</Label>
                <Select defaultValue="16:9">
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                    <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
                    <SelectItem value="1:1">1:1 (Square)</SelectItem>
                    <SelectItem value="4:3">4:3 (Classic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Duration</Label>
                <Select defaultValue="4s">
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2s">2 seconds</SelectItem>
                    <SelectItem value="4s">4 seconds</SelectItem>
                    <SelectItem value="6s">6 seconds</SelectItem>
                    <SelectItem value="10s">10 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 3 */}
              <div className="space-y-2">
                <Label className="text-foreground">Resolution</Label>
                <Select defaultValue="1080p">
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="4k">4K</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Stop (%)</Label>
                <Select defaultValue="100">
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25%</SelectItem>
                    <SelectItem value="50">50%</SelectItem>
                    <SelectItem value="75">75%</SelectItem>
                    <SelectItem value="100">100%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Seed</Label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Seed"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    className="flex-1 h-10 px-3 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                  <Button size="sm" variant="outline" onClick={() => setSeed(Math.floor(Math.random() * 1000000).toString())}>
                    <Shuffle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Negative Keywords */}
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Negative Keywords</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['text', 'logo', 'watermark', 'subtitles', 'artifacts', 'lowres', 'blurry'].map((keyword) => (
                <div key={keyword} className="flex items-center space-x-2">
                  <Checkbox id={keyword} />
                  <Label htmlFor={keyword} className="text-foreground capitalize">
                    {keyword}
                  </Label>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Checkbox id="include-video" />
              <Label htmlFor="include-video" className="text-foreground">
                Include video build-up (--video)
              </Label>
            </div>
          </Card>

          {/* Generate Button */}
          <Button 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-lg shadow-spotlight"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Video
          </Button>
        </div>

        {/* Right Column - Preview & Tips */}
        <div className="space-y-6">
          {/* Prompt Preview */}
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Prompt Preview</h3>
            <div className="min-h-[200px] p-4 bg-muted/20 rounded-md border border-border">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {prompt || "Your generated prompt will appear here"}
              </p>
            </div>
          </Card>

          {/* Tips & Tricks */}
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Tips & Tricks for Midjourney Video</h3>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <tip.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{tip.title}:</p>
                    <p className="text-muted-foreground text-sm">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MidjourneyStudio;