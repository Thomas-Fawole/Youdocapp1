import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Svg, { Path, G, ClipPath, Rect, Defs, Mask } from 'react-native-svg';
import { useAuthTheme, getAuthButtonStyle } from '../../contexts/AuthThemeContext';

interface SignInScreenProps {
  onSignIn: (email: string, password: string) => void;
  onGoogleSignIn: () => void;
  onAppleSignIn: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  onBack: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ 
  onSignIn, 
  onGoogleSignIn, 
  onAppleSignIn, 
  onForgotPassword, 
  onSignUp, 
  onBack 
}) => {
  const { colors } = useAuthTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    if (email && password) {
      onSignIn(email, password);
    }
  };

  const isFormValid = email && password;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32 }}>
          <TouchableOpacity onPress={onBack}>
            <Text style={{ fontSize: 24, color: colors.text }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, fontFamily: 'ReadexPro-Medium' }}>Welcome back</Text>
          <View></View>
        </View>

        {/* YouDoc branding */}
        <View style={{ alignItems: 'center', paddingHorizontal: 24, marginBottom: 32 }}>
          <Text style={{ color: colors.textSecondary, textAlign: 'center', fontFamily: 'ReadexPro-Medium' }}>Continue your health journey</Text>
        </View>

        {/* Form */}
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          {/* Email */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: 8, fontFamily: 'ReadexPro-Medium' }}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
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
                fontSize: 16,
                fontFamily: 'ReadexPro-Medium'
              }}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Password */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: 8, fontFamily: 'ReadexPro-Medium' }}>Password</Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Enter your password"
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
          </View>

          {/* Remember me and Forgot password */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={{
                width: 16,
                height: 16,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 4,
                backgroundColor: rememberMe ? colors.primary : colors.inputBackground,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8
              }}>
                {rememberMe && (
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>✓</Text>
                )}
              </View>
              <Text style={{ fontSize: 14, color: colors.textSecondary, fontFamily: 'ReadexPro-Medium' }}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={{ fontSize: 14, color: colors.primary, fontWeight: '500', fontFamily: 'ReadexPro-Medium' }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            style={getAuthButtonStyle(colors, 'primary', isFormValid ? 'default' : 'disabled', { width: '100%', marginBottom: 32 }).button}
            disabled={!isFormValid}
          >
            <Text style={getAuthButtonStyle(colors, 'primary', isFormValid ? 'default' : 'disabled').text}>
              Sign In
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            <Text style={{ paddingHorizontal: 16, fontSize: 14, color: colors.textSecondary, fontFamily: 'ReadexPro-Medium' }}>Or continue with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
          </View>

          {/* Social Login */}
          <View style={{ marginBottom: 32 }}>
            {/* Google */}
            <TouchableOpacity 
              onPress={onGoogleSignIn}
              style={getAuthButtonStyle(colors, 'secondary', 'default', {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 12,
                backgroundColor: colors.inputBackground,
              }).button}
            >
              <View style={{ width: 20, height: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <G clipPath="url(#clip0_1045_2090_signin)">
                    <Path fillRule="evenodd" clipRule="evenodd" d="M23.52 12.2729C23.52 11.422 23.4436 10.6038 23.3018 9.81836H12V14.4602H18.4582C18.18 15.9602 17.3345 17.2311 16.0636 18.082V21.0929H19.9418C22.2109 19.0038 23.52 15.9274 23.52 12.2729Z" fill="#4285F4"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M12 23.9993C15.24 23.9993 17.9564 22.9248 19.9418 21.092L16.0636 18.0811C14.9891 18.8011 13.6145 19.2266 12 19.2266C8.87455 19.2266 6.22909 17.1157 5.28546 14.2793H1.27637V17.3884C3.25091 21.3102 7.30909 23.9993 12 23.9993Z" fill="#34A853"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M5.28545 14.2804C5.04545 13.5604 4.90909 12.7913 4.90909 12.0004C4.90909 11.2095 5.04545 10.4404 5.28545 9.72042V6.61133H1.27636C0.463636 8.23133 0 10.0641 0 12.0004C0 13.9368 0.463636 15.7695 1.27636 17.3895L5.28545 14.2804Z" fill="#FBBC05"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M12 4.77273C13.7618 4.77273 15.3436 5.37818 16.5873 6.56727L20.0291 3.12545C17.9509 1.18909 15.2345 0 12 0C7.30909 0 3.25091 2.68909 1.27637 6.61091L5.28546 9.72C6.22909 6.88364 8.87455 4.77273 12 4.77273Z" fill="#EA4335"/>
                  </G>
                  <Defs>
                    <ClipPath id="clip0_1045_2090_signin">
                      <Rect width="24" height="24" rx="6" fill="white"/>
                    </ClipPath>
                  </Defs>
                </Svg>
              </View>
              <Text style={getAuthButtonStyle(colors, 'secondary').text}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity 
              onPress={onAppleSignIn}
              style={getAuthButtonStyle(colors, 'secondary', 'default', {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: colors.inputBackground,
              }).button}
            >
              <View style={{ width: 20, height: 20, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                <Svg width={18} height={20} viewBox="0 0 22 24" fill="none">
                  <Path d="M20.7723 18.7033C20.406 19.5418 19.9725 20.3136 19.4702 21.0232C18.7855 21.9906 18.2249 22.6602 17.7928 23.032C17.1231 23.6424 16.4055 23.955 15.6371 23.9728C15.0855 23.9728 14.4202 23.8172 13.6459 23.5017C12.8689 23.1876 12.1549 23.032 11.5021 23.032C10.8174 23.032 10.0831 23.1876 9.29766 23.5017C8.51102 23.8172 7.87732 23.9816 7.3928 23.9979C6.65595 24.0291 5.92148 23.7076 5.18836 23.032C4.72044 22.6276 4.13517 21.9343 3.43404 20.9521C2.68179 19.9033 2.06333 18.687 1.57882 17.3004C1.05992 15.8026 0.799805 14.3523 0.799805 12.9482C0.799805 11.3398 1.15052 9.95259 1.85299 8.79011C2.40508 7.85636 3.13954 7.11979 4.05878 6.57906C4.97802 6.03834 5.97126 5.76279 7.0409 5.74516C7.62617 5.74516 8.39367 5.92456 9.34744 6.27715C10.2985 6.63091 10.9092 6.81032 11.177 6.81032C11.3771 6.81032 12.0555 6.60054 13.2056 6.18233C14.2932 5.79449 15.2111 5.63391 15.963 5.69716C18.0006 5.86012 19.5315 6.6561 20.5495 8.09013C18.7272 9.18432 17.8257 10.7169 17.8437 12.6829C17.8601 14.2142 18.4207 15.4886 19.5225 16.5004C20.0218 16.97 20.5794 17.333 21.1998 17.5907C21.0653 17.9774 20.9232 18.3477 20.7723 18.7033ZM16.0991 0.480137C16.0991 1.68041 15.6566 2.8011 14.7745 3.8384C13.7101 5.07155 12.4227 5.78412 11.0266 5.67168C11.0088 5.52769 10.9985 5.37614 10.9985 5.21688C10.9985 4.06462 11.5046 2.83147 12.4036 1.82321C12.8523 1.3127 13.4231 0.888228 14.1153 0.549615C14.8059 0.216055 15.4592 0.031589 16.0736 0C16.0916 0.160458 16.0991 0.320926 16.0991 0.480121V0.480137Z" fill={colors.text}/>
                </Svg>
              </View>
              <Text style={getAuthButtonStyle(colors, 'secondary').text}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Sign up link */}
      <View style={{ alignItems: 'center', paddingHorizontal: 24, paddingVertical: 32 }}>
        <Text style={{ color: colors.textSecondary, fontSize: 16, fontFamily: 'ReadexPro-Medium' }}>
          Don't have an account?{' '}
          <Text 
            style={{ color: colors.primary, fontWeight: '600', fontFamily: 'ReadexPro-Medium' }}
            onPress={onSignUp}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
