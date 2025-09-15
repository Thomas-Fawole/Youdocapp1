import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';
import { useMedication, Medication } from '../contexts/MedicationContext';
import CustomCalendar from './ui/CustomCalendar';
import BottomNav from './ui/BottomNav';
import { getMedicationIcon } from '../utils/medicationIcons';

interface MyMedicationScreenProps {
  onBack: () => void;
  onAddMedication: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

// Medication interface is now imported from MedicationContext

const { width } = Dimensions.get('window');

const MyMedicationScreen: React.FC<MyMedicationScreenProps> = ({
  onBack,
  onAddMedication,
  onHome,
  onNotifications,
  onProfile
}) => {
  const { colors } = useTheme();
  const { medications, toggleMedicationTaken } = useMedication();
  const [selectedMonth, setSelectedMonth] = useState(4); // May = index 4
  const [selectedDate, setSelectedDate] = useState(13);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showDayMedications, setShowDayMedications] = useState(false);
  // Medication status is now handled by the context

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthsShort = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getCurrentMonthDates = (monthIndex: number, year: number = selectedYear) => {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
    
    const dates = [];
    
    // Add previous month's trailing dates
    const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1;
    const prevYear = monthIndex === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      dates.push({
        date: daysInPrevMonth - i,
        day: new Date(prevYear, prevMonth, daysInPrevMonth - i).toLocaleDateString('en', { weekday: 'short' }),
        isCurrentMonth: false,
        dots: Math.random() > 0.5 ? ['green', 'red'] : ['blue']
      });
    }
    
    // Add current month's dates
    for (let date = 1; date <= daysInMonth; date++) {
      const dayOfWeek = new Date(year, monthIndex, date).toLocaleDateString('en', { weekday: 'short' });
      dates.push({
        date,
        day: dayOfWeek,
        isCurrentMonth: true,
        dots: Math.random() > 0.5 ? ['green', 'red'] : ['blue', 'blue']
      });
    }
    
    // Add next month's leading dates to fill the grid
    const remainingSlots = 42 - dates.length; // 6 rows × 7 days = 42 slots
    const nextMonth = monthIndex === 11 ? 0 : monthIndex + 1;
    const nextYear = monthIndex === 11 ? year + 1 : year;
    
    for (let date = 1; date <= remainingSlots; date++) {
      const dayOfWeek = new Date(nextYear, nextMonth, date).toLocaleDateString('en', { weekday: 'short' });
      dates.push({
        date,
        day: dayOfWeek,
        isCurrentMonth: false,
        dots: Math.random() > 0.5 ? ['green'] : ['red']
      });
    }
    
    return dates;
  };

  const getWeekDates = (monthIndex: number) => {
    // Get a week view around the selected date
    const dates = [];
    for (let i = 11; i <= 16; i++) {
      const dayOfWeek = new Date(selectedYear, monthIndex, i).toLocaleDateString('en', { weekday: 'short' });
      dates.push({
        date: i,
        day: dayOfWeek,
        isCurrentMonth: true,
        dots: i === 13 ? ['blue', 'blue'] : ['green', 'red']
      });
    }
    return dates;
  };

  const getDayMedications = (date: number, month: number, year: number) => {
    // This would normally fetch from an API or database
    // For demo purposes, return sample medications for the selected day
    return medications.map(med => ({
      ...med,
      scheduledTimes: ['8:00 AM', '2:00 PM', '8:00 PM'],
      taken: med.taken
    }));
  };

  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
    setShowDayMedications(true);
  };

  const handleYearChange = (direction: 'prev' | 'next') => {
    setSelectedYear(prev => direction === 'prev' ? prev - 1 : prev + 1);
  };

  // Medication functions are now handled by the context

  // Medication icon function is now imported from utils

  // toggleMedicationTaken is now provided by the context

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setShowCalendarModal(true);
  };

  const handleCalendarDateSelect = (date: Date) => {
    setSelectedMonth(date.getMonth());
    setSelectedDate(date.getDate());
    setSelectedYear(date.getFullYear());
    setShowFullCalendar(false); // Show week view after date selection
  };

  const renderMonthSelector = () => (
    <FlatList
      data={monthsShort}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.monthSelectorContainer}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={[
            styles.monthButton,
            { backgroundColor: colors.card, borderColor: colors.border },
            selectedMonth === index && { backgroundColor: colors.primary, borderColor: colors.primary }
          ]}
          onPress={() => handleMonthSelect(index)}
        >
          <Text style={[
            styles.monthButtonText,
            { color: colors.text },
            selectedMonth === index && { color: 'white' }
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  const renderFullCalendar = () => {
    const dates = getCurrentMonthDates(selectedMonth, selectedYear);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <View style={styles.fullCalendarContainer}>
        <View style={styles.calendarHeader}>
                      <TouchableOpacity 
            style={[styles.calendarBackButton, { backgroundColor: colors.surface }]}
            onPress={() => setShowFullCalendar(false)}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </Svg>
          </TouchableOpacity>
          <View style={styles.yearSelector}>
            <TouchableOpacity 
              style={styles.yearButton}
              onPress={() => handleYearChange('prev')}
            >
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </Svg>
            </TouchableOpacity>
            <Text style={[styles.calendarTitle, { color: colors.text }]}>{months[selectedMonth]} {selectedYear}</Text>
            <TouchableOpacity 
              style={styles.yearButton}
              onPress={() => handleYearChange('next')}
            >
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </Svg>
            </TouchableOpacity>
          </View>
          <View style={styles.placeholder} />
        </View>
        
        {/* Week days header */}
        <View style={styles.weekDaysHeader}>
          {weekDays.map((day) => (
            <Text key={day} style={[styles.weekDayText, { color: colors.textSecondary }]}>{day}</Text>
          ))}
        </View>
        
        {/* Calendar grid */}
        <View style={styles.calendarGrid}>
          {dates.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDateButton,
                { backgroundColor: colors.surface },
                !item.isCurrentMonth && styles.calendarDateButtonInactive,
                selectedDate === item.date && item.isCurrentMonth && { backgroundColor: colors.primary }
              ]}
              onPress={() => item.isCurrentMonth && setSelectedDate(item.date)}
            >
              <Text style={[
                styles.calendarDateNumber,
                { color: colors.text },
                !item.isCurrentMonth && { color: colors.textSecondary },
                selectedDate === item.date && item.isCurrentMonth && { color: 'white' }
              ]}>
                {item.date}
              </Text>
              <View style={styles.calendarDotsContainer}>
                {item.dots.map((color, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={[
                      styles.calendarDot,
                      { 
                        backgroundColor: color === 'green' ? '#10B981' : 
                                       color === 'red' ? '#EF4444' : 
                                       color === 'blue' ? '#3B82F6' : '#6B7280'
                      }
                    ]}
                  />
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderWeekView = () => {
    const dates = getWeekDates(selectedMonth);
    
    return (
      <View style={styles.calendar}>
        {dates.map((item) => (
          <TouchableOpacity
            key={item.date}
            style={[
              styles.dateButton,
              { backgroundColor: colors.surface },
              selectedDate === item.date && { backgroundColor: colors.primary }
            ]}
            onPress={() => setSelectedDate(item.date)}
          >
            <Text style={[
              styles.dateNumber,
              { color: colors.text },
              selectedDate === item.date && { color: 'white' }
            ]}>
              {item.date}
            </Text>
            <Text style={[
              styles.dayText,
              { color: colors.textSecondary },
              selectedDate === item.date && { color: 'white' }
            ]}>
              {item.day}
            </Text>
            <View style={styles.dotsContainer}>
              {item.dots.map((color, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    { 
                      backgroundColor: color === 'green' ? '#10B981' : 
                                     color === 'red' ? '#EF4444' : 
                                     color === 'blue' ? '#3B82F6' : '#6B7280'
                    }
                  ]}
                />
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Medication</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={[styles.scrollContainer, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        {/* Month Selector */}
        {renderMonthSelector()}

        {/* Calendar - either full calendar or week view */}
        {showFullCalendar ? renderFullCalendar() : renderWeekView()}

        {/* Medicine Section */}
        <View style={styles.medicineSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Medicine</Text>
          
          {medications.map((medication) => (
            <TouchableOpacity 
              key={medication.id} 
              style={[
                styles.medicationCard, 
                { backgroundColor: colors.card, borderColor: colors.border },
                medication.taken && { opacity: 0.6 }
              ]}
              onPress={() => toggleMedicationTaken(medication.id)}
            >
              <View style={styles.medicationHeader}>
                <View style={styles.medicationInfo}>
                  {getMedicationIcon({ type: medication.type, size: 20, showBackground: true })}
                  <View style={styles.medicationDetails}>
                    <Text style={[
                      styles.medicationName, 
                      { color: colors.text },
                      medication.taken && { textDecorationLine: 'line-through' }
                    ]}>
                      {medication.name}
                    </Text>
                    <Text style={[
                      styles.medicationDosage, 
                      { color: colors.textSecondary },
                      medication.taken && { textDecorationLine: 'line-through' }
                    ]}>
                      {medication.quantity} {medication.type}, ({medication.dosage} {medication.unit})
                    </Text>
                  </View>
                </View>
                <View style={styles.checkButton}>
                  <View style={[styles.checkbox, medication.taken && styles.checkboxChecked]}>
                    {medication.taken && (
                      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </Svg>
                    )}
                  </View>
                </View>
              </View>
              
              <View style={styles.medicationTime}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                  <Circle cx="12" cy="12" r="10"/>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
                </Svg>
                <Text style={[
                  styles.timeText, 
                  { color: colors.textSecondary },
                  medication.taken && { textDecorationLine: 'line-through' }
                ]}>
                  {medication.times.join(' - ')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Medication Button */}
      <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={onAddMedication}>
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="white">
          <Path d="M12 2v20M2 12h20" stroke="white" strokeWidth={3} strokeLinecap="round"/>
        </Svg>
      </TouchableOpacity>

      <BottomNav active="home" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />

      {/* Custom Calendar Modal */}
      <CustomCalendar
        visible={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        onDateSelect={handleCalendarDateSelect}
        selectedDate={new Date(selectedYear, selectedMonth, selectedDate)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  placeholder: {
    width: 40,
  },
  monthSelectorContainer: {
    paddingHorizontal: 20,
    paddingRight: 40, // Add padding for last item
    marginBottom: 20,
    gap: 8,
  },
  monthSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  monthButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  monthButtonSelected: {
    backgroundColor: '#3b82f6',
  },
  monthButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    fontFamily: 'ReadexPro-Medium',
  },
  monthButtonTextSelected: {
    color: '#ffffff',
  },
  calendar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 8,
  },
  dateButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
  },
  dateButtonSelected: {
    backgroundColor: '#3b82f6',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  dateNumberSelected: {
    color: '#ffffff',
  },
  dayText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  dayTextSelected: {
    color: '#ffffff',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  medicineSection: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
    fontFamily: 'ReadexPro-Medium',
  },
  medicationCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicationTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  medicationDetails: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  medicationDosage: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'ReadexPro-Medium',
  },
  checkButton: {
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  medicationTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'ReadexPro-Medium',
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Full Calendar Styles
  fullCalendarContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calendarBackButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  weekDaysHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    fontFamily: 'ReadexPro-Medium',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDateButton: {
    width: `${100/7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  calendarDateButtonSelected: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
  },
  calendarDateButtonInactive: {
    opacity: 0.3,
  },
  calendarDateNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  calendarDateNumberSelected: {
    color: '#ffffff',
  },
  calendarDateNumberInactive: {
    color: '#9ca3af',
  },
  calendarDotsContainer: {
    flexDirection: 'row',
    gap: 2,
    minHeight: 8,
  },
  calendarDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

export default MyMedicationScreen;
