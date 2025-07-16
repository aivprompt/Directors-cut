// Example for: /src/components/studio/Veo3PromptForm.tsx

import React, { useState } from 'react';
// Import your components (Button, Input, etc.) as needed
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// This is the type for the props the component receives
interface Veo3PromptFormProps {
  onPromptGenerated: (finalPrompt: string) => void;
}

const Veo3PromptForm = ({ onPromptGenerated }: Veo3PromptFormProps) => {
  // State to hold the user's basic idea
  const [basicIdea, setBasicIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // This is the function with the CORRECT fetch call
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-variants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: basicIdea }), // Correctly send the text
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get suggestions.');
      }

      const data = await response.json();
      // Pass the generated prompt to the parent component
      onPromptGenerated(data.suggestions);

    } catch (error: any) {
      console.error('Error:', error);
      alert(error.message); // Show the error in a popup
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Your form JSX will go here. This is just a basic example.
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Enter your basic idea for the video..."
        value={basicIdea}
        onChange={(e) => setBasicIdea(e.target.value)}
        rows={5}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Advanced Prompt'}
      </Button>
    </form>
  );
};

export default Veo3PromptForm;