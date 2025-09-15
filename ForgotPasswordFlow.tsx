import React, { useState } from 'react';
import { View } from 'react-native';
import { AuthThemeProvider } from '../../contexts/AuthThemeContext';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ResetPasswordConfirmationScreen from './ResetPasswordConfirmationScreen';
import NewPasswordScreen from './NewPasswordScreen';

interface ForgotPasswordFlowProps {
  onComplete: () => void;
  onBack: () => void;
  initialStep?: number; // 0: forgot password, 1: confirmation, 2: new password
  resetToken?: string; // For direct access to new password screen
}

const ForgotPasswordFlow: React.FC<ForgotPasswordFlowProps> = ({ 
  onComplete, 
  onBack,
  initialStep = 0,
  resetToken 
}) => {
  const [currentScreen, setCurrentScreen] = useState(initialStep);
  const [userEmail, setUserEmail] = useState('');

  const handleSendResetEmail = (email: string) => {
    setUserEmail(email);
    setCurrentScreen(1); // Go to confirmation screen
  };

  const handleResendEmail = async () => {
    // Simulate API call to resend reset email
    console.log('Resending reset email to:', userEmail);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleBackToForgotPassword = () => {
    setCurrentScreen(0);
  };

  const handleBackToSignIn = () => {
    onBack();
  };

  const handlePasswordResetComplete = () => {
    onComplete();
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <ForgotPasswordScreen
            onNext={handleSendResetEmail}
            onBack={handleBackToSignIn}
          />
        );
      case 1:
        return (
          <ResetPasswordConfirmationScreen
            email={userEmail}
            onBackToSignIn={handleBackToSignIn}
            onResendEmail={handleResendEmail}
          />
        );
      case 2:
        return (
          <NewPasswordScreen
            onComplete={handlePasswordResetComplete}
            onBack={handleBackToForgotPassword}
            resetToken={resetToken}
          />
        );
      default:
        return (
          <ForgotPasswordScreen
            onNext={handleSendResetEmail}
            onBack={handleBackToSignIn}
          />
        );
    }
  };

  return (
    <AuthThemeProvider>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </AuthThemeProvider>
  );
};

export default ForgotPasswordFlow;
