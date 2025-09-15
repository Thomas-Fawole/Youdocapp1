import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

import BottomNav from './ui/BottomNav';

interface Comment {
  id: number;
  author: string;
  text: string;
  avatar?: string;
}

interface ArticleDetailScreenProps {
  onBack: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

const ArticleDetailScreenContent: React.FC<ArticleDetailScreenProps> = ({ onBack, onHome, onNotifications, onProfile }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Sheun Crest',
      text: 'Wonderful article very insightful',
      avatar: undefined
    }
  ]);

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        author: 'You',
        text: comment,
        avatar: undefined
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
          {/* Article Card */}
          <View style={styles.articleCard}>
            {/* Hero Image */}
            <View style={styles.heroImageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                style={styles.heroImage}
                defaultSource={require('../assets/images/partial-react-logo.png')}
              />
              {/* Fallback placeholder */}
              <View style={styles.imageFallback}>
                <Svg width={64} height={64} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={1}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </Svg>
                <Text style={styles.imageFallbackText}>Stress Management Image</Text>
              </View>
              
              {/* Overlay content */}
              <View style={styles.imageOverlay}>
                <View style={styles.tagContainer}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>#Health</Text>
                  </View>
                  <Text style={styles.dateText}>Mon, Jan 3, 2022</Text>
                </View>
                <Text style={styles.heroTitle}>5 Ways to Manage Stress Daily</Text>
                
                {/* Author */}
                <View style={styles.authorContainer}>
                  <View style={styles.authorAvatar}>
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </Svg>
                  </View>
                  <Text style={styles.authorName}>Theodora Thompson</Text>
                </View>
              </View>
            </View>

            {/* Article Content */}
            <View style={styles.articleContent}>
              <Text style={styles.articleText}>
                Stress is your body's natural response to a challenge or demand. In small doses, it can be helpful—motivating you to meet a deadline or perform under pressure. But chronic stress can take a serious toll, leading to headaches, sleep problems, high blood pressure, and even a weakened immune system.
              </Text>
              
              <Text style={styles.sectionTitle}>Common Signs of Stress</Text>
              
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Feeling overwhelmed or anxious</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Trouble sleeping</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsCard}>
            <Text style={styles.commentsTitle}>Comments</Text>
            
            {/* Comments List */}
            <View style={styles.commentsList}>
              {comments.map((commentItem) => (
                <View key={commentItem.id} style={styles.commentItem}>
                  <View style={styles.commentAvatar}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </Svg>
                  </View>
                  <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>{commentItem.author}</Text>
                    <Text style={styles.commentText}>{commentItem.text}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Comment Input */}
            <View style={styles.commentInputContainer}>
              <View style={styles.commentInputWrapper}>
                <TextInput
                  style={styles.commentInput}
                  value={comment}
                  onChangeText={setComment}
                  placeholder="Type your comment"
                  placeholderTextColor={colors.textSecondary}
                  onSubmitEditing={handleAddComment}
                />
              </View>
              <TouchableOpacity
                onPress={handleAddComment}
                disabled={!comment.trim()}
                style={[styles.sendButton, !comment.trim() && styles.sendButtonDisabled]}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.background} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav active="home" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    backgroundColor: colors.surface,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  contentPadding: {
    paddingHorizontal: 24,
  },
  articleCard: {
    backgroundColor: colors.background,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 24,
  },
  heroImageContainer: {
    position: 'relative',
    height: 256,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFallbackText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 32,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    backgroundColor: colors.surface,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  articleContent: {
    padding: 24,
  },
  articleText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  bulletList: {
    gap: 12,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  commentsCard: {
    backgroundColor: colors.background,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
  },
  commentsList: {
    gap: 16,
    marginBottom: 24,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    backgroundColor: colors.border,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commentInputWrapper: {
    flex: 1,
    position: 'relative',
  },
  commentInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderRadius: 16,
    fontSize: 16,
    color: colors.text,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.surface,
  },
});

const ArticleDetailScreen: React.FC<ArticleDetailScreenProps> = (props) => {
  return <ArticleDetailScreenContent {...props} />;
};

export default ArticleDetailScreen;
