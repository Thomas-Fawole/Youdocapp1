import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking, TextInput, Modal, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface HealthSupportScreenProps {
  onBack: () => void;
}

const HealthSupportScreen: React.FC<HealthSupportScreenProps> = ({ onBack }) => {
  const { colors } = useTheme();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent'
  });

  const SupportCard = ({ 
    icon, 
    title, 
    subtitle, 
    onPress,
    color = '#3B82F6'
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity style={styles.supportCard} onPress={onPress}>
      <View style={[styles.supportIconContainer, { backgroundColor: `${color}15` }]}>
        {icon}
      </View>
      <View style={styles.supportContent}>
        <Text style={styles.supportTitle}>{title}</Text>
        <Text style={styles.supportSubtitle}>{subtitle}</Text>
      </View>
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      </Svg>
    </TouchableOpacity>
  );

  const FAQItem = ({ 
    question, 
    answer 
  }: {
    question: string;
    answer: string;
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <TouchableOpacity 
        style={styles.faqItem}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.faqHeader}>
          <Text style={styles.faqQuestion}>{question}</Text>
          <Svg 
            width={20} 
            height={20} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#6B7280" 
            strokeWidth={2}
            style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}
          >
            <Path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </Svg>
        </View>
        {isExpanded && (
          <Text style={styles.faqAnswer}>{answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const EmergencyCard = () => (
    <View style={styles.emergencyCard}>
      <View style={styles.emergencyHeader}>
        <View style={styles.emergencyIcon}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="#ffffff">
            <Path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
          </Svg>
        </View>
        <View style={styles.emergencyContent}>
          <Text style={styles.emergencyTitle}>Medical Emergency?</Text>
          <Text style={styles.emergencySubtitle}>Call emergency services immediately</Text>
        </View>
      </View>
      <View style={styles.emergencyActions}>
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => Linking.openURL('tel:911')}
        >
          <Text style={styles.emergencyButtonText}>Call 911</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.emergencySecondaryButton}
          onPress={() => Linking.openURL('tel:+1-800-222-1222')}
        >
          <Text style={styles.emergencySecondaryButtonText}>Poison Control</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleContactSupport = () => {
    setShowContactModal(true);
  };

  const handleSendMessage = () => {
    if (!contactForm.subject || !contactForm.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Simulate sending message
    setShowContactModal(false);
    setContactForm({ subject: '', message: '', priority: 'normal' });
    Alert.alert('Message Sent', 'We\'ll get back to you within 24 hours!');
  };

  const handleCallSupport = () => {
    Alert.alert(
      'Call Support',
      'Would you like to call our support team?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => Linking.openURL('tel:+1-800-YOUDOC-1') }
      ]
    );
  };

  const handleLiveChat = () => {
    Alert.alert(
      'Start Live Chat',
      'Connect with our support team now. Average wait time: 2-3 minutes',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Start Chat', 
          onPress: () => {
            Alert.alert('Connecting...', 'Please wait while we connect you to the next available agent.');
            // In a real app, this would open a chat interface or redirect to a chat service
            setTimeout(() => {
              Alert.alert('Connected!', 'You are now connected to Sarah from our support team. How can we help you today?');
            }, 2000);
          }
        }
      ]
    );
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@youdoc.com?subject=Support Request');
  };

  const handleVideoCall = () => {
    Alert.alert('Video Support', 'Schedule a video call with our support team?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Schedule', onPress: () => console.log('Scheduling video call...') }
    ]);
  };

  const handleHealthTips = () => {
    // Navigate to health articles screen
    router.push('/health-articles');
  };

  const faqs = [
    {
      question: "How do I add a new medication to my list?",
      answer: "Go to the Medications screen, tap the '+' button, and fill in the medication details including name, dosage, and schedule."
    },
    {
      question: "Can I share my health data with my doctor?",
      answer: "Yes! You can export your health records and share them directly with your healthcare provider through the Health Records section."
    },
    {
      question: "How secure is my health information?",
      answer: "We use bank-level encryption and follow HIPAA compliance standards to protect your health data. Your information is never shared without your explicit consent."
    },
    {
      question: "How do I set up medication reminders?",
      answer: "In Settings > Notifications, enable 'Medication Reminders'. Then set specific times for each medication in your medication list."
    },
    {
      question: "Can I use the app offline?",
      answer: "Yes, most features work offline. Your data syncs automatically when you reconnect to the internet."
    },
    {
      question: "How do I reset my password?",
      answer: "On the login screen, tap 'Forgot Password' and follow the instructions sent to your email address."
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Emergency Section */}
        <EmergencyCard />

        {/* Contact Support */}
        <Text style={styles.sectionTitle}>Get Help</Text>
        <View style={styles.supportContainer}>
          <SupportCard
            icon={
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </Svg>
            }
            title="Live Chat"
            subtitle="Chat with our support team in real-time"
            onPress={handleLiveChat}
            color="#3B82F6"
          />
          
          <SupportCard
            icon={
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </Svg>
            }
            title="Phone Support"
            subtitle="Speak directly with our support team"
            onPress={handleCallSupport}
            color="#10B981"
          />

          <SupportCard
            icon={
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </Svg>
            }
            title="Email Support"
            subtitle="Send us a detailed message"
            onPress={handleContactSupport}
            color="#F59E0B"
          />

          <SupportCard
            icon={
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </Svg>
            }
            title="Video Call"
            subtitle="Schedule a face-to-face support session"
            onPress={handleVideoCall}
            color="#8B5CF6"
          />
        </View>

        {/* Self-Help Resources */}
        <Text style={styles.sectionTitle}>Self-Help Resources</Text>
        <View style={styles.supportContainer}>
          <SupportCard
            icon={
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </Svg>
            }
            title="Health Tips & Articles"
            subtitle="Expert health advice and wellness tips"
            onPress={handleHealthTips}
            color="#84CC16"
          />
        </View>


        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Still Need Help?</Text>
          <Text style={styles.contactText}>
            Our support team is available 24/7 to assist you with any questions or concerns.
          </Text>
          <View style={styles.contactDetails}>
            <Text style={styles.contactDetail}>📞 1-800-YOUDOC-1</Text>
            <Text style={styles.contactDetail}>📧 support@youdoc.com</Text>
            <Text style={styles.contactDetail}>🌐 help.youdoc.com</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Contact Form Modal */}
      <Modal
        visible={showContactModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowContactModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Contact Support</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowContactModal(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Priority Level</Text>
                <View style={styles.priorityContainer}>
                  {(['low', 'normal', 'high', 'urgent'] as const).map((priority) => (
                    <TouchableOpacity
                      key={priority}
                      style={[
                        styles.priorityButton,
                        contactForm.priority === priority && styles.priorityButtonActive
                      ]}
                      onPress={() => setContactForm(prev => ({ ...prev, priority }))}
                    >
                      <Text style={[
                        styles.priorityButtonText,
                        contactForm.priority === priority && styles.priorityButtonTextActive
                      ]}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Subject *</Text>
                <TextInput
                  style={styles.formInput}
                  value={contactForm.subject}
                  onChangeText={(text) => setContactForm(prev => ({ ...prev, subject: text }))}
                  placeholder="Brief description of your issue"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Message *</Text>
                <TextInput
                  style={[styles.formInput, styles.formInputMultiline]}
                  value={contactForm.message}
                  onChangeText={(text) => setContactForm(prev => ({ ...prev, message: text }))}
                  placeholder="Please provide detailed information about your issue or question"
                  multiline
                  numberOfLines={6}
                />
              </View>
            </ScrollView>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowContactModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalSendButton}
                onPress={handleSendMessage}
              >
                <Text style={styles.modalSendText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    height: '100%',
  },
  emergencyCard: {
    backgroundColor: '#EF4444',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  emergencySubtitle: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
    opacity: 0.9,
  },
  emergencyActions: {
    flexDirection: 'row',
    gap: 12,
  },
  emergencyButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
  },
  emergencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    fontFamily: 'ReadexPro-Medium',
  },
  emergencySecondaryButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
  },
  emergencySecondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 16,
  },
  supportContainer: {
    gap: 12,
    marginBottom: 32,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  supportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  faqContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginBottom: 32,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contactInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactDetails: {
    gap: 8,
  },
  contactDetail: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'ReadexPro-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  formInputMultiline: {
    height: 120,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  priorityButtonActive: {
    backgroundColor: '#3B82F6',
  },
  priorityButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  priorityButtonTextActive: {
    color: '#ffffff',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  modalSendButton: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalSendText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
});

export default HealthSupportScreen;
