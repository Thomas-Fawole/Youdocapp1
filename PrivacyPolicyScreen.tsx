import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onBack }) => {
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Privacy Policy</Text>
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
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Introduction</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                YouDoc ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services.
              </Text>
            </View>

            {/* Information We Collect */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Information We Collect</Text>
              
              <Text style={[styles.subsectionTitle, { color: colors.text }]}>Personal Information</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Name, email address, and contact information{'\n'}
                • Date of birth and demographic information{'\n'}
                • Medical history and health records{'\n'}
                • Medication information and schedules{'\n'}
                • Emergency contact details
              </Text>

              <Text style={[styles.subsectionTitle, { color: colors.text }]}>Health Data</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Vital signs and health metrics{'\n'}
                • Symptom reports and health assessments{'\n'}
                • Connected device data (heart rate, steps, etc.){'\n'}
                • Appointment and consultation records
              </Text>

              <Text style={[styles.subsectionTitle, { color: colors.text }]}>Technical Information</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Device information and identifiers{'\n'}
                • App usage analytics and performance data{'\n'}
                • Location data (with your permission){'\n'}
                • Log files and crash reports
              </Text>
            </View>

            {/* How We Use Your Information */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>How We Use Your Information</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Provide and improve our health services{'\n'}
                • Facilitate communication with healthcare providers{'\n'}
                • Send medication reminders and health alerts{'\n'}
                • Analyze health trends and provide insights{'\n'}
                • Ensure app security and prevent fraud{'\n'}
                • Comply with legal and regulatory requirements
              </Text>
            </View>

            {/* Information Sharing */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Information Sharing and Disclosure</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                We do not sell, trade, or rent your personal information. We may share your information only in these circumstances:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • With your explicit consent{'\n'}
                • With healthcare providers you authorize{'\n'}
                • To comply with legal obligations{'\n'}
                • To protect rights, property, or safety{'\n'}
                • With service providers under strict confidentiality agreements
              </Text>
            </View>

            {/* Data Security */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Security</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                We implement industry-standard security measures to protect your information:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • End-to-end encryption for sensitive data{'\n'}
                • Secure data transmission protocols{'\n'}
                • Regular security audits and assessments{'\n'}
                • Access controls and authentication measures{'\n'}
                • HIPAA-compliant data handling procedures
              </Text>
            </View>

            {/* Your Rights */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Rights</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                You have the right to:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Access your personal information{'\n'}
                • Correct inaccurate or incomplete data{'\n'}
                • Request deletion of your information{'\n'}
                • Restrict or object to data processing{'\n'}
                • Data portability and export{'\n'}
                • Withdraw consent at any time
              </Text>
            </View>

            {/* Data Retention */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Retention</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                We retain your information for as long as necessary to provide our services and comply with legal obligations. Health records are retained according to applicable medical record retention laws.
              </Text>
            </View>

            {/* Children's Privacy */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Children's Privacy</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
              </Text>
            </View>

            {/* Changes to Privacy Policy */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Changes to This Privacy Policy</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </Text>
            </View>

            {/* Contact Information */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Us</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                If you have any questions about this Privacy Policy, please contact us:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Email: privacy@youdoc.com{'\n'}
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'ReadexPro-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default PrivacyPolicyScreen;
