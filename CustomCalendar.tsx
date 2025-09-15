import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface CustomCalendarProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  visible,
  onClose,
  onDateSelect,
  selectedDate = new Date()
}) => {
  const { colors } = useTheme();
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const yearScrollViewRef = useRef<ScrollView>(null);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust for Monday start
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDate = new Date(year, month, 1 - startingDayOfWeek + i);
      days.push({
        date: prevMonthDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevMonthDate
      });
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: new Date(year, month, day)
      });
    }
    
    // Add empty cells for days after the last day of the month
    const remainingCells = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      days.push({
        date: nextMonthDate.getDate(),
        isCurrentMonth: false,
        fullDate: nextMonthDate
      });
    }
    
    return days;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const isSelected = (date: Date) => {
    return selectedDate.toDateString() === date.toDateString();
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  };
  
  const handleDatePress = (date: Date) => {
    onDateSelect(date);
    onClose();
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    // Generate years from 100 years ago to 50 years in the future
    for (let year = currentYear - 100; year <= currentYear + 50; year++) {
      years.push(year);
    }
    return years;
  };

  const scrollToCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    const years = generateYearRange();
    const currentYearIndex = years.indexOf(currentYear);
    
    if (currentYearIndex !== -1 && yearScrollViewRef.current) {
      // Each row has 4 items, so calculate row index
      const itemsPerRow = 4;
      const rowIndex = Math.floor(currentYearIndex / itemsPerRow);
      // Item height (paddingVertical: 12 * 2) + marginVertical (4 * 2) = 32px per item
      const itemHeight = 32;
      const scrollPosition = Math.max(0, rowIndex * itemHeight - 80); // Offset to center
      
      console.log(`Scrolling to year ${currentYear}, index ${currentYearIndex}, row ${rowIndex}, position ${scrollPosition}`);
      
      setTimeout(() => {
        yearScrollViewRef.current?.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }, 200);
    }
  };

  useEffect(() => {
    if (showYearPicker) {
      scrollToCurrentYear();
    }
  }, [showYearPicker]);
  
  const days = getDaysInMonth(currentDate);
  
  const styles = createStyles(colors);
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.calendarContainer} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
              <Text style={styles.navText}>‹</Text>
            </TouchableOpacity>
            <View style={styles.monthYearContainer}>
              <TouchableOpacity onPress={() => setShowMonthPicker(true)} style={styles.monthYearButton}>
                <Text style={styles.monthYearText}>
                  {monthNames[currentDate.getMonth()]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowYearPicker(true)} style={styles.monthYearButton}>
                <Text style={styles.monthYearText}>
                  {currentDate.getFullYear()}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
              <Text style={styles.navText}>›</Text>
            </TouchableOpacity>
          </View>
          
          {/* Day names */}
          <View style={styles.dayNamesRow}>
            {dayNames.map((day) => (
              <Text key={day} style={styles.dayName}>{day}</Text>
            ))}
          </View>
          
          {/* Calendar grid */}
          <View style={styles.calendarGrid}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  !day.isCurrentMonth && styles.otherMonthDay,
                  isSelected(day.fullDate) && styles.selectedDay,
                  isToday(day.fullDate) && !isSelected(day.fullDate) && styles.todayDay
                ]}
                onPress={() => handleDatePress(day.fullDate)}
              >
                <Text style={[
                  styles.dayText,
                  !day.isCurrentMonth && styles.otherMonthText,
                  isSelected(day.fullDate) && styles.selectedDayText,
                  isToday(day.fullDate) && !isSelected(day.fullDate) && styles.todayText
                ]}>
                  {day.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Month Picker Modal */}
          {showMonthPicker && (
            <View style={styles.pickerModal}>
              <View style={styles.pickerHeader}>
                <Text style={styles.pickerTitle}>Select Month</Text>
                <TouchableOpacity onPress={() => setShowMonthPicker(false)}>
                  <Text style={styles.pickerClose}>✕</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pickerGrid}>
                {monthNames.map((month, index) => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.pickerItem,
                      index === currentDate.getMonth() && styles.pickerItemSelected
                    ]}
                    onPress={() => handleMonthSelect(index)}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      index === currentDate.getMonth() && styles.pickerItemTextSelected
                    ]}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Year Picker Modal */}
          {showYearPicker && (
            <View style={styles.pickerModal}>
              <View style={styles.pickerHeader}>
                <Text style={styles.pickerTitle}>Select Year</Text>
                <TouchableOpacity onPress={() => setShowYearPicker(false)}>
                  <Text style={styles.pickerClose}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView 
                ref={yearScrollViewRef}
                style={styles.yearScrollContainer} 
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <View style={[styles.pickerGrid, styles.yearGrid]}>
                  {generateYearRange().map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.pickerItem,
                        styles.yearItem,
                        year === currentDate.getFullYear() && styles.pickerItemSelected
                      ]}
                      onPress={() => handleYearSelect(year)}
                    >
                      <Text style={[
                        styles.pickerItemText,
                        year === currentDate.getFullYear() && styles.pickerItemTextSelected
                      ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    margin: 20,
    width: '90%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 24,
    color: colors.text,
    fontWeight: 'bold',
  },
  monthYear: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  monthYearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  dayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayName: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 2,
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  selectedDay: {
    backgroundColor: '#3b82f6',
  },
  todayDay: {
    backgroundColor: '#dbeafe',
  },
  dayText: {
    fontSize: 16,
    color: colors.text,
  },
  otherMonthText: {
    color: colors.textSecondary,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todayText: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  pickerModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  pickerClose: {
    fontSize: 18,
    color: colors.textSecondary,
    padding: 5,
  },
  pickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxHeight: 300,
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  yearScrollContainer: {
    maxHeight: 300,
    flex: 1,
  },
  pickerItem: {
    width: '30%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  yearItem: {
    width: '23%',
    marginHorizontal: '1%',
  },
  pickerItemSelected: {
    backgroundColor: colors.primary,
  },
  pickerItemText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  pickerItemTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomCalendar;
