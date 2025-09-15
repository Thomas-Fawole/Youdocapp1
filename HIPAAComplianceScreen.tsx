import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface HIPAAComplianceScreenProps {
  onBack: () => void;
}

const HIPAAComplianceScreen: React.FC<HIPAAComplianceScreenProps> = ({ onBack }) => {
  const { colors } = useTheme();

  const complianceFeatures = [
    {
      title: 'Data Encryption',
      description: 'End-to-end encryption for all health data transmission and storage',
      icon: '🔒'
    },
    {
      title: 'Access Controls',
      description: 'Role-based access controls and multi-factor authentication',
      icon: '🔑'
    },
    {
      title: 'Audit Logging',
      description: 'Comprehensive audit trails for all data access and modifications',
      icon: '📋'
    },
    {
      title: 'Data Minimization',
      description: 'Collection and processing of only necessary health information',
      icon: '🎯'
    },
    {
      title: 'Secure Infrastructure',
      description: 'HIPAA-compliant cloud infrastructure with regular security assessments',
      icon: '🏗️'
    },
    {
      title: 'Staff Training',
      description: 'Regular HIPAA training and certification for all personnel',
      icon: '👥'
    }
  ];

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
          <Text style={[styles.headerTitle, { color: colors.text }]}>HIPAA Compliance</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={[styles.scrollContainer, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
          <View style={[styles.content, { backgroundColor: colors.background }]}>
            {/* HIPAA Shield */}
            <View style={[styles.shieldSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.shieldContainer, { backgroundColor: colors.success + '20' }]}>
                <Text style={styles.shieldIcon}>🛡️</Text>
              </View>
              <Text style={[styles.complianceTitle, { color: colors.text }]}>HIPAA Compliant</Text>
              <Text style={[styles.complianceSubtitle, { color: colors.textSecondary }]}>
                YouDoc is fully compliant with the Health Insurance Portability and Accountability Act
              </Text>
            </View>

            {/* What is HIPAA */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>What is HIPAA?</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                The Health Insurance Portability and Accountability Act (HIPAA) is a federal law that establishes national standards for protecting sensitive patient health information. HIPAA requires healthcare organizations and their business associates to implement safeguards to protect the privacy and security of protected health information (PHI).
              </Text>
            </View>

            {/* Our Commitment */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Commitment to HIPAA Compliance</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                YouDoc is committed to maintaining the highest standards of data protection and privacy. We have implemented comprehensive policies, procedures, and technical safeguards to ensure full compliance with HIPAA requirements.
              </Text>
            </View>

            {/* Compliance Features */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>HIPAA Compliance Features</Text>
              {complianceFeatures.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureHeader}>
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                    <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
                  </View>
                  <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                    {feature.description}
                  </Text>
                </View>
              ))}
            </View>

            {/* Administrative Safeguards */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Administrative Safeguards</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Designated HIPAA Security Officer{'\n'}
                • Regular risk assessments and management{'\n'}
                • Workforce training and access management{'\n'}
                • Incident response procedures{'\n'}
                • Business Associate Agreements (BAAs){'\n'}
                • Regular compliance audits and reviews
              </Text>
            </View>

            {/* Physical Safeguards */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Physical Safeguards</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Secure data centers with 24/7 monitoring{'\n'}
                • Biometric access controls and surveillance{'\n'}
                • Environmental controls and redundancy{'\n'}
                • Secure workstation and device management{'\n'}
                • Media controls and disposal procedures{'\n'}
                • Physical access logging and monitoring
              </Text>
            </View>

            {/* Technical Safeguards */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Technical Safeguards</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Advanced encryption (AES-256) for data at rest and in transit{'\n'}
                • Multi-factor authentication and access controls{'\n'}
                • Automatic session timeouts and logout{'\n'}
                • Comprehensive audit logging and monitoring{'\n'}
                • Regular security testing and vulnerability assessments{'\n'}
                • Secure software development lifecycle
              </Text>
            </View>

            {/* Data Rights */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Rights Under HIPAA</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                As a patient, HIPAA grants you important rights regarding your health information:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Right to access your health records{'\n'}
                • Right to request corrections to your health information{'\n'}
                • Right to request restrictions on use and disclosure{'\n'}
                • Right to request confidential communications{'\n'}
                • Right to file a complaint if you believe your rights have been violated{'\n'}
                • Right to receive a copy of our Notice of Privacy Practices
              </Text>
            </View>

            {/* Breach Response */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Breach Response</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                In the unlikely event of a data breach involving your protected health information, we will:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • Immediately contain and assess the breach{'\n'}
                • Notify affected individuals within 60 days{'\n'}
                • Report to the Department of Health and Human Services{'\n'}
                • Provide identity protection services if needed{'\n'}
                • Implement additional safeguards to prevent future incidents{'\n'}
                • Maintain detailed documentation of the incident
              </Text>
            </View>

            {/* Certifications */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Certifications & Compliance</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                YouDoc maintains the following certifications and compliance standards:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                • HIPAA Compliance Certification{'\n'}
                • SOC 2 Type II Certification{'\n'}
                • ISO 27001 Information Security Management{'\n'}
                • FedRAMP Authorization (in progress){'\n'}
                • Regular third-party security audits{'\n'}
                • Continuous compliance monitoring
              </Text>
            </View>

            {/* Contact for Compliance */}
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>HIPAA Compliance Contact</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                For questions about our HIPAA compliance or to file a complaint:
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                HIPAA Security Officer{'\n'}
                Email: hipaa@youdoc.com{'\n'}
                Phone: 1-800-YOUDOC-1 (ext. 4){'\n'}
                Address: 123 Health Street, Medical City, MC 12345
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                You may also file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights.
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
  shieldSection: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shieldContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  shieldIcon: {
    fontSize: 40,
  },
  complianceTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  complianceSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'ReadexPro-Medium',
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
  featureItem: {
    marginBottom: 16,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 32,
    fontFamily: 'ReadexPro-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default HIPAAComplianceScreen;
