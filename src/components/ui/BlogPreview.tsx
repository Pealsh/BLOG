import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, Tag } from 'lucide-react';

interface BlogPreviewProps {
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  readingTime: number;
  isPublished: boolean;
  featured: boolean;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  title,
  subtitle,
  content,
  excerpt,
  categories,
  tags,
  readingTime,
  isPublished,
  featured
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-background">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{formatDate(new Date())}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{readingTime} min read</span>
          </div>
          <div className={`px-2 py-1 rounded text-xs ${
            isPublished ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
          }`}>
            {isPublished ? 'Published' : 'Draft'}
          </div>
          {featured && (
            <div className="px-2 py-1 rounded text-xs bg-primary-500/10 text-primary-500">
              Featured
            </div>
          )}
        </div>

        <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
          {title || 'Preview Title'}
        </h1>

        {subtitle && (
          <p className="text-xl text-muted-foreground mb-6">{subtitle}</p>
        )}

        <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-8"></div>
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
        <ReactMarkdown
          components={{
            // Allow HTML rendering for styled content
            html: ({ node, ...props }) => <div {...props} />,
            // Custom image handling
            img: ({ node, ...props }) => (
              <img 
                {...props} 
                className="rounded-lg shadow-md max-w-full h-auto"
                loading="lazy"
              />
            ),
          }}
        >
          {content || 'プレビューするコンテンツがありません。'}
        </ReactMarkdown>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm font-medium"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Excerpt Preview */}
      {excerpt && (
        <div className="card p-4 mt-8">
          <h3 className="font-semibold mb-2">Excerpt Preview:</h3>
          <p className="text-muted-foreground">{excerpt}</p>
        </div>
      )}
    </div>
  );
};

export default BlogPreview;