import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Share, 
  TextInput, 
  Alert, 
  Modal, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
  isLiked: boolean;
}

interface Reply {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  views: number;
}

interface EnhancedArticleDetailScreenProps {
  articleId: string;
  onBack: () => void;
}

const EnhancedArticleDetailScreenContent: React.FC<EnhancedArticleDetailScreenProps> = ({ 
  articleId, 
  onBack 
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [article] = useState<Article>({
    id: articleId,
    title: '10 Superfoods to Boost Your Immune System',
    content: `
# Introduction

In today's fast-paced world, maintaining a strong immune system is more important than ever. While there's no magic pill to prevent illness, incorporating certain nutrient-dense foods into your diet can significantly boost your body's natural defenses.

## The Science Behind Superfoods

Superfoods are nutrient-rich foods considered to be especially beneficial for health and well-being. These foods are packed with vitamins, minerals, antioxidants, and other compounds that support immune function.

## Top 10 Immune-Boosting Superfoods

### 1. Citrus Fruits
Rich in vitamin C, citrus fruits like oranges, grapefruits, and lemons help increase the production of white blood cells, which are key to fighting infections.

### 2. Red Bell Peppers
Surprisingly, red bell peppers contain twice as much vitamin C as citrus fruits. They're also a rich source of beta carotene.

### 3. Broccoli
This cruciferous vegetable is supercharged with vitamins A, C, and E, as well as fiber and many other antioxidants.

### 4. Garlic
Garlic's immune-boosting properties come from a heavy concentration of sulfur-containing compounds, such as allicin.

### 5. Ginger
Ginger may help decrease inflammation and reduce nausea. It may also help decrease chronic pain and possess cholesterol-lowering properties.

### 6. Spinach
Rich in vitamin C, antioxidants, and beta carotene, spinach may increase the infection-fighting ability of our immune systems.

### 7. Yogurt
Look for yogurts that have "live and active cultures" printed on the label. These cultures may stimulate your immune system to help fight diseases.

### 8. Almonds
Rich in vitamin E, almonds are key to a healthy immune system. A half-cup serving provides nearly 100% of the recommended daily amount of vitamin E.

### 9. Turmeric
This bright yellow, bitter spice has been used for years as an anti-inflammatory in treating both osteoarthritis and rheumatoid arthritis.

### 10. Green Tea
Green tea is packed with flavonoids, a type of antioxidant. It's also a good source of the amino acid L-theanine, which may aid in the production of germ-fighting compounds in your T-cells.

## How to Incorporate These Foods

The key to a strong immune system is variety. Focus on eating a rainbow of colors to ensure you're getting a wide range of nutrients. Try to include at least 2-3 of these superfoods in each meal.

## Conclusion

While these superfoods can significantly boost your immune system, remember that a balanced diet, regular exercise, adequate sleep, and stress management are all crucial components of overall health and immunity.

Remember to consult with your healthcare provider before making significant dietary changes, especially if you have underlying health conditions.
    `,
    author: 'Dr. Sarah Chen',
    publishDate: '2024-01-15',
    readTime: '5 min read',
    category: 'nutrition',
    tags: ['immune system', 'superfoods', 'nutrition', 'health'],
    likes: 142,
    isLiked: false,
    isBookmarked: false,
    views: 1247
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Sheun Crest',
      text: 'Wonderful article, very insightful! I\'ve been incorporating more citrus fruits into my diet and already feel more energetic.',
      timestamp: '2024-01-16T10:30:00Z',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: '1-1',
          author: 'Dr. Sarah Chen',
          text: 'Thank you! That\'s great to hear. Citrus fruits are indeed excellent for energy and immune support.',
          timestamp: '2024-01-16T11:15:00Z',
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: '2',
      author: 'Mike Johnson',
      text: 'Great list! I had no idea that red bell peppers had more vitamin C than oranges. Definitely adding them to my grocery list.',
      timestamp: '2024-01-16T14:45:00Z',
      likes: 8,
      isLiked: false,
      replies: []
    },
    {
      id: '3',
      author: 'Lisa Park',
      text: 'Love this! As someone who gets sick frequently, I\'m going to try incorporating more of these foods. Do you have any recipe suggestions?',
      timestamp: '2024-01-16T16:20:00Z',
      likes: 15,
      isLiked: true,
      replies: [
        {
          id: '3-1',
          author: 'Emma Wilson',
          text: 'I make a great smoothie with spinach, ginger, and citrus fruits! It\'s delicious and packed with nutrients.',
          timestamp: '2024-01-16T17:00:00Z',
          likes: 3,
          isLiked: false
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isLiked, setIsLiked] = useState(article.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked);
  const [likesCount, setLikesCount] = useState(article.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    Alert.alert(
      isBookmarked ? 'Removed from Bookmarks' : 'Added to Bookmarks',
      isBookmarked 
        ? 'Article removed from your reading list' 
        : 'Article saved to your reading list'
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this great article: ${article.title}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'You',
        text: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        replies: []
      };
      setComments([...comments, comment]);
      setNewComment('');
      setShowCommentModal(false);
      Alert.alert('Comment Added', 'Your comment has been posted successfully!');
    }
  };

  const handleAddReply = (commentId: string) => {
    if (replyText.trim()) {
      const reply: Reply = {
        id: `${commentId}-${Date.now()}`,
        author: 'You',
        text: replyText,
        timestamp: new Date().toISOString(),
        likes: 0,
        isLiked: false
      };
      
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      
      setReplyText('');
      setReplyingTo(null);
      Alert.alert('Reply Added', 'Your reply has been posted successfully!');
    }
  };

  const handleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const handleReplyLike = (commentId: string, replyId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId
                ? {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                  }
                : reply
            )
          }
        : comment
    ));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const renderComment = (comment: Comment) => (
    <View key={comment.id} style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View style={styles.commentAvatar}>
          <Text style={styles.commentAvatarText}>
            {comment.author.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.commentMeta}>
          <Text style={styles.commentAuthor}>{comment.author}</Text>
          <Text style={styles.commentTimestamp}>{formatTimestamp(comment.timestamp)}</Text>
        </View>
      </View>
      
      <Text style={styles.commentText}>{comment.text}</Text>
      
      <View style={styles.commentActions}>
        <TouchableOpacity 
          style={styles.commentAction}
          onPress={() => handleCommentLike(comment.id)}
        >
          <Svg 
            width={16} 
            height={16} 
            viewBox="0 0 24 24" 
            fill={comment.isLiked ? colors.error : "none"}
            stroke={comment.isLiked ? colors.error : colors.textSecondary} 
            strokeWidth={2}
          >
            <Path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </Svg>
          <Text style={[styles.commentActionText, comment.isLiked && styles.commentActionTextLiked]}>
            {comment.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.commentAction}
          onPress={() => setReplyingTo(comment.id)}
        >
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </Svg>
          <Text style={styles.commentActionText}>Reply</Text>
        </TouchableOpacity>
      </View>
      
      {/* Replies */}
      {comment.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {comment.replies.map((reply) => (
            <View key={reply.id} style={styles.replyContainer}>
              <View style={styles.commentHeader}>
                <View style={styles.replyAvatar}>
                  <Text style={styles.replyAvatarText}>
                    {reply.author.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.commentMeta}>
                  <Text style={styles.replyAuthor}>{reply.author}</Text>
                  <Text style={styles.commentTimestamp}>{formatTimestamp(reply.timestamp)}</Text>
                </View>
              </View>
              
              <Text style={styles.replyText}>{reply.text}</Text>
              
              <TouchableOpacity 
                style={styles.replyLikeAction}
                onPress={() => handleReplyLike(comment.id, reply.id)}
              >
                <Svg 
                  width={14} 
                  height={14} 
                  viewBox="0 0 24 24" 
                  fill={reply.isLiked ? colors.error : "none"}
                  stroke={reply.isLiked ? colors.error : colors.textSecondary} 
                  strokeWidth={2}
                >
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </Svg>
                <Text style={[styles.replyLikeText, reply.isLiked && styles.replyLikeTextLiked]}>
                  {reply.likes}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      
      {/* Reply Input */}
      {replyingTo === comment.id && (
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.replyInput}
            placeholder="Write a reply..."
            value={replyText}
            onChangeText={setReplyText}
            multiline
          />
          <View style={styles.replyActions}>
            <TouchableOpacity 
              style={styles.replyCancelButton}
              onPress={() => {
                setReplyingTo(null);
                setReplyText('');
              }}
            >
              <Text style={styles.replyCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.replySubmitButton}
              onPress={() => handleAddReply(comment.id)}
            >
              <Text style={styles.replySubmitText}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Article</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Article Header */}
        <View style={styles.articleHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{article.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.articleTitle}>{article.title}</Text>
          
          <View style={styles.articleMeta}>
            <Text style={styles.authorText}>By {article.author}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.dateText}>{formatDate(article.publishDate)}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.readTimeText}>{article.readTime}</Text>
          </View>
          
          <View style={styles.articleStats}>
            <Text style={styles.statsText}>{article.views} views</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.statsText}>{comments.length} comments</Text>
          </View>
        </View>

        {/* Article Actions */}
        <View style={styles.articleActions}>
          <TouchableOpacity 
            style={[styles.actionButton, isLiked && styles.actionButtonLiked]}
            onPress={handleLike}
          >
            <Svg 
              width={20} 
              height={20} 
              viewBox="0 0 24 24" 
              fill={isLiked ? colors.error : "none"}
              stroke={isLiked ? colors.error : colors.textSecondary} 
              strokeWidth={2}
            >
              <Path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </Svg>
            <Text style={[styles.actionText, isLiked && styles.actionTextLiked]}>
              {likesCount}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, isBookmarked && styles.actionButtonBookmarked]}
            onPress={handleBookmark}
          >
            <Svg 
              width={20} 
              height={20} 
              viewBox="0 0 24 24" 
              fill={isBookmarked ? colors.primary : "none"}
              stroke={isBookmarked ? colors.primary : colors.textSecondary} 
              strokeWidth={2}
            >
              <Path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </Svg>
            <Text style={[styles.actionText, isBookmarked && styles.actionTextBookmarked]}>
              {isBookmarked ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </Svg>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Article Content */}
        <View style={styles.articleContent}>
          <Text style={styles.contentText}>{article.content}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Tags:</Text>
          <View style={styles.tagsList}>
            {article.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>
              Comments ({comments.length})
            </Text>
            <TouchableOpacity 
              style={styles.addCommentButton}
              onPress={() => setShowCommentModal(true)}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </Svg>
              <Text style={styles.addCommentText}>Add Comment</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.commentsList}>
            {comments.map(renderComment)}
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add Comment Modal */}
      <Modal
        visible={showCommentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCommentModal(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.commentModal}>
            <View style={styles.commentModalHeader}>
              <Text style={styles.commentModalTitle}>Add Comment</Text>
              <TouchableOpacity 
                style={styles.commentModalClose}
                onPress={() => setShowCommentModal(false)}
              >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.commentModalInput}
              placeholder="Share your thoughts about this article..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            <View style={styles.commentModalActions}>
              <TouchableOpacity 
                style={styles.commentCancelButton}
                onPress={() => {
                  setShowCommentModal(false);
                  setNewComment('');
                }}
              >
                <Text style={styles.commentCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.commentSubmitButton}
                onPress={handleAddComment}
              >
                <Text style={styles.commentSubmitText}>Post Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    paddingHorizontal: 20,
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
  shareButton: {
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
  articleHeader: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryBadge: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'ReadexPro-Medium',
  },
  articleTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 36,
    marginBottom: 16,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '600',
  },
  metaDot: {
    fontSize: 16,
    color: colors.textSecondary,
    marginHorizontal: 8,
  },
  dateText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  readTimeText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  articleStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  articleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    gap: 8,
  },
  actionButtonLiked: {
    backgroundColor: colors.surface,
  },
  actionButtonBookmarked: {
    backgroundColor: colors.inputBackground,
  },
  actionText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  actionTextLiked: {
    color: colors.error,
  },
  actionTextBookmarked: {
    color: colors.primary,
  },
  articleContent: {
    paddingVertical: 24,
  },
  contentText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 24,
  },
  tagsContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 12,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'ReadexPro-Medium',
  },
  commentsSection: {
    paddingTop: 24,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  addCommentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.inputBackground,
    gap: 6,
  },
  addCommentText: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  commentsList: {
    gap: 16,
  },
  commentContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  commentAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    fontFamily: 'ReadexPro-Medium',
  },
  commentMeta: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  commentTimestamp: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  commentText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 22,
    marginBottom: 12,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  commentActionTextLiked: {
    color: colors.error,
  },
  repliesContainer: {
    marginTop: 16,
    marginLeft: 20,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    paddingLeft: 16,
    gap: 12,
  },
  replyContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  replyAvatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.background,
    fontFamily: 'ReadexPro-Medium',
  },
  replyAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  replyText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    lineHeight: 20,
    marginBottom: 8,
  },
  replyLikeAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  replyLikeText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  replyLikeTextLiked: {
    color: colors.error,
  },
  replyInputContainer: {
    marginTop: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  replyInput: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  replyActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  replyCancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  replyCancelText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
  },
  replySubmitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  replySubmitText: {
    fontSize: 14,
    color: colors.background,
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  commentModal: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  commentModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  commentModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
  },
  commentModalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentModalInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'ReadexPro-Medium',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  commentModalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  commentCancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  commentCancelText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  commentSubmitButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  commentSubmitText: {
    fontSize: 16,
    color: colors.background,
    fontFamily: 'ReadexPro-Medium',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 40,
  },
});

const EnhancedArticleDetailScreen: React.FC<EnhancedArticleDetailScreenProps> = (props) => {
  return <EnhancedArticleDetailScreenContent {...props} />;
};

export default EnhancedArticleDetailScreen;
