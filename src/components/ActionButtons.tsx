import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MidjourneyStudio from './MidjourneyStudio';

const ActionButtons = () => {
  const buttons = [
    { id: 1, title: 'Veo 3+ Studio', description: 'Advanced AI video generation' },
    { id: 2, title: 'Runway Gen4+ Studio', description: 'Advanced AI video generation' },
    { id: 3, title: 'Kling 2.0+ Studio', description: 'Advanced AI video generation' },
    { id: 4, title: 'Luma Dream Machine Studio', description: 'Advanced AI video generation' },
    { id: 5, title: 'Pixverse Studio', description: 'Advanced AI video generation' },
    { id: 6, title: 'Midjourney Video Studio', description: 'Advanced AI video generation' },
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-16">
          Select your studio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {buttons.map((button) => (
            <Card 
              key={button.id}
              className="group relative bg-gradient-card border-border hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              <div className="aspect-video bg-muted/30 flex items-center justify-center relative">
                {button.id === 1 ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img 
                      src="/lovable-uploads/18d5dcd3-c99a-4836-8371-123df19ab67d.png"
                      alt="Veo 3 Studio"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ) : button.id === 2 ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img 
                      src="/lovable-uploads/a0da0a3e-2ca4-4ac7-bc47-e96657646eed.png"
                      alt="Runway Gen4+ Studio"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ) : button.id === 3 ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img 
                      src="/lovable-uploads/2e9fb265-059a-4527-8389-b1667fdd1914.png"
                      alt="Kling 2.0+"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ) : button.id === 4 ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img 
                      src="/lovable-uploads/885025ca-1d53-465e-a755-581830b6dbbd.png"
                      alt="Luma Dream Machine"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ) : button.id === 5 ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img 
                      src="/lovable-uploads/a3fcf9db-89f8-4078-b26e-f340f94c42c9.png"
                      alt="Pixverse Studio"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ) : button.id === 6 ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img 
                      src="/lovable-uploads/4334862d-9434-4103-aae2-703e729218d1.png"
                      alt="Midjourney Video Studio"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/30">
                      {button.id}
                    </div>
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {button.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {button.description}
                </p>
              </div>
              
              {button.id === 6 ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <div className="absolute inset-0 cursor-pointer" />
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[90vh] overflow-y-auto bg-background border-border">
                    <MidjourneyStudio />
                  </SheetContent>
                </Sheet>
              ) : null}
              
              {/* Hover overlay for all cards */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 shadow-depth opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionButtons;