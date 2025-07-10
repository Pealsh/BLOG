import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { useBlogStore } from '../../store/blogStore';
import { isFirebaseEnabled } from '../../lib/firebase';
import RichTextEditor from '../../components/ui/RichTextEditor';
import BlogPreview from '../../components/ui/BlogPreview';
import type { BlogPost } from '../../types/blog';

const ADMIN_PASSWORD = 'mikan0420'; // 本番環境では環境変数を使用

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { posts, createPost, updatePost, deletePost, setAdminAuthenticated, migrateFromLocalStorage } = useBlogStore();

  const [formData, setFormData] = useState({
    title: '',
    titleJp: '',
    subtitle: '',
    subtitleJp: '',
    content: '',
    contentJp: '',
    excerpt: '',
    excerptJp: '',
    categories: '',
    categoriesJp: '',
    tags: '',
    tagsJp: '',
    readingTime: 5,
    isPublished: true,
    featured: false,
    metaTitle: '',
    metaTitleJp: '',
    metaDescription: '',
    metaDescriptionJp: '',
  });

  useEffect(() => {
    // 認証状態をセッションストレージから復元
    const authStatus = sessionStorage.getItem('adminAuth');
    const isAuth = authStatus === 'true';
    setIsAuthenticated(isAuth);
    setAdminAuthenticated(isAuth);
  }, [setAdminAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAdminAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setPassword('');
    } else {
      alert('wrong');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      titleJp: '',
      subtitle: '',
      subtitleJp: '',
      content: '',
      contentJp: '',
      excerpt: '',
      excerptJp: '',
      categories: '',
      categoriesJp: '',
      tags: '',
      tagsJp: '',
      readingTime: 5,
      isPublished: true,
      featured: false,
      metaTitle: '',
      metaTitleJp: '',
      metaDescription: '',
      metaDescriptionJp: '',
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      titleJp: post.titleJp || '',
      subtitle: post.subtitle,
      subtitleJp: post.subtitleJp || '',
      content: post.content,
      contentJp: post.contentJp || '',
      excerpt: post.excerpt,
      excerptJp: post.excerptJp || '',
      categories: post.categories.join(', '),
      categoriesJp: post.categoriesJp?.join(', ') || '',
      tags: post.tags.join(', '),
      tagsJp: post.tagsJp?.join(', ') || '',
      readingTime: post.readingTime,
      isPublished: post.isPublished,
      featured: post.featured,
      metaTitle: post.metaTitle,
      metaTitleJp: post.metaTitleJp || '',
      metaDescription: post.metaDescription,
      metaDescriptionJp: post.metaDescriptionJp || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (confirm('delete?')) {
      try {
        await deletePost(postId);
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted!');
    console.log('Form data:', formData);
    
    // バリデーション
    if (!formData.title.trim()) {
      alert('タイトルを入力してください');
      return;
    }
    
    if (!formData.content.trim()) {
      alert('内容を入力してください');
      return;
    }
    
    if (!formData.excerpt.trim()) {
      alert('概要を入力してください');
      return;
    }
    
    const postData: any = {
      title: formData.title,
      subtitle: formData.subtitle,
      content: formData.content,
      excerpt: formData.excerpt,
      categories: formData.categories.split(',').map(c => c.trim()).filter(c => c),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      readingTime: formData.readingTime,
      isPublished: formData.isPublished,
      isDraft: !formData.isPublished,
      featured: formData.featured,
      bookmarked: false,
      metaTitle: formData.metaTitle || formData.title,
      metaDescription: formData.metaDescription || formData.excerpt,
      publishedAt: editingPost ? editingPost.publishedAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        name: 'Maoto Mikami',
        avatar: '/avatar.jpg'
      }
    };

    // Only add optional fields if they have values
    if (formData.titleJp?.trim()) {
      postData.titleJp = formData.titleJp;
    }
    if (formData.subtitleJp?.trim()) {
      postData.subtitleJp = formData.subtitleJp;
    }
    if (formData.contentJp?.trim()) {
      postData.contentJp = formData.contentJp;
    }
    if (formData.excerptJp?.trim()) {
      postData.excerptJp = formData.excerptJp;
    }
    if (formData.categoriesJp?.trim()) {
      postData.categoriesJp = formData.categoriesJp.split(',').map(c => c.trim()).filter(c => c);
    }
    if (formData.tagsJp?.trim()) {
      postData.tagsJp = formData.tagsJp.split(',').map(t => t.trim()).filter(t => t);
    }
    if (formData.metaTitleJp?.trim()) {
      postData.metaTitleJp = formData.metaTitleJp;
    }
    if (formData.metaDescriptionJp?.trim()) {
      postData.metaDescriptionJp = formData.metaDescriptionJp;
    }

    try {
      if (editingPost) {
        await updatePost(editingPost.id, postData);
        console.log('Updated post successfully');
      } else {
        const newId = await createPost(postData);
        console.log('Created new post with ID:', newId);
      }
      
      resetForm();
      
      // 投稿後にメインページをリロードして反映
      setTimeout(() => {
        if (window.opener) {
          window.opener.location.reload();
        }
      }, 100);
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post');
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login - Maoto Mikami</title>
        </Helmet>
        
        <div className="max-w-md mx-auto mt-20">
          <div className="card p-8">
            <h1 className="text-2xl font-poppins font-bold mb-6 text-center">
              admin loging
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  pass
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg input-field"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary"
              >
                login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog Admin - Maoto Mikami</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-poppins font-bold">admin</h1>
            <div className="flex items-center space-x-2 mt-2">
              <div className={`w-3 h-3 rounded-full ${isFirebaseEnabled ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm text-muted-foreground">
                {isFirebaseEnabled ? 'Firebase 接続中' : 'LocalStorage モード'}
              </span>
              {!isFirebaseEnabled && (
                <a 
                  href="/FIREBASE_SETUP.md" 
                  target="_blank" 
                  className="text-blue-500 text-sm hover:underline"
                >
                  設定方法
                </a>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>new blog</span>
            </button>
            <button
              onClick={async () => {
                if (confirm('Migrate from localStorage to Firebase?')) {
                  try {
                    await migrateFromLocalStorage();
                    alert('Migration completed successfully!');
                  } catch (error) {
                    console.error('Migration failed:', error);
                    alert('Migration failed');
                  }
                }
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Migrate to Firebase
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              logout
            </button>
          </div>
        </div>

        {showForm && (
          <div className="card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-semibold">
                {editingPost ? 'fix' : 'new'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Section */}
              <div>
                <label className="block text-sm font-medium mb-2">タイトル (Title) *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg input-field"
                  placeholder="記事のタイトルを入力してください"
                  required
                />
              </div>

              {/* Subtitle Section */}
              <div>
                <label className="block text-sm font-medium mb-2">サブタイトル (Subtitle)</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg input-field"
                  placeholder="サブタイトル（オプション）"
                />
              </div>

              {/* Content Section */}
              <div>
                <label className="block text-sm font-medium mb-2">内容 (Content) *</label>
                <p className="text-sm text-muted-foreground mb-3">
                  記事の本文を書いてください。画像はツールバーから自由に挿入できます。
                </p>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  placeholder="記事の内容をここに書いてください。画像や装飾も自由に追加できます..."
                />
              </div>

              {/* Excerpt Section */}
              <div>
                <label className="block text-sm font-medium mb-2">概要 (Summary) *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg input-field"
                  placeholder="記事の概要や要約を書いてください（カード表示で使用されます）"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">CATEGORIES</label>
                  <input
                    type="text"
                    value={formData.categories}
                    onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                    placeholder="Tutorial, React"
                    className="w-full px-3 py-2 rounded-lg input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">TAGS</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="react, javascript"
                    className="w-full px-3 py-2 rounded-lg input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Read time (分)</label>
                  <input
                    type="number"
                    value={formData.readingTime}
                    onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-3 py-2 rounded-lg input-field"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded accent-primary-500"
                  />
                  <span>open</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded accent-primary-500"
                  />
                  <span>point</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showPreview ? 'Hide Preview' : 'Preview'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  stop
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingPost ? '更新' : '投稿'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {showPreview && showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-poppins font-semibold mb-6">Preview</h2>
            <BlogPreview
              title={formData.title}
              subtitle={formData.subtitle}
              content={formData.content}
              excerpt={formData.excerpt}
              categories={formData.categories.split(',').map(c => c.trim()).filter(c => c)}
              tags={formData.tags.split(',').map(t => t.trim()).filter(t => t)}
              readingTime={formData.readingTime}
              isPublished={formData.isPublished}
              featured={formData.featured}
            />
          </div>
        )}

        <div className="card p-6">
          <h2 className="text-xl font-poppins font-semibold mb-4">all blog</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span>CATEGORIES: {post.categories.join(', ')}</span>
                      <span>TAGS: {post.tags.join(', ')}</span>
                      <span className={post.isPublished ? 'text-green-600' : 'text-yellow-600'}>
                        {post.isPublished ? '公開中' : '下書き'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="プレビュー"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="編集"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-red-500"
                      title="削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;