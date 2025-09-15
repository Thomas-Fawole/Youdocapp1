import React, { useState } from 'react';
import { View } from 'react-native';
import WelcomeScreen from './WelcomeScreen';
import WellnessScreen from './WellnessScreen';
import CarepointScreen from './CarepointScreen';
import AuthScreen from './AuthScreen';
import { AuthThemeProvider } from '../../contexts/AuthThemeContext';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < 3) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleSkip = () => {
    setCurrentScreen(3); // Go directly to auth screen
  };

  const handleEmailAuth = () => {
    // Handle email authentication
    console.log('Email authentication pressed');
    onComplete();
  };

  const handleGoogleAuth = () => {
    // Handle Google authentication
    console.log('Google authentication pressed');
    onComplete();
  };

  const handleAppleAuth = () => {
    // Handle Apple authentication
    console.log('Apple authentication pressed');
    onComplete();
  };

  const handleCreateAccount = () => {
    // Navigate to signup flow
    console.log('Create account pressed');
    // This will be handled by the parent component (onboarding screen)
    // We'll use router navigation in the AuthScreen component instead
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <WelcomeScreen
            onNext={handleNext}
            onSkip={handleSkip}
          />
        );
      case 1:
        return (
          <WellnessScreen
            onNext={handleNext}
            onSkip={handleSkip}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <CarepointScreen
            onNext={handleNext}
            onSkip={handleSkip}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <AuthScreen
            onEmailAuth={handleEmailAuth}
            onGoogleAuth={handleGoogleAuth}
            onAppleAuth={handleAppleAuth}
            onCreateAccount={handleCreateAccount}
          />
        );
      default:
        return (
          <WelcomeScreen
            onNext={handleNext}
            onSkip={handleSkip}
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

export default OnboardingFlow;

