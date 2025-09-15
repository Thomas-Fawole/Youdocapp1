import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useAuthTheme, getAuthButtonStyle } from '../../contexts/AuthThemeContext';

interface ResetPasswordConfirmationScreenProps {
  email: string;
  onBackToSignIn: () => void;
  onResendEmail: () => void;
}

const ResetPasswordConfirmationScreen: React.FC<ResetPasswordConfirmationScreenProps> = ({ 
  email,
  onBackToSignIn,
  onResendEmail
}) => {
  const { colors } = useAuthTheme();
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    // Start countdown for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendEmail = async () => {
    try {
      await onResendEmail();
      setCanResend(false);
      setCountdown(60);
      Alert.alert('Success', 'Reset email sent successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend email. Please try again.');
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          paddingHorizontal: 24, 
          paddingTop: 48, 
          paddingBottom: 32 
        }}>
          <TouchableOpacity onPress={onBackToSignIn}>
            <Text style={{ fontSize: 24, color: colors.text, fontFamily: 'ReadexPro-Medium' }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, fontFamily: 'ReadexPro-Medium' }}>Check Your Email</Text>
          <View></View>
        </View>

        {/* Content */}
        <View style={{ flex: 1, paddingHorizontal: 24, alignItems: 'center' }}>
          {/* Illustration/Icon */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: colors.primary + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32
            }}>
              <Text style={{ fontSize: 60 }}>📧</Text>
            </View>
            
            <Text style={{ 
              fontSize: 28, 
              fontWeight: 'bold', 
              color: colors.text, 
              textAlign: 'center',
              marginBottom: 16,
              fontFamily: 'ReadexPro-Medium'
            }}>
              Check your email
            </Text>
            
            <Text style={{ 
              fontSize: 16, 
              color: colors.textSecondary, 
              textAlign: 'center',
              lineHeight: 24,
              marginBottom: 8,
              fontFamily: 'ReadexPro-Medium'
            }}>
              We've sent a password reset link to
            </Text>
            
            <Text style={{ 
              fontSize: 16, 
              color: colors.text, 
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: 24,
              fontFamily: 'ReadexPro-Medium'
            }}>
              {email}
            </Text>
            
            <Text style={{ 
              fontSize: 14, 
              color: colors.textSecondary, 
              textAlign: 'center',
              lineHeight: 20,
              fontFamily: 'ReadexPro-Medium'
            }}>
              Click the link in the email to reset your password. If you don't see the email, check your spam folder.
            </Text>
          </View>

          {/* Resend Email */}
          <View style={{ width: '100%', marginBottom: 32 }}>
            <Text style={{ 
              fontSize: 14, 
              color: colors.textSecondary, 
              textAlign: 'center',
              marginBottom: 16,
              fontFamily: 'ReadexPro-Medium'
            }}>
              Didn't receive the email?
            </Text>
            
            {canResend ? (
              <TouchableOpacity
                onPress={handleResendEmail}
                style={getAuthButtonStyle(colors, 'secondary', 'default', { 
                  width: '100%', 
                  marginBottom: 16 
                }).button}
              >
                <Text style={getAuthButtonStyle(colors, 'secondary').text}>
                  Resend Email
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{
                width: '100%',
                paddingVertical: 16,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 16,
                backgroundColor: colors.inputBackground,
                marginBottom: 16
              }}>
                <Text style={{ 
                  fontSize: 16, 
                  color: colors.textSecondary,
                  fontFamily: 'ReadexPro-Medium'
                }}>
                  Resend in {formatCountdown(countdown)}
                </Text>
              </View>
            )}
          </View>

          {/* Back to Sign In Button */}
          <TouchableOpacity
            onPress={onBackToSignIn}
            style={getAuthButtonStyle(colors, 'primary', 'default', { 
              width: '100%' 
            }).button}
          >
            <Text style={getAuthButtonStyle(colors, 'primary').text}>
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordConfirmationScreen;
