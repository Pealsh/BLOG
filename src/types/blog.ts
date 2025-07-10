export interface BlogPost {
  id: string;
  title: string;
  titleJp?: string;
  subtitle: string;
  subtitleJp?: string;
  content: string;
  contentJp?: string;
  excerpt: string;
  excerptJp?: string;
  publishedAt: string;
  updatedAt: string;
  categories: string[];
  categoriesJp?: string[];
  tags: string[];
  tagsJp?: string[];
  readingTime: number;
  isPublished: boolean;
  isDraft: boolean;
  featured: boolean;
  bookmarked: boolean;
  metaTitle: string;
  metaTitleJp?: string;
  metaDescription: string;
  metaDescriptionJp?: string;
  ogImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  postCount: number;
  color?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface BlogStore {
  posts: BlogPost[];
  filteredPosts: BlogPost[];
  selectedCategories: string[];
  selectedTags: string[];
  searchQuery: string;
  searchHistory: string[];
  bookmarks: string[];
  theme: 'light' | 'dark' | 'system';
  isLoading: boolean;
  isAdminAuthenticated: boolean;
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
}

export interface SearchResult {
  post: BlogPost;
  highlights: {
    title?: string;
    content?: string;
    excerpt?: string;
  };
}

export type ThemeMode = 'light' | 'dark' | 'system';