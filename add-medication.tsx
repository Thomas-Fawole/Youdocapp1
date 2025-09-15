import React from 'react';
import { router } from 'expo-router';
import AddMedicationScreen from '../components/AddMedicationScreen';

export default function AddMedication() {
  const handleBack = () => {
    router.back();
  };

  const handleSave = (medication: any) => {
    // In a real app, this would save to a database or state management
    console.log('Saving medication:', medication);
    // Navigate to My Medication screen specifically
    router.replace('/my-medication');
  };

  const handleHome = () => {
    router.replace('/dashboard');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <AddMedicationScreen
      onBack={handleBack}
      onSave={handleSave}
      onHome={handleHome}
      onNotifications={handleNotifications}
      onProfile={handleProfile}
    />
  );
}

