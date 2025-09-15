import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuthTheme } from '../../contexts/AuthThemeContext';

interface SuccessScreenProps {
  onLogin: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onLogin }) => {
  const { colors } = useAuthTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{
        flex: 1,
        maxWidth: 448,
        marginHorizontal: 'auto',
        minHeight: '100%',
        backgroundColor: colors.background,
        flexDirection: 'column'
      }}>
        {/* Header with subtle branding */}
        <View style={{ alignItems: 'center', paddingTop: 64, paddingBottom: 32 }}>
          <View style={{ textAlign: 'center' }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 1.4
            }}>
              YouDoc
            </Text>
          </View>
        </View>

        {/* Main success content */}
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
          {/* Animated success icon with modern styling */}
          <View style={{ position: 'relative', marginBottom: 48 }}>
            <View style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#3b82f6',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8
            }}>
              {/* Gradient background simulation */}
              <View style={{
                width: 96,
                height: 96,
                backgroundColor: colors.primary,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 48,
                  fontWeight: 'bold',
                  lineHeight: 48
                }}>
                  ✓
                </Text>
              </View>
            </View>
            {/* Subtle glow effect */}
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 96,
              height: 96,
              backgroundColor: '#60a5fa',
              borderRadius: 24,
              opacity: 0.2,
              transform: [{ scale: 1.2 }]
            }} />
          </View>

          {/* Success message with better typography hierarchy */}
          <View style={{ textAlign: 'center', marginBottom: 64, alignItems: 'center' }}>
            <Text style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: colors.text,
              lineHeight: 38,
              textAlign: 'center',
              marginBottom: 12
            }}>
              You're all set!
            </Text>
            <Text style={{
              fontSize: 18,
              color: colors.textSecondary,
              maxWidth: 320,
              lineHeight: 28,
              textAlign: 'center'
            }}>
              Your health journey starts here. Begin tracking symptoms and get personalized insights.
            </Text>
          </View>

          {/* Additional value proposition */}
          <View style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            width: '100%'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: colors.primary + '20',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
                flexShrink: 0
              }}>
                <Text style={{
                  color: colors.primary,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>
                  ✓
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 4,
                  fontSize: 16
                }}>
                  You're all set!
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  lineHeight: 20
                }}>
                  Start tracking your health, get personalized insights, and access trusted medical advice.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action buttons with modern design */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
          <TouchableOpacity
            onPress={onLogin}
            style={{
              width: '100%',
              backgroundColor: colors.primary,
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600'
            }}>
              Get Started
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: 8
          }}>
            <Text style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontWeight: '500'
            }}>
              I'll do this later
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessScreen;
