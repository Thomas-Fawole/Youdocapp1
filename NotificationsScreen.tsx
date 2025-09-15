import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import BottomNav from './ui/BottomNav';
import { useTheme } from '../contexts/ThemeContext';
import { useMedication } from '../contexts/MedicationContext';
import { getMedicationIcon } from '../utils/medicationIcons';

interface NotificationsScreenProps {
  onBack: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ 
  onBack, 
  onHome, 
  onNotifications, 
  onProfile 
}) => {
  const { colors } = useTheme();
  const { medications } = useMedication();
  
  // Generate medication notifications from actual medications
  const medicationNotifications = medications.filter(med => !med.taken).map((med, index) => ({
    id: `med-${med.id}`,
    type: 'medication',
    title: 'Medication Reminder',
    subtitle: `Time to take ${med.name} (${med.times[0] || '8:00 AM'})`,
    time: 'Just now',
    color: '#4F8EF7',
    medication: med,
    icon: getMedicationIcon({ type: med.type, size: 16, showBackground: false })
  }));

  const notifications = [
    ...medicationNotifications,
    {
      id: 2,
      type: 'health_tip',
      title: 'New Health Tip',
      subtitle: '5 Ways to Manage Stress Daily',
      time: '1h ago',
      color: '#10B981',
      icon: (
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </Svg>
      )
    },
    {
      id: 3,
      type: 'sync',
      title: 'Sync Complete',
      subtitle: 'Apple Watch data synced successfu...',
      time: 'Yesterday',
      color: '#8B5CF6',
      icon: (
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </Svg>
      )
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: colors.surface }]}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={[styles.content, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        <View style={styles.notificationsList}>
          {notifications.map((notification) => (
            <TouchableOpacity key={notification.id} style={[styles.notificationCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.notificationIcon, { backgroundColor: notification.color + '20' }]}>
                {notification.icon}
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={[styles.notificationTitle, { color: colors.text }]}>{notification.title}</Text>
                  <Text style={[styles.notificationTime, { color: colors.textSecondary }]}>{notification.time}</Text>
                </View>
                <Text style={[styles.notificationSubtitle, { color: colors.textSecondary }]}>{notification.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNav active="notifications" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
    fontFamily: 'ReadexPro-Medium',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingBottom: 96,
  },
  notificationsList: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    fontFamily: 'ReadexPro-Medium',
  },
  notificationTime: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontFamily: 'ReadexPro-Medium',
  },
});

export default NotificationsScreen;
