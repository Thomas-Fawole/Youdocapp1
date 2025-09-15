import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useDarkTheme, DarkThemeProvider } from '../contexts/DarkThemeContext';

interface HealthRecordsScreenProps {
  onBack: () => void;
}

interface HealthRecord {
  id: string;
  type: 'lab' | 'imaging' | 'prescription' | 'visit' | 'vaccination';
  title: string;
  date: string;
  provider: string;
  description: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const HealthRecordsScreenContent: React.FC<HealthRecordsScreenProps> = ({ onBack }) => {
  const { colors } = useDarkTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newRecord, setNewRecord] = useState({
    type: 'lab' as HealthRecord['type'],
    title: '',
    provider: '',
    description: '',
    status: 'pending' as HealthRecord['status']
  });

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      type: 'lab',
      title: 'Complete Blood Count (CBC)',
      date: '2024-01-15',
      provider: 'City Medical Lab',
      description: 'Routine blood work showing normal values across all parameters. White blood cell count, red blood cell count, and platelet levels are within normal ranges.',
      status: 'completed'
    },
    {
      id: '2',
      type: 'imaging',
      title: 'Chest X-Ray',
      date: '2024-01-10',
      provider: 'Downtown Radiology',
      description: 'Chest X-ray shows clear lungs with no signs of infection, masses, or other abnormalities. Heart size appears normal.',
      status: 'completed'
    },
    {
      id: '3',
      type: 'prescription',
      title: 'Lisinopril 10mg',
      date: '2024-01-08',
      provider: 'Dr. Smith - Family Medicine',
      description: 'Prescribed for blood pressure management. Take once daily in the morning. Monitor blood pressure regularly.',
      status: 'completed'
    },
    {
      id: '4',
      type: 'visit',
      title: 'Annual Physical Exam',
      date: '2024-01-05',
      provider: 'Dr. Smith - Family Medicine',
      description: 'Comprehensive annual physical examination. All vital signs normal. Discussed preventive care and lifestyle recommendations.',
      status: 'completed'
    },
    {
      id: '5',
      type: 'vaccination',
      title: 'COVID-19 Booster',
      date: '2023-12-20',
      provider: 'City Health Department',
      description: 'COVID-19 booster vaccination administered. No adverse reactions observed. Next booster recommended in 6 months.',
      status: 'completed'
    },
    {
      id: '6',
      type: 'lab',
      title: 'Lipid Panel',
      date: '2024-01-20',
      provider: 'City Medical Lab',
      description: 'Cholesterol and lipid screening scheduled for next week. Fasting required 12 hours prior to test.',
      status: 'pending'
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Records', count: healthRecords.length },
    { id: 'lab', label: 'Lab Results', count: healthRecords.filter(r => r.type === 'lab').length },
    { id: 'imaging', label: 'Imaging', count: healthRecords.filter(r => r.type === 'imaging').length },
    { id: 'prescription', label: 'Prescriptions', count: healthRecords.filter(r => r.type === 'prescription').length },
    { id: 'visit', label: 'Visits', count: healthRecords.filter(r => r.type === 'visit').length },
    { id: 'vaccination', label: 'Vaccinations', count: healthRecords.filter(r => r.type === 'vaccination').length }
  ];

  const filteredRecords = selectedCategory === 'all' 
    ? healthRecords 
    : healthRecords.filter(record => record.type === selectedCategory);

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.error} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </Svg>
        );
      case 'imaging':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </Svg>
        );
      case 'prescription':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </Svg>
        );
      case 'visit':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </Svg>
        );
      case 'vaccination':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zM2 15a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zM4 19a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" />
          </Svg>
        );
      default:
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </Svg>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'cancelled':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePasswordSubmit = () => {
    // Simple password check - in a real app, this would be more secure
    if (password === '1234' || password === 'health123') {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleAddRecord = () => {
    if (!newRecord.title || !newRecord.provider || !newRecord.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const recordToAdd: HealthRecord = {
      id: Date.now().toString(),
      type: newRecord.type,
      title: newRecord.title,
      date: new Date().toISOString().split('T')[0], // Today's date
      provider: newRecord.provider,
      description: newRecord.description,
      status: newRecord.status
    };

    setHealthRecords(prev => [recordToAdd, ...prev]);
    setNewRecord({
      type: 'lab',
      title: '',
      provider: '',
      description: '',
      status: 'pending'
    });
    setShowAddRecordModal(false);
    Alert.alert('Success', 'Health record added successfully!');
  };

  const resetNewRecord = () => {
    setNewRecord({
      type: 'lab',
      title: '',
      provider: '',
      description: '',
      status: 'pending'
    });
  };

  const handleRecordPress = (record: HealthRecord) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const handleDownload = (record: HealthRecord) => {
    Alert.alert(
      'Download Record',
      `Download ${record.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => console.log('Downloading:', record.title) }
      ]
    );
  };

  const handleShare = (record: HealthRecord) => {
    Alert.alert(
      'Share Record',
      `Share ${record.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Sharing:', record.title) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Records</Text>
        {isAuthenticated && (
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {
              resetNewRecord();
              setShowAddRecordModal(true);
            }}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </Svg>
          </TouchableOpacity>
        )}
        {!isAuthenticated && <View style={styles.headerSpacer} />}
      </View>

      {isAuthenticated ? (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{healthRecords.length}</Text>
            <Text style={styles.summaryLabel}>Total Records</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{healthRecords.filter(r => r.status === 'pending').length}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{healthRecords.filter(r => r.date.startsWith('2024-01')).length}</Text>
            <Text style={styles.summaryLabel}>This Month</Text>
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id && styles.categoryButtonTextActive
                ]}>
                  {category.label} ({category.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Records List */}
        <View style={styles.recordsContainer}>
          {filteredRecords.map((record) => (
            <TouchableOpacity
              key={record.id}
              style={styles.recordCard}
              onPress={() => handleRecordPress(record)}
            >
              <View style={styles.recordHeader}>
                <View style={styles.recordIconContainer}>
                  {getRecordIcon(record.type)}
                </View>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordTitle}>{record.title}</Text>
                  <Text style={styles.recordProvider}>{record.provider}</Text>
                  <Text style={styles.recordDate}>{formatDate(record.date)}</Text>
                </View>
                <View style={styles.recordStatus}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(record.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(record.status) }]}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.recordActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleDownload(record)}
                >
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </Svg>
                  <Text style={styles.actionButtonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleShare(record)}
                >
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </Svg>
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      ) : (
        <View style={styles.lockedContainer}>
          <View style={styles.lockIcon}>
            <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </Svg>
          </View>
          <Text style={styles.lockedTitle}>Health Records Secured</Text>
          <Text style={styles.lockedSubtitle}>
            Your health data is protected with advanced encryption and secure access controls.
          </Text>
          <Text style={styles.lockedNotice}>
            Please enter your password to access your medical records.
          </Text>
        </View>
      )}

      {/* Record Detail Modal */}
      <Modal
        visible={showDetailModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Record Details</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowDetailModal(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            
            {selectedRecord && (
              <ScrollView style={styles.modalContent}>
                <View style={styles.modalRecordHeader}>
                  <View style={styles.modalRecordIcon}>
                    {getRecordIcon(selectedRecord.type)}
                  </View>
                  <View style={styles.modalRecordInfo}>
                    <Text style={styles.modalRecordTitle}>{selectedRecord.title}</Text>
                    <Text style={styles.modalRecordProvider}>{selectedRecord.provider}</Text>
                    <Text style={styles.modalRecordDate}>{formatDate(selectedRecord.date)}</Text>
                  </View>
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Description</Text>
                  <Text style={styles.modalSectionContent}>{selectedRecord.description}</Text>
                </View>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.modalActionButton}
                    onPress={() => handleDownload(selectedRecord)}
                  >
                    <Text style={styles.modalActionButtonText}>Download PDF</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalActionButton, styles.modalActionButtonSecondary]}
                    onPress={() => handleShare(selectedRecord)}
                  >
                    <Text style={[styles.modalActionButtonText, styles.modalActionButtonTextSecondary]}>Share</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Password Modal */}
      <Modal
        visible={showPasswordModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.passwordOverlay}>
          <View style={styles.passwordContainer}>
            <View style={styles.passwordHeader}>
              <View style={styles.passwordLockIcon}>
                <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </Svg>
              </View>
              <Text style={styles.passwordTitle}>Secure Access Required</Text>
              <Text style={styles.passwordSubtitle}>
                Your health records are protected. Please enter your password to continue.
              </Text>
            </View>
            
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoFocus
                onSubmitEditing={handlePasswordSubmit}
              />
              {passwordError ? (
                <Text style={styles.passwordError}>{passwordError}</Text>
              ) : null}
            </View>
            
            <View style={styles.passwordActions}>
              <TouchableOpacity 
                style={styles.passwordCancelButton}
                onPress={onBack}
              >
                <Text style={styles.passwordCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.passwordSubmitButton}
                onPress={handlePasswordSubmit}
              >
                <Text style={styles.passwordSubmitText}>Access Records</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.passwordNotice}>
              <Text style={styles.passwordNoticeText}>
                Demo passwords: "1234" or "health123"
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Record Modal */}
      <Modal
        visible={showAddRecordModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddRecordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addRecordContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Health Record</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowAddRecordModal(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.addRecordContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Record Type *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
                  {(['lab', 'imaging', 'prescription', 'visit', 'vaccination'] as const).map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeButton,
                        newRecord.type === type && styles.typeButtonActive
                      ]}
                      onPress={() => setNewRecord(prev => ({ ...prev, type }))}
                    >
                      <Text style={[
                        styles.typeButtonText,
                        newRecord.type === type && styles.typeButtonTextActive
                      ]}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Title *</Text>
                <TextInput
                  style={styles.formInput}
                  value={newRecord.title}
                  onChangeText={(text) => setNewRecord(prev => ({ ...prev, title: text }))}
                  placeholder="Enter record title"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Provider *</Text>
                <TextInput
                  style={styles.formInput}
                  value={newRecord.provider}
                  onChangeText={(text) => setNewRecord(prev => ({ ...prev, provider: text }))}
                  placeholder="Enter healthcare provider"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description *</Text>
                <TextInput
                  style={[styles.formInput, styles.formInputMultiline]}
                  value={newRecord.description}
                  onChangeText={(text) => setNewRecord(prev => ({ ...prev, description: text }))}
                  placeholder="Enter record description"
                  multiline
                  numberOfLines={4}
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Status</Text>
                <View style={styles.statusContainer}>
                  {(['completed', 'pending', 'cancelled'] as const).map((status) => (
                    <TouchableOpacity
                      key={status}
                      style={[
                        styles.statusButton,
                        newRecord.status === status && styles.statusButtonActive
                      ]}
                      onPress={() => setNewRecord(prev => ({ ...prev, status }))}
                    >
                      <Text style={[
                        styles.statusButtonText,
                        newRecord.status === status && styles.statusButtonTextActive
                      ]}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.addRecordActions}>
              <TouchableOpacity 
                style={styles.addRecordCancelButton}
                onPress={() => setShowAddRecordModal(false)}
              >
                <Text style={styles.addRecordCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.addRecordSaveButton}
                onPress={handleAddRecord}
              >
                <Text style={styles.addRecordSaveText}>Add Record</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B82F6',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryScroll: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  recordsContainer: {
    gap: 12,
  },
  recordCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recordIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  recordProvider: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 2,
  },
  recordDate: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'ReadexPro-Medium',
  },
  recordStatus: {
    alignItems: 'flex-end',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'ReadexPro-Medium',
  },
  recordActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
  headerSpacer: {
    width: 40,
  },
  lockedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  lockIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  lockedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 12,
    textAlign: 'center',
  },
  lockedSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  lockedNotice: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'ReadexPro-Medium',
    textAlign: 'center',
    fontStyle: 'italic',
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
    maxHeight: '80%',
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
  },
  modalRecordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalRecordIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  modalRecordInfo: {
    flex: 1,
  },
  modalRecordTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  modalRecordProvider: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 2,
  },
  modalRecordDate: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'ReadexPro-Medium',
  },
  modalSection: {
    paddingVertical: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
  },
  modalSectionContent: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 20,
  },
  modalActionButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalActionButtonSecondary: {
    backgroundColor: '#F3F4F6',
  },
  modalActionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  modalActionButtonTextSecondary: {
    color: '#6B7280',
  },
  // Password Modal Styles
  passwordOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  passwordContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  passwordHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  passwordLockIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  passwordTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
    textAlign: 'center',
  },
  passwordSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    textAlign: 'center',
    lineHeight: 20,
  },
  passwordInputContainer: {
    marginBottom: 24,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  passwordError: {
    fontSize: 14,
    color: '#EF4444',
    fontFamily: 'ReadexPro-Medium',
    marginTop: 8,
    textAlign: 'center',
  },
  passwordActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  passwordCancelButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  passwordCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  passwordSubmitButton: {
    flex: 2,
    paddingVertical: 12,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  passwordSubmitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  passwordNotice: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  passwordNoticeText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'ReadexPro-Medium',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Add Record Modal Styles
  addRecordContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  addRecordContent: {
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
    height: 100,
    textAlignVertical: 'top',
  },
  typeScroll: {
    paddingRight: 20,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  typeButtonActive: {
    backgroundColor: '#3B82F6',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#ffffff',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#3B82F6',
  },
  statusButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: '#ffffff',
  },
  addRecordActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  addRecordCancelButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  addRecordCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  addRecordSaveButton: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  addRecordSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
});

const HealthRecordsScreen: React.FC<HealthRecordsScreenProps> = (props) => {
  return (
    <DarkThemeProvider>
      <HealthRecordsScreenContent {...props} />
    </DarkThemeProvider>
  );
};

export default HealthRecordsScreen;
