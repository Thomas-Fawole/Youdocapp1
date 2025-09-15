import React from 'react';
import { router } from 'expo-router';
import SubscriptionScreen from '../components/SubscriptionScreen';

export default function SubscriptionRoute() {
  const handleBack = () => {
    router.back();
  };

  return (
    <SubscriptionScreen
      onBack={handleBack}
    />
  );
}
