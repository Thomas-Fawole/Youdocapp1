import React from 'react';
import { router } from 'expo-router';
import NotificationsScreen from '../components/NotificationsScreen';

export default function NotificationsRoute() {
  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push('/dashboard');
  };

  const handleNotifications = () => {
    // Already on notifications screen
    console.log('Already on notifications');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <NotificationsScreen
      onBack={handleBack}
      onHome={handleHome}
      onNotifications={handleNotifications}
      onProfile={handleProfile}
    />
  );
}
