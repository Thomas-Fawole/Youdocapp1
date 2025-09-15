import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useAuthTheme } from '../../contexts/AuthThemeContext';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import Svg, { Path, G, ClipPath, Rect, Defs, Mask } from 'react-native-svg';

interface SignUpScreenProps {
  onNext: (formData: any) => void;
  onBack: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  repeatPassword: string;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNext, onBack }) => {
  const { colors } = useAuthTheme();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    repeatPassword: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    hasNumber: /\d/.test(formData.password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  };

  const getPasswordStrength = () => {
    const validRequirements = Object.values(passwordRequirements).filter(Boolean).length;
    if (validRequirements === 0) return { width: '0%', color: '#d1d5db' };
    if (validRequirements === 1) return { width: '33%', color: '#ef4444' };
    if (validRequirements === 2) return { width: '67%', color: '#eab308' };
    return { width: '100%', color: '#22c55e' };
  };

  const isFormValid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.mobile && 
           formData.password && 
           formData.repeatPassword &&
           formData.password === formData.repeatPassword &&
           Object.values(passwordRequirements).every(Boolean);
  };

  const handleCreateAccount = async () => {
    if (!isFormValid()) {
      Alert.alert('Invalid Form', 'Please fill in all fields correctly.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signUp(
        formData.email,
        formData.password,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
      );

      if (error) {
        Alert.alert('Sign Up Error', error.message);
      } else {
        Alert.alert(
          'Account Created!',
          'Please check your email to verify your account.',
          [{ text: 'OK', onPress: () => onNext(formData) }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32 }}>
          <TouchableOpacity onPress={onBack}>
            <Text style={{ fontSize: 24, color: colors.text }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, fontFamily: 'ReadexPro-Medium' }}>Great, let's get started</Text>
          <View></View>
        </View>

        {/* Form */}
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          {/* First Name */}
          <TextInput
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
            style={{
              width: '100%',
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 16,
              backgroundColor: colors.inputBackground,
              color: colors.text,
              marginBottom: 16,
              fontSize: 16,
              fontFamily: 'ReadexPro-Medium'
            }}
            placeholderTextColor={colors.textSecondary}
          />

          {/* Last Name */}
          <TextInput
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
            style={{
              width: '100%',
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 16,
              backgroundColor: colors.inputBackground,
              color: colors.text,
              marginBottom: 16,
              fontSize: 16,
              fontFamily: 'ReadexPro-Medium'
            }}
            placeholderTextColor={colors.textSecondary}
          />

          {/* Email */}
          <TextInput
            placeholder="Email Address Required"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              width: '100%',
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 16,
              backgroundColor: colors.inputBackground,
              color: colors.text,
              marginBottom: 16,
              fontSize: 16,
              fontFamily: 'ReadexPro-Medium'
            }}
            placeholderTextColor={colors.textSecondary}
          />

          {/* Mobile Number */}
          <TextInput
            placeholder="Mobile Number"
            value={formData.mobile}
            onChangeText={(value) => handleInputChange('mobile', value)}
            keyboardType="phone-pad"
            style={{
              width: '100%',
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 16,
              backgroundColor: colors.inputBackground,
              color: colors.text,
              marginBottom: 16,
              fontSize: 16,
              fontFamily: 'ReadexPro-Medium'
            }}
            placeholderTextColor={colors.textSecondary}
          />

          {/* Password */}
          <View style={{ position: 'relative', marginBottom: 16 }}>
            <TextInput
              placeholder="Enter password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
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
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                {passwordVisible ? (
                  // Eye open icon (simplified)
                  <>
                    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={colors.textSecondary} strokeWidth={2} fill="none"/>
                    <Path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" stroke={colors.textSecondary} strokeWidth={2} fill="none"/>
                  </>
                ) : (
                  // Eye closed icon (visibility_off.svg)
                  <Mask id="mask0_2255_442" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <Rect width="24" height="24" fill="#D9D9D9"/>
                  </Mask>
                )}
                {!passwordVisible && (
                  <G mask="url(#mask0_2255_442)">
                    <Path d="M16.1 13.2998L14.65 11.8498C14.8 11.0665 14.575 10.3331 13.975 9.64981C13.375 8.96647 12.6 8.69981 11.65 8.84981L10.2 7.39981C10.4833 7.26647 10.7708 7.16647 11.0625 7.0998C11.3542 7.03314 11.6667 6.9998 12 6.9998C13.25 6.9998 14.3125 7.4373 15.1875 8.3123C16.0625 9.1873 16.5 10.2498 16.5 11.4998C16.5 11.8331 16.4667 12.1456 16.4 12.4373C16.3333 12.729 16.2333 13.0165 16.1 13.2998ZM19.3 16.4498L17.85 15.0498C18.4833 14.5665 19.0458 14.0373 19.5375 13.4623C20.0292 12.8873 20.45 12.2331 20.8 11.4998C19.9667 9.81647 18.7708 8.47897 17.2125 7.48731C15.6542 6.49564 13.9167 5.9998 12 5.9998C11.5167 5.9998 11.0417 6.03314 10.575 6.0998C10.1083 6.16647 9.65 6.26647 9.2 6.39981L7.65 4.8498C8.33333 4.56647 9.03333 4.35397 9.75 4.2123C10.4667 4.07064 11.2167 3.9998 12 3.9998C14.5167 3.9998 16.7583 4.69564 18.725 6.08731C20.6917 7.47897 22.1167 9.28314 23 11.4998C22.6167 12.4831 22.1125 13.3956 21.4875 14.2373C20.8625 15.079 20.1333 15.8165 19.3 16.4498ZM19.8 22.5998L15.6 18.4498C15.0167 18.6331 14.4292 18.7706 13.8375 18.8623C13.2458 18.954 12.6333 18.9998 12 18.9998C9.48333 18.9998 7.24167 18.304 5.275 16.9123C3.30833 15.5206 1.88333 13.7165 1 11.4998C1.35 10.6165 1.79167 9.79564 2.325 9.03731C2.85833 8.27897 3.46667 7.5998 4.15 6.9998L1.4 4.1998L2.8 2.7998L21.2 21.1998L19.8 22.5998ZM5.55 8.39981C5.06667 8.83314 4.625 9.30814 4.225 9.82481C3.825 10.3415 3.48333 10.8998 3.2 11.4998C4.03333 13.1831 5.22917 14.5206 6.7875 15.5123C8.34583 16.504 10.0833 16.9998 12 16.9998C12.3333 16.9998 12.6583 16.979 12.975 16.9373C13.2917 16.8956 13.6167 16.8498 13.95 16.7998L13.05 15.8498C12.8667 15.8998 12.6917 15.9373 12.525 15.9623C12.3583 15.9873 12.1833 15.9998 12 15.9998C10.75 15.9998 9.6875 15.5623 8.8125 14.6873C7.9375 13.8123 7.5 12.7498 7.5 11.4998C7.5 11.3165 7.5125 11.1415 7.5375 10.9748C7.5625 10.8081 7.6 10.6331 7.65 10.4498L5.55 8.39981Z" fill="#4C4A53"/>
                  </G>
                )}
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Repeat Password */}
          <View style={{ position: 'relative', marginBottom: 16 }}>
            <TextInput
              placeholder="Repeat password"
              value={formData.repeatPassword}
              onChangeText={(value) => handleInputChange('repeatPassword', value)}
              secureTextEntry={!repeatPasswordVisible}
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
              onPress={() => setRepeatPasswordVisible(!repeatPasswordVisible)}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: [{ translateY: -12 }]
              }}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                {repeatPasswordVisible ? (
                  // Eye open icon (simplified)
                  <>
                    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={colors.textSecondary} strokeWidth={2} fill="none"/>
                    <Path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" stroke={colors.textSecondary} strokeWidth={2} fill="none"/>
                  </>
                ) : (
                  // Eye closed icon (visibility_off.svg)
                  <Mask id="mask1_2255_442" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <Rect width="24" height="24" fill="#D9D9D9"/>
                  </Mask>
                )}
                {!repeatPasswordVisible && (
                  <G mask="url(#mask1_2255_442)">
                    <Path d="M16.1 13.2998L14.65 11.8498C14.8 11.0665 14.575 10.3331 13.975 9.64981C13.375 8.96647 12.6 8.69981 11.65 8.84981L10.2 7.39981C10.4833 7.26647 10.7708 7.16647 11.0625 7.0998C11.3542 7.03314 11.6667 6.9998 12 6.9998C13.25 6.9998 14.3125 7.4373 15.1875 8.3123C16.0625 9.1873 16.5 10.2498 16.5 11.4998C16.5 11.8331 16.4667 12.1456 16.4 12.4373C16.3333 12.729 16.2333 13.0165 16.1 13.2998ZM19.3 16.4498L17.85 15.0498C18.4833 14.5665 19.0458 14.0373 19.5375 13.4623C20.0292 12.8873 20.45 12.2331 20.8 11.4998C19.9667 9.81647 18.7708 8.47897 17.2125 7.48731C15.6542 6.49564 13.9167 5.9998 12 5.9998C11.5167 5.9998 11.0417 6.03314 10.575 6.0998C10.1083 6.16647 9.65 6.26647 9.2 6.39981L7.65 4.8498C8.33333 4.56647 9.03333 4.35397 9.75 4.2123C10.4667 4.07064 11.2167 3.9998 12 3.9998C14.5167 3.9998 16.7583 4.69564 18.725 6.08731C20.6917 7.47897 22.1167 9.28314 23 11.4998C22.6167 12.4831 22.1125 13.3956 21.4875 14.2373C20.8625 15.079 20.1333 15.8165 19.3 16.4498ZM19.8 22.5998L15.6 18.4498C15.0167 18.6331 14.4292 18.7706 13.8375 18.8623C13.2458 18.954 12.6333 18.9998 12 18.9998C9.48333 18.9998 7.24167 18.304 5.275 16.9123C3.30833 15.5206 1.88333 13.7165 1 11.4998C1.35 10.6165 1.79167 9.79564 2.325 9.03731C2.85833 8.27897 3.46667 7.5998 4.15 6.9998L1.4 4.1998L2.8 2.7998L21.2 21.1998L19.8 22.5998ZM5.55 8.39981C5.06667 8.83314 4.625 9.30814 4.225 9.82481C3.825 10.3415 3.48333 10.8998 3.2 11.4998C4.03333 13.1831 5.22917 14.5206 6.7875 15.5123C8.34583 16.504 10.0833 16.9998 12 16.9998C12.3333 16.9998 12.6583 16.979 12.975 16.9373C13.2917 16.8956 13.6167 16.8498 13.95 16.7998L13.05 15.8498C12.8667 15.8998 12.6917 15.9373 12.525 15.9623C12.3583 15.9873 12.1833 15.9998 12 15.9998C10.75 15.9998 9.6875 15.5623 8.8125 14.6873C7.9375 13.8123 7.5 12.7498 7.5 11.4998C7.5 11.3165 7.5125 11.1415 7.5375 10.9748C7.5625 10.8081 7.6 10.6331 7.65 10.4498L5.55 8.39981Z" fill="#4C4A53"/>
                  </G>
                )}
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Password Strength Indicator */}
          <View style={{ marginTop: 16, marginBottom: 16 }}>
            <View style={{ width: '100%', height: 4, backgroundColor: colors.border, borderRadius: 2 }}>
              <View 
                style={{
                  height: 4,
                  backgroundColor: passwordStrength.color,
                  borderRadius: 2,
                  width: passwordStrength.width,
                  transition: 'all 0.3s ease'
                }}
              />
            </View>
          </View>

          {/* Password Requirements */}
          <View style={{ marginTop: 16, marginBottom: 32 }}>
            {/* 8 characters minimum */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: passwordRequirements.minLength ? '#22c55e' : colors.border,
                backgroundColor: passwordRequirements.minLength ? '#22c55e' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8
              }}>
                {passwordRequirements.minLength && (
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>✓</Text>
                )}
              </View>
              <Text style={{
                fontSize: 14,
                color: passwordRequirements.minLength ? '#16a34a' : colors.textSecondary
              }}>
                8 characters minimum
              </Text>
            </View>

            {/* a number */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: passwordRequirements.hasNumber ? '#22c55e' : colors.border,
                backgroundColor: passwordRequirements.hasNumber ? '#22c55e' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8
              }}>
                {passwordRequirements.hasNumber && (
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>✓</Text>
                )}
              </View>
              <Text style={{
                fontSize: 14,
                color: passwordRequirements.hasNumber ? '#16a34a' : colors.textSecondary
              }}>
                a number
              </Text>
            </View>

            {/* a symbol */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: passwordRequirements.hasSymbol ? '#22c55e' : colors.border,
                backgroundColor: passwordRequirements.hasSymbol ? '#22c55e' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8
              }}>
                {passwordRequirements.hasSymbol && (
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>✓</Text>
                )}
              </View>
              <Text style={{
                fontSize: 14,
                color: passwordRequirements.hasSymbol ? '#16a34a' : colors.textSecondary
              }}>
                a symbol
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Create Account Button */}
      <View style={{ padding: 24 }}>
        <TouchableOpacity 
          onPress={handleCreateAccount}
          style={{
            width: '100%',
            backgroundColor: (isFormValid() && !loading) ? colors.primary : colors.border,
            paddingVertical: 16,
            borderRadius: 25,
            alignItems: 'center',
            opacity: loading ? 0.7 : 1
          }}
          disabled={!isFormValid() || loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '500'
            }}>
              Create an account
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
