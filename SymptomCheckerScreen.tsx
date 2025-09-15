import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme, getButtonStyle } from '../contexts/ThemeContext';
import BottomNav from './ui/BottomNav';

interface SymptomCheckerScreenProps {
  onBack: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

interface Symptom {
  id: string;
  name: string;
}

const SymptomCheckerScreen: React.FC<SymptomCheckerScreenProps> = ({ 
  onBack, 
  onHome, 
  onNotifications, 
  onProfile 
}) => {
  const { colors, isDarkMode } = useTheme();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [ageRange, setAgeRange] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'landing' | 'basic-info' | 'symptoms' | 'results'>('landing');
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [customSymptom, setCustomSymptom] = useState('');

  const symptoms: Symptom[] = [
    { id: 'fever', name: 'Fever' },
    { id: 'headache', name: 'Headache' },
    { id: 'cough', name: 'Cough' },
    { id: 'sore-throat', name: 'Sore Throat' },
    { id: 'nausea', name: 'Nausea' },
    { id: 'fatigue', name: 'Fatigue' },
    { id: 'dizziness', name: 'Dizziness' },
    { id: 'chest-pain', name: 'Chest Pain' },
    { id: 'shortness-breath', name: 'Shortness of Breath' },
    { id: 'stomach-pain', name: 'Stomach Pain' },
    { id: 'joint-pain', name: 'Joint Pain' },
    { id: 'skin-rash', name: 'Skin Rash' },
  ];

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(`custom-${customSymptom}`)) {
      setSelectedSymptoms(prev => [...prev, `custom-${customSymptom}`]);
      setCustomSymptom('');
      setShowOthersInput(false);
    }
  };

  const getSymptomName = (symptomId: string) => {
    if (symptomId.startsWith('custom-')) {
      return symptomId.replace('custom-', '');
    }
    return symptoms.find(s => s.id === symptomId)?.name || symptomId;
  };

  const canContinueSymptoms = selectedSymptoms.length > 0 && severity && duration;
  const canContinueBasicInfo = ageRange && gender;
  const showSeverityAndDuration = selectedSymptoms.length > 0;

  // Landing Screen
  const renderLanding = () => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onBack} style={[styles.backButton, { backgroundColor: colors.surface }]}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>AI Symptom Checker</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={[styles.landingContent, { backgroundColor: colors.background }]}>
        {/* AI Icon */}
        <View style={styles.aiIconContainer}>
          <View style={[styles.aiIcon, { backgroundColor: colors.card }]}>
            <Svg width={32} height={32} viewBox="0 0 24 24" fill={colors.primary}>
              <Path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              <Circle cx="12" cy="12" r="3" fill="white"/>
            </Svg>
          </View>
        </View>

        <Text style={[styles.landingTitle, { color: colors.text }]}>AI-Powered Health Assistant</Text>
        <Text style={[styles.landingDescription, { color: colors.textSecondary }]}>
          Get personalized health insights by describing your symptoms. Our AI will help assess your condition and guide next steps.
        </Text>

        {/* Disclaimer */}
        <View style={[styles.landingDisclaimer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.disclaimerText, { color: colors.textSecondary }]}>
            This tool is for information only and does not replace professional medical advice. For emergencies, call 911.
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity 
          style={getButtonStyle(colors, 'primary', 'default', { width: '100%' }).button}
          onPress={() => setCurrentStep('basic-info')}
        >
          <Text style={getButtonStyle(colors, 'primary').text}>Start Symptom Assessment</Text>
        </TouchableOpacity>
      </View>

      <BottomNav active="home" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
    </View>
  );

  // Symptom Selection Screen
  const renderSymptomSelection = () => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => setCurrentStep('basic-info')} style={[styles.backButton, { backgroundColor: colors.surface }]}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Select Symptoms</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={[styles.scrollContainer, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Select all symptoms you're currently experiencing:</Text>

          {/* Symptoms Grid */}
          <View style={styles.symptomsGrid}>
            {symptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomButton,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  selectedSymptoms.includes(symptom.id) && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <Text style={[
                  styles.symptomButtonText,
                  { color: colors.text },
                  selectedSymptoms.includes(symptom.id) && { color: 'white' }
                ]}>
                  {symptom.name}
                </Text>
              </TouchableOpacity>
            ))}
            
            {/* Others Button */}
            <TouchableOpacity 
              style={[styles.othersButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setShowOthersInput(true)}
            >
              <Text style={[styles.othersButtonText, { color: colors.textSecondary }]}>+ Others</Text>
            </TouchableOpacity>
          </View>

          {/* Custom Symptom Input */}
          {showOthersInput && (
            <View style={[styles.customSymptomContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.customSymptomLabel, { color: colors.text }]}>Add your own symptom:</Text>
              <View style={styles.customSymptomInputContainer}>
                <TextInput
                  style={[styles.customSymptomInput, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
                  placeholder="Type your symptom here..."
                  value={customSymptom}
                  onChangeText={setCustomSymptom}
                  placeholderTextColor={colors.textSecondary}
                  autoFocus
                />
                <TouchableOpacity 
                  style={[
                    styles.addSymptomButton,
                    { backgroundColor: colors.primary },
                    !customSymptom.trim() && styles.addSymptomButtonDisabled
                  ]}
                  onPress={addCustomSymptom}
                  disabled={!customSymptom.trim()}
                >
                  <Text style={[
                    styles.addSymptomButtonText,
                    !customSymptom.trim() && styles.addSymptomButtonTextDisabled
                  ]}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setShowOthersInput(false);
                  setCustomSymptom('');
                }}
              >
                <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Display selected symptoms */}
          {selectedSymptoms.length > 0 && (
            <View style={styles.selectedSymptomsContainer}>
              <Text style={[styles.selectedSymptomsTitle, { color: colors.text }]}>Selected symptoms:</Text>
              <View style={styles.selectedSymptomsList}>
                {selectedSymptoms.map((symptomId) => (
                  <View key={symptomId} style={[styles.selectedSymptomTag, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
                    <Text style={[styles.selectedSymptomTagText, { color: colors.primary }]}>
                      {getSymptomName(symptomId)}
                    </Text>
                    <TouchableOpacity
                      style={[styles.removeSymptomButton, { backgroundColor: colors.primary }]}
                      onPress={() => toggleSymptom(symptomId)}
                    >
                      <Text style={styles.removeSymptomButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Severity Section - Only show if symptoms are selected */}
          {showSeverityAndDuration && (
            <>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>How severe are your symptoms?</Text>
              <View style={styles.severityContainer}>
                {[
                  { id: 'mild', label: 'Mild', subtitle: "Barely noticeable, doesn't affect daily activities", color: '#10b981' },
                  { id: 'moderate', label: 'Moderate', subtitle: 'Noticeable and somewhat bothersome', color: '#f59e0b' },
                  { id: 'severe', label: 'Severe', subtitle: 'Very bothersome, affects daily activities', color: '#ef4444' },
                  { id: 'extreme', label: 'Extreme', subtitle: 'Unbearable, requires immediate attention', color: '#dc2626' }
                ].map((level) => (
                  <TouchableOpacity
                    key={level.id}
                    style={[
                      styles.severityOption,
                      { backgroundColor: colors.card, borderColor: colors.border },
                      severity === level.id && { backgroundColor: colors.primary, borderColor: colors.primary }
                    ]}
                    onPress={() => setSeverity(level.id)}
                  >
                    <View style={[styles.severityIndicator, { backgroundColor: level.color }]} />
                    <View style={styles.severityContent}>
                      <Text style={[
                        styles.severityLabel,
                        { color: colors.text },
                        severity === level.id && { color: 'white' }
                      ]}>
                        {level.label}
                      </Text>
                      <Text style={[
                        styles.severitySubtitle,
                        { color: colors.textSecondary },
                        severity === level.id && { color: 'white' }
                      ]}>{level.subtitle}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Duration Section */}
              <Text style={[styles.sectionTitle, { color: colors.text }]}>How long have you had these symptoms?</Text>
              <View style={styles.durationContainer}>
                {[
                  { id: 'hours', label: 'A few hours' },
                  { id: '1day', label: '1 day' },
                  { id: '2-7days', label: '2-7 days' },
                  { id: '1-4weeks', label: '1-4 weeks' },
                  { id: 'month+', label: 'More than a month' }
                ].map((period) => (
                  <TouchableOpacity
                    key={period.id}
                    style={[
                      styles.durationOption,
                      { backgroundColor: colors.card, borderColor: colors.border },
                      duration === period.id && { backgroundColor: colors.primary, borderColor: colors.primary }
                    ]}
                    onPress={() => setDuration(period.id)}
                  >
                    <Text style={[
                      styles.durationLabel,
                      { color: colors.text },
                      duration === period.id && { color: 'white' }
                    ]}>
                      {period.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Continue Button */}
      {canContinueSymptoms && (
        <View style={[styles.bottomContainer, { backgroundColor: colors.background }]}>
          <TouchableOpacity 
            style={getButtonStyle(colors, 'primary').button}
            onPress={() => setCurrentStep('results')}
          >
            <Text style={getButtonStyle(colors, 'primary').text}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      <BottomNav active="home" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
    </View>
  );

  // Basic Information Screen
  const renderBasicInfo = () => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => setCurrentStep('landing')} style={[styles.backButton, { backgroundColor: colors.surface }]}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Basic Information</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Info Banner */}
          <View style={[styles.infoBanner, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
            <Text style={[styles.infoBannerText, { color: colors.text }]}>
              Please provide basic info to improve assessment accuracy.
            </Text>
          </View>

          {/* Age Range */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Age Range</Text>
          <View style={styles.ageContainer}>
            {[
              { id: '18-30', label: '18-30' },
              { id: '31-45', label: '31-45' },
              { id: '46-60', label: '46-60' },
              { id: '60+', label: '60+' }
            ].map((age) => (
              <TouchableOpacity
                key={age.id}
                style={[
                  styles.ageOption,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  ageRange === age.id && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => setAgeRange(age.id)}
              >
                <Text style={[
                  styles.ageLabel,
                  { color: colors.text },
                  ageRange === age.id && { color: 'white' }
                ]}>
                  {age.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Gender */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Gender</Text>
          <View style={styles.genderContainer}>
            {[
              { id: 'male', label: 'Male' },
              { id: 'female', label: 'Female' },
              { id: 'other', label: 'Other' }
            ].map((g) => (
              <TouchableOpacity
                key={g.id}
                style={[
                  styles.genderOption,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  gender === g.id && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => setGender(g.id)}
              >
                <Text style={[
                  styles.genderLabel,
                  { color: colors.text },
                  gender === g.id && { color: 'white' }
                ]}>
                  {g.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={[styles.bottomContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={getButtonStyle(colors, 'primary', canContinueBasicInfo ? 'default' : 'disabled').button}
          onPress={() => canContinueBasicInfo && setCurrentStep('symptoms')}
          disabled={!canContinueBasicInfo}
        >
          <Text style={getButtonStyle(colors, 'primary', canContinueBasicInfo ? 'default' : 'disabled').text}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      <BottomNav active="home" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
    </View>
  );

  // Assessment Results Screen
  const renderResults = () => {
    // Simple assessment logic based on symptoms
    const hasEmergencySymptoms = selectedSymptoms.some(id => 
      ['chest-pain', 'shortness-breath'].includes(id) || id.includes('chest') || id.includes('breath')
    );

    const getUrgencyLevel = () => {
      if (hasEmergencySymptoms || severity === 'extreme') {
        return {
          level: 'urgent',
          title: 'Seek Immediate Medical Attention',
          description: 'Based on your symptoms, we recommend seeking immediate medical care.',
          color: '#EF4444',
          backgroundColor: isDarkMode ? '#2D1B1B' : '#FEF2F2',
          icon: '⚠️'
        };
      } else if (severity === 'severe') {
        return {
          level: 'moderate',
          title: 'Consider Medical Consultation',
          description: 'Your symptoms may benefit from medical evaluation.',
          color: '#F59E0B',
          backgroundColor: isDarkMode ? '#2D2419' : '#FFFBEB',
          icon: '⚠️'
        };
      } else {
        return {
          level: 'low',
          title: 'Monitor Symptoms',
          description: 'Continue to monitor your symptoms and seek care if they worsen.',
          color: '#10B981',
          backgroundColor: isDarkMode ? '#1A2E1A' : '#F0FDF4',
          icon: 'ℹ️'
        };
      }
    };

    const urgency = getUrgencyLevel();
    const isUrgent = urgency.level === 'urgent';

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => setCurrentStep('symptoms')} style={[styles.backButton, { backgroundColor: colors.surface }]}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </Svg>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Assessment Results</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Alert Card */}
            <View style={[styles.alertCard, { backgroundColor: urgency.backgroundColor }]}>
              <View style={styles.alertHeader}>
                <View style={[styles.alertIcon, { backgroundColor: urgency.color }]}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="white">
                    <Path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z"/>
                    <Path d="M12 16h.01M12 8v4" stroke="white" strokeWidth={2} fill="none"/>
                  </Svg>
                </View>
                <View style={styles.alertContent}>
                  <Text style={[styles.alertTitle, { color: urgency.color }]}>
                    {urgency.title}
                  </Text>
                  <Text style={[styles.alertDescription, { color: colors.text }]}>
                    {urgency.description}
                  </Text>
                </View>
              </View>
            </View>

            {/* Your Symptoms */}
            <View style={styles.resultsSection}>
              <Text style={[styles.resultsSectionTitle, { color: colors.text }]}>Your Symptoms</Text>
              <View style={styles.symptomsResultsList}>
                {selectedSymptoms.map((symptomId, index) => (
                  <View key={symptomId} style={[styles.symptomResultItem, { backgroundColor: colors.surface }]}>
                    <View style={styles.symptomResultIcon}>
                      <Text style={styles.symptomResultEmoji}>
                        {symptomId === 'fever' ? '🌡️' : 
                         symptomId === 'headache' ? '🤕' :
                         symptomId === 'chest-pain' ? '❤️' :
                         symptomId === 'dizziness' ? '😵‍💫' :
                         symptomId.includes('chest') ? '❤️' :
                         symptomId.includes('pain') ? '😣' : '🔸'}
                      </Text>
                    </View>
                    <Text style={[styles.symptomResultText, { color: colors.text }]}>{getSymptomName(symptomId)}</Text>
                  </View>
                ))}
              </View>
              <Text style={[styles.symptomDetails, { color: colors.textSecondary }]}>
                Severity: {severity ? severity.charAt(0).toUpperCase() + severity.slice(1) : 'Not specified'} • Duration: {duration === 'hours' ? 'A few hours' : duration === '1day' ? '1 day' : duration === '2-7days' ? '2-7 days' : duration === '1-4weeks' ? '1-4 weeks' : duration === 'month+' ? 'More than a month' : 'Not specified'}
              </Text>
            </View>

            {/* Recommendations */}
            <View style={styles.resultsSection}>
              <Text style={[styles.resultsSectionTitle, { color: colors.text }]}>Recommendations</Text>
              <View style={styles.recommendationsList}>
                {isUrgent ? (
                  <>
                    <View style={styles.recommendationItem}>
                      <View style={[styles.recommendationNumber, { backgroundColor: colors.primary }]}>
                        <Text style={styles.recommendationNumberText}>1</Text>
                      </View>
                      <Text style={[styles.recommendationText, { color: colors.text }]}>Visit the nearest emergency room</Text>
                    </View>
                    <View style={styles.recommendationItem}>
                      <View style={[styles.recommendationNumber, { backgroundColor: colors.primary }]}>
                        <Text style={styles.recommendationNumberText}>2</Text>
                      </View>
                      <Text style={[styles.recommendationText, { color: colors.text }]}>Call emergency services if symptoms worsen</Text>
                    </View>
                    <View style={styles.recommendationItem}>
                      <View style={[styles.recommendationNumber, { backgroundColor: colors.primary }]}>
                        <Text style={styles.recommendationNumberText}>3</Text>
                      </View>
                      <Text style={[styles.recommendationText, { color: colors.text }]}>Do not drive yourself to the hospital</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.recommendationItem}>
                      <View style={[styles.recommendationNumber, { backgroundColor: colors.primary }]}>
                        <Text style={styles.recommendationNumberText}>1</Text>
                      </View>
                      <Text style={[styles.recommendationText, { color: colors.text }]}>Monitor your symptoms closely</Text>
                    </View>
                    <View style={styles.recommendationItem}>
                      <View style={[styles.recommendationNumber, { backgroundColor: colors.primary }]}>
                        <Text style={styles.recommendationNumberText}>2</Text>
                      </View>
                      <Text style={[styles.recommendationText, { color: colors.text }]}>Get plenty of rest and stay hydrated</Text>
                    </View>
                    <View style={styles.recommendationItem}>
                      <View style={[styles.recommendationNumber, { backgroundColor: colors.primary }]}>
                        <Text style={styles.recommendationNumberText}>3</Text>
                      </View>
                      <Text style={[styles.recommendationText, { color: colors.text }]}>Contact your healthcare provider if symptoms persist</Text>
                    </View>
                  </>
                )}
              </View>
            </View>

            {/* Possible Conditions */}
            <View style={styles.resultsSection}>
              <Text style={[styles.resultsSectionTitle, { color: colors.text }]}>Possible Conditions</Text>
              <View style={styles.conditionsList}>
                {isUrgent ? (
                  <>
                    <View style={styles.conditionItem}>
                      <View style={[styles.conditionIcon, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.conditionIconText, { color: colors.textSecondary }]}>ⓘ</Text>
                      </View>
                      <Text style={[styles.conditionText, { color: colors.text }]}>Cardiac event</Text>
                    </View>
                    <View style={styles.conditionItem}>
                      <View style={[styles.conditionIcon, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.conditionIconText, { color: colors.textSecondary }]}>ⓘ</Text>
                      </View>
                      <Text style={[styles.conditionText, { color: colors.text }]}>Severe respiratory distress</Text>
                    </View>
                    <View style={styles.conditionItem}>
                      <View style={[styles.conditionIcon, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.conditionIconText, { color: colors.textSecondary }]}>ⓘ</Text>
                      </View>
                      <Text style={[styles.conditionText, { color: colors.text }]}>Medical emergency</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.conditionItem}>
                      <View style={[styles.conditionIcon, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.conditionIconText, { color: colors.textSecondary }]}>ⓘ</Text>
                      </View>
                      <Text style={[styles.conditionText, { color: colors.text }]}>Common viral infection</Text>
                    </View>
                    <View style={styles.conditionItem}>
                      <View style={[styles.conditionIcon, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.conditionIconText, { color: colors.textSecondary }]}>ⓘ</Text>
                      </View>
                      <Text style={[styles.conditionText, { color: colors.text }]}>Stress-related symptoms</Text>
                    </View>
                    <View style={styles.conditionItem}>
                      <View style={[styles.conditionIcon, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.conditionIconText, { color: colors.textSecondary }]}>ⓘ</Text>
                      </View>
                      <Text style={[styles.conditionText, { color: colors.text }]}>Minor health concern</Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={[styles.resultsActions, { backgroundColor: colors.background }]}>
          {isUrgent && (
            <TouchableOpacity style={getButtonStyle(colors, 'cta', 'default', { backgroundColor: colors.error }).button}>
              <Text style={getButtonStyle(colors, 'cta', 'default', { backgroundColor: colors.error }).text}>Find Nearest Emergency Room</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={getButtonStyle(colors, 'primary').button}>
            <Text style={getButtonStyle(colors, 'primary').text}>Schedule Provider Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={getButtonStyle(colors, 'secondary').button}
            onPress={() => {
              setSelectedSymptoms([]);
              setSeverity('');
              setDuration('');
              setAgeRange('');
              setGender('');
              setShowOthersInput(false);
              setCustomSymptom('');
              setCurrentStep('landing');
            }}
          >
            <Text style={getButtonStyle(colors, 'secondary').text}>Start New Assessment</Text>
          </TouchableOpacity>
        </View>

        <BottomNav active="home" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentStep === 'landing' && renderLanding()}
      {currentStep === 'symptoms' && renderSymptomSelection()}
      {currentStep === 'basic-info' && renderBasicInfo()}
      {currentStep === 'results' && renderResults()}
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
  // Landing Screen Styles
  landingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  aiIconContainer: {
    marginBottom: 40,
  },
  aiIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  landingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  landingDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    fontFamily: 'ReadexPro-Medium',
  },
  landingDisclaimer: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#92400e',
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  startButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },

  // Symptoms Screen Styles
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    fontFamily: 'ReadexPro-Medium',
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  symptomButton: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minWidth: '47%',
    alignItems: 'center',
  },
  symptomButtonSelected: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  symptomButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'ReadexPro-Medium',
  },
  symptomButtonTextSelected: {
    color: '#1d4ed8',
  },
  othersButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    minWidth: '47%',
    alignItems: 'center',
  },
  othersButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    fontFamily: 'ReadexPro-Medium',
  },
  // Section Styles
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  // Severity Styles
  severityContainer: {
    gap: 12,
    marginBottom: 32,
  },
  severityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  severityOptionSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  severityContent: {
    flex: 1,
  },
  severityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  severityLabelSelected: {
    color: '#1d4ed8',
  },
  severitySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    fontFamily: 'ReadexPro-Medium',
  },
  // Duration Styles
  durationContainer: {
    gap: 12,
  },
  durationOption: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  durationOptionSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  durationLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    fontFamily: 'ReadexPro-Medium',
  },
  durationLabelSelected: {
    color: '#1d4ed8',
  },
  // Basic Info Styles
  infoBanner: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  infoBannerText: {
    fontSize: 14,
    color: '#1d4ed8',
    textAlign: 'center',
    fontFamily: 'ReadexPro-Medium',
  },
  ageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  ageOption: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minWidth: '47%',
    alignItems: 'center',
  },
  ageOptionSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  ageLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    fontFamily: 'ReadexPro-Medium',
  },
  ageLabelSelected: {
    color: '#1d4ed8',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOption: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  genderOptionSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  genderLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    fontFamily: 'ReadexPro-Medium',
  },
  genderLabelSelected: {
    color: '#1d4ed8',
  },
  // Button Styles
  bottomContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  continueButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  continueButtonTextDisabled: {
    color: '#9ca3af',
  },
  // Custom Symptom Input Styles
  customSymptomContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  customSymptomLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  customSymptomInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  customSymptomInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    fontSize: 16,
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  addSymptomButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSymptomButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  addSymptomButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  addSymptomButtonTextDisabled: {
    color: '#9ca3af',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 14,
    fontFamily: 'ReadexPro-Medium',
  },
  // Selected Symptoms Styles
  selectedSymptomsContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  selectedSymptomsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  selectedSymptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedSymptomTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  selectedSymptomTagText: {
    fontSize: 14,
    color: '#1d4ed8',
    fontWeight: '500',
    marginRight: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  removeSymptomButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeSymptomButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  // Results Screen Styles
  alertCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  alertDescription: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'ReadexPro-Medium',
  },
  resultsSection: {
    marginBottom: 32,
  },
  resultsSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  symptomsResultsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  symptomResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  symptomResultIcon: {
    marginRight: 8,
  },
  symptomResultEmoji: {
    fontSize: 16,
  },
  symptomResultText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    fontFamily: 'ReadexPro-Medium',
  },
  symptomDetails: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'ReadexPro-Medium',
  },
  recommendationsList: {
    gap: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recommendationNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  recommendationNumberText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  recommendationText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    fontFamily: 'ReadexPro-Medium',
  },
  conditionsList: {
    gap: 16,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  conditionIconText: {
    fontSize: 14,
    color: '#6b7280',
  },
  conditionText: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'ReadexPro-Medium',
  },
  resultsActions: {
    padding: 20,
    gap: 12,
  },
  emergencyButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  appointmentButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  appointmentButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  newAssessmentButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  newAssessmentButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'ReadexPro-Medium',
  },
});

export default SymptomCheckerScreen;
