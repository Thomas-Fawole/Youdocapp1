import React from 'react';
import { router } from 'expo-router';
import ConnectedDevicesScreen from '../components/ConnectedDevicesScreen';

export default function ConnectedDevicesPage() {
  const handleBack = () => {
    router.back();
  };

  return (
    <ConnectedDevicesScreen 
      onBack={handleBack}
    />
  );
}
