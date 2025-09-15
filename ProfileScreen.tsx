import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert, Modal, ActionSheetIOS, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../contexts/UserContext';
import CustomCalendar from './ui/CustomCalendar';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import BottomNav from './ui/BottomNav';

// ProfileItem component extracted to prevent re-renders
interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onPress?: () => void;
  editable?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  selectorType?: 'none' | 'date' | 'dropdown';
  isEditing: boolean;
  editableInfo: any;
  colors: any;
  onFieldChange: (fieldKey: string, value: string) => void;
  onDatePickerShow: () => void;
}

const getFieldKey = (label: string) => {
  const fieldMap: { [key: string]: string } = {
    'Name': 'name',
    'Email': 'email',
    'Phone': 'phone',
    'Date of Birth': 'dateOfBirth',
    'Gender': 'gender',
    'Blood Type': 'bloodType',
    'Height': 'height',
    'Weight': 'weight',
    'Address': 'address',
    'Emergency Contact': 'emergencyContact'
  };
  return fieldMap[label] || 'name';
};

const ProfileItem: React.FC<ProfileItemProps> = React.memo(({ 
  icon, 
  label, 
  value, 
  onPress, 
  editable = false,
  keyboardType = 'default',
  selectorType = 'none',
  isEditing,
  editableInfo,
  colors,
  onFieldChange,
  onDatePickerShow
}) => {
  const fieldKey = getFieldKey(label);
  const fieldValue = editableInfo[fieldKey] || value;
  
  return (
    <View style={styles.profileItem}>
      <View style={styles.profileItemLeft}>
        <View style={[styles.profileIconContainer, { backgroundColor: colors.surface }]}>
          {icon}
        </View>
        <Text style={[styles.profileLabel, { color: colors.textSecondary }]}>{label}</Text>
      </View>
      <View style={styles.profileItemRight}>
        {isEditing && editable ? (
          selectorType === 'date' ? (
            <TouchableOpacity 
              style={[styles.profileSelector, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={onDatePickerShow}
            >
              <Text style={[styles.profileSelectorText, { color: colors.text }]}>{fieldValue}</Text>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </Svg>
            </TouchableOpacity>
          ) : selectorType === 'dropdown' ? (
            <TouchableOpacity 
              style={[styles.profileSelector, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={onPress}
            >
              <Text style={[styles.profileSelectorText, { color: colors.text }]}>{fieldValue}</Text>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </Svg>
            </TouchableOpacity>
          ) : (
            <TextInput
              style={[styles.profileInput, { color: colors.text, borderBottomColor: colors.primary }]}
              value={fieldValue}
              onChangeText={(text) => onFieldChange(fieldKey, text)}
              keyboardType={keyboardType}
              autoCorrect={false}
              autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
            />
          )
        ) : (
          <Text style={[styles.profileValue, { color: colors.text }]}>{value}</Text>
        )}
        {!isEditing && onPress && (
          <TouchableOpacity onPress={onPress} style={styles.profileArrow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </Svg>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

interface ProfileScreenProps {
  onBack: () => void;
  onEditProfile: () => void;
  onHealthRecords: () => void;
  onMedicalHistory: () => void;
  onEmergencyContacts: () => void;
  onSettings: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack,
  onEditProfile,
  onHealthRecords,
  onMedicalHistory,
  onEmergencyContacts,
  onSettings,
  onHome,
  onNotifications,
  onProfile
}) => {
  const { colors } = useTheme();
  const { userProfile, updateUserProfile, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [tempImageUri, setTempImageUri] = useState<string | null>(null);
  const [showBloodTypePicker, setShowBloodTypePicker] = useState(false);
  const [showHeightPicker, setShowHeightPicker] = useState(false);
  const [showWeightPicker, setShowWeightPicker] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const [editableInfo, setEditableInfo] = useState(userProfile || {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    height: '',
    weight: '',
    address: '',
    emergencyContact: '',
    profilePicture: null
  });

  // Update editableInfo when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setEditableInfo(userProfile);
    }
  }, [userProfile]);
  const [selectedDate, setSelectedDate] = useState(new Date(1992, 2, 15)); // March 15, 1992

  // Dropdown options
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const heightOptions = Array.from({ length: 36 }, (_, i) => {
    const feet = Math.floor((i + 48) / 12);
    const inches = (i + 48) % 12;
    return `${feet}'${inches}"`;
  });
  const weightOptions = Array.from({ length: 200 }, (_, i) => `${i + 80} lbs`);

  const formatDate = (date: Date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDateChange = (field: 'month' | 'day' | 'year', value: number) => {
    const newDate = new Date(selectedDate);
    
    if (field === 'month') {
      newDate.setMonth(value);
    } else if (field === 'day') {
      newDate.setDate(value);
    } else if (field === 'year') {
      newDate.setFullYear(value);
    }
    
    // Ensure the date is valid (e.g., February 30th becomes February 28th/29th)
    const maxDaysInMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    if (newDate.getDate() > maxDaysInMonth) {
      newDate.setDate(maxDaysInMonth);
    }
    
    setSelectedDate(newDate);
    setEditableInfo(prev => ({ ...prev, dateOfBirth: formatDate(newDate) }));
  };

  const handleCalendarDateSelect = (date: Date) => {
    setSelectedDate(date);
    setEditableInfo(prev => ({ ...prev, dateOfBirth: formatDate(date) }));
  };

  const handleDropdownSelect = (field: string, value: string) => {
    setEditableInfo(prev => ({ ...prev, [field]: value }));
    // Close all dropdowns
    setShowGenderPicker(false);
    setShowBloodTypePicker(false);
    setShowHeightPicker(false);
    setShowWeightPicker(false);
  };

  // Field change handler for ProfileItem
  const handleFieldChange = (fieldKey: string, value: string) => {
    setEditableInfo(prev => ({ ...prev, [fieldKey]: value }));
  };

  const handleProfilePictureUpload = () => {
    setShowImageOptions(true);
  };

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraPermission.status !== 'granted' || libraryPermission.status !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Camera and photo library permissions are needed to change your profile picture.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const cropImage = async (uri: string) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [
          { resize: { width: 300, height: 300 } },
        ],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
      return manipulatedImage.uri;
    } catch (error) {
      console.error('Error cropping image:', error);
      return uri;
    }
  };

  const handleImageFromCamera = async () => {
    setShowImageOptions(false);
    
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const croppedUri = await cropImage(result.assets[0].uri);
        setTempImageUri(croppedUri);
        setShowImagePreview(true);
      }
    } catch (error) {
      console.error('Error opening camera:', error);
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const handleImageFromLibrary = async () => {
    setShowImageOptions(false);
    
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const croppedUri = await cropImage(result.assets[0].uri);
        setTempImageUri(croppedUri);
        setShowImagePreview(true);
      }
    } catch (error) {
      console.error('Error opening image picker:', error);
      Alert.alert('Error', 'Failed to open image picker');
    }
  };

  const handleRemoveImage = () => {
    setShowImageOptions(false);
    Alert.alert(
      'Remove Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const newInfo = { ...editableInfo, profilePicture: null };
            setEditableInfo(newInfo);
          }
        }
      ]
    );
  };

  const confirmImageSelection = () => {
    if (tempImageUri) {
      const newInfo = { ...editableInfo, profilePicture: tempImageUri };
      setEditableInfo(newInfo);
    }
    setShowImagePreview(false);
    setTempImageUri(null);
  };

  const cancelImageSelection = () => {
    setShowImagePreview(false);
    setTempImageUri(null);
  };


  const handleSave = async () => {
    // Validate required fields
    if (!editableInfo.name.trim()) {
      Alert.alert('Validation Error', 'Name is required');
      return;
    }
    
    if (!editableInfo.email.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editableInfo.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }
    
    try {
      console.log('Saving profile data:', editableInfo);
      
      // Save using UserContext
      await updateUserProfile(editableInfo);
      
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated and saved successfully! Your name will now appear on the home screen.', [
        { text: 'OK', onPress: () => console.log('Profile saved successfully:', editableInfo) }
      ]);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditableInfo(userProfile || editableInfo);
    setIsEditing(false);
    // Close all dropdowns
    setShowDatePicker(false);
    setShowGenderPicker(false);
    setShowBloodTypePicker(false);
    setShowHeightPicker(false);
    setShowWeightPicker(false);
    setShowMonthDropdown(false);
    setShowDayDropdown(false);
    setShowYearDropdown(false);
  };

  const closeAllDateDropdowns = () => {
    setShowMonthDropdown(false);
    setShowDayDropdown(false);
    setShowYearDropdown(false);
  };


  const ActionCard = ({ 
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
    <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={onPress}>
      <View style={[styles.actionIconContainer, { backgroundColor: `${color}15` }]}>
        {icon}
      </View>
      <View style={styles.actionContent}>
        <Text style={[styles.actionTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      </Svg>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
              <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
                  <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={onBack}>
                      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
                  <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {userProfile?.profilePicture ? (
                <Image 
                  source={{ uri: userProfile.profilePicture }} 
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.avatarText}>{userProfile?.name ? userProfile.name.split(' ').map(n => n[0]).join('') : 'U'}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.cameraButton} onPress={handleProfilePictureUpload}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <Circle cx="12" cy="13" r="4" />
              </Svg>
            </TouchableOpacity>
          </View>
          <Text style={[styles.profileName, { color: colors.text }]}>{userProfile?.name || 'Loading...'}</Text>
          <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{userProfile?.email || 'Loading...'}</Text>
          
          {isEditing && (
            <View style={styles.editActions}>
              <TouchableOpacity style={[styles.cancelButton, { backgroundColor: colors.surface }]} onPress={handleCancel}>
                <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ProfileItem
              icon={
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <Circle cx="12" cy="7" r="4" />
                </Svg>
              }
              label="Name"
              value={userProfile?.name || ''}
              editable={true}
              isEditing={isEditing}
              editableInfo={editableInfo}
              colors={colors}
              onFieldChange={handleFieldChange}
              onDatePickerShow={() => setShowDatePicker(true)}
            />
            <ProfileItem
              icon={
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </Svg>
              }
              label="Email"
              value={userProfile?.email || ''}
              editable={true}
              keyboardType="email-address"
              isEditing={isEditing}
              editableInfo={editableInfo}
              colors={colors}
              onFieldChange={handleFieldChange}
              onDatePickerShow={() => setShowDatePicker(true)}
            />
            <ProfileItem
              icon={
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </Svg>
              }
              label="Phone"
              value={userProfile?.phone || ''}
              editable={true}
              keyboardType="phone-pad"
              isEditing={isEditing}
              editableInfo={editableInfo}
              colors={colors}
              onFieldChange={handleFieldChange}
              onDatePickerShow={() => setShowDatePicker(true)}
            />
            <ProfileItem
              icon={
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1M8 7h8m-8 0v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                </Svg>
              }
              label="Date of Birth"
              value={userProfile?.dateOfBirth || ''}
              editable={true}
              selectorType="date"
              isEditing={isEditing}
              editableInfo={editableInfo}
              colors={colors}
              onFieldChange={handleFieldChange}
              onDatePickerShow={() => setShowDatePicker(true)}
            />
            <ProfileItem
              icon={
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                  <Circle cx="12" cy="12" r="10" />
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                </Svg>
              }
              label="Gender"
              value={userProfile?.gender || ''}
              editable={true}
              selectorType="dropdown"
              onPress={() => setShowGenderPicker(true)}
              isEditing={isEditing}
              editableInfo={editableInfo}
              colors={colors}
              onFieldChange={handleFieldChange}
              onDatePickerShow={() => setShowDatePicker(true)}
            />
          </View>
        </View>

        {/* Health Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Health Information</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ProfileItem
              icon={
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </Svg>
              }
              label="Blood Type"
              value={userProfile?.bloodType || ''}
              editable={true}
              selectorType="dropdown"
              onPress={() => setShowBloodTypePicker(true)}
              isEditing={isEditing}
              editableInfo={editableInfo}
              colors={colors}
              onFieldChange={handleFieldChange}
              onDatePickerShow={() => setShowDatePicker(true)}
            />
            <ProfileItem
              icon={
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-5a1.5 1.5 0 113 0m-3 5a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </Svg>
              }
              label="Height"
              value={userProfile?.height || ''}
              editable={true}
              selectorType="dropdown"
              onPress={() => setShowHeightPicker(true)}
              isEditing={isEditing}
              editableInfo={editableInfo}
              colors={colors}
              onFieldChange={handleFieldChange}
              onDatePickerShow={() => setShowDatePicker(true)}
            />
            <ProfileItem
              icon={
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth={2}>
                  <Circle cx="12" cy="12" r="3" />
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                </Svg>
              }
              label="Weight"
              value={userProfile?.weight || ''}
              editable={true}
              selectorType="dropdown"
              onPress={() => setShowWeightPicker(true)}
              isEditing={isEditing}
              editableInfo={editableInfo}
              colors={colors}
              onFieldChange={handleFieldChange}
              onDatePickerShow={() => setShowDatePicker(true)}
            />
            <ProfileItem
              icon={
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </Svg>
              }
              label="Address"
              value={userProfile?.address || ''}
              editable={true}
              isEditing={isEditing}
              editableInfo={editableInfo}
              colors={colors}
              onFieldChange={handleFieldChange}
              onDatePickerShow={() => setShowDatePicker(true)}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <ActionCard
              icon={
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </Svg>
              }
              title="Health Records"
              subtitle="View your medical documents"
              onPress={onHealthRecords}
              color="#3B82F6"
            />
            <ActionCard
              icon={
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </Svg>
              }
              title="Medical History"
              subtitle="Track your health journey"
              onPress={onMedicalHistory}
              color="#10B981"
            />
            <ActionCard
              icon={
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </Svg>
              }
              title="Emergency Contacts"
              subtitle="Manage emergency information"
              onPress={onEmergencyContacts}
              color="#EF4444"
            />
            <ActionCard
              icon={
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2}>
                  <Circle cx="12" cy="12" r="3" />
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </Svg>
              }
              title="Settings"
              subtitle="App preferences and privacy"
              onPress={onSettings}
              color="#8B5CF6"
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Date Picker Calendar */}
      <CustomCalendar
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onDateSelect={handleCalendarDateSelect}
        selectedDate={selectedDate}
      />

      {/* Old Date Picker Modal - keeping for reference */}
      <Modal
        visible={false}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={[styles.modalContainer, { backgroundColor: colors.modalBackground }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Select Date of Birth</Text>
              <TouchableOpacity 
                style={[styles.modalCloseButton, { backgroundColor: colors.surface }]}
                onPress={() => setShowDatePicker(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={styles.datePickerContainer}>
              <Text style={[styles.datePickerTitle, { color: colors.text }]}>Select Date of Birth</Text>
              <Text style={[styles.datePickerSubtitle, { color: colors.textSecondary }]}>Tap on month, day, or year to change</Text>
              
              {/* Selected Date Display */}
              <View style={styles.selectedDateDisplay}>
                <Text style={styles.selectedDateText}>
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Text>
              </View>
              
              {/* Date Picker Rows */}
              <View style={styles.datePickerRows}>
                {/* First Row */}
              <View style={styles.datePickerRow}>
                <View style={styles.datePickerColumn}>
                    <TouchableOpacity 
                      style={[styles.dateDropdown, showMonthDropdown && styles.dateDropdownActive]}
                      onPress={() => {
                        closeAllDateDropdowns();
                        setShowMonthDropdown(!showMonthDropdown);
                      }}
                    >
                      <Text style={[styles.dateDropdownText, showMonthDropdown && styles.dateDropdownTextActive]}>
                        {new Date(2000, selectedDate.getMonth(), 1).toLocaleDateString('en', { month: 'long' })}
                      </Text>
                      <View style={[styles.dateDropdownUnderline, showMonthDropdown && styles.dateDropdownUnderlineActive]} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.datePickerColumn}>
                    <TouchableOpacity 
                      style={[styles.dateDropdown, showDayDropdown && styles.dateDropdownActive]}
                      onPress={() => {
                        closeAllDateDropdowns();
                        setShowDayDropdown(!showDayDropdown);
                      }}
                    >
                      <Text style={[styles.dateDropdownText, showDayDropdown && styles.dateDropdownTextActive]}>{selectedDate.getDate()}</Text>
                      <View style={[styles.dateDropdownUnderline, showDayDropdown && styles.dateDropdownUnderlineActive]} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.datePickerColumn}>
                    <TouchableOpacity 
                      style={[styles.dateDropdown, showYearDropdown && styles.dateDropdownActive]}
                      onPress={() => {
                        closeAllDateDropdowns();
                        setShowYearDropdown(!showYearDropdown);
                      }}
                    >
                      <Text style={[styles.dateDropdownText, showYearDropdown && styles.dateDropdownTextActive]}>{selectedDate.getFullYear()}</Text>
                      <View style={[styles.dateDropdownUnderline, showYearDropdown && styles.dateDropdownUnderlineActive]} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                {/* Second Row - Dropdown Options */}
                {showMonthDropdown && (
                  <View style={styles.datePickerRow}>
                    <View style={styles.datePickerColumn}>
                      <ScrollView style={styles.dropdownScrollView} showsVerticalScrollIndicator={false}>
                        <View style={styles.dropdownOptions}>
                    {Array.from({ length: 12 }, (_, i) => (
                            <TouchableOpacity
                        key={i} 
                              style={[
                                styles.dropdownOption,
                                i === selectedDate.getMonth() && styles.dropdownOptionSelected
                              ]}
                              onPress={() => {
                                handleDateChange('month', i);
                                setShowMonthDropdown(false);
                              }}
                            >
                              <Text style={[
                                styles.dropdownOptionText,
                                i === selectedDate.getMonth() && styles.dropdownOptionTextSelected
                              ]}>
                                {new Date(2000, i, 1).toLocaleDateString('en', { month: 'long' })}
                              </Text>
                            </TouchableOpacity>
                          ))}
                </View>
                      </ScrollView>
                    </View>
                    <View style={styles.datePickerColumn} />
                    <View style={styles.datePickerColumn} />
                  </View>
                )}
                
                {showDayDropdown && (
                  <View style={styles.datePickerRow}>
                    <View style={styles.datePickerColumn} />
                <View style={styles.datePickerColumn}>
                      <ScrollView style={styles.dropdownScrollView} showsVerticalScrollIndicator={false}>
                        <View style={styles.dropdownOptions}>
                          {Array.from({ length: getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth()) }, (_, i) => (
                            <TouchableOpacity
                              key={i + 1}
                              style={[
                                styles.dropdownOption,
                                (i + 1) === selectedDate.getDate() && styles.dropdownOptionSelected
                              ]}
                              onPress={() => {
                                handleDateChange('day', i + 1);
                                setShowDayDropdown(false);
                              }}
                            >
                              <Text style={[
                                styles.dropdownOptionText,
                                (i + 1) === selectedDate.getDate() && styles.dropdownOptionTextSelected
                              ]}>
                                {i + 1}
                              </Text>
                            </TouchableOpacity>
                          ))}
                </View>
                      </ScrollView>
                    </View>
                    <View style={styles.datePickerColumn} />
                  </View>
                )}
                
                {showYearDropdown && (
                  <View style={styles.datePickerRow}>
                    <View style={styles.datePickerColumn} />
                    <View style={styles.datePickerColumn} />
                <View style={styles.datePickerColumn}>
                      <ScrollView style={styles.dropdownScrollView} showsVerticalScrollIndicator={false}>
                        <View style={styles.dropdownOptions}>
                          {Array.from({ length: 50 }, (_, i) => {
                            const year = 2024 - i;
                            return (
                              <TouchableOpacity
                                key={year}
                                style={[
                                  styles.dropdownOption,
                                  year === selectedDate.getFullYear() && styles.dropdownOptionSelected
                                ]}
                                onPress={() => {
                                  handleDateChange('year', year);
                                  setShowYearDropdown(false);
                                }}
                              >
                                <Text style={[
                                  styles.dropdownOptionText,
                                  year === selectedDate.getFullYear() && styles.dropdownOptionTextSelected
                                ]}>
                                  {year}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                </View>
                      </ScrollView>
              </View>
            </View>
                )}
              </View>
            </View>
            <View style={styles.simpleDateActions}>
            <TouchableOpacity 
                style={styles.simpleCancelButton}
                onPress={() => {
                  // Reset to original date
                  const originalDate = new Date(1992, 2, 15); // March 15, 1992
                  setSelectedDate(originalDate);
                  setEditableInfo(prev => ({ ...prev, dateOfBirth: formatDate(originalDate) }));
                  closeAllDateDropdowns();
                  setShowDatePicker(false);
                }}
              >
                <Text style={styles.simpleCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.simpleConfirmButton}
                onPress={() => {
                  closeAllDateDropdowns();
                  setShowDatePicker(false);
                }}
              >
                <Text style={styles.simpleConfirmText}>Confirm</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Gender Picker Modal */}
      <Modal
        visible={showGenderPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGenderPicker(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowGenderPicker(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.pickerOption,
                    editableInfo.gender === option && styles.pickerOptionSelected
                  ]}
                  onPress={() => handleDropdownSelect('gender', option)}
                >
                  <Text style={[
                    styles.pickerOptionText,
                    editableInfo.gender === option && styles.pickerOptionTextSelected
                  ]}>
                    {option}
                  </Text>
                  {editableInfo.gender === option && (
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </Svg>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Blood Type Picker Modal */}
      <Modal
        visible={showBloodTypePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBloodTypePicker(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Blood Type</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowBloodTypePicker(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
              {bloodTypeOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.pickerOption,
                    editableInfo.bloodType === option && styles.pickerOptionSelected
                  ]}
                  onPress={() => handleDropdownSelect('bloodType', option)}
                >
                  <Text style={[
                    styles.pickerOptionText,
                    editableInfo.bloodType === option && styles.pickerOptionTextSelected
                  ]}>
                    {option}
                  </Text>
                  {editableInfo.bloodType === option && (
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </Svg>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Height Picker Modal */}
      <Modal
        visible={showHeightPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowHeightPicker(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Height</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowHeightPicker(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.pickerScrollContainer}>
              <View style={styles.pickerContainer}>
              {heightOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.pickerOption,
                      editableInfo.height === option && styles.pickerOptionSelected
                    ]}
                    onPress={() => handleDropdownSelect('height', option)}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      editableInfo.height === option && styles.pickerOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                    {editableInfo.height === option && (
                      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </Svg>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Weight Picker Modal */}
      <Modal
        visible={showWeightPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowWeightPicker(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Weight</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowWeightPicker(false)}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.pickerScrollContainer}>
              <View style={styles.pickerContainer}>
              {weightOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.pickerOption,
                      editableInfo.weight === option && styles.pickerOptionSelected
                    ]}
                    onPress={() => handleDropdownSelect('weight', option)}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      editableInfo.weight === option && styles.pickerOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                    {editableInfo.weight === option && (
                      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </Svg>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Image Options Modal */}
      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.imageOptionsModal, { backgroundColor: colors.background }]}>
            <Text style={[styles.imageOptionsTitle, { color: colors.text }]}>Change Profile Picture</Text>
            
            <TouchableOpacity
              style={[styles.imageOptionButton, { backgroundColor: colors.surface }]}
              onPress={handleImageFromCamera}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <Circle cx="12" cy="13" r="4" />
              </Svg>
              <Text style={[styles.imageOptionText, { color: colors.text }]}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.imageOptionButton, { backgroundColor: colors.surface }]}
              onPress={handleImageFromLibrary}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
              </Svg>
              <Text style={[styles.imageOptionText, { color: colors.text }]}>Choose from Library</Text>
            </TouchableOpacity>

            {editableInfo.profilePicture && (
              <TouchableOpacity
                style={[styles.imageOptionButton, styles.removeButton]}
                onPress={handleRemoveImage}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </Svg>
                <Text style={[styles.imageOptionText, { color: '#EF4444' }]}>Remove Photo</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.imageOptionButton, styles.imageCancelButton]}
              onPress={() => setShowImageOptions(false)}
            >
              <Text style={[styles.imageOptionText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        visible={showImagePreview}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelImageSelection}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.imagePreviewModal, { backgroundColor: colors.background }]}>
            <Text style={[styles.imagePreviewTitle, { color: colors.text }]}>Preview</Text>
            
            {tempImageUri && (
              <View style={styles.imagePreviewContainer}>
                <Image 
                  source={{ uri: tempImageUri }} 
                  style={styles.imagePreview}
                  resizeMode="cover"
                />
              </View>
            )}

            <View style={styles.imagePreviewActions}>
              <TouchableOpacity
                style={[styles.previewButton, styles.cancelPreviewButton]}
                onPress={cancelImageSelection}
              >
                <Text style={[styles.previewButtonText, { color: colors.textSecondary }]}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.previewButton, styles.confirmPreviewButton, { backgroundColor: colors.primary }]}
                onPress={confirmImageSelection}
              >
                <Text style={[styles.previewButtonText, { color: 'white' }]}>Use Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Bottom Navigation */}
      <BottomNav 
        active="profile" 
        onHome={onHome} 
        onNotifications={onNotifications} 
        onProfile={onProfile} 
      />
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
    paddingHorizontal: 24,
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
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  editActions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  profileItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  profileValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'left',
    fontFamily: 'ReadexPro-Medium',
  },
  profileInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    paddingVertical: 4,
    minWidth: 120,
    fontFamily: 'ReadexPro-Medium',
  },
  profileArrow: {
    marginLeft: 8,
  },
  profileSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 120,
  },
  profileSelectorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
    textAlign: 'left',
    fontFamily: 'ReadexPro-Medium',
  },
  actionsContainer: {
    gap: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
  // Modal Styles
  modalOverlayBottom: {
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
    minHeight: '60%',
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
  modalConfirmButton: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  picker: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  pickerScrollContainer: {
    maxHeight: 300,
  },
  pickerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  pickerOptionSelected: {
    backgroundColor: '#EBF4FF',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  pickerOptionTextSelected: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  // Date Picker Styles
  datePickerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    flex: 1,
  },
  datePickerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
    textAlign: 'center',
  },
  datePickerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'ReadexPro-Medium',
  },
  selectedDateDisplay: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3B82F6',
    textAlign: 'center',
    fontFamily: 'ReadexPro-Medium',
  },
  datePickerRows: {
    minHeight: 120,
  },
  dateDropdown: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    marginHorizontal: 4,
  },
  dateDropdownActive: {
    backgroundColor: '#EBF4FF',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  dateDropdownText: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '600',
    marginBottom: 8,
  },
  dateDropdownTextActive: {
    color: '#3B82F6',
  },
  dateDropdownUnderline: {
    height: 2,
    backgroundColor: '#D1D5DB',
    width: '100%',
  },
  dateDropdownUnderlineActive: {
    backgroundColor: '#3B82F6',
  },
  dropdownScrollView: {
    maxHeight: 150,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownOptions: {
    paddingTop: 8,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownOptionSelected: {
    backgroundColor: '#EBF4FF',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontFamily: 'ReadexPro-Medium',
  },
  dropdownOptionTextSelected: {
    color: '#374151',
    fontWeight: '600',
  },
  datePickerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  datePickerColumn: {
    flex: 1,
  },
  datePickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'ReadexPro-Medium',
  },
  datePicker: {
    height: 150,
  },
  datePickerActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  datePickerCancelButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
  },
  datePickerCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  datePickerConfirmButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    gap: 8,
  },
  datePickerConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  simpleDateActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  simpleCancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  simpleCancelText: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  simpleConfirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  simpleConfirmText: {
    fontSize: 16,
    color: '#3B82F6',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOptionsModal: {
    width: '80%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  imageOptionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    fontFamily: 'ReadexPro-Medium',
  },
  imageOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  imageOptionText: {
    fontSize: 16,
    marginLeft: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  removeButton: {
    backgroundColor: '#FEF2F2',
  },
  imageCancelButton: {
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  imagePreviewModal: {
    width: '90%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  imagePreviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    fontFamily: 'ReadexPro-Medium',
  },
  imagePreviewContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 24,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imagePreviewActions: {
    flexDirection: 'row',
    gap: 16,
  },
  previewButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelPreviewButton: {
    backgroundColor: 'transparent',
  },
  confirmPreviewButton: {
    // backgroundColor set dynamically
  },
  previewButtonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'ReadexPro-Medium',
  },
});

export default ProfileScreen;
