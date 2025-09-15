import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface ConnectedDevicesScreenProps {
  onBack: () => void;
}

const ConnectedDevicesScreenContent: React.FC<ConnectedDevicesScreenProps> = ({ onBack }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  // Connected Devices Data
  const [connectedDevices, setConnectedDevices] = useState([
    {
      id: 1,
      name: 'Apple Watch Series 9',
      type: 'Smartwatch',
      status: 'connected',
      lastSync: '2 minutes ago',
      batteryLevel: 78,
      icon: '⌚',
      features: ['Heart Rate', 'Steps', 'Sleep', 'Workouts']
    },
    {
      id: 2,
      name: 'Fitbit Charge 6',
      type: 'Fitness Tracker',
      status: 'connected',
      lastSync: '15 minutes ago',
      batteryLevel: 45,
      icon: '📱',
      features: ['Steps', 'Sleep', 'Heart Rate']
    },
    {
      id: 3,
      name: 'Omron Blood Pressure Monitor',
      type: 'Blood Pressure Monitor',
      status: 'disconnected',
      lastSync: '2 days ago',
      batteryLevel: null,
      icon: '🩺',
      features: ['Blood Pressure', 'Pulse']
    },
    {
      id: 4,
      name: 'Withings Body+ Scale',
      type: 'Smart Scale',
      status: 'connected',
      lastSync: '1 hour ago',
      batteryLevel: 92,
      icon: '⚖️',
      features: ['Weight', 'BMI', 'Body Fat']
    }
  ]);

  const handleDeviceToggle = (deviceId: number) => {
    setConnectedDevices(prev => 
      prev.map(device => 
        device.id === deviceId 
          ? { ...device, status: device.status === 'connected' ? 'disconnected' : 'connected' }
          : device
      )
    );
  };

  const handleRemoveDevice = (deviceId: number, deviceName: string) => {
    Alert.alert(
      'Remove Device',
      `Are you sure you want to remove ${deviceName} from your connected devices?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setConnectedDevices(prev => prev.filter(device => device.id !== deviceId));
            Alert.alert('Device Removed', `${deviceName} has been removed from your account.`);
          }
        }
      ]
    );
  };

  const handleAddNewDevice = () => {
    router.push('/add-device');
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Connected Devices</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Add New Device Button */}
          <TouchableOpacity 
            style={[styles.addDeviceButton, { backgroundColor: colors.surface, borderColor: colors.primary, borderWidth: 2, borderStyle: 'solid' }]}
            onPress={handleAddNewDevice}
          >
            <View style={styles.addDeviceIcon}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </Svg>
            </View>
            <View style={styles.addDeviceTextContainer}>
              <Text style={[styles.addDeviceTitle, { color: colors.text }]}>Add New Device</Text>
              <Text style={[styles.addDeviceSubtitle, { color: colors.textSecondary }]}>Connect a new health device to your account</Text>
            </View>
          </TouchableOpacity>

          {/* Connected Devices List */}
          <View style={styles.devicesSection}>
            <Text style={styles.devicesSectionTitle}>Your Devices ({connectedDevices.length})</Text>
            {connectedDevices.map((device) => (
              <View key={device.id} style={styles.deviceCard}>
                <View style={styles.deviceCardHeader}>
                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceEmoji}>{device.icon}</Text>
                    <View style={styles.deviceDetails}>
                      <Text style={styles.deviceName}>{device.name}</Text>
                      <Text style={styles.deviceType}>{device.type}</Text>
                    </View>
                  </View>
                  <View style={styles.deviceActions}>
                    <Switch
                      value={device.status === 'connected'}
                      onValueChange={() => handleDeviceToggle(device.id)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={colors.background}
                    />
                  </View>
                </View>

                {/* Device Status */}
                <View style={styles.deviceStatus}>
                  <View style={styles.statusRow}>
                    <View style={styles.statusItem}>
                      <View style={[styles.statusDot, { backgroundColor: device.status === 'connected' ? colors.success : colors.error }]} />
                      <Text style={styles.statusText}>
                        {device.status === 'connected' ? 'Connected' : 'Disconnected'}
                      </Text>
                    </View>
                    <Text style={styles.lastSync}>Last sync: {device.lastSync}</Text>
                  </View>
                  {device.batteryLevel && (
                    <View style={styles.batteryRow}>
                      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                        <Rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
                        <Path d="M23 13v-2"/>
                      </Svg>
                      <Text style={styles.batteryText}>{device.batteryLevel}%</Text>
                    </View>
                  )}
                </View>

                {/* Features */}
                <View style={styles.deviceFeatures}>
                  <Text style={styles.featuresTitle}>Features:</Text>
                  <View style={styles.featuresList}>
                    {device.features.map((feature, index) => (
                      <View key={index} style={[styles.featureTag, { backgroundColor: colors.primary }]}>
                        <Text style={[styles.featureText, { color: '#ffffff' }]}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Remove Device Button */}
                <TouchableOpacity
                  style={[styles.removeDeviceButton, { backgroundColor: colors.primary, borderColor: colors.primary }]}
                  onPress={() => handleRemoveDevice(device.id, device.name)}
                >
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </Svg>
                  <Text style={[styles.removeDeviceText, { color: '#ffffff' }]}>Remove Device</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  addDeviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  addDeviceTextContainer: {
    flex: 1,
  },
  addDeviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  addDeviceSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  devicesSection: {
    marginTop: 8,
  },
  devicesSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  deviceCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  deviceType: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  deviceActions: {
    alignItems: 'center',
  },
  deviceStatus: {
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  lastSync: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  batteryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
    fontFamily: 'ReadexPro-Medium',
  },
  deviceFeatures: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featureText: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: 'ReadexPro-Medium',
  },
  removeDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    backgroundColor: colors.surface,
  },
  removeDeviceText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.error,
    marginLeft: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
});

const ConnectedDevicesScreen: React.FC<ConnectedDevicesScreenProps> = (props) => {
  return <ConnectedDevicesScreenContent {...props} />;
};

export default ConnectedDevicesScreen;
