import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface SubscriptionScreenProps {
  onBack: () => void;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ onBack }) => {
  const { colors } = useTheme();
  const [currentPlan, setCurrentPlan] = useState('free'); // 'free', 'pro', 'premium'

  const PlanCard = ({ 
    planId,
    title, 
    price, 
    period,
    description,
    features,
    isPopular = false,
    isCurrentPlan = false
  }: {
    planId: string;
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    isCurrentPlan?: boolean;
  }) => (
    <View style={[
      styles.planCard,
      { backgroundColor: colors.surface, borderColor: colors.border },
      isPopular && { borderColor: colors.primary, backgroundColor: colors.surface },
      isCurrentPlan && { borderColor: colors.success, backgroundColor: colors.surface }
    ]}>
      {isPopular && (
        <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.popularBadgeText}>Most Popular</Text>
        </View>
      )}
      
      <View style={styles.planHeader}>
        <Text style={[styles.planTitle, { color: colors.text }]}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.planPrice, { color: colors.primary }]}>{price}</Text>
          <Text style={[styles.planPeriod, { color: colors.textSecondary }]}>{period}</Text>
        </View>
        <Text style={[styles.planDescription, { color: colors.textSecondary }]}>{description}</Text>
      </View>
      
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </Svg>
            <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.planButton,
          isCurrentPlan ? { backgroundColor: colors.success } : (isPopular ? { backgroundColor: colors.primary } : { backgroundColor: colors.inputBackground })
        ]}
        onPress={() => handlePlanSelection(planId, title)}
        disabled={isCurrentPlan}
      >
        <Text style={[
          styles.planButtonText,
          { color: isCurrentPlan || isPopular ? '#ffffff' : colors.text }
        ]}>
          {isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const FeatureComparison = () => (
    <View style={styles.comparisonContainer}>
              <Text style={[styles.comparisonTitle, { color: colors.text }]}>Feature Comparison</Text>
      
              <View style={[styles.comparisonTable, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.comparisonHeader, { backgroundColor: colors.inputBackground }]}>
          <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>Feature</Text>
          <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>Free</Text>
          <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>Pro</Text>
          <Text style={[styles.comparisonHeaderText, { color: colors.text }]}>Premium</Text>
        </View>
        
        {[
          { feature: 'Basic Health Tracking', free: true, pro: true, premium: true },
          { feature: 'Medication Reminders', free: true, pro: true, premium: true },
          { feature: 'Health Records Storage', free: '5 records', pro: 'Unlimited', premium: 'Unlimited' },
          { feature: 'AI Health Insights', free: false, pro: true, premium: true },
          { feature: 'Telemedicine Integration', free: false, pro: true, premium: true },
          { feature: 'Advanced Analytics', free: false, pro: false, premium: true },
          { feature: 'Priority Support', free: false, pro: false, premium: true },
          { feature: 'Family Sharing', free: false, pro: false, premium: true }
        ].map((row, index) => (
          <View key={index} style={[styles.comparisonRow, { borderBottomColor: colors.border }]}>
            <Text style={[styles.comparisonFeature, { color: colors.text }]}>{row.feature}</Text>
            <View style={styles.comparisonCell}>
              {typeof row.free === 'boolean' ? (
                row.free ? (
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </Svg>
                ) : (
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                  </Svg>
                )
              ) : (
                <Text style={[styles.comparisonText, { color: colors.textSecondary }]}>{row.free}</Text>
              )}
            </View>
            <View style={styles.comparisonCell}>
              {typeof row.pro === 'boolean' ? (
                row.pro ? (
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </Svg>
                ) : (
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                  </Svg>
                )
              ) : (
                <Text style={[styles.comparisonText, { color: colors.textSecondary }]}>{row.pro}</Text>
              )}
            </View>
            <View style={styles.comparisonCell}>
              {typeof row.premium === 'boolean' ? (
                row.premium ? (
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </Svg>
                ) : (
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                  </Svg>
                )
              ) : (
                <Text style={[styles.comparisonText, { color: colors.textSecondary }]}>{row.premium}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const handlePlanSelection = (planId: string, planTitle: string) => {
    if (planId === currentPlan) return;
    
    Alert.alert(
      'Confirm Subscription',
      `Are you sure you want to switch to ${planTitle}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Subscribe', 
          onPress: () => {
            setCurrentPlan(planId);
            Alert.alert('Success', `You've successfully subscribed to ${planTitle}!`);
          }
        }
      ]
    );
  };

  const handleManageSubscription = () => {
    Alert.alert(
      'Manage Subscription',
      'Choose an option:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Change Payment Method', onPress: () => console.log('Change payment method') },
        { text: 'View Billing History', onPress: () => console.log('View billing history') },
        { text: 'Cancel Subscription', style: 'destructive', onPress: () => handleCancelSubscription() }
      ]
    );
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription? You\'ll lose access to premium features at the end of your billing cycle.',
      [
        { text: 'Keep Subscription', style: 'cancel' },
        { 
          text: 'Cancel Subscription', 
          style: 'destructive',
          onPress: () => {
            setCurrentPlan('free');
            Alert.alert('Subscription Cancelled', 'Your subscription has been cancelled. You can continue using the free version.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={onBack}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Subscription</Text>
        <TouchableOpacity style={styles.manageButton} onPress={handleManageSubscription}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Current Plan Status */}
        {currentPlan !== 'free' && (
          <View style={[styles.currentPlanStatus, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.statusIcon, { backgroundColor: colors.success }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </Svg>
            </View>
            <View style={styles.statusContent}>
              <Text style={[styles.statusTitle, { color: colors.text }]}>Active Subscription</Text>
              <Text style={[styles.statusSubtitle, { color: colors.textSecondary }]}>
                YouDoc {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} • Renews on March 15, 2024
              </Text>
            </View>
          </View>
        )}

        {/* Subscription Plans */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Choose Your Plan</Text>
        
        <View style={styles.plansContainer}>
          <PlanCard
            planId="free"
            title="Free"
            price="$0"
            period="forever"
            description="Perfect for getting started with basic health tracking"
            features={[
              'Basic health metrics tracking',
              'Medication reminders',
              'Up to 5 health records',
              'Basic reporting',
              'Community support'
            ]}
            isCurrentPlan={currentPlan === 'free'}
          />
          
          <PlanCard
            planId="pro"
            title="Pro"
            price="$9.99"
            period="month"
            description="Enhanced features for serious health management"
            features={[
              'Everything in Free',
              'Unlimited health records',
              'AI-powered health insights',
              'Telemedicine integration',
              'Advanced analytics',
              'Priority email support'
            ]}
            isPopular={true}
            isCurrentPlan={currentPlan === 'pro'}
          />
          
          <PlanCard
            planId="premium"
            title="Premium"
            price="$19.99"
            period="month"
            description="Complete health ecosystem for you and your family"
            features={[
              'Everything in Pro',
              'Family sharing (up to 6 members)',
              'Personalized health coaching',
              'Advanced predictive analytics',
              '24/7 priority phone support',
              'Concierge health services',
              'Integration with wearables'
            ]}
            isCurrentPlan={currentPlan === 'premium'}
          />
        </View>

        {/* Feature Comparison */}
        <FeatureComparison />

        {/* Benefits Section */}
        <View style={styles.benefitsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Why Upgrade?</Text>
          
          <View style={styles.benefitItem}>
            <View style={[styles.benefitIcon, { backgroundColor: colors.inputBackground }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </Svg>
            </View>
            <View style={styles.benefitContent}>
              <Text style={[styles.benefitTitle, { color: colors.text }]}>AI-Powered Insights</Text>
              <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
                Get personalized health recommendations based on your data patterns and trends
              </Text>
            </View>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={[styles.benefitIcon, { backgroundColor: colors.inputBackground }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </Svg>
            </View>
            <View style={styles.benefitContent}>
              <Text style={[styles.benefitTitle, { color: colors.text }]}>Enhanced Security</Text>
              <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
                Premium encryption and advanced security features to protect your sensitive health data
              </Text>
            </View>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={[styles.benefitIcon, { backgroundColor: colors.inputBackground }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </Svg>
            </View>
            <View style={styles.benefitContent}>
              <Text style={[styles.benefitTitle, { color: colors.text }]}>Priority Support</Text>
              <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
                Get faster response times and dedicated support from our health technology experts
              </Text>
            </View>
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.faqContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
          
          <View style={[styles.faqItem, { backgroundColor: colors.inputBackground }]}>
            <Text style={[styles.faqQuestion, { color: colors.text }]}>Can I cancel my subscription anytime?</Text>
            <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
              Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing cycle.
            </Text>
          </View>
          
          <View style={[styles.faqItem, { backgroundColor: colors.inputBackground }]}>
            <Text style={[styles.faqQuestion, { color: colors.text }]}>What happens to my data if I downgrade?</Text>
            <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
              Your data is never deleted. If you downgrade, some premium features will be disabled, but all your health records remain accessible.
            </Text>
          </View>
          
          <View style={[styles.faqItem, { backgroundColor: colors.inputBackground }]}>
            <Text style={[styles.faqQuestion, { color: colors.text }]}>Do you offer family discounts?</Text>
            <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
              Our Premium plan includes family sharing for up to 6 members at no additional cost, making it the most economical option for families.
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  manageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    height: '100%',
  },
  currentPlanStatus: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#065F46',
    fontFamily: 'ReadexPro-Medium',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 16,
  },
  plansContainer: {
    gap: 16,
    marginBottom: 32,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 20,
    position: 'relative',
  },
  popularPlan: {
    borderColor: '#3B82F6',
    backgroundColor: '#FAFBFF',
  },
  currentPlan: {
    borderColor: '#10B981',
    backgroundColor: '#F9FDF9',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  planHeader: {
    marginBottom: 20,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3B82F6',
    fontFamily: 'ReadexPro-Medium',
  },
  planPeriod: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  planDescription: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 22,
  },
  featuresContainer: {
    gap: 12,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'ReadexPro-Medium',
    flex: 1,
  },
  planButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  defaultPlanButton: {
    backgroundColor: '#F3F4F6',
  },
  popularPlanButton: {
    backgroundColor: '#3B82F6',
  },
  currentPlanButton: {
    backgroundColor: '#10B981',
  },
  planButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  defaultPlanButtonText: {
    color: '#374151',
  },
  popularPlanButtonText: {
    color: '#ffffff',
  },
  currentPlanButtonText: {
    color: '#ffffff',
  },
  comparisonContainer: {
    marginBottom: 32,
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 16,
  },
  comparisonTable: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  comparisonHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  comparisonHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'ReadexPro-Medium',
    flex: 1,
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  comparisonFeature: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'ReadexPro-Medium',
    flex: 1,
  },
  comparisonCell: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  benefitsContainer: {
    marginBottom: 32,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 20,
  },
  faqContainer: {
    marginBottom: 32,
  },
  faqItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default SubscriptionScreen;
