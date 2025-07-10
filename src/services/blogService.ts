import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseEnabled } from '../lib/firebase';
import type { BlogPost } from '../types/blog';

const COLLECTION_NAME = 'blogPosts';

// Firestore用のブログポスト型（日付をTimestampに変換）
interface FirestoreBlogPost extends Omit<BlogPost, 'publishedAt' | 'updatedAt'> {
  publishedAt: Timestamp;
  updatedAt: Timestamp;
}

// BlogPostをFirestore形式に変換
const toFirestorePost = (post: BlogPost): FirestoreBlogPost => ({
  ...post,
  publishedAt: Timestamp.fromDate(new Date(post.publishedAt)),
  updatedAt: Timestamp.fromDate(new Date(post.updatedAt))
});

// Firestore形式をBlogPostに変換
const fromFirestorePost = (doc: any): BlogPost => ({
  ...doc.data(),
  id: doc.id,
  publishedAt: doc.data().publishedAt.toDate().toISOString(),
  updatedAt: doc.data().updatedAt.toDate().toISOString()
});

export const blogService = {
  // 全ての投稿を取得
  async getAllPosts(): Promise<BlogPost[]> {
    // Firebase が設定されていない場合はエラーを投げる
    if (!isFirebaseEnabled) {
      throw new Error('Firebase not configured');
    }
    
    try {
      console.log('Firestore: Fetching all posts...');
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('publishedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(fromFirestorePost);
      console.log('Firestore: Fetched', posts.length, 'posts');
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // 公開済み投稿のみ取得
  async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      console.log('Firestore: Fetching published posts...');
      const q = query(
        collection(db, COLLECTION_NAME),
        where('isPublished', '==', true),
        orderBy('publishedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(fromFirestorePost);
      console.log('Firestore: Fetched', posts.length, 'published posts');
      return posts;
    } catch (error) {
      console.error('Error fetching published posts:', error);
      throw error;
    }
  },

  // 特定の投稿を取得
  async getPost(id: string): Promise<BlogPost | null> {
    try {
      console.log('Firestore: Fetching post', id);
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const post = fromFirestorePost(docSnap);
        console.log('Firestore: Found post', post.title);
        return post;
      } else {
        console.log('Firestore: Post not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // 新しい投稿を作成
  async createPost(post: Omit<BlogPost, 'id'>): Promise<string> {
    if (!isFirebaseEnabled) {
      throw new Error('Firebase not configured');
    }
    
    try {
      console.log('Firestore: Creating new post:', post.title);
      const firestorePost = toFirestorePost(post as BlogPost);
      const docRef = await addDoc(collection(db, COLLECTION_NAME), firestorePost);
      console.log('Firestore: Created post with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      
      // Fallback to localStorage if Firebase fails
      console.log('Firestore: Falling back to localStorage...');
      const postWithId = { ...post, id: Date.now().toString() };
      const savedPosts = localStorage.getItem('blogPosts');
      const posts = savedPosts ? JSON.parse(savedPosts) : [];
      posts.unshift(postWithId);
      localStorage.setItem('blogPosts', JSON.stringify(posts));
      console.log('localStorage: Saved post with ID:', postWithId.id);
      return postWithId.id;
    }
  },

  // 投稿を更新
  async updatePost(id: string, post: Partial<BlogPost>): Promise<void> {
    try {
      console.log('Firestore: Updating post', id);
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData: any = {
        ...post,
        updatedAt: Timestamp.now()
      };
      
      if (post.publishedAt) {
        updateData.publishedAt = Timestamp.fromDate(new Date(post.publishedAt));
      }
      
      await updateDoc(docRef, updateData);
      console.log('Firestore: Updated post successfully');
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  // 投稿を削除
  async deletePost(id: string): Promise<void> {
    try {
      console.log('Firestore: Deleting post', id);
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      console.log('Firestore: Deleted post successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // LocalStorageからFirestoreに移行
  async migrateFromLocalStorage(): Promise<void> {
    try {
      console.log('Firestore: Starting migration from localStorage...');
      const savedPosts = localStorage.getItem('blogPosts');
      
      if (savedPosts) {
        const posts: BlogPost[] = JSON.parse(savedPosts);
        console.log('Firestore: Found', posts.length, 'posts in localStorage');
        
        for (const post of posts) {
          const postWithoutId = { ...post };
          delete (postWithoutId as any).id;
          await this.createPost(postWithoutId);
        }
        
        console.log('Firestore: Migration completed successfully');
        
        // 移行完了後、LocalStorageをクリア
        localStorage.removeItem('blogPosts');
        console.log('Firestore: Cleared localStorage');
      } else {
        console.log('Firestore: No posts found in localStorage');
      }
    } catch (error) {
      console.error('Error during migration:', error);
      throw error;
    }
  }
};