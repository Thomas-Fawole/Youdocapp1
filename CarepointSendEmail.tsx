import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

import BottomNav from './ui/BottomNav';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface Priority {
  id: string;
  label: string;
  color: string;
}

interface Attachment {
  id: number;
  name: string;
  size: string;
  type: string;
}

interface CarepointSendEmailProps {
  onBack: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

const CarepointSendEmail: React.FC<CarepointSendEmailProps> = ({ 
  onBack, 
  onHome, 
  onNotifications, 
  onProfile 
}) => {
  const { colors } = useTheme();
  const [emailData, setEmailData] = useState({
    to: 'support@youdoc.com',
    subject: '',
    message: '',
    priority: 'normal',
    category: '',
  });
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories: Category[] = [
    {
      id: 'technical',
      title: 'Technical Support',
      subtitle: 'App issues, device connectivity, bugs',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </Svg>
      )
    },
    {
      id: 'account',
      title: 'Account & Billing',
      subtitle: 'Subscription, payment, account access',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </Svg>
      )
    },
    {
      id: 'medical',
      title: 'Medical Questions',
      subtitle: 'Health data, medical records, HIPAA',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </Svg>
      )
    },
    {
      id: 'feature',
      title: 'Feature Request',
      subtitle: 'Suggestions for new features',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </Svg>
      )
    },
    {
      id: 'general',
      title: 'General Inquiry',
      subtitle: 'Other questions or feedback',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </Svg>
      )
    },
  ];

  const priorities: Priority[] = [
    { id: 'low', label: 'Low', color: '#10b981' },
    { id: 'normal', label: 'Normal', color: '#3b82f6' },
    { id: 'high', label: 'High', color: '#f59e0b' },
    { id: 'urgent', label: 'Urgent', color: '#ef4444' },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleAttachment = () => {
    const newAttachment: Attachment = {
      id: Date.now(),
      name: 'screenshot.png',
      size: '2.4 MB',
      type: 'image'
    };
    setAttachments((prev) => [...prev, newAttachment]);
  };

  const removeAttachment = (id: number) => setAttachments((prev) => prev.filter((a) => a.id !== id));

  const isFormValid = emailData.subject.trim() && emailData.message.trim() && emailData.category;

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsSubmitted(false)} style={styles.backButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Email Sent</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.successContainer}>
          <View style={styles.successContent}>
            <View style={styles.successIcon}>
              <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </Svg>
            </View>
            <Text style={styles.successTitle}>Email Sent Successfully</Text>
            <Text style={styles.successText}>
              Your email has been sent to our support team. We'll respond within 24 hours.
            </Text>
            <View style={styles.referenceContainer}>
              <Text style={styles.referenceText}>
                <Text style={styles.referenceBold}>Reference ID:</Text> EM-{Date.now().toString().slice(-6)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsSubmitted(false);
                setEmailData({
                  to: 'support@youdoc.com',
                  subject: '',
                  message: '',
                  priority: 'normal',
                  category: ''
                });
                setAttachments([]);
              }}
              style={styles.sendAnotherButton}
            >
              <Text style={styles.sendAnotherButtonText}>Send Another Email</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomNav active="help" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Email</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBanner}>
          <View style={styles.infoIconContainer}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </Svg>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Contact Support</Text>
            <Text style={styles.infoText}>
              Send us an email and we'll respond within 24 hours. Include as much detail as possible to help us assist you better.
            </Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>To</Text>
            <View style={styles.toContainer}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </Svg>
              <Text style={styles.toText}>{emailData.to}</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setEmailData({ ...emailData, category: category.id })}
                  style={[
                    styles.categoryCard,
                    emailData.category === category.id && styles.categoryCardSelected
                  ]}
                >
                  <View style={styles.categoryHeader}>
                    <View style={[
                      styles.categoryIcon,
                      emailData.category === category.id && styles.categoryIconSelected
                    ]}>
                      {category.icon}
                    </View>
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryTitle}>{category.title}</Text>
                      <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Priority</Text>
            <View style={styles.prioritiesContainer}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority.id}
                  onPress={() => setEmailData({ ...emailData, priority: priority.id })}
                  style={[
                    styles.priorityButton,
                    emailData.priority === priority.id && { backgroundColor: priority.color + '20', borderColor: priority.color }
                  ]}
                >
                  <Text style={[
                    styles.priorityText,
                    emailData.priority === priority.id && { color: priority.color }
                  ]}>
                    {priority.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Subject</Text>
            <TextInput
              style={styles.textInput}
              value={emailData.subject}
              onChangeText={(text) => setEmailData({ ...emailData, subject: text })}
              placeholder="Brief description of your issue"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Message</Text>
            <TextInput
              style={styles.messageInput}
              value={emailData.message}
              onChangeText={(text) => setEmailData({ ...emailData, message: text })}
              placeholder="Please provide detailed information about your issue, including any error messages or steps to reproduce the problem..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={1000}
            />
            <Text style={styles.characterCount}>{emailData.message.length}/1000 characters</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Attachments</Text>
            {attachments.length > 0 && (
              <View style={styles.attachmentsList}>
                {attachments.map((att) => (
                  <View key={att.id} style={styles.attachmentItem}>
                    <View style={styles.attachmentInfo}>
                      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}>
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </Svg>
                      <View style={styles.attachmentDetails}>
                        <Text style={styles.attachmentName}>{att.name}</Text>
                        <Text style={styles.attachmentSize}>{att.size}</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => removeAttachment(att.id)} style={styles.removeButton}>
                      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2}>
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity onPress={handleAttachment} style={styles.addAttachmentButton}>
              <View style={styles.addAttachmentContent}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </Svg>
                <Text style={styles.addAttachmentText}>Add Attachment</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.submitSection}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            style={[
              styles.submitButton,
              (!isFormValid || isSubmitting) && styles.submitButtonDisabled
            ]}
          >
            {isSubmitting ? (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingSpinner} />
                <Text style={styles.loadingText}>Sending Email...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>Send Email</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav active="help" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    padding: 24,
    marginHorizontal: 24,
    marginVertical: 24,
    borderRadius: 16,
    gap: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  formSection: {
    backgroundColor: '#ffffff',
  },
  fieldContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  toContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  toText: {
    color: '#6b7280',
    fontSize: 16,
  },
  categoriesContainer: {
    gap: 8,
  },
  categoryCard: {
    width: '100%',
    padding: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  categoryCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
  },
  categoryIconSelected: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  prioritiesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    fontSize: 16,
    color: '#111827',
  },
  messageInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    fontSize: 16,
    color: '#111827',
    minHeight: 150,
  },
  characterCount: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  attachmentsList: {
    gap: 8,
    marginBottom: 16,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 12,
  },
  attachmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  attachmentDetails: {
    flex: 1,
  },
  attachmentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  attachmentSize: {
    fontSize: 12,
    color: '#6b7280',
  },
  removeButton: {
    padding: 4,
  },
  addAttachmentButton: {
    width: '100%',
    padding: 16,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  addAttachmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addAttachmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  submitSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  submitButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderTopColor: 'transparent',
    borderRadius: 10,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  successContent: {
    alignItems: 'center',
    maxWidth: 320,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#dcfce7',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  successText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  referenceContainer: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  referenceText: {
    fontSize: 14,
    color: '#1e40af',
  },
  referenceBold: {
    fontWeight: '700',
  },
  sendAnotherButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  sendAnotherButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CarepointSendEmail;
