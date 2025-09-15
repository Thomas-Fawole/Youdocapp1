import React from 'react';
import { router } from 'expo-router';
import SignUpFlow from '../components/auth/SignUpFlow';

export default function SignUpScreen() {
  const handleSignUpComplete = () => {
    // Navigate to the dashboard after signup is complete
    router.replace('/dashboard');
  };

  const handleBackToAuth = () => {
    // Go back to the onboarding auth screen
    router.back();
  };

  const handleSignOut = () => {
    // Navigate back to onboarding/auth screen
    router.replace('/onboarding');
  };

  return (
    <SignUpFlow 
      onComplete={handleSignUpComplete}
      onBack={handleBackToAuth}
      onSignOut={handleSignOut}
    />
  );
}
