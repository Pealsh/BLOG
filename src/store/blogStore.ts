import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { blogService } from '../services/blogService';
import type { BlogPost, BlogStore, ThemeMode } from '../types/blog';

interface BlogActions {
  setPosts: (posts: BlogPost[]) => void;
  loadPosts: () => Promise<void>;
  createPost: (post: Omit<BlogPost, 'id'>) => Promise<string>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  migrateFromLocalStorage: () => Promise<void>;
  setFilteredPosts: (posts: BlogPost[]) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (query: string) => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  toggleBookmark: (postId: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setLoading: (loading: boolean) => void;
  setAdminAuthenticated: (authenticated: boolean) => void;
  setCurrentPage: (page: number) => void;
  filterPosts: () => void;
  resetFilters: () => void;
  searchPosts: (query: string) => void;
}

export const useBlogStore = create<BlogStore & BlogActions>()(
  persist(
    (set, get) => ({
      // State
      posts: [],
      filteredPosts: [],
      selectedCategories: [],
      selectedTags: [],
      searchQuery: '',
      searchHistory: [],
      bookmarks: [],
      theme: 'system',
      isLoading: false,
      isAdminAuthenticated: false,
      currentPage: 1,
      totalPages: 1,
      postsPerPage: 6,

      // Actions
      setPosts: (posts) => {
        console.log('BlogStore: setPosts called with', posts.length, 'posts');
        set({ posts });
        get().filterPosts();
      },

      loadPosts: async () => {
        set({ isLoading: true });
        try {
          console.log('BlogStore: Loading posts from Firestore...');
          const posts = await blogService.getAllPosts();
          set({ posts, isLoading: false });
          get().filterPosts();
          console.log('BlogStore: Loaded', posts.length, 'posts from Firestore');
        } catch (error) {
          console.error('BlogStore: Failed to load posts from Firestore:', error);
          // フォールバック: LocalStorageから読み込み
          try {
            const savedPosts = localStorage.getItem('blogPosts');
            if (savedPosts) {
              const posts = JSON.parse(savedPosts);
              set({ posts, isLoading: false });
              get().filterPosts();
              console.log('BlogStore: Fallback to localStorage, loaded', posts.length, 'posts');
            } else {
              console.log('BlogStore: No posts found in localStorage');
              set({ posts: [], isLoading: false });
              get().filterPosts();
            }
          } catch (localError) {
            console.error('BlogStore: Failed to load from localStorage:', localError);
            set({ posts: [], isLoading: false });
          }
        }
      },

      createPost: async (post) => {
        try {
          console.log('BlogStore: Creating post:', post.title);
          const id = await blogService.createPost(post);
          console.log('BlogStore: Created post with ID:', id);
          
          // ローカル状態を更新
          const newPost = { ...post, id };
          const { posts } = get();
          set({ posts: [newPost, ...posts] });
          get().filterPosts();
          
          return id;
        } catch (error) {
          console.error('BlogStore: Failed to create post:', error);
          throw error;
        }
      },

      updatePost: async (id, post) => {
        try {
          console.log('BlogStore: Updating post:', id);
          await blogService.updatePost(id, post);
          
          // ローカル状態を更新
          const { posts } = get();
          const updatedPosts = posts.map(p => 
            p.id === id ? { ...p, ...post, updatedAt: new Date().toISOString() } : p
          );
          set({ posts: updatedPosts });
          get().filterPosts();
          
          console.log('BlogStore: Updated post successfully');
        } catch (error) {
          console.error('BlogStore: Failed to update post:', error);
          throw error;
        }
      },

      deletePost: async (postId) => {
        try {
          console.log('BlogStore: Deleting post:', postId);
          await blogService.deletePost(postId);
          
          // ローカル状態を更新
          const { posts } = get();
          const updatedPosts = posts.filter(p => p.id !== postId);
          set({ posts: updatedPosts });
          get().filterPosts();
          
          console.log('BlogStore: Deleted post successfully');
        } catch (error) {
          console.error('BlogStore: Failed to delete post:', error);
          throw error;
        }
      },

      migrateFromLocalStorage: async () => {
        try {
          console.log('BlogStore: Starting migration...');
          await blogService.migrateFromLocalStorage();
          // 移行後、Firestoreから再読み込み
          await get().loadPosts();
          console.log('BlogStore: Migration completed');
        } catch (error) {
          console.error('BlogStore: Migration failed:', error);
          throw error;
        }
      },

      setFilteredPosts: (filteredPosts) => {
        const { postsPerPage } = get();
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        set({ filteredPosts, totalPages });
      },

      setSelectedCategories: (categories) => {
        set({ selectedCategories: categories, currentPage: 1 });
        get().filterPosts();
      },

      setSelectedTags: (tags) => {
        set({ selectedTags: tags, currentPage: 1 });
        get().filterPosts();
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query, currentPage: 1 });
        if (query.trim()) {
          get().addToSearchHistory(query);
        }
        get().filterPosts();
      },

      addToSearchHistory: (query) => {
        const { searchHistory } = get();
        const trimmedQuery = query.trim();
        if (trimmedQuery && !searchHistory.includes(trimmedQuery)) {
          const newHistory = [trimmedQuery, ...searchHistory.slice(0, 9)];
          set({ searchHistory: newHistory });
        }
      },

      clearSearchHistory: () => set({ searchHistory: [] }),

      toggleBookmark: (postId) => {
        const { bookmarks } = get();
        const newBookmarks = bookmarks.includes(postId)
          ? bookmarks.filter(id => id !== postId)
          : [...bookmarks, postId];
        set({ bookmarks: newBookmarks });
      },

      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else if (theme === 'light') {
          root.classList.remove('dark');
        } else {
          // System preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setAdminAuthenticated: (authenticated) => set({ isAdminAuthenticated: authenticated }),

      setCurrentPage: (page) => set({ currentPage: page }),

      filterPosts: () => {
        const { posts, selectedCategories, selectedTags, searchQuery } = get();
        
        let filtered = posts.filter(post => post.isPublished);

        // Filter by categories
        if (selectedCategories.length > 0) {
          filtered = filtered.filter(post =>
            post.categories.some(category => selectedCategories.includes(category))
          );
        }

        // Filter by tags
        if (selectedTags.length > 0) {
          filtered = filtered.filter(post =>
            post.tags.some(tag => selectedTags.includes(tag))
          );
        }

        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query)) ||
            post.categories.some(category => category.toLowerCase().includes(query))
          );
        }

        // Sort by publication date (newest first)
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

        get().setFilteredPosts(filtered);
      },

      resetFilters: () => {
        set({
          selectedCategories: [],
          selectedTags: [],
          searchQuery: '',
          currentPage: 1
        });
        get().filterPosts();
      },

      searchPosts: (query) => {
        get().setSearchQuery(query);
      }
    }),
    {
      name: 'blog-store',
      partialize: (state) => ({
        posts: state.posts,
        bookmarks: state.bookmarks,
        theme: state.theme,
        searchHistory: state.searchHistory
      })
    }
  )
);