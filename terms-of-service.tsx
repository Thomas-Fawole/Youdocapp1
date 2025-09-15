import React from 'react';
import { router } from 'expo-router';
import TermsOfServiceScreen from '../components/TermsOfServiceScreen';

export default function TermsOfServiceRoute() {
  const handleBack = () => {
    router.back();
  };

  return (
    <TermsOfServiceScreen 
      onBack={handleBack}
    />
  );
}
