import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuthTheme } from '../../contexts/AuthThemeContext';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface AuthScreenProps {
  onEmailAuth: () => void;
  onGoogleAuth: () => void;
  onAppleAuth: () => void;
  onCreateAccount: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onEmailAuth, onGoogleAuth, onAppleAuth, onCreateAccount }) => {
  const { colors } = useAuthTheme();
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await signInWithGoogle();
      if (error) {
        Alert.alert('Google Sign In Error', error.message);
      } else if (data.user) {
        router.replace('/dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google');
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
      } else if (data.user) {
        router.replace('/dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Apple');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, maxWidth: 384, marginHorizontal: 'auto', height: '100%', backgroundColor: colors.background, flexDirection: 'column' }}>
        {/* Main Content */}
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 24 }}>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: colors.text, marginBottom: 24, lineHeight: 40, fontFamily: 'ReadexPro-Medium' }}>
            Smarter <Text style={{ color: colors.primary }}>Health</Text>{'\n'}
            Starts Here
          </Text>
          
          <Text style={{ fontSize: 18, color: colors.textSecondary, lineHeight: 28, marginBottom: 48, fontFamily: 'ReadexPro-Medium' }}>
            Youdoc personalizes your experience based on your interests, data, and wearable devices.
          </Text>
        </View>

        {/* Auth Buttons */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
                  {/* Email Button */}
        <TouchableOpacity 
          onPress={() => router.push('/signup')}
          style={{ width: '100%', backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 9999, marginBottom: 16 }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', textAlign: 'center', fontFamily: 'ReadexPro-Medium' }}>
            Sign up with Email
          </Text>
        </TouchableOpacity>

          {/* Or Text */}
          <View style={{ alignItems: 'center', paddingVertical: 8, marginBottom: 16 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 16, fontFamily: 'ReadexPro-Medium' }}>
              Or
            </Text>
          </View>

          {/* Google Button */}
          <TouchableOpacity 
            onPress={handleGoogleSignIn}
            disabled={loading}
            style={{ width: '100%', backgroundColor: colors.text, paddingVertical: 16, borderRadius: 9999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, opacity: loading ? 0.7 : 1 }}
          >
            <View style={{ width: 20, height: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <G clipPath="url(#clip0_1045_2090)">
                  <Path fillRule="evenodd" clipRule="evenodd" d="M23.52 12.2729C23.52 11.422 23.4436 10.6038 23.3018 9.81836H12V14.4602H18.4582C18.18 15.9602 17.3345 17.2311 16.0636 18.082V21.0929H19.9418C22.2109 19.0038 23.52 15.9274 23.52 12.2729Z" fill="#4285F4"/>
                  <Path fillRule="evenodd" clipRule="evenodd" d="M12 23.9993C15.24 23.9993 17.9564 22.9248 19.9418 21.092L16.0636 18.0811C14.9891 18.8011 13.6145 19.2266 12 19.2266C8.87455 19.2266 6.22909 17.1157 5.28546 14.2793H1.27637V17.3884C3.25091 21.3102 7.30909 23.9993 12 23.9993Z" fill="#34A853"/>
                  <Path fillRule="evenodd" clipRule="evenodd" d="M5.28545 14.2804C5.04545 13.5604 4.90909 12.7913 4.90909 12.0004C4.90909 11.2095 5.04545 10.4404 5.28545 9.72042V6.61133H1.27636C0.463636 8.23133 0 10.0641 0 12.0004C0 13.9368 0.463636 15.7695 1.27636 17.3895L5.28545 14.2804Z" fill="#FBBC05"/>
                  <Path fillRule="evenodd" clipRule="evenodd" d="M12 4.77273C13.7618 4.77273 15.3436 5.37818 16.5873 6.56727L20.0291 3.12545C17.9509 1.18909 15.2345 0 12 0C7.30909 0 3.25091 2.68909 1.27637 6.61091L5.28546 9.72C6.22909 6.88364 8.87455 4.77273 12 4.77273Z" fill="#EA4335"/>
                </G>
                <Defs>
                  <ClipPath id="clip0_1045_2090">
                    <Rect width="24" height="24" rx="6" fill="white"/>
                  </ClipPath>
                </Defs>
              </Svg>
            </View>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', fontFamily: 'ReadexPro-Medium' }}>
                Sign up with Google
              </Text>
            )}
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity 
            onPress={handleAppleSignIn}
            disabled={loading}
            style={{ width: '100%', backgroundColor: colors.text, paddingVertical: 16, borderRadius: 9999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, opacity: loading ? 0.7 : 1 }}
          >
            <View style={{ width: 20, height: 20, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
              <Svg width={18} height={20} viewBox="0 0 22 24" fill="none">
                <Path d="M20.7723 18.7033C20.406 19.5418 19.9725 20.3136 19.4702 21.0232C18.7855 21.9906 18.2249 22.6602 17.7928 23.032C17.1231 23.6424 16.4055 23.955 15.6371 23.9728C15.0855 23.9728 14.4202 23.8172 13.6459 23.5017C12.8689 23.1876 12.1549 23.032 11.5021 23.032C10.8174 23.032 10.0831 23.1876 9.29766 23.5017C8.51102 23.8172 7.87732 23.9816 7.3928 23.9979C6.65595 24.0291 5.92148 23.7076 5.18836 23.032C4.72044 22.6276 4.13517 21.9343 3.43404 20.9521C2.68179 19.9033 2.06333 18.687 1.57882 17.3004C1.05992 15.8026 0.799805 14.3523 0.799805 12.9482C0.799805 11.3398 1.15052 9.95259 1.85299 8.79011C2.40508 7.85636 3.13954 7.11979 4.05878 6.57906C4.97802 6.03834 5.97126 5.76279 7.0409 5.74516C7.62617 5.74516 8.39367 5.92456 9.34744 6.27715C10.2985 6.63091 10.9092 6.81032 11.177 6.81032C11.3771 6.81032 12.0555 6.60054 13.2056 6.18233C14.2932 5.79449 15.2111 5.63391 15.963 5.69716C18.0006 5.86012 19.5315 6.6561 20.5495 8.09013C18.7272 9.18432 17.8257 10.7169 17.8437 12.6829C17.8601 14.2142 18.4207 15.4886 19.5225 16.5004C20.0218 16.97 20.5794 17.333 21.1998 17.5907C21.0653 17.9774 20.9232 18.3477 20.7723 18.7033ZM16.0991 0.480137C16.0991 1.68041 15.6566 2.8011 14.7745 3.8384C13.7101 5.07155 12.4227 5.78412 11.0266 5.67168C11.0088 5.52769 10.9985 5.37614 10.9985 5.21688C10.9985 4.06462 11.5046 2.83147 12.4036 1.82321C12.8523 1.3127 13.4231 0.888228 14.1153 0.549615C14.8059 0.216055 15.4592 0.031589 16.0736 0C16.0916 0.160458 16.0991 0.320926 16.0991 0.480121V0.480137Z" fill="white"/>
              </Svg>
            </View>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', fontFamily: 'ReadexPro-Medium' }}>
                Sign up with Apple
              </Text>
            )}
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={{ alignItems: 'center', paddingTop: 16 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 16, fontFamily: 'ReadexPro-Medium' }}>
              Already have an account?{' '}
              <Text 
                style={{ color: colors.text, fontWeight: '500', fontFamily: 'ReadexPro-Medium' }}
                onPress={() => router.push('/signin')}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
