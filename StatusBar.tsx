import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const StatusBar: React.FC = () => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <View style={styles.container}>
      {/* Left side - Time */}
      <Text style={styles.time}>{timeString}</Text>
      
      {/* Right side - Status indicators */}
      <View style={styles.statusContainer}>
        {/* Signal strength */}
        <View style={styles.signalContainer}>
          <View style={[styles.signalBar, { height: 8 }]} />
          <View style={[styles.signalBar, { height: 12 }]} />
          <View style={[styles.signalBar, { height: 16 }]} />
          <View style={[styles.signalBar, { height: 16, backgroundColor: '#d1d5db' }]} />
        </View>
        
        {/* WiFi */}
        <Svg width={16} height={16} viewBox="0 0 24 24" style={styles.wifiIcon}>
          <Path
            fill="#000"
            d="M1,9L3,7C6.15,3.85 11.85,3.85 15,7L17,9C14.63,6.63 9.37,6.63 7,9L9,11C10.38,9.62 13.62,9.62 15,11L17,9C17,9 22,14 22,14L12,24L1,14V9M12,16L7,11C9.76,8.24 14.24,8.24 17,11L12,16Z"
          />
        </Svg>
        
        {/* Battery */}
        <View style={styles.batteryContainer}>
          <View style={styles.battery}>
            <View style={styles.batteryFill} />
          </View>
          <View style={styles.batteryTip} />
          <Text style={styles.batteryText}>87%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1,
  },
  signalBar: {
    width: 4,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  wifiIcon: {
    marginLeft: 4,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 2,
    position: 'relative',
  },
  batteryFill: {
    width: 16,
    height: 6,
    backgroundColor: '#000000',
    borderRadius: 1,
    margin: 2,
  },
  batteryTip: {
    width: 2,
    height: 4,
    backgroundColor: '#000000',
    borderRadius: 1,
    marginLeft: -1,
  },
  batteryText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#000000',
  },
});

export default StatusBar;
