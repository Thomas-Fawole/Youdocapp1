import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import SignInScreen from './SignInScreen';
import EmailVerificationScreen from './EmailVerificationScreen';
import ForgotPasswordFlow from './ForgotPasswordFlow';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import { AuthThemeProvider } from '../../contexts/AuthThemeContext';

interface SignInFlowProps {
  onComplete: () => void;
  onBack: () => void;
  onSignUp: () => void;
  onSignOut?: () => void;
}

const SignInFlow: React.FC<SignInFlowProps> = ({ onComplete, onBack, onSignUp, onSignOut }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle, signInWithApple, resetPassword } = useAuth();

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    setUserEmail(email);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        Alert.alert('Sign In Error', error.message);
        return;
      }
      
      if (data.user && !data.user.email_confirmed_at) {
        // Go to email verification screen
        setCurrentScreen(1);
      } else {
        // User is signed in and verified
        onComplete();
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await signInWithGoogle();
      
      if (error) {
        Alert.alert('Google Sign In Error', error.message);
        return;
      }
      
      onComplete();
    } catch (error) {
      Alert.alert('Error', 'Google sign in failed');
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await signInWithApple();
      
      if (error) {
        Alert.alert('Apple Sign In Error', error.message);
        return;
      }
      
      onComplete();
    } catch (error) {
      Alert.alert('Error', 'Apple sign in failed');
      console.error('Apple sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setCurrentScreen(2); // Go to forgot password flow
  };

  const handleForgotPasswordComplete = async (email: string) => {
    setLoading(true);
    try {
      const { data, error } = await resetPassword(email);
      
      if (error) {
        Alert.alert('Password Reset Error', error.message);
        return;
      }
      
      // After successful password reset request, go back to sign in
      setCurrentScreen(0);
      Alert.alert('Password Reset Sent', 'Check your email for password reset instructions.');
    } catch (error) {
      Alert.alert('Error', 'Failed to send password reset email');
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromForgotPassword = () => {
    setCurrentScreen(0); // Go back to sign in
  };

  const handleEmailVerification = () => {
    // Complete the sign-in flow after email verification
    onComplete();
  };

  const handleBackToSignIn = () => {
    setCurrentScreen(0);
  };

  const handleSendToDifferentEmail = () => {
    // Go back to sign in to change email
    setCurrentScreen(0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <SignInScreen
            onSignIn={handleSignIn}
            onGoogleSignIn={handleGoogleSignIn}
            onAppleSignIn={handleAppleSignIn}
            onForgotPassword={handleForgotPassword}
            onSignUp={onSignUp}
            onBack={onBack}
          />
        );
      case 1:
        return (
          <EmailVerificationScreen
            onNext={handleEmailVerification}
            onBack={handleBackToSignIn}
            onSendToDifferentEmail={handleSendToDifferentEmail}
            onSignOut={onSignOut}
            email={userEmail}
          />
        );
      case 2:
        return (
          <ForgotPasswordFlow
            onComplete={handleForgotPasswordComplete}
            onBack={handleBackFromForgotPassword}
          />
        );
      default:
        return (
          <SignInScreen
            onSignIn={handleSignIn}
            onGoogleSignIn={handleGoogleSignIn}
            onAppleSignIn={handleAppleSignIn}
            onForgotPassword={handleForgotPassword}
            onSignUp={onSignUp}
            onBack={onBack}
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

export default SignInFlow;
