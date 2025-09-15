import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useDarkTheme, DarkThemeProvider } from '../contexts/DarkThemeContext';

interface MedicalHistoryScreenProps {
  onBack: () => void;
}

interface MedicalEvent {
  id: string;
  type: 'condition' | 'surgery' | 'allergy' | 'medication' | 'vaccination' | 'hospitalization';
  title: string;
  date: string;
  description: string;
  status: 'active' | 'resolved' | 'chronic' | 'past';
  severity?: 'mild' | 'moderate' | 'severe';
  provider?: string;
}

const MedicalHistoryScreenContent: React.FC<MedicalHistoryScreenProps> = ({ onBack }) => {
  const { colors } = useDarkTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<MedicalEvent | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    type: 'condition' as MedicalEvent['type'],
    title: '',
    description: '',
    status: 'active' as MedicalEvent['status'],
    severity: 'mild' as MedicalEvent['severity'],
    provider: ''
  });

  const [medicalHistory, setMedicalHistory] = useState<MedicalEvent[]>([
    {
      id: '1',
      type: 'condition',
      title: 'Hypertension',
      date: '2020-03-15',
      description: 'High blood pressure diagnosed during routine checkup. Currently managed with medication and lifestyle changes.',
      status: 'chronic',
      severity: 'moderate',
      provider: 'Dr. Smith - Family Medicine'
    },
    {
      id: '2',
      type: 'surgery',
      title: 'Appendectomy',
      date: '2018-07-22',
      description: 'Laparoscopic appendectomy performed due to acute appendicitis. Recovery was smooth with no complications.',
      status: 'resolved',
      provider: 'Dr. Johnson - General Surgery'
    },
    {
      id: '3',
      type: 'allergy',
      title: 'Penicillin Allergy',
      date: '2015-05-10',
      description: 'Allergic reaction to penicillin including rash and difficulty breathing. Carry epinephrine auto-injector.',
      status: 'active',
      severity: 'severe',
      provider: 'Dr. Wilson - Allergist'
    },
    {
      id: '4',
      type: 'medication',
      title: 'Lisinopril Treatment',
      date: '2020-03-20',
      description: 'Started Lisinopril 10mg daily for blood pressure management. Regular monitoring required.',
      status: 'active',
      provider: 'Dr. Smith - Family Medicine'
    },
    {
      id: '5',
      type: 'vaccination',
      title: 'Annual Flu Vaccine',
      date: '2023-10-15',
      description: 'Annual influenza vaccination administered. No adverse reactions reported.',
      status: 'past',
      provider: 'City Health Department'
    },
    {
      id: '6',
      type: 'hospitalization',
      title: 'Emergency Room Visit',
      date: '2022-12-03',
      description: 'Emergency room visit for chest pain. EKG and blood tests normal. Diagnosed with anxiety-related chest pain.',
      status: 'resolved',
      provider: 'City General Hospital'
    }
  ]);

  const categories = [
    { id: 'all', label: 'All History', count: medicalHistory.length },
    { id: 'condition', label: 'Conditions', count: medicalHistory.filter(e => e.type === 'condition').length },
    { id: 'surgery', label: 'Surgeries', count: medicalHistory.filter(e => e.type === 'surgery').length },
    { id: 'allergy', label: 'Allergies', count: medicalHistory.filter(e => e.type === 'allergy').length },
    { id: 'medication', label: 'Medications', count: medicalHistory.filter(e => e.type === 'medication').length },
    { id: 'vaccination', label: 'Vaccines', count: medicalHistory.filter(e => e.type === 'vaccination').length }
  ];

  const filteredHistory = selectedCategory === 'all' 
    ? medicalHistory 
    : medicalHistory.filter(event => event.type === selectedCategory);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'condition':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.error} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </Svg>
        );
      case 'surgery':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </Svg>
        );
      case 'allergy':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.warning} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </Svg>
        );
      case 'medication':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </Svg>
        );
      case 'vaccination':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zM2 15a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zM4 19a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" />
          </Svg>
        );
      case 'hospitalization':
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
      case 'active':
        return colors.error;
      case 'chronic':
        return colors.warning;
      case 'resolved':
        return colors.success;
      case 'past':
        return colors.textSecondary;
      default:
        return colors.textSecondary;
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'mild':
        return colors.success;
      case 'moderate':
        return colors.warning;
      case 'severe':
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

  const handleEventPress = (event: MedicalEvent) => {
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const eventToAdd: MedicalEvent = {
      id: Date.now().toString(),
      type: newEvent.type,
      title: newEvent.title,
      date: new Date().toISOString().split('T')[0],
      description: newEvent.description,
      status: newEvent.status,
      severity: newEvent.severity,
      provider: newEvent.provider || undefined
    };

    setMedicalHistory(prev => [eventToAdd, ...prev]);
    setNewEvent({
      type: 'condition',
      title: '',
      description: '',
      status: 'active',
      severity: 'mild',
      provider: ''
    });
    setShowAddModal(false);
    Alert.alert('Success', 'Medical history entry added successfully!');
  };

  const resetNewEvent = () => {
    setNewEvent({
      type: 'condition',
      title: '',
      description: '',
      status: 'active',
      severity: 'mild',
      provider: ''
    });
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
        <Text style={styles.headerTitle}>Medical History</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            resetNewEvent();
            setShowAddModal(true);
          }}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{medicalHistory.length}</Text>
            <Text style={styles.summaryLabel}>Total Events</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{medicalHistory.filter(e => e.status === 'active' || e.status === 'chronic').length}</Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{medicalHistory.filter(e => e.severity === 'severe').length}</Text>
            <Text style={styles.summaryLabel}>Severe</Text>
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

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.sectionTitle}>Medical Timeline</Text>
          {filteredHistory
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((event, index) => (
            <View key={event.id} style={styles.timelineItem}>
              <View style={styles.timelineMarker}>
                <View style={[styles.timelineDot, { backgroundColor: getStatusColor(event.status) }]} />
                {index < filteredHistory.length - 1 && <View style={styles.timelineLine} />}
              </View>
              
              <TouchableOpacity 
                style={styles.eventCard}
                onPress={() => handleEventPress(event)}
              >
                <View style={styles.eventHeader}>
                  <View style={styles.eventIconContainer}>
                    {getEventIcon(event.type)}
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
                    {event.provider && (
                      <Text style={styles.eventProvider}>{event.provider}</Text>
                    )}
                  </View>
                  <View style={styles.eventStatus}>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(event.status)}20` }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(event.status) }]}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Text>
                    </View>
                    {event.severity && (
                      <View style={[styles.severityBadge, { backgroundColor: `${getSeverityColor(event.severity)}20` }]}>
                        <Text style={[styles.severityText, { color: getSeverityColor(event.severity) }]}>
                          {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text style={styles.eventDescription} numberOfLines={2}>
                  {event.description}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Event Detail Modal */}
      <Modal
        visible={showDetailModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Medical Event Details</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowDetailModal(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            
            {selectedEvent && (
              <ScrollView style={styles.modalContent}>
                <View style={styles.modalEventHeader}>
                  <View style={styles.modalEventIcon}>
                    {getEventIcon(selectedEvent.type)}
                  </View>
                  <View style={styles.modalEventInfo}>
                    <Text style={styles.modalEventTitle}>{selectedEvent.title}</Text>
                    <Text style={styles.modalEventDate}>{formatDate(selectedEvent.date)}</Text>
                    {selectedEvent.provider && (
                      <Text style={styles.modalEventProvider}>{selectedEvent.provider}</Text>
                    )}
                  </View>
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Description</Text>
                  <Text style={styles.modalSectionContent}>{selectedEvent.description}</Text>
                </View>
                
                <View style={styles.modalBadges}>
                  <View style={[styles.modalBadge, { backgroundColor: `${getStatusColor(selectedEvent.status)}20` }]}>
                    <Text style={[styles.modalBadgeText, { color: getStatusColor(selectedEvent.status) }]}>
                      Status: {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                    </Text>
                  </View>
                  {selectedEvent.severity && (
                    <View style={[styles.modalBadge, { backgroundColor: `${getSeverityColor(selectedEvent.severity)}20` }]}>
                      <Text style={[styles.modalBadgeText, { color: getSeverityColor(selectedEvent.severity) }]}>
                        Severity: {selectedEvent.severity.charAt(0).toUpperCase() + selectedEvent.severity.slice(1)}
                      </Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Medical Event</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowAddModal(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.addModalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Event Type *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
                  {(['condition', 'surgery', 'allergy', 'medication', 'vaccination', 'hospitalization'] as const).map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeButton,
                        newEvent.type === type && styles.typeButtonActive
                      ]}
                      onPress={() => setNewEvent(prev => ({ ...prev, type }))}
                    >
                      <Text style={[
                        styles.typeButtonText,
                        newEvent.type === type && styles.typeButtonTextActive
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
                  value={newEvent.title}
                  onChangeText={(text) => setNewEvent(prev => ({ ...prev, title: text }))}
                  placeholder="Enter event title"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description *</Text>
                <TextInput
                  style={[styles.formInput, styles.formInputMultiline]}
                  value={newEvent.description}
                  onChangeText={(text) => setNewEvent(prev => ({ ...prev, description: text }))}
                  placeholder="Enter detailed description"
                  multiline
                  numberOfLines={4}
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Healthcare Provider</Text>
                <TextInput
                  style={styles.formInput}
                  value={newEvent.provider}
                  onChangeText={(text) => setNewEvent(prev => ({ ...prev, provider: text }))}
                  placeholder="Enter provider name (optional)"
                />
              </View>
              
              <View style={styles.formRow}>
                <View style={styles.formColumn}>
                  <Text style={styles.formLabel}>Status</Text>
                  <View style={styles.statusContainer}>
                    {(['active', 'resolved', 'chronic', 'past'] as const).map((status) => (
                      <TouchableOpacity
                        key={status}
                        style={[
                          styles.statusButton,
                          newEvent.status === status && styles.statusButtonActive
                        ]}
                        onPress={() => setNewEvent(prev => ({ ...prev, status }))}
                      >
                        <Text style={[
                          styles.statusButtonText,
                          newEvent.status === status && styles.statusButtonTextActive
                        ]}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                
                <View style={styles.formColumn}>
                  <Text style={styles.formLabel}>Severity</Text>
                  <View style={styles.severityContainer}>
                    {(['mild', 'moderate', 'severe'] as const).map((severity) => (
                      <TouchableOpacity
                        key={severity}
                        style={[
                          styles.severityButton,
                          newEvent.severity === severity && styles.severityButtonActive
                        ]}
                        onPress={() => setNewEvent(prev => ({ ...prev, severity }))}
                      >
                        <Text style={[
                          styles.severityButtonText,
                          newEvent.severity === severity && styles.severityButtonTextActive
                        ]}>
                          {severity.charAt(0).toUpperCase() + severity.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.addModalActions}>
              <TouchableOpacity 
                style={styles.addModalCancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.addModalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.addModalSaveButton}
                onPress={handleAddEvent}
              >
                <Text style={styles.addModalSaveText}>Add Event</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 16,
  },
  timelineContainer: {
    marginBottom: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineMarker: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  eventCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 2,
  },
  eventProvider: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'ReadexPro-Medium',
  },
  eventStatus: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  eventDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 20,
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
    maxHeight: '80%',
  },
  addModalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: '90%',
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
  addModalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalEventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalEventIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  modalEventInfo: {
    flex: 1,
  },
  modalEventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  modalEventDate: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 2,
  },
  modalEventProvider: {
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
  modalBadges: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 20,
  },
  modalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  modalBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  // Form Styles
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  formColumn: {
    flex: 1,
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
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  statusButtonActive: {
    backgroundColor: '#3B82F6',
  },
  statusButtonText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: '#ffffff',
  },
  severityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  severityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  severityButtonActive: {
    backgroundColor: '#3B82F6',
  },
  severityButtonText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  severityButtonTextActive: {
    color: '#ffffff',
  },
  addModalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  addModalCancelButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  addModalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  addModalSaveButton: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  addModalSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
});

const MedicalHistoryScreen: React.FC<MedicalHistoryScreenProps> = (props) => {
  return (
    <DarkThemeProvider>
      <MedicalHistoryScreenContent {...props} />
    </DarkThemeProvider>
  );
};

export default MedicalHistoryScreen;
