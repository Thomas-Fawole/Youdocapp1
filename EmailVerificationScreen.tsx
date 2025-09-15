import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuthTheme } from '../../contexts/AuthThemeContext';

interface EmailVerificationScreenProps {
  onNext: () => void;
  onBack: () => void;
  onSendToDifferentEmail: () => void;
  onSignOut?: () => void;
  email?: string;
}

const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({ 
  onNext, 
  onBack, 
  onSendToDifferentEmail,
  onSignOut,
  email = "your email"
}) => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyEmail = () => {
    const enteredCode = code.join('');
    if (enteredCode.length === 5) {
      // Handle verification logic here
      console.log('Verification code:', enteredCode);
      onNext();
    } else {
      Alert.alert('Error', 'Please enter the complete 5-digit code');
    }
  };

  const handleSendToDifferentEmail = () => {
    onSendToDifferentEmail();
  };

  const { colors } = useAuthTheme();
  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32 }}>
          <TouchableOpacity onPress={onBack}>
            <Text style={{ fontSize: 24, color: colors.text, fontFamily: 'ReadexPro-Medium' }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, fontFamily: 'ReadexPro-Medium' }}>
            Verify your email
          </Text>
          {onSignOut && (
            <TouchableOpacity onPress={onSignOut}>
              <Text style={{ fontSize: 14, color: colors.primary, fontWeight: '500', fontFamily: 'ReadexPro-Medium' }}>Sign Out</Text>
            </TouchableOpacity>
          )}
          {!onSignOut && <View></View>}
        </View>

        <View style={{ paddingHorizontal: 24 }}>
          {/* Instruction Text */}
          <Text style={{ fontSize: 18, color: colors.textSecondary, marginBottom: 32, lineHeight: 24, fontFamily: 'ReadexPro-Medium' }}>
            We just sent 5-digit code to {email}, enter it below:
          </Text>

          {/* Code Label */}
          <Text style={{ fontSize: 16, color: colors.text, marginBottom: 16, fontWeight: '500', fontFamily: 'ReadexPro-Medium' }}>
            Code
          </Text>

          {/* Code Input Fields */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 }}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={{
                  width: 64,
                  height: 64,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '500',
                  backgroundColor: colors.inputBackground,
                  color: colors.text,
                  fontFamily: 'ReadexPro-Medium'
                }}
                value={digit}
                onChangeText={value => handleCodeChange(value, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="numeric"
                maxLength={1}
                returnKeyType={index === 4 ? 'done' : 'next'}
              />
            ))}
          </View>

          {/* Verify Email Button */}
          <TouchableOpacity
            style={{
              paddingVertical: 16,
              borderRadius: 16,
              marginBottom: 24,
              backgroundColor: isCodeComplete ? colors.primary : colors.border,
              alignItems: 'center'
            }}
            onPress={handleVerifyEmail}
            disabled={!isCodeComplete}
          >
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
              fontFamily: 'ReadexPro-Medium'
            }}>
              Verify email
            </Text>
          </TouchableOpacity>

          {/* Wrong Email Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: colors.textSecondary, fontFamily: 'ReadexPro-Medium' }}>Wrong email? </Text>
            <TouchableOpacity onPress={handleSendToDifferentEmail}>
              <Text style={{ color: colors.text, fontWeight: '500', fontFamily: 'ReadexPro-Medium' }}>
                Send to different email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerificationScreen;
