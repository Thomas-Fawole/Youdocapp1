import React from 'react';
import { router } from 'expo-router';
import DashboardScreen from '../components/DashboardScreen';

export default function DashboardRoute() {
  const handleHome = () => {
    // Stay on dashboard since this is the main screen
    console.log('Home navigation');
  };

  const handleNotifications = () => {
    // Navigate to notifications screen
    router.push('/notifications');
  };

  const handleProfile = () => {
    // Navigate to profile screen
    router.push('/profile');
  };

  const handleSeeDoctor = () => {
    // Navigate to see doctor screen
    console.log('See doctor navigation');
  };

  const handleArticles = () => {
    router.push('/health-articles');
  };

  const handleHealthRecords = () => {
    router.push('/health-records');
  };

  const handleSymptomChecker = () => {
    // Navigate to symptom checker screen
    router.push('/symptom-checker');
  };

  const handleMedications = () => {
    // Navigate to my medication screen
    router.push('/my-medication');
  };

  const handleSettings = () => {
    // Navigate to settings screen
    router.push('/settings');
  };

  return (
    <DashboardScreen
      onHome={handleHome}
      onNotifications={handleNotifications}
      onProfile={handleProfile}
      onSeeDoctor={handleSeeDoctor}
      onArticles={handleArticles}
      onHealthRecords={handleHealthRecords}
      onSymptomChecker={handleSymptomChecker}
      onMedications={handleMedications}
      onSettings={handleSettings}
    />
  );
}
