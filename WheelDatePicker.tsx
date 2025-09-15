import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface WheelDatePickerProps {
  label: string;
  value?: string;
  onChange: (date: string) => void;
}

const WheelDatePicker: React.FC<WheelDatePickerProps> = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(value || '2024-01-01');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - 100 + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    };
  };

  const { year, month, day } = parseDate(tempDate);
  const daysInMonth = getDaysInMonth(year, month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateChange = (newYear: number, newMonth: number, newDay: number) => {
    const adjustedDay = Math.min(newDay, getDaysInMonth(newYear, newMonth));
    const newDate = `${newYear}-${String(newMonth + 1).padStart(2, '0')}-${String(adjustedDay).padStart(2, '0')}`;
    setTempDate(newDate);
  };

  const handleSave = () => {
    onChange(tempDate);
    setIsOpen(false);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={styles.button}
      >
        <Text style={[styles.buttonText, !value && styles.placeholderText]}>
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.doneButton}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickersContainer}>
              {/* Month Picker */}
              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Month</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={month}
                    onValueChange={(itemValue) => handleDateChange(year, itemValue, day)}
                    style={styles.picker}
                  >
                    {months.map((monthName, index) => (
                      <Picker.Item key={index} label={monthName} value={index} />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Day Picker */}
              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Day</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={day}
                    onValueChange={(itemValue) => handleDateChange(year, month, itemValue)}
                    style={styles.picker}
                  >
                    {days.map((dayNum) => (
                      <Picker.Item key={dayNum} label={dayNum.toString()} value={dayNum} />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Year Picker */}
              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Year</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={year}
                    onValueChange={(itemValue) => handleDateChange(itemValue, month, day)}
                    style={styles.picker}
                  >
                    {years.map((yearNum) => (
                      <Picker.Item key={yearNum} label={yearNum.toString()} value={yearNum} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  button: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
  },
  buttonText: {
    color: '#111827',
    fontSize: 16,
  },
  placeholderText: {
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  cancelButton: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '500',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  doneButton: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '500',
  },
  pickersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  pickerWrapper: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  pickerContainer: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 150,
  },
});

export default WheelDatePicker;
