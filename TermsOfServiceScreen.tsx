import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface TermsOfServiceScreenProps {
  onBack: () => void;
}

const TermsOfServiceScreen: React.FC<TermsOfServiceScreenProps> = ({ onBack }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
          <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={onBack}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </Svg>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Terms of Service</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={[styles.scrollContainer, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
          <View style={[styles.content, { backgroundColor: colors.background }]}>
            {/* Last Updated */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>Last Updated: December 15, 2024</Text>
            </View>

            {/* Introduction */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Agreement to Terms</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                By downloading, installing, or using the YouDoc mobile application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </Text>
            </View>

            {/* Description of Service */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Description of Service</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                YouDoc is a digital health platform that provides:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Personal health record management{'\n'}
                • Medication tracking and reminders{'\n'}
                • Symptom checking and health assessments{'\n'}
                • Telemedicine consultation facilitation{'\n'}
                • Health data analytics and insights{'\n'}
                • Integration with health monitoring devices
              </Text>
            </View>

            {/* Medical Disclaimer */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Medical Disclaimer</Text>
              <Text style={[styles.importantText, { color: colors.error }]}>
                IMPORTANT: YouDoc is not a substitute for professional medical advice, diagnosis, or treatment.
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Always seek professional medical advice for health concerns{'\n'}
                • Do not disregard medical advice based on app information{'\n'}
                • Call emergency services for urgent medical situations{'\n'}
                • Our symptom checker is for informational purposes only{'\n'}
                • Consult healthcare providers before making medical decisions
              </Text>
            </View>

            {/* User Responsibilities */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>User Responsibilities</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                You agree to:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Provide accurate and complete information{'\n'}
                • Keep your account credentials secure{'\n'}
                • Use the app only for lawful purposes{'\n'}
                • Respect the privacy of other users{'\n'}
                • Not attempt to reverse engineer the app{'\n'}
                • Report security vulnerabilities responsibly
              </Text>
            </View>

            {/* Prohibited Uses */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Prohibited Uses</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                You may not use YouDoc to:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Violate any laws or regulations{'\n'}
                • Share false or misleading health information{'\n'}
                • Attempt unauthorized access to our systems{'\n'}
                • Upload malicious software or content{'\n'}
                • Impersonate healthcare professionals{'\n'}
                • Use automated systems to access the app
              </Text>
            </View>

            {/* Privacy and Data */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy and Data Protection</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Your privacy is important to us. Our collection and use of your information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • We comply with HIPAA and applicable privacy laws{'\n'}
                • Your health data is encrypted and secured{'\n'}
                • You control who can access your information{'\n'}
                • We do not sell your personal data
              </Text>
            </View>

            {/* Subscription and Payments */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Subscription and Payments</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Some features require a paid subscription{'\n'}
                • Subscription fees are charged in advance{'\n'}
                • You may cancel your subscription at any time{'\n'}
                • Refunds are provided according to our refund policy{'\n'}
                • Prices may change with 30 days notice
              </Text>
            </View>

            {/* Intellectual Property */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Intellectual Property</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                YouDoc and all related content, features, and functionality are owned by YouDoc Inc. and protected by intellectual property laws. You may not:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Copy, modify, or distribute our content{'\n'}
                • Use our trademarks without permission{'\n'}
                • Create derivative works based on our app{'\n'}
                • Remove copyright or proprietary notices
              </Text>
            </View>

            {/* Limitation of Liability */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Limitation of Liability</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                YouDoc provides the service "as is" and disclaims all warranties. We are not liable for:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Medical decisions based on app information{'\n'}
                • Technical issues or service interruptions{'\n'}
                • Data loss or security breaches{'\n'}
                • Third-party integrations or services{'\n'}
                • Indirect, consequential, or punitive damages
              </Text>
            </View>

            {/* Termination */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Termination</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Either party may terminate this agreement at any time. Upon termination:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Your access to the app will be suspended{'\n'}
                • You may export your data within 30 days{'\n'}
                • Certain provisions will survive termination{'\n'}
                • We may retain data as required by law
              </Text>
            </View>

            {/* Changes to Terms */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Changes to Terms</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                We may modify these Terms of Service at any time. We will notify users of material changes via email or app notification. Continued use of the app constitutes acceptance of the modified terms.
              </Text>
            </View>

            {/* Governing Law */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Governing Law</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes will be resolved in the courts of California.
              </Text>
            </View>

            {/* Contact Information */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Information</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Questions about these Terms of Service? Contact us:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Email: legal@youdoc.com{'\n'}
                Phone: 1-800-YOUDOC-1{'\n'}
                Address: 123 Health Street, Medical City, MC 12345
              </Text>
            </View>

            <View style={styles.bottomSpacing} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'ReadexPro-Medium',
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lastUpdated: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'ReadexPro-Medium',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'ReadexPro-Medium',
  },
  importantText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default TermsOfServiceScreen;
