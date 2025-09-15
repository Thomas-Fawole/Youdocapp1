import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { testSupabaseConnection } from '../utils/testSupabaseConnection';
import { useAuth } from '../contexts/SupabaseAuthContext';

interface SupabaseConnectionTestProps {
  onClose?: () => void;
}

const SupabaseConnectionTest: React.FC<SupabaseConnectionTestProps> = ({ onClose }) => {
  const { colors } = useTheme();
  const { user, loading } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResult, setTestResult] = useState<any>(null);

  useEffect(() => {
    // Automatically test connection when component mounts
    handleTestConnection();
  }, []);

  const handleTestConnection = async () => {
    setConnectionStatus('testing');
    try {
      const result = await testSupabaseConnection();
      setTestResult(result);
      setConnectionStatus(result.success ? 'success' : 'error');
      
      if (result.success) {
        Alert.alert('✅ Connection Success', 'Supabase is connected and working!');
      } else {
        Alert.alert('❌ Connection Failed', result.error || 'Unknown error');
      }
    } catch (error) {
      setConnectionStatus('error');
      setTestResult({ success: false, error: error.message });
      Alert.alert('❌ Test Error', error.message);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'testing': return '#FFA500';
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      default: return colors.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'testing': return 'Testing connection...';
      case 'success': return 'Connected ✅';
      case 'error': return 'Connection failed ❌';
      default: return 'Ready to test';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>Supabase Connection Status</Text>
      
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Project ID:</Text>
        <Text style={[styles.infoValue, { color: colors.text }]}>itxsyveuizzzyoevkmyf</Text>
        
        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Auth Status:</Text>
        <Text style={[styles.infoValue, { color: colors.text }]}>
          {loading ? 'Loading...' : user ? `Signed in as ${user.email}` : 'Not signed in'}
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.testButton, { backgroundColor: colors.primary }]}
        onPress={handleTestConnection}
        disabled={connectionStatus === 'testing'}
      >
        <Text style={styles.testButtonText}>
          {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
        </Text>
      </TouchableOpacity>

      {testResult && (
        <View style={[styles.resultContainer, { backgroundColor: colors.background }]}>
          <Text style={[styles.resultTitle, { color: colors.text }]}>Test Result:</Text>
          <Text style={[styles.resultText, { color: colors.textSecondary }]}>
            {JSON.stringify(testResult, null, 2)}
          </Text>
        </View>
      )}

      {onClose && (
        <TouchableOpacity 
          style={[styles.closeButton, { borderColor: colors.border }]}
          onPress={onClose}
        >
          <Text style={[styles.closeButtonText, { color: colors.text }]}>Close</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  testButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  testButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  closeButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default SupabaseConnectionTest;
