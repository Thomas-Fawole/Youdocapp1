import React from 'react';
import { router } from 'expo-router';
import PrivacyScreen from '../components/PrivacyScreen';

export default function PrivacyRoute() {
  const handleBack = () => {
    router.back();
  };

  return (
    <PrivacyScreen
      onBack={handleBack}
    />
  );
}
