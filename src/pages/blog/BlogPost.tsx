import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useBlogStore } from '../../store/blogStore';
import type { BlogPost as BlogPostType } from '../../types/blog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const { posts, setPosts } = useBlogStore();

  useEffect(() => {
    // LocalStorageから読み込み
    if (posts.length === 0) {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        try {
          const parsedPosts = JSON.parse(savedPosts);
          setPosts(parsedPosts);
        } catch (error) {
          console.error('Failed to parse saved posts:', error);
        }
      }
    }
  }, [posts.length, setPosts]);

  useEffect(() => {
    const foundPost = posts.find(p => p.id === slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [slug, posts]);


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-poppins font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }


  return (
    <>
      <Helmet>
        <title>{post.metaTitle || post.title}</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.ogImage && <meta property="og:image" content={post.ogImage} />}
      </Helmet>

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center space-x-4 text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{post.readingTime} min read</span>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-xl text-muted-foreground mb-6">{post.subtitle}</p>
          )}

          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-8"></div>

        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <ReactMarkdown
            components={{
              // Allow HTML rendering for styled content
              html: ({ node, ...props }) => <div {...props} />,
              img: ({ node, ...props }) => (
                <img 
                  {...props} 
                  className="rounded-lg shadow-lg max-w-full h-auto my-6"
                  loading="lazy"
                />
              ),
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-bold mb-6 mt-8" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-semibold mb-4 mt-6" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-semibold mb-3 mt-5" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 leading-relaxed" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-primary-500 pl-6 py-2 my-6 bg-muted/30 italic" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Author */}
        <div className="card p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <img 
                src="/img/ore.jpg" 
                alt="Maoto Mikami" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient with initials if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.className = 'w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-poppins font-bold">MM</span>';
                }}
              />
            </div>
            <div>
              <h3 className="font-poppins font-semibold">{post.author.name}</h3>
              <p className="text-muted-foreground">Developer | Student</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;