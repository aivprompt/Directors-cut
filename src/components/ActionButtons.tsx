// src/components/ActionButtons.tsx

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Card } from '@/components/ui/card';

// Step 1: Import all your prompt form components as before
import Veo3PromptForm from '@/components/studio/Veo3PromptForm';
import RunwayGen4PromptForm from '@/components/studio/RunwayGen4PromptForm';
import KlingPromptForm from '@/components/studio/KlingPromptForm';
import LumaPromptForm from '@/components/studio/LumaDreamMachinePromptForm';
import PixversePromptForm from '@/components/studio/PixversePromptForm';
import MidjourneyVideoPromptForm from '@/components/studio/MidjourneyVideoPromptForm';

// Dummy onPromptGenerated function for the forms
const handlePromptGenerated = (prompt: string) => {
  console.log("Generated Prompt:", prompt);
  // In a real app, you would handle the generated prompt here
};

// This new helper component explicitly renders the correct form
const StudioComponent = ({ name }: { name: string }) => {
  switch (name) {
    case 'Veo 3+ Studio':
      return <Veo3PromptForm onPromptGenerated={handlePromptGenerated} />;
    case 'Runway Gen4+ Studio':
      return <RunwayGen4PromptForm onPromptGenerated={handlePromptGenerated} />;
    case 'Kling 2.0+ Studio':
      return <KlingPromptForm model="Kling" onPromptGenerated={handlePromptGenerated} />;
    case 'Luma Dream Machine Studio':
      return <LumaPromptForm model="Luma" onPromptGenerated={handlePromptGenerated} />;
    case 'Pixverse Studio':
      return <PixversePromptForm model="Pixverse" onPromptGenerated={handlePromptGenerated} />;
    case 'Midjourney Video Studio':
      return <MidjourneyVideoPromptForm model="Midjourney" onPromptGenerated={handlePromptGenerated} />;
    default:
      return <div>Form not found.</div>;
  }
};

const ActionButtons = () => {
  // The buttons array now just holds the data, not the components themselves
  const buttons = [
    { id: 1, title: 'Veo 3+ Studio', description: 'Advanced AI video generation', image: '/lovable-uploads/18d5dcd3-c99a-4836-8371-123df19ab67d.png' },
    { id: 2, title: 'Runway Gen4+ Studio', description: 'Advanced AI video generation', image: '/lovable-uploads/a0da0a3e-2ca4-4ac7-bc47-e96657646eed.png' },
    { id: 3, title: 'Kling 2.0+ Studio', description: 'Advanced AI video generation', image: '/lovable-uploads/2e9fb265-059a-4527-8389-b1667fdd1914.png' },
    { id: 4, title: 'Luma Dream Machine Studio', description: 'Advanced AI video generation', image: '/lovable-uploads/885025ca-1d53-465e-a755-581830b6dbbd.png' },
    { id: 5, title: 'Pixverse Studio', description: 'Advanced AI video generation', image: '/lovable-uploads/a3fcf9db-89f8-4078-b26e-f340f94c42c9.png' },
    { id: 6, title: 'Midjourney Video Studio', description: 'Advanced AI video generation', image: '/lovable-uploads/4334862d-9434-4103-aae2-703e729218d1.png' },
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-16">
          Select your studio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {buttons.map((button) => (
            <Sheet key={button.id}>
              <SheetTrigger asChild>
                <Card className="group relative bg-gradient-card border-border hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer">
                  <div className="aspect-video bg-muted/30 flex items-center justify-center relative">
                    <img src={button.image} alt={button.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{button.title}</h3>
                    <p className="text-muted-foreground text-sm">{button.description}</p>
                  </div>
                  <div className="absolute inset-0 shadow-depth opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </Card>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl overflow-y-auto bg-background border-border p-0">
                <SheetHeader className="p-6 bg-muted/50 border-b">
                  <SheetTitle className="text-2xl text-foreground">{button.title}</SheetTitle>
                </SheetHeader>
                <div className="p-6">
                  {/* Use the new helper component to render the correct form */}
                  <StudioComponent name={button.title} />
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionButtons;