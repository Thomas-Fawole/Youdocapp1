import React from 'react';
import { router } from 'expo-router';
import EmergencyContactsScreen from '../components/EmergencyContactsScreen';

export default function EmergencyContactsRoute() {
  const handleBack = () => {
    router.back();
  };

  return (
    <EmergencyContactsScreen
      onBack={handleBack}
    />
  );
}
