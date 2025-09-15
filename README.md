# Onboarding Flow Components

This directory contains the onboarding flow components for the YouDoc health app.

## Components

### OnboardingFlow
Main container component that manages the flow between all onboarding screens.

**Props:**
- `onComplete: () => void` - Called when the onboarding flow is completed

### Individual Screens

1. **WelcomeScreen** - Introduction to YouDoc
2. **WellnessScreen** - Health tracking features
3. **CarepointScreen** - Personalized experience
4. **AuthScreen** - Authentication options

## Usage

### In your app:

```tsx
import OnboardingFlow from '../components/onboarding/OnboardingFlow';

export default function OnboardingScreen() {
  const handleOnboardingComplete = () => {
    // Navigate to main app
    router.replace('/(tabs)');
  };

  return (
    <OnboardingFlow onComplete={handleOnboardingComplete} />
  );
}
```

### Navigation

To navigate to the onboarding screen:
```tsx
import { router } from 'expo-router';

// Navigate to onboarding
router.push('/onboarding');
```

## Features

- ✅ 4 connected screens with smooth navigation
- ✅ Progress indicators
- ✅ Skip functionality
- ✅ Authentication options (Email, Google, Apple)
- ✅ Responsive design
- ✅ TypeScript support
- ✅ React Native styling (converted from Tailwind CSS)

## Styling

The components use inline React Native styles that replicate the original Tailwind CSS design:
- Gray background (#f9fafb)
- Blue accent color (#3b82f6)
- Consistent typography and spacing
- Mobile-first responsive design

## Authentication Handlers

The AuthScreen includes placeholder handlers for:
- Email authentication
- Google OAuth
- Apple Sign In
- Account creation

These should be connected to your authentication service (Firebase, etc.).

