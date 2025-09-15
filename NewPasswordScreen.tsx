import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useAuthTheme, getAuthButtonStyle } from '../../contexts/AuthThemeContext';

interface NewPasswordScreenProps {
  onComplete: () => void;
  onBack: () => void;
  resetToken?: string; // In a real app, this would come from the reset link
}

const NewPasswordScreen: React.FC<NewPasswordScreenProps> = ({ 
  onComplete, 
  onBack,
  resetToken 
}) => {
  const { colors } = useAuthTheme();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (pwd: string) => {
    return {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    };
  };

  const passwordValidation = validatePassword(password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = isPasswordValid && passwordsMatch;

  const handleResetPassword = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please ensure all requirements are met');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would call your backend API with the resetToken
      console.log('Password reset successful for token:', resetToken);
      
      Alert.alert(
        'Success', 
        'Your password has been reset successfully!',
        [{ text: 'OK', onPress: onComplete }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Text style={{ 
        fontSize: 16, 
        color: met ? colors.success || '#10B981' : colors.textSecondary,
        marginRight: 8,
        fontFamily: 'ReadexPro-Medium'
      }}>
        {met ? '✓' : '○'}
      </Text>
      <Text style={{ 
        fontSize: 14, 
        color: met ? colors.success || '#10B981' : colors.textSecondary,
        fontFamily: 'ReadexPro-Medium'
      }}>
        {text}
      </Text>
    </View>
  );

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
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, fontFamily: 'ReadexPro-Medium' }}>New Password</Text>
          <View></View>
        </View>

        {/* Content */}
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          {/* Header Text */}
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
              <Text style={{ fontSize: 40 }}>🔒</Text>
            </View>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: 'bold', 
              color: colors.text, 
              textAlign: 'center',
              marginBottom: 12,
              fontFamily: 'ReadexPro-Medium'
            }}>
              Create new password
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: colors.textSecondary, 
              textAlign: 'center',
              lineHeight: 24,
              fontFamily: 'ReadexPro-Medium'
            }}>
              Your new password must be different from your previous password.
            </Text>
          </View>

          {/* New Password */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '500', 
              color: colors.text, 
              marginBottom: 8,
              fontFamily: 'ReadexPro-Medium'
            }}>
              New Password
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Enter new password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                style={{
                  width: '100%',
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  paddingRight: 48,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 16,
                  backgroundColor: colors.inputBackground,
                  color: colors.text,
                  fontSize: 16,
                  fontFamily: 'ReadexPro-Medium'
                }}
                placeholderTextColor={colors.textSecondary}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: [{ translateY: -12 }]
                }}
              >
                <Text style={{ fontSize: 20, color: colors.textSecondary }}>
                  {passwordVisible ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Requirements */}
          {password.length > 0 && (
            <View style={{ 
              marginBottom: 24,
              padding: 16,
              backgroundColor: colors.inputBackground,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '500', 
                color: colors.text, 
                marginBottom: 12 
              }}>
                Password Requirements:
              </Text>
              <PasswordRequirement met={passwordValidation.length} text="At least 8 characters" />
              <PasswordRequirement met={passwordValidation.uppercase} text="One uppercase letter" />
              <PasswordRequirement met={passwordValidation.lowercase} text="One lowercase letter" />
              <PasswordRequirement met={passwordValidation.number} text="One number" />
              <PasswordRequirement met={passwordValidation.special} text="One special character" />
            </View>
          )}

          {/* Confirm Password */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '500', 
              color: colors.text, 
              marginBottom: 8 
            }}>
              Confirm Password
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                style={{
                  width: '100%',
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  paddingRight: 48,
                  borderWidth: 1,
                  borderColor: confirmPassword.length > 0 && !passwordsMatch ? colors.error || '#EF4444' : colors.border,
                  borderRadius: 16,
                  backgroundColor: colors.inputBackground,
                  color: colors.text,
                  fontSize: 16,
                  fontFamily: 'ReadexPro-Medium'
                }}
                placeholderTextColor={colors.textSecondary}
              />
              <TouchableOpacity
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                style={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: [{ translateY: -12 }]
                }}
              >
                <Text style={{ fontSize: 20, color: colors.textSecondary }}>
                  {confirmPasswordVisible ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <Text style={{ 
                fontSize: 12, 
                color: colors.error || '#EF4444', 
                marginTop: 8 
              }}>
                Passwords do not match
              </Text>
            )}
          </View>

          {/* Reset Password Button */}
          <TouchableOpacity
            onPress={handleResetPassword}
            style={getAuthButtonStyle(colors, 'primary', (isFormValid && !isLoading) ? 'default' : 'disabled', { 
              width: '100%', 
              marginBottom: 24 
            }).button}
            disabled={!isFormValid || isLoading}
          >
            <Text style={getAuthButtonStyle(colors, 'primary', (isFormValid && !isLoading) ? 'default' : 'disabled').text}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;
