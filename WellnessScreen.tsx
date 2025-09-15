import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuthTheme } from '../../contexts/AuthThemeContext';

interface WellnessScreenProps {
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

const WellnessScreen: React.FC<WellnessScreenProps> = ({ onNext, onSkip, onBack }) => {
  const { colors } = useAuthTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, maxWidth: 384, marginHorizontal: 'auto', height: '100%', backgroundColor: colors.background, flexDirection: 'column' }}>
        {/* Main Content */}
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 24 }}>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: colors.text, marginBottom: 24, lineHeight: 40, fontFamily: 'ReadexPro-Medium' }}>
            Stay On Top of Your{'\n'}
            <Text style={{ color: colors.primary }}>Wellness</Text>
          </Text>
          
          <Text style={{ fontSize: 18, color: colors.textSecondary, lineHeight: 28, fontFamily: 'ReadexPro-Medium' }}>
            Log symptoms, medications, mood, sleep, and more with your personal health journal and tracker.
          </Text>
        </View>

        {/* Progress Indicator */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 48, paddingHorizontal: 24 }}>
          <View style={{ width: 32, height: 4, backgroundColor: colors.border, borderRadius: 9999, marginRight: 8 }}></View>
          <View style={{ width: 32, height: 4, backgroundColor: colors.primary, borderRadius: 9999, marginRight: 8 }}></View>
          <View style={{ width: 32, height: 4, backgroundColor: colors.border, borderRadius: 9999 }}></View>
        </View>

        {/* Bottom Navigation */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 32 }}>
          <TouchableOpacity onPress={onSkip}>
            <Text style={{ color: colors.textSecondary, fontSize: 16, fontFamily: 'ReadexPro-Medium' }}>
              Skip
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={onNext}
            style={{ backgroundColor: colors.primary, paddingHorizontal: 32, paddingVertical: 12, borderRadius: 9999 }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', fontFamily: 'ReadexPro-Medium' }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WellnessScreen;

