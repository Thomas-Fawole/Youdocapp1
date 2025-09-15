import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, Modal } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface AddDeviceScreenProps {
  onBack: () => void;
  onDeviceAdded: (device: any) => void;
}

const AddDeviceScreenContent: React.FC<AddDeviceScreenProps> = ({ onBack, onDeviceAdded }) => {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [connectingDevice, setConnectingDevice] = useState<number | null>(null);
  const [searchingDevices, setSearchingDevices] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [selectedDeviceForGuide, setSelectedDeviceForGuide] = useState<any>(null);

  // Available device categories
  const categories = [
    { id: 'all', name: 'All Devices', icon: '📱' },
    { id: 'fitness', name: 'Fitness Trackers', icon: '🏃‍♂️' },
    { id: 'smartwatch', name: 'Smartwatches', icon: '⌚' },
    { id: 'health', name: 'Health Monitors', icon: '🩺' },
    { id: 'scale', name: 'Smart Scales', icon: '⚖️' }
  ];

  // Available devices to connect
  const availableDevices = [
    {
      id: 1,
      name: 'Apple Watch Series 9',
      brand: 'Apple',
      category: 'smartwatch',
      icon: '⌚',
      features: ['Heart Rate', 'ECG', 'Blood Oxygen', 'Steps', 'Sleep', 'Workouts'],
      compatibility: 'iOS',
      batteryLife: '18 hours',
      description: 'Advanced health and fitness tracking with ECG and blood oxygen monitoring.',
      setupSteps: [
        'Open the Apple Watch app on your iPhone',
        'Tap "Start Pairing" and hold your iPhone near the watch',
        'Follow the on-screen instructions to complete setup',
        'Enable health data sharing when prompted'
      ]
    },
    {
      id: 2,
      name: 'Fitbit Charge 6',
      brand: 'Fitbit',
      category: 'fitness',
      icon: '📱',
      features: ['Heart Rate', 'GPS', 'Sleep Score', 'Stress Management', 'Steps'],
      compatibility: 'iOS & Android',
      batteryLife: '7 days',

      description: 'All-day fitness tracker with built-in GPS and health insights.',

      setupSteps: [
        'Download the Fitbit app on your phone',
        'Create a Fitbit account or sign in',
        'Tap "Set Up a Device" and select Charge 6',
        'Follow the pairing instructions and sync your data'
      ]
    },
    {
      id: 3,
      name: 'Samsung Galaxy Watch6',
      brand: 'Samsung',
      category: 'smartwatch',
      icon: '⌚',
      features: ['Heart Rate', 'Body Composition', 'Sleep', 'Blood Pressure', 'ECG'],
      compatibility: 'Android',
      batteryLife: '40 hours',

      description: 'Comprehensive health monitoring with body composition analysis.',

    },
    {
      id: 4,
      name: 'Omron HeartGuide',
      brand: 'Omron',
      category: 'health',
      icon: '🩺',
      features: ['Blood Pressure', 'Heart Rate', 'Steps', 'Sleep'],
      compatibility: 'iOS & Android',
      batteryLife: '2-3 days',

      description: 'Clinically accurate blood pressure monitoring on your wrist.',

    },
    {
      id: 5,
      name: 'Withings Body Cardio',
      brand: 'Withings',
      category: 'scale',
      icon: '⚖️',
      features: ['Weight', 'BMI', 'Body Fat', 'Muscle Mass', 'Heart Rate'],
      compatibility: 'iOS & Android',
      batteryLife: '18 months',

      description: 'Smart scale with comprehensive body composition analysis.',

    },
    {
      id: 6,
      name: 'Garmin Venu 3',
      brand: 'Garmin',
      category: 'smartwatch',
      icon: '⌚',
      features: ['GPS', 'Heart Rate', 'Sleep Coach', 'Stress', 'Body Battery'],
      compatibility: 'iOS & Android',
      batteryLife: '14 days',

      description: 'GPS smartwatch with advanced health and fitness features.',

    },
    {
      id: 7,
      name: 'WHOOP 4.0',
      brand: 'WHOOP',
      category: 'fitness',
      icon: '📱',
      features: ['Heart Rate', 'HRV', 'Recovery', 'Strain', 'Sleep'],
      compatibility: 'iOS & Android',
      batteryLife: '5 days',

      description: '24/7 health and fitness monitoring with personalized coaching.',

    },
    {
      id: 8,
      name: 'Oura Ring Gen3',
      brand: 'Oura',
      category: 'fitness',
      icon: '💍',
      features: ['Heart Rate', 'HRV', 'Temperature', 'Sleep', 'Activity'],
      compatibility: 'iOS & Android',
      batteryLife: '7 days',

      description: 'Discreet health tracking ring with advanced sleep analysis.',

    }
  ];

  const filteredDevices = selectedCategory === 'all' 
    ? availableDevices 
    : availableDevices.filter(device => device.category === selectedCategory);

  const handleConnectDevice = async (device: any) => {
    setConnectingDevice(device.id);
    
    // Simulate connection process
    try {
      // Show connecting state for 2-3 seconds
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Create new connected device
      const newDevice = {
        id: Date.now(), // Use timestamp as unique ID
        name: device.name,
        type: device.category.charAt(0).toUpperCase() + device.category.slice(1),
        status: 'connected',
        lastSync: 'Just now',
        batteryLevel: Math.floor(Math.random() * 100) + 1,
        icon: device.icon,
        features: device.features
      };

      onDeviceAdded(newDevice);
      
      Alert.alert(
        'Device Connected!',
        `${device.name} has been successfully connected to your YouDoc account.`,
        [
          { text: 'OK', onPress: () => onBack() }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Connection Failed',
        `Unable to connect ${device.name}. Please make sure the device is nearby and in pairing mode.`,
        [{ text: 'Try Again' }]
      );
    } finally {
      setConnectingDevice(null);
    }
  };

  const handleSearchDevices = async () => {
    setSearchingDevices(true);
    
    // Simulate device search
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setSearchingDevices(false);
    Alert.alert(
      'Search Complete',
      'Found all available devices in your area. Make sure your devices are in pairing mode for best results.',
      [{ text: 'OK' }]
    );
  };

  const handleShowSetupGuide = (device: any) => {
    setSelectedDeviceForGuide(device);
    setShowSetupGuide(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Device</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Search Devices Button */}
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearchDevices}
            disabled={searchingDevices}
          >
            <View style={styles.searchButtonContent}>
              {searchingDevices ? (
                <ActivityIndicator size="small" color="#3B82F6" />
              ) : (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                  <Circle cx="11" cy="11" r="8"/>
                  <Path d="M21 21l-4.35-4.35"/>
                </Svg>
              )}
              <Text style={styles.searchButtonText}>
                {searchingDevices ? 'Searching for devices...' : 'Search for nearby devices'}
              </Text>
            </View>
            <Text style={styles.searchButtonSubtext}>
              Make sure your device is in pairing mode
            </Text>
          </TouchableOpacity>

          {/* Category Filter */}
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>Device Categories</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Available Devices */}
          <View style={styles.devicesSection}>
            <Text style={styles.sectionTitle}>
              Available Devices ({filteredDevices.length})
            </Text>
            
            {filteredDevices.map((device) => (
              <View key={device.id} style={styles.deviceCard}>
                
                <View style={styles.deviceHeader}>
                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceEmoji}>{device.icon}</Text>
                    <View style={styles.deviceDetails}>
                      <Text style={styles.deviceName}>{device.name}</Text>
                      <Text style={styles.deviceBrand}>{device.brand}</Text>
                    </View>
                  </View>

                </View>

                <Text style={styles.deviceDescription}>{device.description}</Text>

                {/* Device Specs */}
                <View style={styles.deviceSpecs}>
                  <View style={styles.specItem}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </Svg>
                    <Text style={styles.specText}>{device.compatibility}</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                      <Rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
                      <Path d="M23 13v-2"/>
                    </Svg>
                    <Text style={styles.specText}>{device.batteryLife}</Text>
                  </View>
                </View>

                {/* Features */}
                <View style={styles.featuresSection}>
                  <Text style={styles.featuresTitle}>Features:</Text>
                  <View style={styles.featuresList}>
                    {device.features.map((feature, index) => (
                      <View key={index} style={styles.featureTag}>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.setupGuideButton}
                    onPress={() => handleShowSetupGuide(device)}
                  >
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                      <Circle cx="12" cy="12" r="10"/>
                      <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <Path d="M12 17h.01"/>
                    </Svg>
                    <Text style={styles.setupGuideText}>Setup Guide</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.connectButton,
                      connectingDevice === device.id && styles.connectButtonConnecting
                    ]}
                    onPress={() => handleConnectDevice(device)}
                    disabled={connectingDevice === device.id}
                  >
                    {connectingDevice === device.id ? (
                      <View style={styles.connectingContent}>
                        <ActivityIndicator size="small" color="#FFFFFF" />
                        <Text style={styles.connectButtonText}>Connecting...</Text>
                      </View>
                    ) : (
                      <>
                        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.background} strokeWidth={2}>
                          <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </Svg>
                        <Text style={styles.connectButtonText}>Connect Device</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Setup Guide Modal */}
        <Modal
          visible={showSetupGuide}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowSetupGuide(false)}
        >
          <View style={styles.setupModal}>
            {/* Modal Header */}
            <View style={styles.setupHeader}>
              <Text style={styles.setupTitle}>
                Setup Guide: {selectedDeviceForGuide?.name}
              </Text>
              <TouchableOpacity
                style={styles.setupCloseButton}
                onPress={() => setShowSetupGuide(false)}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.setupContent} showsVerticalScrollIndicator={false}>
              {/* Device Info */}
              <View style={styles.setupDeviceInfo}>
                <Text style={styles.setupDeviceEmoji}>{selectedDeviceForGuide?.icon}</Text>
                <View style={styles.setupDeviceDetails}>
                  <Text style={styles.setupDeviceName}>{selectedDeviceForGuide?.name}</Text>
                  <Text style={styles.setupDeviceBrand}>{selectedDeviceForGuide?.brand}</Text>
                </View>
              </View>

              {/* Setup Steps */}
              <View style={styles.setupStepsSection}>
                <Text style={styles.setupStepsTitle}>Follow these steps to connect your device:</Text>
                {selectedDeviceForGuide?.setupSteps?.map((step: string, index: number) => (
                  <View key={index} style={styles.setupStep}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>

              {/* Troubleshooting */}
              <View style={styles.troubleshootingSection}>
                <Text style={styles.troubleshootingTitle}>Troubleshooting Tips</Text>
                <View style={styles.troubleshootingTip}>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.warning} strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </Svg>
                  <Text style={styles.troubleshootingText}>
                    Make sure your device is charged and within 3 feet of your phone
                  </Text>
                </View>
                <View style={styles.troubleshootingTip}>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.warning} strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </Svg>
                  <Text style={styles.troubleshootingText}>
                    Restart your phone's Bluetooth if the device isn't found
                  </Text>
                </View>
                <View style={styles.troubleshootingTip}>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.warning} strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </Svg>
                  <Text style={styles.troubleshootingText}>
                    Check that location services are enabled for the companion app
                  </Text>
                </View>
              </View>

              {/* Connect Button in Modal */}
              <TouchableOpacity
                style={styles.modalConnectButton}
                onPress={() => {
                  setShowSetupGuide(false);
                  handleConnectDevice(selectedDeviceForGuide);
                }}
              >
                <Text style={styles.modalConnectButtonText}>Start Connection Process</Text>
              </TouchableOpacity>

              <View style={styles.bottomSpacing} />
            </ScrollView>
          </View>
        </Modal>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  searchButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  searchButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  searchButtonSubtext: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  categorySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  categoryScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
  },
  categoryButtonActive: {
    backgroundColor: '#EBF4FF',
    borderColor: '#3B82F6',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'ReadexPro-Medium',
  },
  categoryTextActive: {
    color: '#3B82F6',
  },
  devicesSection: {
    marginBottom: 24,
  },
  deviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },

  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
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
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  deviceBrand: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },


  deviceDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  deviceSpecs: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  specText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    fontFamily: 'ReadexPro-Medium',
  },
  featuresSection: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#3B82F6',
    fontFamily: 'ReadexPro-Medium',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  setupGuideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    gap: 6,
  },
  setupGuideText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
    fontFamily: 'ReadexPro-Medium',
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    flex: 2,
    gap: 8,
  },
  connectButtonConnecting: {
    backgroundColor: '#6B7280',
  },
  connectingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'ReadexPro-Medium',
  },
  bottomSpacing: {
    height: 40,
  },
  // Setup Modal Styles
  setupModal: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  setupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  setupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    flex: 1,
    marginRight: 16,
  },
  setupCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setupContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  setupDeviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
  },
  setupDeviceEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  setupDeviceDetails: {
    flex: 1,
  },
  setupDeviceName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  setupDeviceBrand: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  setupStepsSection: {
    marginBottom: 32,
  },
  setupStepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  setupStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'ReadexPro-Medium',
  },
  stepText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    flex: 1,
    fontFamily: 'ReadexPro-Medium',
  },
  troubleshootingSection: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  troubleshootingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  troubleshootingTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  troubleshootingText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    flex: 1,
    marginLeft: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  modalConnectButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalConnectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'ReadexPro-Medium',
  },
});

const AddDeviceScreen: React.FC<AddDeviceScreenProps> = (props) => {
  return <AddDeviceScreenContent {...props} />;
};

export default AddDeviceScreen;
