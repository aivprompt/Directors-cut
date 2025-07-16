// src/components/studio/Veo3PromptForm.tsx

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Target } from 'lucide-react'; // Bullseye Icon

// 1. Define the shape of your form with Zod
const formSchema = z.object({
  basicIdea: z.string().min(10, {
    message: 'Please describe your idea in at least 10 characters.',
  }),
  style: z.string().optional(),
  cameraAngle: z.string().optional(),
  lighting: z.string().optional(),
});

// Define the props the component receives
interface Veo3PromptFormProps {
  onPromptGenerated: (finalPrompt: string) => void;
}

// 2. The Complete Component
const Veo3PromptForm = ({ onPromptGenerated }: Veo3PromptFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState('');

  // Set up the form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basicIdea: '',
      style: '',
      cameraAngle: '',
      lighting: '',
    },
  });

  // 3. This function calls your API for suggestions
  const handleGetSuggestions = async () => {
    const basicIdea = form.getValues('basicIdea'); // Get text from the form field
    if (!basicIdea) {
      alert('Please enter a basic idea first.');
      return;
    }

    setIsLoading(true);
    setSuggestions(''); // Clear previous suggestions

    try {
      const response = await fetch('/api/generate-variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: basicIdea }), // Send the text
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get suggestions.');
      }

      const data = await response.json();
      setSuggestions(data.suggestions); // Store the suggestions
    } catch (error: any) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. This function runs when the main "Generate" button is clicked
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Combine all the form fields into a final, engineered prompt
    const finalPrompt = `
      ${values.basicIdea}. 
      Style: ${values.style || 'cinematic'}. 
      Camera Angle: ${values.cameraAngle || 'eye-level'}. 
      Lighting: ${values.lighting || 'natural light'}.
    `.trim();

    onPromptGenerated(finalPrompt);
  }

  // 5. This is your UI (JSX)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="basicIdea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Basic Idea</FormLabel>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Textarea
                    placeholder="A majestic whale breaching the ocean surface at sunset"
                    {...field}
                    rows={4}
                  />
                </FormControl>
                {/* This is your "bullseye" button */}
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleGetSuggestions}
                  disabled={isLoading}
                >
                  <Target className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Display suggestions from the API call */}
        {suggestions && (
          <div className="p-4 bg-muted/50 border rounded-md">
            <p className="text-sm font-medium">Suggestion:</p>
            <p className="text-sm text-muted-foreground">{suggestions}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Style</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Hyperrealistic, Anime" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cameraAngle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camera Angle</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Low angle shot" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lighting"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lighting</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Golden hour" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Generate Advanced Prompt'}
        </Button>
      </form>
    </Form>
  );
};

export default Veo3PromptForm;