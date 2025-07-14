// src/pages/StudioPage.tsx

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ActionButtons from '@/components/ActionButtons';
import MembershipSection from '@/components/MembershipSection';

const StudioPage = () => {
  // In a real application, this value would come from your user's authentication status.
  // We are setting it to 'false' to demonstrate the paywall.
  // Change it to 'true' to see the studio buttons.
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {isSubscribed ? (
          // If the user IS subscribed, show the studios.
          <ActionButtons />
        ) : (
          // If the user IS NOT subscribed, show the membership options.
          <>
            <div className="text-center py-10 px-6">
              <h1 className="text-4xl font-bold text-primary mb-4">Access Denied</h1>
              <p className="text-xl text-muted-foreground">
                You must be a member to access the AI Video Studios.
              </p>
            </div>
            <MembershipSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default StudioPage;