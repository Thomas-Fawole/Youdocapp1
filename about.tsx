import React from 'react';
import { router } from 'expo-router';
import AboutScreen from '../components/AboutScreen';

export default function AboutRoute() {
  const handleBack = () => {
    router.back();
  };

  return (
    <AboutScreen
      onBack={handleBack}
    />
  );
}
