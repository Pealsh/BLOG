import { Github, Mail, Filter, X } from 'lucide-react';
import { useBlogStore } from '../../store/blogStore';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/translations';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const { 
    posts, 
    selectedCategories, 
    selectedTags, 
    setSelectedCategories, 
    setSelectedTags, 
    resetFilters,
    setPosts
  } = useBlogStore();
  
  const { language } = useLanguage();
  const t = translations[language];
  const [categories, setCategories] = useState<Array<{name: string, count: number}>>([]);
  const [tags, setTags] = useState<Array<{name: string, count: number}>>([]);

  useEffect(() => {
    // LocalStorageから読み込み、空の状態から開始
    if (posts.length === 0) {
      const savedPosts = localStorage.getItem('blogPosts');
      if (!savedPosts) {
        setPosts([]); // 空の配列で開始
      }
    }
  }, [posts.length, setPosts]);


  useEffect(() => {
    // Calculate categories and their counts
    const categoryCount: Record<string, number> = {};
    const tagCount: Record<string, number> = {};

    posts.forEach(post => {
      if (post.isPublished) {
        post.categories.forEach(category => {
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });
        post.tags.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });

    setCategories(
      Object.entries(categoryCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    );

    setTags(
      Object.entries(tagCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    );
  }, [posts]);

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0;

  return (
    <div className="space-y-6">
      {/* Profile Box */}
      <div className="card p-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
            <img 
              src="/img/ore.jpg" 
              alt="Maoto Mikami" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient with initials if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.className = 'w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center';
                e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-poppins font-bold text-lg">MM</span>';
              }}
            />
          </div>
          <h3 className="font-poppins font-bold text-lg mb-2">Maoto Mikami</h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mb-3"></div>
          <p className="text-muted-foreground text-sm mb-4">{t.developer} | {t.student}</p>
          
          <div className="flex justify-center space-x-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:pengutobitai@gmail.com"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Categories Box */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-poppins font-semibold text-lg border-l-4 border-primary-500 pl-3">
            CATEGORIES
          </h3>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryToggle(category.name)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedCategories.includes(category.name)
                  ? 'bg-primary-500/10 text-primary-500'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-sm">{category.name}</span>
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                selectedCategories.includes(category.name)
                  ? 'bg-primary-500 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tags Box */}
      <div className="card p-6">
        <h3 className="font-poppins font-semibold text-lg mb-4 border-l-4 border-primary-500 pl-3">
          TAGS
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleTagToggle(tag.name)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag.name)
                  ? 'bg-primary-500 text-white'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="card p-4 border-l-4 border-primary-500">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="w-4 h-4 text-primary-500" />
            <span className="font-poppins font-semibold text-sm">Active Filters</span>
          </div>
          
          <div className="space-y-2">
            {selectedCategories.map((category) => (
              <div key={category} className="flex items-center justify-between text-sm">
                <span>Category: {category}</span>
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            {selectedTags.map((tag) => (
              <div key={tag} className="flex items-center justify-between text-sm">
                <span>Tag: {tag}</span>
                <button
                  onClick={() => handleTagToggle(tag)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;