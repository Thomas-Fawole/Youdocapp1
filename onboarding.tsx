import React from 'react';
import { router } from 'expo-router';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';

export default function OnboardingScreen() {
  const handleOnboardingComplete = () => {
    // Navigate to the main app after onboarding is complete
    router.replace('/(tabs)');
  };

  return (
    <OnboardingFlow onComplete={handleOnboardingComplete} />
  );
}

