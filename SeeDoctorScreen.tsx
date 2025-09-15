import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, SafeAreaView } from 'react-native';
import { Svg, Path, Circle, Phone, Mail, MapPin, Clock, Star } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

import BottomNav from './ui/BottomNav';

interface SeeDoctorScreenProps {
  onBack: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

const SeeDoctorScreen: React.FC<SeeDoctorScreenProps> = ({ onBack, onHome, onNotifications, onProfile }) => {
  const { colors } = useTheme();
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const symptoms = [
    { id: 'headache', name: 'Headache', icon: '🤕' },
    { id: 'fever', name: 'Fever', icon: '🌡️' },
    { id: 'cough', name: 'Cough', icon: '😷' },
    { id: 'fatigue', name: 'Fatigue', icon: '😴' },
    { id: 'nausea', name: 'Nausea', icon: '🤢' },
    { id: 'chest-pain', name: 'Chest Pain', icon: '💓' },
    { id: 'shortness-breath', name: 'Shortness of Breath', icon: '😮‍💨' },
    { id: 'stomach-pain', name: 'Stomach Pain', icon: '🤰' },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Internal Medicine',
      rating: 4.9,
      experience: '15 years',
      nextAvailable: 'Today 2:30 PM',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Family Medicine',
      rating: 4.8,
      experience: '12 years',
      nextAvailable: 'Today 4:00 PM',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Emergency Medicine',
      rating: 4.9,
      experience: '18 years',
      nextAvailable: 'Tomorrow 9:00 AM',
      avatar: 'ER',
    },
  ];

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>See a Doctor</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Emergency Banner */}
        <View style={styles.emergencyBanner}>
          <View style={styles.emergencyIcon}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="#ef4444">
              <Path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
            </Svg>
          </View>
          <View style={styles.emergencyTextContainer}>
            <Text style={styles.emergencyTitle}>Emergency?</Text>
            <Text style={styles.emergencyText}>Call 911 or go to your nearest emergency room</Text>
          </View>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Call 911</Text>
          </TouchableOpacity>
        </View>

        {/* Search Symptoms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are your symptoms?</Text>
          <View style={styles.searchContainer}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} style={styles.searchIcon}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </Svg>
            <TextInput
              style={styles.searchInput}
              placeholder="Search symptoms..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Symptoms Grid */}
        <View style={styles.symptomsGrid}>
          {filteredSymptoms.map((symptom) => (
            <TouchableOpacity
              key={symptom.id}
              style={[
                styles.symptomCard,
                selectedSymptom === symptom.id && styles.symptomCardSelected
              ]}
              onPress={() => setSelectedSymptom(symptom.id)}
            >
              <Text style={styles.symptomIcon}>{symptom.icon}</Text>
              <Text style={[
                styles.symptomName,
                selectedSymptom === symptom.id && styles.symptomNameSelected
              ]}>
                {symptom.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Available Doctors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Doctors</Text>
          <View style={styles.doctorsContainer}>
            {doctors.map((doctor) => (
              <View key={doctor.id} style={styles.doctorCard}>
                <View style={styles.doctorHeader}>
                  <View style={styles.doctorAvatar}>
                    <Text style={styles.doctorAvatarText}>{doctor.avatar}</Text>
                  </View>
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                    <View style={styles.doctorMeta}>
                      <View style={styles.ratingContainer}>
                        <Svg width={16} height={16} viewBox="0 0 24 24" fill="#fbbf24">
                          <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </Svg>
                        <Text style={styles.ratingText}>{doctor.rating}</Text>
                      </View>
                      <Text style={styles.experienceText}>{doctor.experience}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.availabilityContainer}>
                  <Text style={styles.availabilityLabel}>Next available:</Text>
                  <Text style={styles.availabilityTime}>{doctor.nextAvailable}</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Appointment</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIcon}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="#3b82f6">
                  <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </Svg>
              </View>
              <Text style={styles.quickActionTitle}>Health Records</Text>
              <Text style={styles.quickActionSubtitle}>View your medical history</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIcon}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="#10b981">
                  <Path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </Svg>
              </View>
              <Text style={styles.quickActionTitle}>Symptom Checker</Text>
              <Text style={styles.quickActionSubtitle}>Get AI-powered insights</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNav active="doctor" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    padding: 16,
    margin: 24,
  },
  emergencyIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#fee2e2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emergencyTextContainer: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 4,
  },
  emergencyText: {
    fontSize: 14,
    color: '#991b1b',
  },
  emergencyButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  symptomCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  symptomCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  symptomIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  symptomName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    textAlign: 'center',
  },
  symptomNameSelected: {
    color: '#3b82f6',
  },
  doctorsContainer: {
    gap: 16,
  },
  doctorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    backgroundColor: '#3b82f6',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  doctorAvatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  experienceText: {
    fontSize: 14,
    color: '#6b7280',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  availabilityLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  availabilityTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  bookButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default SeeDoctorScreen;
