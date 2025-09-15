import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import AddDeviceScreen from '../components/AddDeviceScreen';

export default function AddDevicePage() {
  const params = useLocalSearchParams();

  const handleBack = () => {
    router.back();
  };

  const handleDeviceAdded = (device: any) => {
    // In a real app, you would update the global state or send to backend
    console.log('New device added:', device);
    
    // Navigate back to connected devices
    router.back();
  };

  return (
    <AddDeviceScreen 
      onBack={handleBack}
      onDeviceAdded={handleDeviceAdded}
    />
  );
}
