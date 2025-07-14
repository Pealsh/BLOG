import { Calendar, Clock, Tag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types/blog';
import { useBlogStore } from '../../store/blogStore';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/translations';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: BlogPost;
}

const PostCard = ({ post }: PostCardProps) => {
  const { isAdminAuthenticated, deletePost } = useBlogStore();
  const { language } = useLanguage();
  const t = translations[language];

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(t.confirm)) {
      deletePost(post.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <article className="card hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500 group hover:border-primary-500/30">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-4 text-muted-foreground text-sm mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} {t.minRead}</span>
              </div>
            </div>
            
            {/* Title */}
            <Link to={`/blog/${post.id}`}>
              <h2 className="text-4xl font-poppins font-bold mb-4 group-hover:text-primary-500 transition-colors line-clamp-2 leading-tight">
                {language === 'jp' && post.titleJp ? post.titleJp : post.title}
              </h2>
            </Link>
            
            {/* Purple line */}
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mb-4 rounded-full transition-all duration-300 group-hover:w-20 group-hover:shadow-lg group-hover:shadow-primary-500/30"></div>
            
            {/* Subtitle */}
            {(post.subtitle || post.subtitleJp) && (
              <p className="text-xl text-muted-foreground font-medium mb-4 line-clamp-2">
                {language === 'jp' && post.subtitleJp ? post.subtitleJp : post.subtitle}
              </p>
            )}
            
            {/* Excerpt */}
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {language === 'jp' && post.excerptJp ? post.excerptJp : post.excerpt}
            </p>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(language === 'jp' && post.categoriesJp ? post.categoriesJp : post.categories).map((category, index) => (
                <span
                  key={`${category}-${index}`}
                  className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(language === 'jp' && post.tagsJp ? post.tagsJp : post.tags).slice(0, 3).map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded text-sm"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
              {(language === 'jp' && post.tagsJp ? post.tagsJp : post.tags).length > 3 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm">
                  +{(language === 'jp' && post.tagsJp ? post.tagsJp : post.tags).length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground text-sm">
                {getTimeAgo(post.publishedAt)}
              </span>
              
              {isAdminAuthenticated && (
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-red-500/20"
                  title={t.deleteBlog}
                >
                  <Trash2 className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
                </button>
              )}
            </div>
            
            <Link
              to={`/blog/${post.id}`}
              className="flex items-center justify-center w-10 h-60 bg-gradient-to-b from-primary-500 to-primary-600  text-white rounded-lg transition-all duration-300 hover:scale-105 group/button"
              title={t.goBlog}
              onClick={() => {
                // ページ遷移後に最上部にスクロール
                setTimeout(() => {
                  window.scrollTo({ top: 0 });
                }, 0);
              }}
            >
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
};

export default PostCard;