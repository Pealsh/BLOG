import { useEffect, useRef, useState } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useBlogStore } from '../../store/blogStore';
import type { BlogPost } from '../../types/blog';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [localQuery, setLocalQuery] = useState('');
  const { 
    posts, 
    setSearchQuery, 
    searchHistory, 
    clearSearchHistory 
  } = useBlogStore();

  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (localQuery.trim()) {
      const query = localQuery.toLowerCase();
      const results = posts.filter(post =>
        post.isPublished && (
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query)) ||
          post.categories.some(category => category.toLowerCase().includes(query))
        )
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [localQuery, posts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onClose();
    navigate('/');
  };

  const handlePostClick = (post: BlogPost) => {
    navigate(`/blog/${post.id}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && localQuery.trim()) {
      handleSearch(localQuery);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-background rounded-lg shadow-xl border border-border overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center px-4 py-3 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search posts, tags, categories..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {localQuery.trim() && searchResults.length > 0 && (
              <div className="p-2">
                <div className="text-sm text-muted-foreground mb-2 px-2">
                  Search Results
                </div>
                {searchResults.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => handlePostClick(post)}
                    className="w-full text-left p-3 hover:bg-muted rounded-md transition-colors"
                  >
                    <div className="font-medium text-foreground mb-1">
                      {post.title}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      {post.categories.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="inline-block px-2 py-1 text-xs bg-primary-500/10 text-primary-500 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {localQuery.trim() && searchResults.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No posts found for "{localQuery}"
              </div>
            )}

            {!localQuery.trim() && (
              <div className="p-4">
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Recent Searches
                      </div>
                      <button
                        onClick={clearSearchHistory}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    {searchHistory.slice(0, 5).map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(query)}
                        className="block w-full text-left p-2 hover:bg-muted rounded-md transition-colors text-sm"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <div className="text-sm text-muted-foreground mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Popular Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['react', 'typescript', 'javascript', 'css', 'nextjs'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleSearch(tag)}
                        className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;