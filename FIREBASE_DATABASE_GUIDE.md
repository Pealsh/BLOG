# Firebase Firestore データベース使用ガイド

このプロジェクトでは、ブログ投稿の永続化にFirebase Firestoreを使用しています。LocalStorageからFirestoreに移行することで、データの永続性とクロスデバイス同期を実現しています。

## 🔧 初期設定

### 1. Firebase プロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 新しいプロジェクトを作成
3. Firestoreデータベースを有効化
4. プロジェクト設定から設定情報を取得

### 2. 環境変数の設定

`.env.local` ファイルに Firebase の設定情報を追加してください：

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 3. Firestore セキュリティルール

Firebase Console で以下のセキュリティルールを設定してください：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ブログ投稿のコレクション
    match /blogPosts/{document} {
      // 読み取りは誰でも可能
      allow read: if true;
      // 書き込みは認証済みユーザーのみ（管理者機能使用時）
      allow write: if request.auth != null;
    }
  }
}
```

## 📊 データ構造

### BlogPost コレクション

```typescript
interface BlogPost {
  id: string;
  title: string;
  titleJp?: string;
  subtitle: string;
  subtitleJp?: string;
  content: string;
  contentJp?: string;
  excerpt: string;
  excerptJp?: string;
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
  publishedAt: string; // ISO日付文字列
  updatedAt: string; // ISO日付文字列
  author: {
    name: string;
    avatar: string;
  };
}
```

## 🚀 使用方法

### 1. LocalStorage からの移行

管理者パネル（`/admin`）から「Migrate to Firebase」ボタンをクリックして、既存のLocalStorageデータをFirestoreに移行できます。

```typescript
// 移行の実行
await migrateFromLocalStorage();
```

### 2. データの操作

#### 投稿の作成
```typescript
const newPost = {
  title: "新しい投稿",
  content: "投稿内容...",
  // ...その他のフィールド
};

const postId = await createPost(newPost);
```

#### 投稿の更新
```typescript
await updatePost(postId, {
  title: "更新されたタイトル",
  content: "更新された内容..."
});
```

#### 投稿の削除
```typescript
await deletePost(postId);
```

#### 投稿の取得
```typescript
// 全ての投稿を取得
const allPosts = await blogService.getAllPosts();

// 公開済み投稿のみ取得
const publishedPosts = await blogService.getPublishedPosts();

// 特定の投稿を取得
const post = await blogService.getPost(postId);
```

## 🔄 自動同期

### Zustand Store との統合

Zustand storeは自動的にFirestoreと同期します：

- **ページ読み込み時**: Firestoreから最新データを取得
- **投稿作成/更新/削除**: Firestoreとローカル状態の両方を更新
- **エラー処理**: Firestoreが利用できない場合、LocalStorageにフォールバック

### 状態管理

```typescript
const {
  posts,           // 全投稿
  loadPosts,       // Firestoreから読み込み
  createPost,      // 新規投稿作成
  updatePost,      // 投稿更新
  deletePost,      // 投稿削除
  migrateFromLocalStorage // LocalStorageから移行
} = useBlogStore();
```

## 🛠️ トラブルシューティング

### よくある問題

1. **投稿が表示されない**
   - Firebase設定が正しいか確認
   - ネットワーク接続を確認
   - ブラウザのコンソールでエラーを確認

2. **移行に失敗する**
   - Firestore セキュリティルールを確認
   - 環境変数が正しく設定されているか確認

3. **権限エラー**
   - Firestore セキュリティルールを確認
   - プロジェクトIDが正しいか確認

### デバッグ

開発者ツールのコンソールで以下のログを確認できます：

```
BlogStore: Loading posts from Firestore...
Firestore: Fetched X posts
BlogStore: Created post with ID: xxx
```

## 📁 関連ファイル

- `/src/lib/firebase.ts` - Firebase初期化と設定
- `/src/services/blogService.ts` - Firestore操作のサービス層
- `/src/store/blogStore.ts` - Zustand store（Firestore統合済み）
- `/src/pages/admin/Admin.tsx` - 管理者パネル（CRUD操作）
- `/src/pages/home/Home.tsx` - ホームページ（データ表示）
- `.env.local` - Firebase設定（環境変数）

## 🔐 セキュリティ

- 環境変数を使用してFirebase設定を保護
- Firestoreセキュリティルールで適切なアクセス制御
- 本番環境では管理者認証の強化を推奨

## 📈 パフォーマンス

- Firestoreクエリは publication date でソート済み
- ローカル状態とのハイブリッド管理でレスポンス向上
- エラー時のLocalStorageフォールバックで可用性確保