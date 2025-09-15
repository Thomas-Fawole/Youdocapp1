import React from 'react';
import { router } from 'expo-router';
import HealthSupportScreen from '../components/HealthSupportScreen';

export default function HealthSupportRoute() {
  const handleBack = () => {
    router.back();
  };

  return (
    <HealthSupportScreen
      onBack={handleBack}
    />
  );
}
