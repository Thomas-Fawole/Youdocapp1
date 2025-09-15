import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useAuthTheme, getAuthButtonStyle } from '../../contexts/AuthThemeContext';

interface ForgotPasswordScreenProps {
  onNext: (email: string) => void;
  onBack: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ 
  onNext, 
  onBack 
}) => {
  const { colors } = useAuthTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetEmail = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would call your backend API
      console.log('Password reset email sent to:', email);
      
      onNext(email);
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim().length > 0;

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
          <TouchableOpacity onPress={onBack}>
            <Text style={{ fontSize: 24, color: colors.text, fontFamily: 'ReadexPro-Medium' }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, fontFamily: 'ReadexPro-Medium' }}>Forgot Password</Text>
          <View></View>
        </View>

        {/* Content */}
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          {/* Illustration/Icon */}
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24
            }}>
              <Text style={{ fontSize: 40 }}>🔐</Text>
            </View>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: 'bold', 
              color: colors.text, 
              textAlign: 'center',
              marginBottom: 12,
              fontFamily: 'ReadexPro-Medium'
            }}>
              Reset your password
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: colors.textSecondary, 
              textAlign: 'center',
              lineHeight: 24,
              fontFamily: 'ReadexPro-Medium'
            }}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
          </View>

          {/* Email Input */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '500', 
              color: colors.text, 
              marginBottom: 8,
              fontFamily: 'ReadexPro-Medium'
            }}>
              Email Address
            </Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading}
              style={{
                width: '100%',
                paddingHorizontal: 16,
                paddingVertical: 16,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 16,
                backgroundColor: colors.inputBackground,
                color: colors.text,
                fontSize: 16,
                fontFamily: 'ReadexPro-Medium',
                opacity: isLoading ? 0.6 : 1
              }}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Send Reset Email Button */}
          <TouchableOpacity
            onPress={handleSendResetEmail}
            style={getAuthButtonStyle(colors, 'primary', (isFormValid && !isLoading) ? 'default' : 'disabled', { 
              width: '100%', 
              marginBottom: 24 
            }).button}
            disabled={!isFormValid || isLoading}
          >
            <Text style={getAuthButtonStyle(colors, 'primary', (isFormValid && !isLoading) ? 'default' : 'disabled').text}>
              {isLoading ? 'Sending...' : 'Send Reset Email'}
            </Text>
          </TouchableOpacity>

          {/* Back to Sign In */}
          <TouchableOpacity
            onPress={onBack}
            style={{ alignItems: 'center', paddingVertical: 12 }}
          >
            <Text style={{ 
              fontSize: 16, 
              color: colors.primary, 
              fontWeight: '500',
              fontFamily: 'ReadexPro-Medium'
            }}>
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
