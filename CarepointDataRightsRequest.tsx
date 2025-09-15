import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface RequestType {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  processingTime: string;
}

interface CarepointDataRightsRequestProps {
  onBack: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

const CarepointDataRightsRequest: React.FC<CarepointDataRightsRequestProps> = ({ 
  onBack, 
  onHome, 
  onNotifications, 
  onProfile 
}) => {
  const { colors } = useTheme();
  const [selectedRequest, setSelectedRequest] = useState('');
  const [reason, setReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requestTypes: RequestType[] = [
    {
      id: 'access',
      title: 'Access My Data',
      subtitle: 'Request a copy of all personal data we have about you',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </Svg>
      ),
      description: 'You will receive a comprehensive report of all personal and health data associated with your account.',
      processingTime: '30 days'
    },
    {
      id: 'correct',
      title: 'Correct My Data',
      subtitle: 'Request correction of inaccurate or incomplete information',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </Svg>
      ),
      description: 'We will review and update any incorrect information in your profile or health records.',
      processingTime: '15 days'
    },
    {
      id: 'delete',
      title: 'Delete My Data',
      subtitle: 'Request deletion of your personal data',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </Svg>
      ),
      description: 'We will delete your account and associated data, subject to legal retention requirements.',
      processingTime: '30 days'
    },
    {
      id: 'portability',
      title: 'Export My Data',
      subtitle: 'Request a machine-readable copy of your data',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </Svg>
      ),
      description: 'Receive your data in a structured, commonly used format for transfer to another service.',
      processingTime: '30 days'
    },
    {
      id: 'restrict',
      title: 'Restrict Processing',
      subtitle: 'Limit how we process your personal data',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
        </Svg>
      ),
      description: 'We will limit processing of your data to storage only, except with your consent.',
      processingTime: '15 days'
    },
    {
      id: 'object',
      title: 'Object to Processing',
      subtitle: 'Object to specific uses of your personal data',
      icon: (
        <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.76 0L3.054 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </Svg>
      ),
      description: 'We will stop processing your data for specific purposes, such as marketing or analytics.',
      processingTime: '15 days'
    },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isFormValid = selectedRequest && reason.trim();

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsSubmitted(false)} style={styles.backButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Request Submitted</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.successContainer}>
          <View style={styles.successContent}>
            <View style={styles.successIcon}>
              <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </Svg>
            </View>
            <Text style={styles.successTitle}>Request Received</Text>
            <Text style={styles.successText}>
              Your data rights request has been submitted successfully. We'll process your request and respond within the required timeframe.
            </Text>
            <View style={styles.referenceContainer}>
              <Text style={styles.referenceText}>
                <Text style={styles.referenceBold}>Reference ID:</Text> DR-{Date.now().toString().slice(-6)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsSubmitted(false);
                setSelectedRequest('');
                setReason('');
                setAdditionalInfo('');
              }}
              style={styles.submitAnotherButton}
            >
              <Text style={styles.submitAnotherButtonText}>Submit Another Request</Text>
            </TouchableOpacity>
          </View>
        </View>
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
        <Text style={styles.headerTitle}>Data Rights Request</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBanner}>
          <View style={styles.infoIconContainer}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </Svg>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Exercise Your Data Rights</Text>
            <Text style={styles.infoText}>
              You have the right to control your personal data. Submit a request to access, correct, delete, or manage how we process your information.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Request Type</Text>
          <View style={styles.requestTypes}>
            {requestTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setSelectedRequest(type.id)}
                style={[
                  styles.requestTypeCard,
                  selectedRequest === type.id && styles.requestTypeCardSelected
                ]}
              >
                <View style={styles.requestTypeHeader}>
                  <View style={[
                    styles.requestTypeIcon,
                    selectedRequest === type.id && styles.requestTypeIconSelected
                  ]}>
                    {type.icon}
                  </View>
                  <View style={styles.requestTypeInfo}>
                    <View style={styles.requestTypeTitleRow}>
                      <Text style={styles.requestTypeTitle}>{type.title}</Text>
                      <View style={styles.processingTimeTag}>
                        <Text style={styles.processingTimeText}>{type.processingTime}</Text>
                      </View>
                    </View>
                    <Text style={styles.requestTypeSubtitle}>{type.subtitle}</Text>
                    <Text style={styles.requestTypeDescription}>{type.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedRequest && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reason for Request</Text>
            <TextInput
              style={styles.reasonInput}
              value={reason}
              onChangeText={setReason}
              placeholder="Please explain why you're making this request..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        )}

        {selectedRequest && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Additional Information <Text style={styles.optionalText}>(Optional)</Text>
            </Text>
            <TextInput
              style={styles.additionalInfoInput}
              value={additionalInfo}
              onChangeText={setAdditionalInfo}
              placeholder="Any additional details or specific data you'd like us to focus on..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        )}

        {selectedRequest && (
          <View style={styles.section}>
            <View style={styles.warningBanner}>
              <View style={styles.warningIconContainer}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.76 0L3.054 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </Svg>
              </View>
              <View style={styles.warningTextContainer}>
                <Text style={styles.warningTitle}>Important Notice</Text>
                <Text style={styles.warningText}>
                  We may need to verify your identity before processing this request. Some data may be subject to legal retention requirements and cannot be deleted immediately.
                </Text>
              </View>
            </View>
          </View>
        )}

        {selectedRequest && (
          <View style={styles.section}>
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
                  <Text style={styles.loadingText}>Submitting Request...</Text>
                </View>
              ) : (
                <Text style={styles.submitButtonText}>Submit Request</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
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
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  requestTypes: {
    gap: 12,
  },
  requestTypeCard: {
    width: '100%',
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  requestTypeCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  requestTypeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  requestTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
  },
  requestTypeIconSelected: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
  },
  requestTypeInfo: {
    flex: 1,
  },
  requestTypeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  requestTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  processingTimeTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  processingTimeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  requestTypeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  requestTypeDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
  reasonInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
  },
  additionalInfoInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    fontSize: 16,
    color: '#111827',
    minHeight: 80,
  },
  optionalText: {
    color: '#6b7280',
    fontWeight: 'normal',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fffbeb',
    borderWidth: 1,
    borderColor: '#fed7aa',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  warningIconContainer: {
    marginTop: 2,
  },
  warningTextContainer: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#92400e',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: '#a16207',
    lineHeight: 20,
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
  submitAnotherButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  submitAnotherButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CarepointDataRightsRequest;
