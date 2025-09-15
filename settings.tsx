import React, { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import SettingsScreen from '../components/SettingsScreen';

export default function SettingsRoute() {
  const params = useLocalSearchParams();
  const handleBack = () => {
    router.back();
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handlePrivacy = () => {
    router.push('/privacy');
  };

  const handleHelp = () => {
    router.push('/health-support');
  };

  const handleAbout = () => {
    router.push('/about');
  };

  const handleSubscription = () => {
    router.push('/subscription');
  };

  return (
    <SettingsScreen
      onBack={handleBack}
      onProfile={handleProfile}
      onNotifications={handleNotifications}
      onPrivacy={handlePrivacy}
      onHelp={handleHelp}
      onAbout={handleAbout}
      onSubscription={handleSubscription}
    />
  );
}

