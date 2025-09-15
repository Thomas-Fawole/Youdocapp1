import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, FlatList } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

import BottomNav from './ui/BottomNav';

interface Message {
  id: number;
  text: string;
  sender: 'agent' | 'user';
  timestamp: Date;
  agent?: {
    name: string;
    avatar: string;
    role: string;
  };
}

interface CarepointLiveChatProps {
  onBack: () => void;
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
}

const CarepointLiveChat: React.FC<CarepointLiveChatProps> = ({ 
  onBack, 
  onHome, 
  onNotifications, 
  onProfile 
}) => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Sarah from YouDoc Support. How can I help you today?",
      sender: 'agent',
      timestamp: new Date(Date.now() - 300000),
      agent: {
        name: 'Sarah Chen',
        avatar: 'SC',
        role: 'Support Specialist',
      },
    },
    {
      id: 2,
      text: "Hi! I'm having trouble syncing my Apple Watch data with the app.",
      sender: 'user',
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: 3,
      text: "I'd be happy to help you with that! Let me walk you through a few troubleshooting steps. First, can you confirm that your Apple Watch is connected to the same Apple ID as your iPhone?",
      sender: 'agent',
      timestamp: new Date(Date.now() - 180000),
      agent: {
        name: 'Sarah Chen',
        avatar: 'SC',
        role: 'Support Specialist',
      },
    },
    {
      id: 4,
      text: "Yes, they're both using the same Apple ID.",
      sender: 'user',
      timestamp: new Date(Date.now() - 120000),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const agentResponse: Message = {
        id: newMessage.id + 1,
        text: 'Thanks for that information. Let me check your account settings. One moment please...',
        sender: 'agent',
        timestamp: new Date(),
        agent: {
          name: 'Sarah Chen',
          avatar: 'SC',
          role: 'Support Specialist',
        },
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 2000);
  };

  const formatTime = (timestamp: Date) =>
    timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const quickReplies = ['Yes, that works', 'No, still having issues', 'Can you explain more?', 'Thank you!'];

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.agentMessageContainer]}>
        {!isUser && (
          <View style={styles.agentAvatar}>
            <Text style={styles.agentAvatarText}>{message.agent?.avatar}</Text>
          </View>
        )}
        <View style={[styles.messageBubble, isUser ? styles.userMessageBubble : styles.agentMessageBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.agentMessageText]}>
            {message.text}
          </Text>
          <Text style={[styles.messageTime, isUser ? styles.userMessageTime : styles.agentMessageTime]}>
            {formatTime(message.timestamp)}
          </Text>
        </View>
        {isUser && (
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>You</Text>
          </View>
        )}
      </View>
    );
  };

  const TypingIndicator: React.FC = () => (
    <View style={styles.messageContainer}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>SC</Text>
      </View>
      <View style={styles.typingBubble}>
        <View style={styles.typingDots}>
          <View style={[styles.typingDot, { animationDelay: 0 }]} />
          <View style={[styles.typingDot, { animationDelay: 100 }]} />
          <View style={[styles.typingDot, { animationDelay: 200 }]} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Chat Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </Svg>
          </TouchableOpacity>
          <View style={styles.agentInfo}>
            <View style={styles.agentHeaderAvatar}>
              <Text style={styles.agentHeaderAvatarText}>SC</Text>
            </View>
            <View>
              <Text style={styles.agentName}>Sarah Chen</Text>
              <View style={styles.statusContainer}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.statusText}>Online • Support Specialist</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer} 
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chatStartBanner}>
          <View style={styles.chatStartContent}>
            <Text style={styles.chatStartTitle}>Live Chat Started</Text>
            <Text style={styles.chatStartSubtitle}>Average response time: 2 minutes</Text>
          </View>
        </View>

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
      </ScrollView>

      {/* Quick Replies */}
      <View style={styles.quickRepliesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRepliesContent}>
          {quickReplies.map((reply, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setInputMessage(reply)}
              style={styles.quickReplyButton}
            >
              <Text style={styles.quickReplyText}>{reply}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </Svg>
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.messageInput}
              value={inputMessage}
              onChangeText={setInputMessage}
              onSubmitEditing={handleSendMessage}
              placeholder="Type your message..."
              placeholderTextColor="#9ca3af"
              multiline
              maxLength={500}
            />
          </View>
          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={inputMessage.trim() === ''}
            style={[styles.sendButton, inputMessage.trim() === '' && styles.sendButtonDisabled]}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </Svg>
          </TouchableOpacity>
        </View>
        <View style={styles.securityInfo}>
          <View style={styles.securityIndicator} />
          <Text style={styles.securityText}>Secure encrypted chat • Response time: ~2 mins</Text>
        </View>
      </View>

      <BottomNav active="help" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  agentHeaderAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentHeaderAvatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#6b7280',
  },
  moreButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    paddingBottom: 160,
  },
  messagesContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  chatStartBanner: {
    alignItems: 'center',
    marginBottom: 24,
  },
  chatStartContent: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  chatStartTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e40af',
    textAlign: 'center',
  },
  chatStartSubtitle: {
    fontSize: 14,
    color: '#1e40af',
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  agentMessageContainer: {
    justifyContent: 'flex-start',
  },
  agentAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  agentAvatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  userAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#6b7280',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  userAvatarText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userMessageBubble: {
    backgroundColor: '#3b82f6',
    borderBottomRightRadius: 4,
  },
  agentMessageBubble: {
    backgroundColor: '#f3f4f6',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#ffffff',
  },
  agentMessageText: {
    color: '#111827',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 8,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  agentMessageTime: {
    color: '#6b7280',
  },
  typingBubble: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    backgroundColor: '#9ca3af',
    borderRadius: 4,
  },
  quickRepliesContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  quickRepliesContent: {
    gap: 8,
    paddingBottom: 8,
  },
  quickReplyButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickReplyText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 100,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  attachButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  messageInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: '#3b82f6',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  securityIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  securityText: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default CarepointLiveChat;
