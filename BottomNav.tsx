import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../../contexts/ThemeContext';

interface BottomNavProps {
  active?: string;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onHome, onNotifications, onProfile }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.tabBarBackground }]}>
      <View style={styles.navContainer}>
        {/* Home Button */}
        <TouchableOpacity onPress={onHome} style={styles.navButton}>
          <Svg 
            width={24} 
            height={24} 
            viewBox="0 0 24 24" 
            fill={active === 'home' ? colors.primary : colors.text}
          >
            <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </Svg>
        </TouchableOpacity>

        {/* Notifications Button */}
        <TouchableOpacity onPress={onNotifications} style={styles.navButton}>
          <View style={styles.notificationContainer}>
            <Svg 
              width={24} 
              height={24} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={active === 'notifications' ? colors.primary : colors.text}
              strokeWidth={2}
            >
              <Path strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </Svg>
            {/* Notification dot */}
            <View style={styles.notificationDot} />
          </View>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity onPress={onProfile} style={styles.navButton}>
          <Svg 
            width={24} 
            height={24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={active === 'profile' ? colors.primary : colors.text}
            strokeWidth={2}
          >
            <Path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
});

export default BottomNav;
