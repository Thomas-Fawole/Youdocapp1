import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { colors } = useTheme();

  const handleSocialPress = (platform: string) => {
    switch (platform) {
      case 'twitter':
        Linking.openURL('https://twitter.com/youdoc');
        break;
      case 'facebook':
        Linking.openURL('https://facebook.com/youdoc');
        break;
      case 'instagram':
        Linking.openURL('https://instagram.com/youdoc');
        break;
      case 'linkedin':
        Linking.openURL('https://linkedin.com/company/youdoc');
        break;
    }
  };

  const FeatureCard = ({ 
    icon, 
    title, 
    description 
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.featureIcon, { backgroundColor: `${colors.primary}15` }]}>
        {icon}
      </View>
      <Text style={[styles.featureTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>{description}</Text>
    </View>
  );

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
            </Svg>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>About YouDoc</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          {/* App Logo and Description */}
          <View style={styles.logoSection}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
              <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </Svg>
            </View>
            <Text style={[styles.appName, { color: colors.text }]}>YouDoc</Text>
            <Text style={[styles.version, { color: colors.textSecondary }]}>Version 2.1.0</Text>
            <Text style={[styles.appDescription, { color: colors.textSecondary }]}>
              Your comprehensive health companion, designed to help you track medications, monitor symptoms, 
              and maintain your wellness journey with ease and confidence.
            </Text>
          </View>

          {/* Mission Statement */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Mission</Text>
            <Text style={[styles.missionText, { color: colors.textSecondary }]}>
              To empower individuals to take control of their health through innovative technology, 
              providing accessible tools that make healthcare management simple, secure, and effective.
            </Text>
          </View>

          {/* Key Features */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Features</Text>
          <View style={styles.featuresContainer}>
            <FeatureCard
              icon={
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </Svg>
              }
              title="Medication Management"
              description="Track your medications with smart reminders and dosage tracking"
            />
            
            <FeatureCard
              icon={
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </Svg>
              }
              title="Health Monitoring"
              description="Monitor vital signs and track your health progress over time"
            />
            
            <FeatureCard
              icon={
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </Svg>
              }
              title="Health Articles"
              description="Access expert-curated health articles and wellness tips"
            />
            
            <FeatureCard
              icon={
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </Svg>
              }
              title="Secure Data"
              description="Your health data is protected with enterprise-grade security"
            />
            
            <FeatureCard
              icon={
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </Svg>
              }
              title="Easy Sharing"
              description="Seamlessly connect with healthcare providers and share your data securely"
            />
          </View>

          {/* Social Media */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Connect With Us</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleSocialPress('twitter')}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#1DA1F2" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </Svg>
              <Text style={[styles.socialText, { color: colors.text }]}>Twitter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleSocialPress('facebook')}
            >
              <Svg width={20} height={20} viewBox="0 0 17 17" fill="none">
                <Path d="M14.1666 8.53548C14.1534 7.45561 13.8318 6.40203 13.2398 5.4988C12.6478 4.59557 11.81 3.88032 10.8251 3.43728C9.84023 2.99424 8.74925 2.84186 7.68066 2.99809C6.61207 3.15431 5.61038 3.61264 4.79355 4.31909C3.97671 5.02554 3.37876 5.95069 3.07011 6.98559C2.76145 8.02049 2.75496 9.12204 3.05138 10.1605C3.3478 11.199 3.93479 12.1311 4.74323 12.8472C5.55167 13.5632 6.54789 14.0333 7.61456 14.2021V10.1859H6.1979V8.53548H7.61456V7.28173C7.58178 6.9902 7.61339 6.69503 7.70715 6.41706C7.80091 6.13908 7.95454 5.88507 8.15719 5.67296C8.35985 5.46084 8.60659 5.29579 8.88001 5.18946C9.15342 5.08313 9.44684 5.0381 9.73956 5.05756C10.1644 5.06359 10.5883 5.10148 11.0075 5.1709V6.58756H10.2991C10.177 6.57216 10.053 6.5844 9.93618 6.62338C9.8194 6.66236 9.71288 6.72708 9.62448 6.81276C9.53608 6.89844 9.46806 7.00289 9.42545 7.11839C9.38284 7.2339 9.36673 7.3575 9.37831 7.48006V8.54964H10.9508L10.6958 10.2001H9.3854V14.1667C10.7241 13.955 11.9425 13.2704 12.8197 12.2373C13.697 11.2041 14.1748 9.89078 14.1666 8.53548Z" fill="#1877F2"/>
              </Svg>
              <Text style={[styles.socialText, { color: colors.text }]}>Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleSocialPress('instagram')}
            >
              <Svg width={20} height={20} viewBox="0 0 12 12" fill="none">
                <Defs>
                  <RadialGradient id="paint0_radial_instagram" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.1875 12.9242) rotate(-90) scale(11.8929 11.0613)">
                    <Stop stopColor="#FFDD55"/>
                    <Stop offset="0.1" stopColor="#FFDD55"/>
                    <Stop offset="0.5" stopColor="#FF543E"/>
                    <Stop offset="1" stopColor="#C837AB"/>
                  </RadialGradient>
                  <RadialGradient id="paint1_radial_instagram" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-2.01005 0.864422) rotate(78.681) scale(5.31619 21.9135)">
                    <Stop stopColor="#3771C8"/>
                    <Stop offset="0.128" stopColor="#3771C8"/>
                    <Stop offset="1" stopColor="#6600FF" stopOpacity="0"/>
                  </RadialGradient>
                </Defs>
                <Path d="M9.1875 0H2.8125C1.2592 0 0 1.2592 0 2.8125V9.1875C0 10.7408 1.2592 12 2.8125 12H9.1875C10.7408 12 12 10.7408 12 9.1875V2.8125C12 1.2592 10.7408 0 9.1875 0Z" fill="url(#paint0_radial_instagram)"/>
                <Path d="M9.1875 0H2.8125C1.2592 0 0 1.2592 0 2.8125V9.1875C0 10.7408 1.2592 12 2.8125 12H9.1875C10.7408 12 12 10.7408 12 9.1875V2.8125C12 1.2592 10.7408 0 9.1875 0Z" fill="url(#paint1_radial_instagram)"/>
                <Path d="M6.00042 1.3125C4.72739 1.3125 4.56759 1.31808 4.06763 1.34081C3.56859 1.36369 3.22795 1.44267 2.92992 1.55859C2.62158 1.67831 2.36006 1.83848 2.09953 2.09911C1.83877 2.35969 1.67859 2.6212 1.5585 2.92941C1.44225 3.22753 1.36317 3.56831 1.34072 4.06711C1.31836 4.56712 1.3125 4.72697 1.3125 6.00005C1.3125 7.27313 1.31813 7.43241 1.34081 7.93237C1.36378 8.43141 1.44277 8.77205 1.55859 9.07008C1.67841 9.37842 1.83858 9.63994 2.0992 9.90047C2.35969 10.1612 2.6212 10.3218 2.92931 10.4415C3.22758 10.5574 3.56827 10.6364 4.0672 10.6593C4.56722 10.682 4.72688 10.6876 5.99986 10.6876C7.27303 10.6876 7.43231 10.682 7.93228 10.6593C8.43131 10.6364 8.77233 10.5574 9.07059 10.4415C9.3788 10.3218 9.63994 10.1612 9.90037 9.90047C10.1611 9.63994 10.3213 9.37842 10.4414 9.07022C10.5566 8.77205 10.6357 8.43131 10.6592 7.93247C10.6816 7.4325 10.6875 7.27313 10.6875 6.00005C10.6875 4.72697 10.6816 4.56722 10.6592 4.0672C10.6357 3.56817 10.5566 3.22758 10.4414 2.92955C10.3213 2.6212 10.1611 2.35969 9.90037 2.09911C9.63966 1.83839 9.37889 1.67822 9.07031 1.55864C8.77148 1.44267 8.43066 1.36364 7.93162 1.34081C7.43161 1.31808 7.27242 1.3125 5.99897 1.3125H6.00042ZM5.57991 2.15723C5.70473 2.15705 5.844 2.15723 6.00042 2.15723C7.25203 2.15723 7.40034 2.16173 7.89459 2.18419C8.35162 2.20509 8.59969 2.28145 8.76492 2.34563C8.98369 2.43056 9.13964 2.53214 9.30361 2.69625C9.46767 2.86031 9.5692 3.01655 9.65438 3.23531C9.71855 3.40031 9.795 3.64838 9.81581 4.10541C9.83827 4.59956 9.84314 4.74797 9.84314 5.99897C9.84314 7.24997 9.83827 7.39842 9.81581 7.89253C9.79491 8.34956 9.71855 8.59762 9.65438 8.76267C9.56944 8.98144 9.46767 9.1372 9.30361 9.30117C9.13955 9.46523 8.98378 9.56677 8.76492 9.65175C8.59988 9.7162 8.35162 9.79238 7.89459 9.81328C7.40044 9.83573 7.25203 9.84061 6.00042 9.84061C4.74877 9.84061 4.60041 9.83573 4.1063 9.81328C3.64927 9.79219 3.4012 9.71583 3.23583 9.65166C3.01711 9.56667 2.86083 9.46514 2.69677 9.30108C2.5327 9.13702 2.43117 8.98116 2.346 8.7623C2.28183 8.59725 2.20538 8.34919 2.18456 7.89216C2.16211 7.398 2.15761 7.24959 2.15761 5.9978C2.15761 4.746 2.16211 4.59839 2.18456 4.10423C2.20547 3.6472 2.28183 3.39914 2.346 3.23391C2.43098 3.01514 2.5327 2.85891 2.69681 2.69484C2.86092 2.53078 3.01711 2.4292 3.23587 2.34408C3.40111 2.27962 3.64927 2.20345 4.1063 2.18245C4.53872 2.16291 4.7063 2.15705 5.57991 2.15606V2.15723ZM8.50261 2.93555C8.19206 2.93555 7.94011 3.18727 7.94011 3.49786C7.94011 3.80841 8.19206 4.06036 8.50261 4.06036C8.81316 4.06036 9.06511 3.80841 9.06511 3.49786C9.06511 3.18731 8.81316 2.93536 8.50261 2.93536V2.93555ZM6.00042 3.59278C4.67105 3.59278 3.5932 4.67063 3.5932 6.00005C3.5932 7.32947 4.67105 8.4068 6.00042 8.4068C7.32984 8.4068 8.40731 7.32947 8.40731 6.00005C8.40731 4.67067 7.32975 3.59278 6.00033 3.59278H6.00042ZM6.00042 4.43752C6.86334 4.43752 7.56295 5.13703 7.56295 6.00005C7.56295 6.86297 6.86334 7.56258 6.00042 7.56258C5.1375 7.56258 4.43794 6.86297 4.43794 6.00005C4.43794 5.13703 5.13745 4.43752 6.00042 4.43752Z" fill="white"/>
              </Svg>
              <Text style={[styles.socialText, { color: colors.text }]}>Instagram</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleSocialPress('linkedin')}
            >
              <Svg width={20} height={20} viewBox="0 0 16 16" fill="none">
                <Path d="M12.6667 2C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667ZM12.3333 12.3333V8.8C12.3333 8.2236 12.1044 7.6708 11.6968 7.26322C11.2892 6.85564 10.7364 6.62667 10.16 6.62667C9.59333 6.62667 8.93333 6.97333 8.61333 7.49333V6.75333H6.75333V12.3333H8.61333V9.04667C8.61333 8.53333 9.02667 8.11333 9.54 8.11333C9.78754 8.11333 10.0249 8.21167 10.2 8.3867C10.375 8.56173 10.4733 8.79913 10.4733 9.04667V12.3333H12.3333ZM4.58667 5.70667C4.88371 5.70667 5.16859 5.58867 5.37863 5.37863C5.58867 5.16859 5.70667 4.88371 5.70667 4.58667C5.70667 3.96667 5.20667 3.46 4.58667 3.46C4.28786 3.46 4.00128 3.5787 3.78999 3.78999C3.5787 4.00128 3.46 4.28786 3.46 4.58667C3.46 5.20667 3.96667 5.70667 4.58667 5.70667ZM5.51333 12.3333V6.75333H3.66667V12.3333H5.51333Z" fill="#0A66C2"/>
              </Svg>
              <Text style={[styles.socialText, { color: colors.text }]}>LinkedIn</Text>
            </TouchableOpacity>
          </View>

          {/* Copyright */}
          <View style={styles.copyrightContainer}>
            <Text style={[styles.copyrightText, { color: colors.textSecondary }]}>
              © 2024 YouDoc. All rights reserved.
            </Text>
            <Text style={[styles.copyrightSubtext, { color: colors.textSecondary }]}>
              Made with ❤️ for better health management
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'ReadexPro-Medium',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    padding: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  version: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  appDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'ReadexPro-Medium',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  missionText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'ReadexPro-Medium',
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'ReadexPro-Medium',
  },
  socialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '48%',
    borderWidth: 1,
  },
  socialText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  copyrightContainer: {
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  copyrightText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'ReadexPro-Medium',
  },
  copyrightSubtext: {
    fontSize: 12,
    fontFamily: 'ReadexPro-Medium',
  },
});

export default AboutScreen;