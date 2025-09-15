import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface HealthArticlesScreenProps {
  onBack: () => void;
  onArticlePress: (articleId: string) => void;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  imageUrl?: any;
  tags: string[];
  likes: number;
  comments: number;
  isBookmarked: boolean;
}

const HealthArticlesScreenContent: React.FC<HealthArticlesScreenProps> = ({ onBack, onArticlePress }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Articles', count: 24 },
    { id: 'nutrition', label: 'Nutrition', count: 8 },
    { id: 'fitness', label: 'Fitness', count: 6 },
    { id: 'mental-health', label: 'Mental Health', count: 5 },
    { id: 'preventive-care', label: 'Preventive Care', count: 3 },
    { id: 'chronic-conditions', label: 'Chronic Conditions', count: 2 }
  ];

  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: '5 Ways to Manage Stress Daily',
      excerpt: 'Learn effective techniques to manage daily stress and improve your mental wellbeing.',
      author: 'Dr. Sarah Chen',
      publishDate: '2024-01-15',
      readTime: '5 min read',
      category: 'mental-health',
      imageUrl: require('../assets/images/1140-man-at-desk.jpg'),
      tags: ['stress management', 'mental health', 'wellness', 'daily tips'],
      likes: 142,
      comments: 23,
      isBookmarked: false
    },
    {
      id: '2',
      title: '10 Healthy Habits for a Longer Life',
      excerpt: 'Discover simple daily habits that can significantly improve your longevity and quality of life.',
      author: 'Dr. Michael Rodriguez',
      publishDate: '2024-01-12',
      readTime: '8 min read',
      category: 'lifestyle',
      imageUrl: require('../assets/images/images.jpg'),
      tags: ['lifestyle', 'longevity', 'habits', 'wellness'],
      likes: 98,
      comments: 15,
      isBookmarked: true
    },
    {
      id: '3',
      title: 'Diabetes: Causes, and Prevention',
      excerpt: 'Understanding diabetes, its causes, and effective prevention strategies for better health.',
      author: 'Dr. Emily Watson',
      publishDate: '2024-01-10',
      readTime: '6 min read',
      category: 'chronic-conditions',
      imageUrl: require('../assets/images/MicrosoftTeams-image-10-1020x680.jpg.optimal.jpg'),
      tags: ['diabetes', 'prevention', 'health conditions', 'management'],
      likes: 76,
      comments: 12,
      isBookmarked: false
    },
    {
      id: '4',
      title: 'Heart Health: Exercise Tips',
      excerpt: 'Essential exercises and lifestyle changes to maintain a healthy heart and cardiovascular system.',
      author: 'Dr. Lisa Park',
      publishDate: '2024-01-08',
      readTime: '7 min read',
      category: 'fitness',
      imageUrl: require('../assets/images/Heart-health-feb-copy.jpg'),
      tags: ['heart health', 'exercise', 'fitness', 'cardiovascular'],
      likes: 134,
      comments: 28,
      isBookmarked: false
    },
    {
      id: '5',
      title: 'Sleep Better: Night Routines',
      excerpt: 'Create the perfect bedtime routine for better sleep quality and overall health.',
      author: 'Dr. James Wilson',
      publishDate: '2024-01-05',
      readTime: '4 min read',
      category: 'sleep',
      imageUrl: require('../assets/images/why-is-sleep-important.jpg'),
      tags: ['sleep', 'routines', 'health', 'wellness'],
      likes: 89,
      comments: 18,
      isBookmarked: true
    },
    {
      id: '6',
      title: 'Understanding Diabetes: Prevention and Management',
      excerpt: 'Comprehensive guide to understanding diabetes, its risk factors, and effective management strategies.',
      author: 'Dr. Maria Garcia',
      publishDate: '2024-01-03',
      readTime: '10 min read',
      category: 'chronic-conditions',
      tags: ['diabetes', 'chronic disease', 'prevention', 'management'],
      likes: 67,
      comments: 21,
      isBookmarked: false
    },
    {
      id: '7',
      title: 'The Power of Meditation for Physical Health',
      excerpt: 'Discover how regular meditation practice can improve your physical health and boost your immune system.',
      author: 'Dr. Alex Thompson',
      publishDate: '2024-01-01',
      readTime: '6 min read',
      category: 'mental-health',
      tags: ['meditation', 'mindfulness', 'physical health', 'wellness'],
      likes: 112,
      comments: 19,
      isBookmarked: false
    },
    {
      id: '8',
      title: 'Building Muscle After 40: A Complete Guide',
      excerpt: 'Age-specific strategies for building and maintaining muscle mass, including nutrition and exercise recommendations.',
      author: 'Coach David Lee',
      publishDate: '2023-12-28',
      readTime: '8 min read',
      category: 'fitness',
      tags: ['muscle building', 'aging', 'strength training', 'nutrition'],
      likes: 95,
      comments: 16,
      isBookmarked: false
    }
  ]);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookmarkToggle = (articleId: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nutrition':
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
          </Svg>
        );
      case 'fitness':
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </Svg>
        );
      case 'mental-health':
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </Svg>
        );
      case 'preventive-care':
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.warning} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </Svg>
        );
      case 'chronic-conditions':
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </Svg>
        );
      default:
        return (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </Svg>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const ArticleCard = ({ article }: { article: Article }) => (
    <TouchableOpacity 
      style={[styles.articleCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => onArticlePress(article.id)}
    >
      <View style={styles.articleHeader}>
        <View style={styles.categoryBadge}>
          {getCategoryIcon(article.category)}
          <Text style={styles.categoryText}>
            {categories.find(cat => cat.id === article.category)?.label || 'Article'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.bookmarkButton}
          onPress={() => handleBookmarkToggle(article.id)}
        >
          <Svg 
            width={20} 
            height={20} 
            viewBox="0 0 24 24" 
            fill={bookmarkedArticles.includes(article.id) || article.isBookmarked ? "#3B82F6" : "none"} 
            stroke={colors.primary} 
            strokeWidth={2}
          >
            <Path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </Svg>
        </TouchableOpacity>
      </View>
      
      {article.imageUrl && (
        <View style={styles.articleImageContainer}>
          <Image 
            source={article.imageUrl}
            style={styles.articleImage}
            resizeMode="cover"
          />
        </View>
      )}
      
      <Text style={[styles.articleTitle, { color: colors.text }]}>{article.title}</Text>
      <Text style={[styles.articleExcerpt, { color: colors.textSecondary }]}>{article.excerpt}</Text>
      
      <View style={styles.articleMeta}>
        <Text style={[styles.authorText, { color: colors.textSecondary }]}>By {article.author}</Text>
        <Text style={[styles.metaDot, { color: colors.textSecondary }]}>•</Text>
        <Text style={[styles.dateText, { color: colors.textSecondary }]}>{formatDate(article.publishDate)}</Text>
        <Text style={[styles.metaDot, { color: colors.textSecondary }]}>•</Text>
        <Text style={[styles.readTimeText, { color: colors.textSecondary }]}>{article.readTime}</Text>
      </View>
      
      <View style={styles.articleTags}>
        {article.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.articleStats}>
        <View style={styles.statItem}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </Svg>
          <Text style={[styles.statText, { color: colors.textSecondary }]}>{article.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </Svg>
          <Text style={[styles.statText, { color: colors.textSecondary }]}>{article.comments} comments</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surface }]} onPress={onBack}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Health Articles</Text>
        <TouchableOpacity style={styles.searchToggle}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
            <Circle cx="11" cy="11" r="8" />
            <Path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={[styles.scrollContainer, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchInputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
              <Circle cx="11" cy="11" r="8" />
              <Path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
            </Svg>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search articles, topics, or authors..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        {/* Featured Article */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Article</Text>
          <TouchableOpacity 
            style={styles.featuredCard}
            onPress={() => onArticlePress(articles[0].id)}
          >
            <View style={styles.featuredImageContainer}>
              {articles[0].imageUrl && (
                <Image 
                  source={articles[0].imageUrl}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
              )}
              <View style={styles.featuredImageOverlay} />
            </View>
            <View style={styles.featuredContent}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>FEATURED</Text>
              </View>
              <Text style={styles.featuredTitle}>{articles[0].title}</Text>
              <Text style={styles.featuredExcerpt}>{articles[0].excerpt}</Text>
              <View style={styles.featuredMeta}>
                <Text style={styles.featuredAuthor}>By {articles[0].author}</Text>
                <Text style={styles.featuredReadTime}>{articles[0].readTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id && styles.categoryButtonTextActive
                ]}>
                  {category.label} ({category.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Articles List */}
        <View style={styles.articlesSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(cat => cat.id === selectedCategory)?.label} Articles`}
            <Text style={styles.articleCount}> ({filteredArticles.length})</Text>
          </Text>
          
          {filteredArticles.length === 0 ? (
            <View style={styles.emptyState}>
              <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth={1}>
                <Circle cx="11" cy="11" r="8" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
              </Svg>
              <Text style={styles.emptyStateTitle}>No articles found</Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search terms or browse different categories
              </Text>
            </View>
          ) : (
            <View style={styles.articlesList}>
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  searchToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    height: '100%',
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    marginLeft: 12,
  },
  featuredSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 16,
  },
  featuredCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  featuredImageContainer: {
    height: 200,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  featuredImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  featuredImagePlaceholder: {
    height: 200,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredContent: {
    padding: 20,
  },
  featuredBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
    lineHeight: 28,
  },
  featuredExcerpt: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 22,
    marginBottom: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredAuthor: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '600',
  },
  featuredReadTime: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryScroll: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  articlesSection: {
    marginBottom: 32,
  },
  articleCount: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  articlesList: {
    gap: 16,
  },
  articleCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  articleImageContainer: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
  },
  articleImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  bookmarkButton: {
    padding: 4,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleExcerpt: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 20,
    marginBottom: 12,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorText: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  metaDot: {
    fontSize: 14,
    color: colors.border,
    marginHorizontal: 8,
  },
  dateText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  readTimeText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  articleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  articleStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});

const HealthArticlesScreen: React.FC<HealthArticlesScreenProps> = (props) => {
  return <HealthArticlesScreenContent {...props} />;
};

export default HealthArticlesScreen;
