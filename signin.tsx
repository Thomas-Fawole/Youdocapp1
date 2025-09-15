import React from 'react';
import { router } from 'expo-router';
import SignInFlow from '../components/auth/SignInFlow';

export default function SignInScreen() {
  const handleSignInComplete = () => {
    // Navigate to the dashboard after sign in is complete
    router.replace('/dashboard');
  };

  const handleBackToAuth = () => {
    // Go back to the onboarding auth screen
    router.back();
  };

  const handleSignUp = () => {
    // Navigate to sign up flow
    router.push('/signup');
  };

  const handleSignOut = () => {
    // Navigate back to onboarding/auth screen
    router.replace('/onboarding');
  };

  return (
    <SignInFlow 
      onComplete={handleSignInComplete}
      onBack={handleBackToAuth}
      onSignUp={handleSignUp}
      onSignOut={handleSignOut}
    />
  );
}
