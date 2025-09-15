import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, SafeAreaView } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { router } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

interface PrivacyScreenProps {
  onBack: () => void;
}

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  const { colors } = useTheme();
  const [locationTracking, setLocationTracking] = useState(false);
  const [healthDataSharing, setHealthDataSharing] = useState(true);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [thirdPartySharing, setThirdPartySharing] = useState(false);

  const [dataRetention, setDataRetention] = useState('2_years');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('15_minutes');

  const PrivacyItem = ({ 
    icon, 
    title, 
    subtitle, 
    value,
    onValueChange,
    showSwitch = true,
    onPress,
    rightText
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    showSwitch?: boolean;
    onPress?: () => void;
    rightText?: string;
  }) => (
    <TouchableOpacity style={[styles.privacyItem, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={onPress}>
      <View style={styles.privacyLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.privacyTextContainer}>
          <Text style={[styles.privacyTitle, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.privacySubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.privacyRight}>
        {showSwitch && value !== undefined && onValueChange ? (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
            thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
          />
        ) : rightText ? (
          <View style={styles.rightTextContainer}>
            <Text style={[styles.rightText, { color: colors.textSecondary }]}>{rightText}</Text>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </Svg>
          </View>
        ) : (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </Svg>
        )}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>{title.toUpperCase()}</Text>
      {subtitle && <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
    </View>
  );

  const handleDataRetentionPress = () => {
    Alert.alert(
      'Data Retention Period',
      'Choose how long your data is stored',
      [
        { text: '1 Year', onPress: () => setDataRetention('1_year') },
        { text: '2 Years', onPress: () => setDataRetention('2_years') },
        { text: '5 Years', onPress: () => setDataRetention('5_years') },
        { text: 'Forever', onPress: () => setDataRetention('forever') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSessionTimeoutPress = () => {
    Alert.alert(
      'Session Timeout',
      'Choose when your session expires',
      [
        { text: '5 Minutes', onPress: () => setSessionTimeout('5_minutes') },
        { text: '15 Minutes', onPress: () => setSessionTimeout('15_minutes') },
        { text: '30 Minutes', onPress: () => setSessionTimeout('30_minutes') },
        { text: '1 Hour', onPress: () => setSessionTimeout('1_hour') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Your Data',
      'We will prepare your data for download and send you an email when ready.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting data...') }
      ]
    );
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all your health data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Confirmation Required', 'Are you absolutely sure? This cannot be undone.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Yes, Delete Everything', style: 'destructive', onPress: () => console.log('Deleting all data...') }
            ]);
          }
        }
      ]
    );
  };

  const getDataRetentionText = () => {
    switch (dataRetention) {
      case '1_year': return '1 Year';
      case '2_years': return '2 Years';
      case '5_years': return '5 Years';
      case 'forever': return 'Forever';
      default: return '2 Years';
    }
  };

  const getSessionTimeoutText = () => {
    switch (sessionTimeout) {
      case '5_minutes': return '5 Minutes';
      case '15_minutes': return '15 Minutes';
      case '30_minutes': return '30 Minutes';
      case '1_hour': return '1 Hour';
      default: return '15 Minutes';
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
              <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
                  <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={onBack}>
                      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
                  <Text style={[styles.headerTitle, { color: colors.text }]}>Privacy & Security</Text>
        <View style={styles.placeholder} />
      </View>

              <ScrollView style={[styles.scrollContainer, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        {/* Privacy Notice */}
        <View style={styles.noticeContainer}>
          <View style={styles.noticeIcon}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </Svg>
          </View>
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Your Privacy Matters</Text>
            <Text style={styles.noticeText}>
              We're committed to protecting your health data with industry-leading security measures and transparent privacy controls.
            </Text>
          </View>
        </View>

        {/* Data Privacy Section */}
        <SectionHeader 
          title="Data Privacy" 
          subtitle="Control how your health data is used and shared"
        />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </Svg>
            }
            title="Location Tracking"
            subtitle="Allow app to access your location for nearby services"
            value={locationTracking}
            onValueChange={setLocationTracking}
          />
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </Svg>
            }
            title="Health Data Sharing"
            subtitle="Share anonymized health data for medical research"
            value={healthDataSharing}
            onValueChange={setHealthDataSharing}
          />
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </Svg>
            }
            title="Analytics & Insights"
            subtitle="Help improve the app with usage analytics"
            value={analyticsOptIn}
            onValueChange={setAnalyticsOptIn}
          />
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </Svg>
            }
            title="Marketing Communications"
            subtitle="Receive promotional emails and health tips"
            value={marketingEmails}
            onValueChange={setMarketingEmails}
          />
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </Svg>
            }
            title="Third-Party Sharing"
            subtitle="Share data with trusted healthcare partners"
            value={thirdPartySharing}
            onValueChange={setThirdPartySharing}
          />
        </View>

        {/* Security Section */}
        <SectionHeader 
          title="Security Settings" 
          subtitle="Protect your account with advanced security features"
        />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </Svg>
            }
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of security to your account"
            value={twoFactorAuth}
            onValueChange={setTwoFactorAuth}
          />

          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2}>
                <Circle cx="12" cy="12" r="10" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </Svg>
            }
            title="Session Timeout"
            subtitle="Automatically sign out after inactivity"
            showSwitch={false}
            onPress={handleSessionTimeoutPress}
            rightText={getSessionTimeoutText()}
          />
        </View>

        {/* Data Management Section */}
        <SectionHeader 
          title="Data Management" 
          subtitle="Control your data retention and access rights"
        />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1M8 7h8m-8 0v10a2 2 0 002 2h4a2 2 0 002-2V7" />
              </Svg>
            }
            title="Data Retention Period"
            subtitle="How long your data is stored on our servers"
            showSwitch={false}
            onPress={handleDataRetentionPress}
            rightText={getDataRetentionText()}
          />
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </Svg>
            }
            title="Export Your Data"
            subtitle="Download a copy of all your health data"
            showSwitch={false}
            onPress={handleExportData}
          />
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </Svg>
            }
            title="Delete All Data"
            subtitle="Permanently remove all your data from our servers"
            showSwitch={false}
            onPress={handleDeleteData}
          />
        </View>

        {/* Legal Section */}
        <SectionHeader 
          title="Legal & Compliance" 
          subtitle="Review our policies and your rights"
        />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </Svg>
            }
            title="Privacy Policy"
            subtitle="Read our complete privacy policy"
            showSwitch={false}
            onPress={() => router.push('/privacy-policy')}
          />
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </Svg>
            }
            title="Terms of Service"
            subtitle="Review our terms and conditions"
            showSwitch={false}
            onPress={() => router.push('/terms-of-service')}
          />
          <PrivacyItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </Svg>
            }
            title="HIPAA Compliance"
            subtitle="Learn about our healthcare data protection"
            showSwitch={false}
            onPress={() => router.push('/hipaa-compliance')}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  noticeContainer: {
    flexDirection: 'row',
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  noticeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 14,
    color: '#1E40AF',
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 20,
  },
  sectionHeaderContainer: {
    marginTop: 32,
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  privacyLeft: {
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
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
    fontFamily: 'ReadexPro-Medium',
  },
  privacySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  privacyRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default PrivacyScreen;
