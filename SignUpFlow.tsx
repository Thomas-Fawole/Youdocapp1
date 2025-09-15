import React, { useState } from 'react';
import { View } from 'react-native';
import SignUpScreen from './SignUpScreen';
import EmailVerificationScreen from './EmailVerificationScreen';
import SuccessScreen from './SuccessScreen';
import { AuthThemeProvider } from '../../contexts/AuthThemeContext';

interface SignUpFlowProps {
  onComplete: () => void;
  onBack: () => void;
  onSignOut?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  repeatPassword: string;
}

const SignUpFlow: React.FC<SignUpFlowProps> = ({ onComplete, onBack, onSignOut }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userFormData, setUserFormData] = useState<FormData | null>(null);

  const handleSignUpNext = (formData: FormData) => {
    setUserFormData(formData);
    setCurrentScreen(1); // Go to email verification
  };

  const handleVerificationNext = () => {
    setCurrentScreen(2); // Go to success screen
  };

  const handleBackToSignUp = () => {
    setCurrentScreen(0);
  };

  const handleBackToAuth = () => {
    onBack();
  };

  const handleSendToDifferentEmail = () => {
    // Go back to sign up screen to change email
    setCurrentScreen(0);
  };

  const handleLogin = () => {
    // Complete the signup flow and navigate to main app
    onComplete();
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <SignUpScreen
            onNext={handleSignUpNext}
            onBack={handleBackToAuth}
          />
        );
      case 1:
        return (
          <EmailVerificationScreen
            onNext={handleVerificationNext}
            onBack={handleBackToSignUp}
            onSendToDifferentEmail={handleSendToDifferentEmail}
            onSignOut={onSignOut}
            email={userFormData?.email}
          />
        );
      case 2:
        return (
          <SuccessScreen
            onLogin={handleLogin}
          />
        );
      default:
        return (
          <SignUpScreen
            onNext={handleSignUpNext}
            onBack={handleBackToAuth}
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

export default SignUpFlow;
