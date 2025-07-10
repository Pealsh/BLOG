import { useState, useEffect } from 'react';
import { useBlogStore } from '../store/blogStore';
import { translateBlogPost } from '../utils/translator';

export type Language = 'en' | 'jp';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const { posts, setPosts } = useBlogStore();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'jp' : 'en';
    setIsTranslating(true);
    
    try {
      // Translate all blog posts
      const translatedPosts = await Promise.all(
        posts.map(async (post) => {
          const translations = await translateBlogPost(post, newLanguage);
          return { ...post, ...translations };
        })
      );
      
      setPosts(translatedPosts);
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      
      // Save translated posts to localStorage
      localStorage.setItem('blogPosts', JSON.stringify(translatedPosts));
      
      // Reload the page to ensure all components update
      window.location.reload();
      
    } catch (error) {
      console.error('Translation failed:', error);
      // Still change language even if translation fails
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      // Reload even on error
      window.location.reload();
    } finally {
      setIsTranslating(false);
    }
  };

  return { language, toggleLanguage, isTranslating };
};