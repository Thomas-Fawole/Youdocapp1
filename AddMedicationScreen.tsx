import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme, getButtonStyle } from '../contexts/ThemeContext';
import { useMedication } from '../contexts/MedicationContext';
import CustomCalendar from './ui/CustomCalendar';
import BottomNav from './ui/BottomNav';

interface AddMedicationScreenProps {
  onBack: () => void;
  onSave: (medication: any) => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

interface MedicationForm {
  name: string;
  type: 'pill' | 'injection' | 'drops' | 'inhaler' | 'cream' | 'spray' | '';
  quantity: string;
  dosage: string;
  unit: string;
  frequency: 'daily' | 'weekly' | 'as-needed' | '';
  reminderTimes: string;
  reminderFrequency: string;
  startDate: string;
  endDate: string;
  notes: string;
}

const AddMedicationScreen: React.FC<AddMedicationScreenProps> = ({
  onBack,
  onSave,
  onHome,
  onNotifications,
  onProfile
}) => {
  const { colors } = useTheme();
  const { addMedication } = useMedication();
  const styles = createStyles(colors);
  const [form, setForm] = useState<MedicationForm>({
    name: '',
    type: '',
    quantity: '1',
    dosage: '10',
    unit: 'mg',
    frequency: '',
    reminderTimes: 'Once daily',
    reminderFrequency: '',
    startDate: 'May 13, 2024',
    endDate: '',
    notes: ''
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date(2024, 4, 13)); // May 13, 2024
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [showTimesDropdown, setShowTimesDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [medicationTimes, setMedicationTimes] = useState<string[]>(['8:00 AM']);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [tempTime, setTempTime] = useState({ hour: 8, minute: 0, period: 'AM' });

  const formatDate = (date: Date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const medicationTypes = [
    { id: 'pill', name: 'Pill', icon: '💊', color: '#DBEAFE', selected: true },
    { id: 'injection', name: 'Injection', icon: '💉', color: '#FEE2E2', selected: false },
    { id: 'drops', name: 'Drops', icon: '💧', color: '#E0F2FE', selected: false },
    { id: 'inhaler', name: 'Inhaler', icon: '🫁', color: '#FCE7F3', selected: false },
    { id: 'cream', name: 'Cream', icon: '🧴', color: '#FEF3C7', selected: false },
    { id: 'spray', name: 'Spray', icon: '💨', color: '#E0F2FE', selected: false },
  ];

  const frequencies = ['Daily', 'Weekly', 'As needed'];
  const units = ['mg', 'ml', 'g', 'mcg', 'IU'];
  const timesPerDayOptions = ['Once daily', 'Twice daily', '3 times daily', '4 times daily', 'As needed'];
  
  const addMedicationTime = () => {
    const newTime = medicationTimes.length === 1 ? '2:00 PM' : '8:00 PM';
    setMedicationTimes([...medicationTimes, newTime]);
  };

  const formatTime = (hour: number, minute: number, period: string) => {
    const displayHour = hour === 0 ? 12 : hour;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
  };

  const parseTime = (timeString: string) => {
    const [time, period] = timeString.split(' ');
    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    return { hour: hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour), minute, period };
  };

  const editMedicationTime = (index: number) => {
    const timeData = parseTime(medicationTimes[index]);
    setTempTime(timeData);
    setSelectedTimeIndex(index);
    setShowTimeModal(true);
  };

  const saveTimeEdit = () => {
    const newTime = formatTime(tempTime.hour, tempTime.minute, tempTime.period);
    const updatedTimes = [...medicationTimes];
    updatedTimes[selectedTimeIndex] = newTime;
    setMedicationTimes(updatedTimes);
    setShowTimeModal(false);
  };

  const closeAllDropdowns = () => {
    setShowUnitDropdown(false);
    setShowTimesDropdown(false);
  };
  
  const selectTimesPerDay = (option: string) => {
    updateForm('reminderTimes', option);
    setShowTimesDropdown(false);
    
    // Update medication times based on selection
    switch (option) {
      case 'Once daily':
        setMedicationTimes(['8:00 AM']);
        break;
      case 'Twice daily':
        setMedicationTimes(['8:00 AM', '8:00 PM']);
        break;
      case '3 times daily':
        setMedicationTimes(['8:00 AM', '2:00 PM', '8:00 PM']);
        break;
      case '4 times daily':
        setMedicationTimes(['8:00 AM', '12:00 PM', '4:00 PM', '8:00 PM']);
        break;
      default:
        setMedicationTimes(['8:00 AM']);
    }
  };

  const updateForm = (field: keyof MedicationForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const selectMedicationType = (type: string) => {
    updateForm('type', type as any);
  };

  const selectFrequency = (frequency: string) => {
    updateForm('frequency', frequency.toLowerCase().replace(' ', '-') as any);
  };

  const handleSave = () => {
    if (form.name && form.type && form.frequency) {
      const medicationData = {
        ...form,
        id: Date.now().toString(), // Simple ID generation
        times: medicationTimes,
        taken: false,
        color: 'blue' // Default color
      };
      // Add medication to the context
      addMedication(medicationData);
      
      // Also call the onSave prop for backward compatibility
      onSave(medicationData);
      
      // Reset form after saving
      setForm({
        name: '',
        type: '',
        quantity: '1',
        dosage: '10',
        unit: 'mg',
        frequency: '',
        reminderTimes: 'Once daily',
        reminderFrequency: '',
        startDate: 'May 13, 2024',
        endDate: '',
        notes: ''
      });
      setMedicationTimes(['8:00 AM']);
      // Navigation is handled by the onSave callback
    }
  };

  const isFormValid = form.name && form.type && form.frequency;

  const handleStartDateSelect = (date: Date) => {
    setSelectedStartDate(date);
    setForm(prev => ({ ...prev, startDate: formatDate(date) }));
    setShowStartDatePicker(false);
  };

  const handleEndDateSelect = (date: Date) => {
    setSelectedEndDate(date);
    setForm(prev => ({ ...prev, endDate: formatDate(date) }));
    setShowEndDatePicker(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: colors.surface }]}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Add Medication</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Medication Name */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Medication Name</Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text, fontFamily: 'ReadexPro-Medium' }]}
              placeholder="Enter medication name"
              value={form.name}
              onChangeText={(value) => updateForm('name', value)}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Medication Type */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Medication Type</Text>
            <View style={styles.typeGrid}>
              {medicationTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeCard,
                    { backgroundColor: type.color },
                    form.type === type.id && { borderColor: colors.primary, borderWidth: 2 }
                  ]}
                  onPress={() => selectMedicationType(type.id)}
                >
                  <Text style={styles.typeIcon}>{type.icon}</Text>
                  <Text style={[
                    styles.typeName,
                    { color: '#000000' }, // Always black text for medication type
                    form.type === type.id && { color: colors.primary, fontWeight: '600' }
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity, Dosage, Unit */}
          <View style={styles.section}>
            <View style={styles.dosageRow}>
              <View style={styles.dosageItem}>
                <Text style={[styles.dosageLabel, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Quantity</Text>
                <View style={[styles.textInputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                  <TextInput
                    style={[styles.textInputField, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}
                    value={form.quantity}
                    onChangeText={(value) => updateForm('quantity', value)}
                    keyboardType="numeric"
                    placeholder="Enter quantity"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.dosageItem}>
                <Text style={[styles.dosageLabel, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Dosage</Text>
                <View style={[styles.textInputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                  <TextInput
                    style={[styles.textInputField, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}
                    value={form.dosage}
                    onChangeText={(value) => updateForm('dosage', value)}
                    keyboardType="numeric"
                    placeholder="Enter dosage"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.dosageItem}>
                <Text style={[styles.dosageLabel, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Unit</Text>
                    <TouchableOpacity 
                  style={[styles.unitSelector, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
                  onPress={() => {
                    closeAllDropdowns();
                    setShowUnitDropdown(!showUnitDropdown);
                  }}
                >
                  <Text style={[styles.unitText, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>{form.unit}</Text>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </Svg>
                    </TouchableOpacity>
                {showUnitDropdown && (
                  <View style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    {units.map((unit) => (
                    <TouchableOpacity 
                        key={unit} 
                        style={styles.dropdownItem} 
                        onPress={() => {
                          updateForm('unit', unit);
                          setShowUnitDropdown(false);
                        }}
                      >
                        <Text style={[styles.dropdownText, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>{unit}</Text>
                    </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Frequency */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Frequency</Text>
            <View style={styles.frequencyRow}>
              {frequencies.map((frequency) => (
                <TouchableOpacity
                  key={frequency}
                  style={[
                    styles.frequencyButton,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    form.frequency === frequency.toLowerCase().replace(' ', '-') && { backgroundColor: colors.primary, borderColor: colors.primary }
                  ]}
                  onPress={() => selectFrequency(frequency)}
                >
                  <Text style={[
                    styles.frequencyButtonText,
                    { color: colors.text },
                    form.frequency === frequency.toLowerCase().replace(' ', '-') && { color: 'white' }
                  ]}>
                    {frequency}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Reminder Times */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Reminder Times</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary, fontFamily: 'ReadexPro-Medium' }]}>How many times per day?</Text>
            
            <TouchableOpacity 
              style={[styles.reminderSelector, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
              onPress={() => {
                closeAllDropdowns();
                setShowTimesDropdown(!showTimesDropdown);
              }}
            >
              <Text style={[styles.reminderText, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>{form.reminderTimes}</Text>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </Svg>
            </TouchableOpacity>

            {showTimesDropdown && (
              <View style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                {timesPerDayOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => selectTimesPerDay(option)}
                  >
                    <Text style={[styles.dropdownText, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>{option}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            )}

            <Text style={[styles.reminderSubtext, { color: colors.textSecondary, fontFamily: 'ReadexPro-Medium' }]}>Set your reminder times</Text>
            
            {/* Display medication times */}
            <View style={styles.timesContainer}>
              {medicationTimes.map((time, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.timeChip, { backgroundColor: colors.primary }]}
                  onPress={() => editMedicationTime(index)}
                >
                  <Text style={[styles.timeChipText, { fontFamily: 'ReadexPro-Medium' }]}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              style={[styles.addTimeButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={addMedicationTime}
            >
              <View style={styles.addTimeContent}>
                <Text style={[styles.addTimeText, { color: colors.primary, fontFamily: 'ReadexPro-Medium' }]}>+ Add another time</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Start Date & End Date */}
          <View style={styles.section}>
            <View style={styles.dateRow}>
              <View style={styles.dateItem}>
                <Text style={[styles.dateLabel, { color: colors.text }]}>Start Date</Text>
                <TouchableOpacity 
                  style={[styles.dateButton, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <Text style={[styles.dateButtonText, { color: colors.text }]}>{form.startDate}</Text>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </Svg>
                </TouchableOpacity>
              </View>
              <View style={styles.dateItem}>
                <Text style={[styles.dateLabel, { color: colors.text }]}>End Date</Text>
                <TouchableOpacity 
                  style={[styles.dateButton, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <Text style={[styles.dateButtonText, { color: form.endDate ? colors.text : colors.textSecondary }]}>
                    {form.endDate || 'Select Date'}
                  </Text>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Notes (Optional)</Text>
            <TextInput
              style={[styles.notesInput, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
              placeholder="Add any special instructions or notes..."
              value={form.notes}
              onChangeText={(value) => updateForm('notes', value)}
              multiline
              numberOfLines={4}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.saveButtonContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={getButtonStyle(colors, 'primary', isFormValid ? 'default' : 'disabled').button}
          onPress={handleSave}
          disabled={!isFormValid}
        >
          <Text style={getButtonStyle(colors, 'primary', isFormValid ? 'default' : 'disabled').text}>
            Save Medication
          </Text>
        </TouchableOpacity>
      </View>

      <BottomNav active="home" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />

      {/* Time Picker Modal */}
      <Modal
        visible={showTimeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.timePickerModal, { backgroundColor: colors.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <TouchableOpacity onPress={() => setShowTimeModal(false)}>
                <Text style={[styles.modalCancelText, { color: colors.textSecondary, fontFamily: 'ReadexPro-Medium' }]}>Cancel</Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Set Time</Text>
              <TouchableOpacity onPress={saveTimeEdit}>
                <Text style={[styles.modalSaveText, { color: colors.primary, fontFamily: 'ReadexPro-Medium' }]}>Save</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.timePickerContainer}>
              {/* Hour Picker */}
              <View style={styles.timePicker}>
                <Text style={[styles.timePickerLabel, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Hour</Text>
                <View style={[styles.timePickerWheel, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                  <FlatList
                    data={Array.from({ length: 12 }, (_, i) => i + 1)}
                    keyExtractor={(item) => item.toString()}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={40}
                    decelerationRate="fast"
                    contentContainerStyle={styles.wheelContainer}
                    initialScrollIndex={tempTime.hour - 1}
                    getItemLayout={(data, index) => ({
                      length: 40,
                      offset: 40 * index,
                      index,
                    })}
                    renderItem={({ item, index }) => (
              <TouchableOpacity 
                        style={styles.wheelItem}
                        onPress={() => setTempTime(prev => ({ ...prev, hour: item }))}
                      >
                        <Text style={[
                          styles.wheelItemText,
                          { color: tempTime.hour === item ? colors.primary : colors.text, fontFamily: 'ReadexPro-Medium' }
                        ]}>
                          {item.toString().padStart(2, '0')}
                        </Text>
              </TouchableOpacity>
                    )}
                  />
            </View>
          </View>

              {/* Minute Picker */}
              <View style={styles.timePicker}>
                <Text style={[styles.timePickerLabel, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Minute</Text>
                <View style={[styles.timePickerWheel, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                  <FlatList
                    data={Array.from({ length: 60 }, (_, i) => i)}
                    keyExtractor={(item) => item.toString()}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={40}
                    decelerationRate="fast"
                    contentContainerStyle={styles.wheelContainer}
                    initialScrollIndex={tempTime.minute}
                    getItemLayout={(data, index) => ({
                      length: 40,
                      offset: 40 * index,
                      index,
                    })}
                    renderItem={({ item }) => (
              <TouchableOpacity 
                        style={styles.wheelItem}
                        onPress={() => setTempTime(prev => ({ ...prev, minute: item }))}
                      >
                        <Text style={[
                          styles.wheelItemText,
                          { color: tempTime.minute === item ? colors.primary : colors.text, fontFamily: 'ReadexPro-Medium' }
                        ]}>
                          {item.toString().padStart(2, '0')}
                        </Text>
              </TouchableOpacity>
                    )}
                  />
            </View>
              </View>

              {/* AM/PM Picker */}
              <View style={styles.timePicker}>
                <Text style={[styles.timePickerLabel, { color: colors.text, fontFamily: 'ReadexPro-Medium' }]}>Period</Text>
                <View style={[styles.timePickerWheel, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                  <FlatList
                    data={['AM', 'PM']}
                    keyExtractor={(item) => item}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={40}
                    decelerationRate="fast"
                    contentContainerStyle={styles.wheelContainer}
                    initialScrollIndex={tempTime.period === 'AM' ? 0 : 1}
                    getItemLayout={(data, index) => ({
                      length: 40,
                      offset: 40 * index,
                      index,
                    })}
                    renderItem={({ item }) => (
              <TouchableOpacity 
                        style={styles.wheelItem}
                        onPress={() => setTempTime(prev => ({ ...prev, period: item as 'AM' | 'PM' }))}
                      >
                        <Text style={[
                          styles.wheelItemText,
                          { color: tempTime.period === item ? colors.primary : colors.text, fontFamily: 'ReadexPro-Medium' }
                        ]}>
                          {item}
                        </Text>
              </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Start Date Calendar */}
      <CustomCalendar
        visible={showStartDatePicker}
        onClose={() => setShowStartDatePicker(false)}
        onDateSelect={handleStartDateSelect}
        selectedDate={selectedStartDate}
      />

      {/* End Date Calendar */}
      <CustomCalendar
        visible={showEndDatePicker}
        onClose={() => setShowEndDatePicker(false)}
        onDateSelect={handleEndDateSelect}
        selectedDate={selectedEndDate}
      />
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.background,
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  textInput: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    fontFamily: 'ReadexPro-Medium',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    borderColor: colors.primary,
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  typeNameSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  dosageRow: {
    flexDirection: 'row',
    gap: 16,
  },
  dosageItem: {
    flex: 1,
  },
  dosageLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  textInputContainer: {
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textInputField: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  numberInputText: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  numberControls: {
    paddingRight: 8,
  },
  numberButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unitText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  frequencyRow: {
    flexDirection: 'row',
    gap: 12,
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  frequencyButtonSelected: {
    backgroundColor: colors.primary,
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  frequencyButtonTextSelected: {
    color: '#ffffff',
  },
  reminderSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  reminderText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  reminderSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  addTimeButton: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addTimeContent: {
    alignItems: 'center',
  },
  addTimeText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  dropdown: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  timeChip: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timeChipText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'ReadexPro-Medium',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 16,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  dateButton: {
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateButtonText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  notesInput: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    textAlignVertical: 'top',
    fontFamily: 'ReadexPro-Medium',
  },
  saveButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.background,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: colors.border,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  saveButtonTextDisabled: {
    color: '#9ca3af',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: colors.background,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerContainer: {
    padding: 20,
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  datePickerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    fontFamily: 'ReadexPro-Medium',
  },
  datePickerButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  datePickerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  // Time Picker Modal Styles
  timePickerModal: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    width: '90%',
    maxWidth: 350,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  modalSaveText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  timePicker: {
    alignItems: 'center',
    flex: 1,
  },
  timePickerLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  timePickerWheel: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    height: 120,
    minWidth: 80,
    overflow: 'hidden',
  },
  wheelContainer: {
    paddingVertical: 40,
  },
  wheelItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  wheelItemText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
});

export default AddMedicationScreen;

