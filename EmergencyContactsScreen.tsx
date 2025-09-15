import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useDarkTheme, DarkThemeProvider } from '../contexts/DarkThemeContext';

interface EmergencyContactsScreenProps {
  onBack: () => void;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
  address?: string;
}

const EmergencyContactsScreenContent: React.FC<EmergencyContactsScreenProps> = ({ onBack }) => {
  const { colors } = useDarkTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
      email: 'john.johnson@email.com',
      isPrimary: true,
      address: '123 Main St, New York, NY 10001'
    },
    {
      id: '2',
      name: 'Mary Johnson',
      relationship: 'Mother',
      phone: '+1 (555) 123-9876',
      email: 'mary.johnson@email.com',
      isPrimary: false,
      address: '456 Oak Ave, New York, NY 10002'
    },
    {
      id: '3',
      name: 'Dr. Smith',
      relationship: 'Primary Care Doctor',
      phone: '+1 (555) 456-7890',
      email: 'dr.smith@familymedcenter.com',
      isPrimary: false,
      address: 'Family Medical Center, 789 Health St, New York, NY 10003'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: ''
  });

  const relationshipOptions = [
    'Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Doctor', 'Caregiver', 'Other'
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: ''
    });
  };

  const handleAddContact = () => {
    setEditingContact(null);
    resetForm();
    setShowAddModal(true);
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email || '',
      address: contact.address || ''
    });
    setShowAddModal(true);
  };

  const handleSaveContact = () => {
    if (!formData.name || !formData.relationship || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields (Name, Relationship, Phone)');
      return;
    }

    if (editingContact) {
      // Update existing contact
      setContacts(prev => prev.map(contact => 
        contact.id === editingContact.id 
          ? {
              ...contact,
              name: formData.name,
              relationship: formData.relationship,
              phone: formData.phone,
              email: formData.email || undefined,
              address: formData.address || undefined
            }
          : contact
      ));
    } else {
      // Add new contact
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        name: formData.name,
        relationship: formData.relationship,
        phone: formData.phone,
        email: formData.email || undefined,
        address: formData.address || undefined,
        isPrimary: false
      };
      setContacts(prev => [...prev, newContact]);
    }

    setShowAddModal(false);
    resetForm();
    setEditingContact(null);
  };

  const handleDeleteContact = (contactId: string) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this emergency contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setContacts(prev => prev.filter(contact => contact.id !== contactId));
          }
        }
      ]
    );
  };

  const handleSetPrimary = (contactId: string) => {
    setContacts(prev => prev.map(contact => ({
      ...contact,
      isPrimary: contact.id === contactId
    })));
  };

  const handleCall = (phone: string) => {
    Alert.alert(
      'Call Contact',
      `Call ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling:', phone) }
      ]
    );
  };

  const handleMessage = (phone: string) => {
    Alert.alert(
      'Send Message',
      `Send message to ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Message', onPress: () => console.log('Messaging:', phone) }
      ]
    );
  };

  const getRelationshipIcon = (relationship: string) => {
    const lowerRelationship = relationship.toLowerCase();
    if (lowerRelationship.includes('spouse') || lowerRelationship.includes('partner')) {
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.error} strokeWidth={2}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </Svg>
      );
    } else if (lowerRelationship.includes('parent') || lowerRelationship.includes('mother') || lowerRelationship.includes('father')) {
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth={2}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </Svg>
      );
    } else if (lowerRelationship.includes('doctor') || lowerRelationship.includes('physician')) {
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2" />
        </Svg>
      );
    } else {
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth={2}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </Svg>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Emergency Banner */}
        <View style={styles.emergencyBanner}>
          <View style={styles.emergencyIcon}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill={colors.background}>
              <Path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
            </Svg>
          </View>
          <View style={styles.emergencyTextContainer}>
            <Text style={styles.emergencyTitle}>In Case of Emergency</Text>
            <Text style={styles.emergencyText}>Call 911 immediately for life-threatening situations</Text>
          </View>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Call 911</Text>
          </TouchableOpacity>
        </View>

        {/* Contacts List */}
        <View style={styles.contactsContainer}>
          <Text style={styles.sectionTitle}>Emergency Contacts ({contacts.length})</Text>
          
          {contacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactHeader}>
                <View style={styles.contactIconContainer}>
                  {getRelationshipIcon(contact.relationship)}
                </View>
                <View style={styles.contactInfo}>
                  <View style={styles.contactNameRow}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    {contact.isPrimary && (
                      <View style={styles.primaryBadge}>
                        <Text style={styles.primaryBadgeText}>Primary</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.contactRelationship}>{contact.relationship}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                  {contact.email && (
                    <Text style={styles.contactEmail}>{contact.email}</Text>
                  )}
                  {contact.address && (
                    <Text style={styles.contactAddress}>{contact.address}</Text>
                  )}
                </View>
                <TouchableOpacity 
                  style={styles.moreButton}
                  onPress={() => handleEditContact(contact)}
                >
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                    <Circle cx="12" cy="12" r="1" />
                    <Circle cx="19" cy="12" r="1" />
                    <Circle cx="5" cy="12" r="1" />
                  </Svg>
                </TouchableOpacity>
              </View>
              
              <View style={styles.contactActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleCall(contact.phone)}
                >
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </Svg>
                  <Text style={styles.actionButtonText}>Call</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleMessage(contact.phone)}
                >
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </Svg>
                  <Text style={styles.actionButtonText}>Message</Text>
                </TouchableOpacity>
                
                {!contact.isPrimary && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleSetPrimary(contact.id)}
                  >
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.warning} strokeWidth={2}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </Svg>
                    <Text style={styles.actionButtonText}>Set Primary</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add/Edit Contact Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingContact ? 'Edit Contact' : 'Add Emergency Contact'}
              </Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowAddModal(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Name *</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.name}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                  placeholder="Enter contact name"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Relationship *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relationshipScroll}>
                  {relationshipOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.relationshipButton,
                        formData.relationship === option && styles.relationshipButtonActive
                      ]}
                      onPress={() => setFormData(prev => ({ ...prev, relationship: option }))}
                    >
                      <Text style={[
                        styles.relationshipButtonText,
                        formData.relationship === option && styles.relationshipButtonTextActive
                      ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Phone Number *</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.phone}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email (Optional)</Text>
                <TextInput
                  style={styles.formInput}
                  value={formData.email}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Address (Optional)</Text>
                <TextInput
                  style={[styles.formInput, styles.formInputMultiline]}
                  value={formData.address}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
                  placeholder="Enter address"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>
            
            <View style={styles.modalActions}>
              {editingContact && (
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => {
                    setShowAddModal(false);
                    handleDeleteContact(editingContact.id);
                  }}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveContact}
              >
                <Text style={styles.saveButtonText}>
                  {editingContact ? 'Update Contact' : 'Add Contact'}
                </Text>
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
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  emergencyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emergencyTextContainer: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 2,
  },
  emergencyText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
    opacity: 0.9,
  },
  emergencyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    fontFamily: 'ReadexPro-Medium',
  },
  contactsContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginRight: 8,
  },
  primaryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#EF4444',
    borderRadius: 12,
  },
  primaryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  contactRelationship: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#3B82F6',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 2,
  },
  contactAddress: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'ReadexPro-Medium',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
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
    height: 80,
    textAlignVertical: 'top',
  },
  relationshipScroll: {
    paddingRight: 20,
  },
  relationshipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  relationshipButtonActive: {
    backgroundColor: '#3B82F6',
  },
  relationshipButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  relationshipButtonTextActive: {
    color: '#ffffff',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    fontFamily: 'ReadexPro-Medium',
  },
  saveButton: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
});

const EmergencyContactsScreen: React.FC<EmergencyContactsScreenProps> = (props) => {
  return (
    <DarkThemeProvider>
      <EmergencyContactsScreenContent {...props} />
    </DarkThemeProvider>
  );
};

export default EmergencyContactsScreen;
