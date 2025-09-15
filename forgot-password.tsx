import React from 'react';
import { router } from 'expo-router';
import ForgotPasswordFlow from '../components/auth/ForgotPasswordFlow';

export default function ForgotPasswordScreen() {
  const handleForgotPasswordComplete = () => {
    // Navigate to sign in after successful flow completion
    router.replace('/signin');
  };

  const handleBack = () => {
    // Go back to sign in
    router.replace('/signin');
  };

  return (
    <ForgotPasswordFlow 
      onComplete={handleForgotPasswordComplete}
      onBack={handleBack}
    />
  );
}
