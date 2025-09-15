import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

import BottomNav from './ui/BottomNav';

interface ComplianceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
}

interface CarepointHIPAAComplianceProps {
  onBack: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

const CarepointHIPAACompliance: React.FC<CarepointHIPAAComplianceProps> = ({ 
  onBack, 
  onHome, 
  onNotifications, 
  onProfile 
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { colors } = useTheme();

  const complianceFeatures: ComplianceFeature[] = [
    {
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </Svg>
      ),
      title: 'End-to-End Encryption',
      description: 'All PHI is encrypted in transit and at rest using AES-256 encryption'
    },
    {
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </Svg>
      ),
      title: 'Access Controls',
      description: 'Role-based access controls ensure only authorized personnel can access PHI'
    },
    {
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </Svg>
      ),
      title: 'Audit Logging',
      description: 'Comprehensive audit trails track all access to and use of PHI'
    },
    {
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </Svg>
      ),
      title: 'Staff Training',
      description: 'All team members receive regular HIPAA training and certification'
    },
  ];

  const sections: Section[] = [
    {
      id: 'administrative-safeguards',
      title: 'Administrative Safeguards',
      content: `YouDoc implements comprehensive administrative safeguards to protect your health information:

• HIPAA Security Officer: We have designated a Security Officer responsible for developing and implementing security policies and procedures.

• Workforce Training: All employees receive mandatory HIPAA training before accessing any systems containing PHI, with annual refresher training.

• Access Management: We maintain strict policies for granting, modifying, and terminating access to PHI based on job responsibilities.

• Information Verification: We verify the identity of individuals requesting PHI before disclosure.

• Incident Response: We have established procedures for reporting and responding to security incidents.

• Business Associate Agreements: All third-party vendors with potential PHI access sign comprehensive Business Associate Agreements.`
    },
    {
      id: 'physical-safeguards',
      title: 'Physical Safeguards',
      content: `Our physical security measures protect PHI from unauthorized access:

• Facility Security: Our data centers use biometric access controls, 24/7 security monitoring, and environmental controls.

• Workstation Security: All workstations accessing PHI are secured with automatic screen locks and encryption.

• Device Controls: We maintain an inventory of all devices that access PHI and implement secure disposal procedures.

• Media Security: All storage media containing PHI is encrypted and securely disposed of when no longer needed.

• Authorized Personnel: Only authorized personnel have physical access to systems containing PHI.`
    },
    {
      id: 'technical-safeguards',
      title: 'Technical Safeguards',
      content: `Our technical security controls ensure PHI confidentiality, integrity, and availability:

• Access Control: Multi-factor authentication and role-based access controls limit PHI access to authorized users only.

• Audit Controls: Comprehensive logging and monitoring systems track all PHI access and modifications.

• Integrity: Digital signatures and checksums ensure PHI hasn't been altered inappropriately.

• Transmission Security: All PHI transmissions use TLS 1.3 encryption and secure communication protocols.

• Encryption: PHI is encrypted both in transit and at rest using AES-256 encryption standards.

• Automatic Logoff: Systems automatically log off users after periods of inactivity.`
    },
    {
      id: 'your-rights',
      title: 'Your HIPAA Rights',
      content: `Under HIPAA, you have specific rights regarding your Protected Health Information:

• Right to Access: You can request and receive a copy of your PHI that we maintain.

• Right to Amend: You can request corrections to your PHI if you believe it's inaccurate or incomplete.

• Right to Restrict: You can request limitations on how we use or disclose your PHI.

• Right to an Accounting: You can request a list of disclosures we've made of your PHI.

• Right to Alternative Communication: You can request that we communicate with you about your PHI in a specific way or location.

• Right to File Complaints: You can file complaints with us or the U.S. Department of Health and Human Services if you believe your privacy rights have been violated.`
    },
    {
      id: 'breach-notification',
      title: 'Breach Notification',
      content: `In the unlikely event of a data breach involving your PHI, we will:

• Risk Assessment: Immediately assess the risk to your PHI and determine if notification is required.

• Individual Notification: Notify affected individuals within 60 days of discovery via first-class mail or email if preferred.

• HHS Notification: Report the breach to the U.S. Department of Health and Human Services within 60 days.

• Media Notification: If the breach affects 500+ individuals in a state, we'll notify prominent media outlets in that state.

• Documentation: Maintain detailed documentation of all breaches and our response actions.

• Prevention: Implement additional safeguards to prevent similar breaches in the future.`
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HIPAA Compliance</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </Svg>
          </View>
          <Text style={styles.heroTitle}>Your Health Information is Protected</Text>
          <Text style={styles.heroSubtitle}>
            YouDoc is fully HIPAA compliant, ensuring your Protected Health Information (PHI) is secure and private.
          </Text>
        </View>

        {/* Compliance Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Our HIPAA Compliance Features</Text>
          <View style={styles.featuresGrid}>
            {complianceFeatures.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  {feature.icon}
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Detailed Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionTitle}>HIPAA Implementation Details</Text>
          {sections.map((section) => (
            <View key={section.id} style={styles.accordionItem}>
              <TouchableOpacity
                onPress={() => toggleSection(section.id)}
                style={styles.accordionHeader}
              >
                <Text style={styles.accordionTitle}>{section.title}</Text>
                <Svg 
                  width={20} 
                  height={20} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  style={[
                    styles.accordionIcon,
                    expandedSection === section.id && styles.accordionIconExpanded
                  ]}
                >
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </Svg>
              </TouchableOpacity>
              {expandedSection === section.id && (
                <View style={styles.accordionContent}>
                  <Text style={styles.accordionText}>{section.content}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <View style={styles.contactCard}>
            <View style={styles.contactIcon}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </Svg>
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Questions About Your Privacy?</Text>
              <Text style={styles.contactText}>
                If you have questions about how we protect your health information or want to exercise your HIPAA rights, please contact our Privacy Officer.
              </Text>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Contact Privacy Officer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Certification Section */}
        <View style={styles.certificationSection}>
          <View style={styles.certificationBadge}>
            <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </Svg>
          </View>
          <Text style={styles.certificationTitle}>HIPAA Certified</Text>
          <Text style={styles.certificationText}>
            YouDoc has undergone rigorous third-party security audits and maintains HIPAA compliance certification.
          </Text>
          <Text style={styles.lastUpdated}>Last Updated: January 2024</Text>
        </View>
      </ScrollView>

      <BottomNav active="privacy" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    paddingRight: 40,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingBottom: 96,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#f8fafc',
  },
  heroIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#eff6ff',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#eff6ff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3b82f6',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  sectionsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  accordionItem: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  accordionIcon: {
    marginLeft: 12,
  },
  accordionIconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  accordionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  accordionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  contactSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  contactIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#3b82f6',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  certificationSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#f0fdf4',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  certificationBadge: {
    width: 64,
    height: 64,
    backgroundColor: '#dcfce7',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  certificationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14532d',
    marginBottom: 8,
  },
  certificationText: {
    fontSize: 14,
    color: '#166534',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#15803d',
    fontWeight: '500',
  },
});

export default CarepointHIPAACompliance;
