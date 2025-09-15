import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import EnhancedArticleDetailScreen from '../components/EnhancedArticleDetailScreen';

export default function ArticleDetailRoute() {
  const { articleId } = useLocalSearchParams<{ articleId: string }>();

  const handleBack = () => {
    router.back();
  };

  return (
    <EnhancedArticleDetailScreen
      articleId={articleId || '1'}
      onBack={handleBack}
    />
  );
}
