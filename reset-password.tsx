import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import ForgotPasswordFlow from '../components/auth/ForgotPasswordFlow';

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token?: string }>();

  const handleResetComplete = () => {
    // Navigate to sign in after successful password reset
    router.replace('/signin');
  };

  const handleBack = () => {
    // Go back to sign in
    router.replace('/signin');
  };

  return (
    <ForgotPasswordFlow 
      onComplete={handleResetComplete}
      onBack={handleBack}
      initialStep={2} // Start directly on new password screen
      resetToken={token}
    />
  );
}
