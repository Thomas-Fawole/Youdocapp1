import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuthTheme, getAuthButtonStyle } from '../../contexts/AuthThemeContext';

// This is a demo component to test that all forgot password components are properly imported and working
const ForgotPasswordDemo: React.FC = () => {
  const { colors } = useAuthTheme();

  const testImports = () => {
    // Test that all components can be imported without errors
    try {
      const ForgotPasswordScreen = require('./ForgotPasswordScreen').default;
      const ResetPasswordConfirmationScreen = require('./ResetPasswordConfirmationScreen').default;
      const NewPasswordScreen = require('./NewPasswordScreen').default;
      const ForgotPasswordFlow = require('./ForgotPasswordFlow').default;
      
      Alert.alert('Success', 'All forgot password components imported successfully!');
    } catch (error) {
      Alert.alert('Error', `Import failed: ${error.message}`);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 24, textAlign: 'center' }}>
        Forgot Password Flow Demo
      </Text>
      
      <TouchableOpacity
        onPress={testImports}
        style={getAuthButtonStyle(colors, 'primary', 'default', { width: '100%', marginBottom: 16 }).button}
      >
        <Text style={getAuthButtonStyle(colors, 'primary', 'default').text}>
          Test Component Imports
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 }}>
        The forgot password flow includes:{'\n'}
        • ForgotPasswordScreen{'\n'}
        • ResetPasswordConfirmationScreen{'\n'}
        • NewPasswordScreen{'\n'}
        • ForgotPasswordFlow{'\n'}
        • Integration with SignInFlow
      </Text>
    </View>
  );
};

export default ForgotPasswordDemo;
