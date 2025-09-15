import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/SupabaseAuthContext';

interface SettingsScreenProps {
  onBack: () => void;
  onProfile: () => void;
  onNotifications: () => void;
  onPrivacy: () => void;
  onHelp: () => void;
  onAbout: () => void;
  onSubscription: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  onProfile,
  onNotifications,
  onPrivacy,
  onHelp,
  onAbout,
  onSubscription
}) => {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const { signOut } = useAuth();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [medicationReminders, setMedicationReminders] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              // Navigate to onboarding screen after sign out
              router.replace('/onboarding');
            } catch (error) {
              console.error('Sign out error:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true, 
    rightComponent 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.card }]} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightComponent}
        {showArrow && !rightComponent && (
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </Svg>
        )}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>{title}</Text>
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <SectionHeader title="Account" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <Circle cx="12" cy="7" r="4" />
              </Svg>
            }
            title="Profile"
            subtitle="Manage your personal information"
            onPress={onProfile}
          />
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </Svg>
            }
            title="Privacy & Security"
            subtitle="Control your data and security settings"
            onPress={onPrivacy}
          />
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </Svg>
            }
            title="Biometric Authentication"
            subtitle="Use fingerprint or face ID to unlock"
            showArrow={false}
            rightComponent={
              <Switch
                value={biometricAuth}
                onValueChange={setBiometricAuth}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={biometricAuth ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
        </View>

        {/* Notifications Section */}
        <SectionHeader title="Notifications" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5 5v-5z" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              </Svg>
            }
            title="Push Notifications"
            subtitle="Receive notifications on your device"
            showArrow={false}
            rightComponent={
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={pushNotifications ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </Svg>
            }
            title="Email Notifications"
            subtitle="Get updates via email"
            showArrow={false}
            rightComponent={
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={emailNotifications ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth={2}>
                <Circle cx="12" cy="12" r="3" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
              </Svg>
            }
            title="Medication Reminders"
            subtitle="Never miss your medications"
            showArrow={false}
            rightComponent={
              <Switch
                value={medicationReminders}
                onValueChange={setMedicationReminders}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={medicationReminders ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth={2}>
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth={2}>
                  <Circle cx="12" cy="12" r="10" />
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </Svg>
              </Svg>
            }
            title="Appointment Reminders"
            subtitle="Get notified about upcoming appointments"
            showArrow={false}
            rightComponent={
              <Switch
                value={appointmentReminders}
                onValueChange={setAppointmentReminders}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={appointmentReminders ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
        </View>

        {/* App Preferences Section */}
        <SectionHeader title="App Preferences" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth={2}>
                <Circle cx="12" cy="12" r="5" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </Svg>
            }
            title="Dark Mode"
            subtitle="Switch to dark theme"
            showArrow={false}
            rightComponent={
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4v16a2 2 0 002 2h6a2 2 0 002-2V4M11 9h2M11 13h2" />
              </Svg>
            }
            title="Data Sharing"
            subtitle="Share anonymized data for research"
            showArrow={false}
            rightComponent={
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={dataSharing ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9 9l3 3 3-3" />
              </Svg>
            }
            title="Connected Devices"
            subtitle="Manage your connected health devices"
            onPress={() => router.push('/connected-devices')}
          />
        </View>

        {/* Subscription Section */}
        <SectionHeader title="Subscription" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </Svg>
            }
            title="Manage Subscription"
            subtitle="View and manage your YouDoc Pro subscription"
            onPress={onSubscription}
          />
        </View>

        {/* Support Section */}
        <SectionHeader title="Support" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#14B8A6" strokeWidth={2}>
                <Circle cx="12" cy="12" r="10" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01" />
              </Svg>
            }
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={onHelp}
          />
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth={2}>
                <Circle cx="12" cy="12" r="10" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
              </Svg>
            }
            title="About YouDoc"
            subtitle="Version 1.0.0"
            onPress={onAbout}
          />
        </View>

        {/* Danger Zone */}
        <SectionHeader title="Account" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m0 14v-5a2 2 0 00-2-2H3m14 0a2 2 0 012 2v5a2 2 0 01-2 2h-4m0-14V3a2 2 0 012-2h4a2 2 0 012 2v4" />
              </Svg>
            }
            title="Sign Out"
            subtitle="Sign out of your account"
            onPress={handleSignOut}
          />
          <SettingItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </Svg>
            }
            title="Delete Account"
            subtitle="Permanently delete your account"
            onPress={() => {
              // Handle account deletion
              console.log('Delete account');
            }}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 32,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'ReadexPro-Medium',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
    fontFamily: 'ReadexPro-Medium',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default SettingsScreen;

