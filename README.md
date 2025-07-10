# React + TypeScript + Vite ブログ・ポートフォリオサイト

このプロジェクトは、React 19、TypeScript、Vite を使用したモダンなブログ・ポートフォリオサイトです。Firebase Firestore をデータベースとして使用し、リッチテキストエディタやリアルタイムプレビューなどの高度な機能を提供します。

## 🚀 主な機能

- **ブログ投稿管理**: 管理者パネルでのCRUD操作
- **リッチテキストエディタ**: 画像アップロード、テキストフォーマット対応
- **リアルタイムプレビュー**: 編集中のコンテンツを即座に確認
- **多言語対応**: 日本語・英語の切り替え機能
- **ダークモード**: システム設定に応じた自動切り替え
- **検索・フィルタリング**: カテゴリ、タグによる投稿検索
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **SEO最適化**: 動的メタタグ生成
- **Firebase Firestore**: クラウドデータベース統合
- **永続化**: Zustand による状態管理と永続化

## 🛠️ 技術スタック

### フロントエンド
- **React 19.1.0** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - スタイリングフレームワーク
- **Zustand** - 状態管理
- **React Router Dom 7.6.3** - ルーティング

### バックエンド・データベース
- **Firebase Firestore** - NoSQLデータベース
- **Firebase SDK** - バックエンドサービス

### UI・エディタ
- **@uiw/react-md-editor** - リッチテキストエディタ
- **React Markdown** - マークダウンレンダリング
- **Lucide React** - アイコンライブラリ
- **React Helmet Async** - SEO管理

### ユーティリティ
- **date-fns** - 日付処理
- **React Intersection Observer** - スクロール監視

## 📁 プロジェクト構造

```
src/
├── components/          # 再利用可能コンポーネント
│   ├── blog/           # ブログ関連コンポーネント
│   │   ├── PostCard.tsx
│   │   └── BlogList.tsx
│   ├── layout/         # レイアウトコンポーネント
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   └── ui/             # UIコンポーネント
│       ├── RichTextEditor.tsx
│       ├── BlogPreview.tsx
│       ├── SearchModal.tsx
│       ├── Pagination.tsx
│       └── LoadingSpinner.tsx
├── hooks/              # カスタムフック
│   ├── useLanguage.ts
│   ├── useTheme.ts
│   └── useBookmarks.ts
├── lib/                # 外部ライブラリ設定
│   └── firebase.ts
├── pages/              # ページコンポーネント
│   ├── home/
│   ├── about/
│   ├── profile/
│   ├── blog/
│   └── admin/
├── services/           # API・サービス層
│   └── blogService.ts
├── store/              # 状態管理
│   └── blogStore.ts
├── types/              # TypeScript型定義
│   └── blog.ts
├── utils/              # ユーティリティ
│   ├── translations.ts
│   └── translator.ts
└── data/               # データ
    └── mockPosts.ts
```

## 🔧 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Firebase設定

`.env.local` ファイルを作成し、Firebase設定を追加：

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 3. 開発サーバー起動

```bash
npm run dev
```

### 4. ビルド

```bash
npm run build
```

## 📚 ドキュメント

- **[Firebase データベース使用ガイド](./FIREBASE_DATABASE_GUIDE.md)** - Firestore の設定と使用方法
- **[React アーキテクチャガイド](./REACT_ARCHITECTURE_GUIDE.md)** - プロジェクトの設計思想と実装詳細

## 🎯 主要コンポーネント

### 管理者パネル (/admin)
- ブログ投稿のCRUD操作
- リッチテキストエディタ
- リアルタイムプレビュー
- 画像アップロード機能
- LocalStorage から Firebase への移行機能

### ブログ表示 (/)
- 投稿一覧表示
- 検索・フィルタリング
- ページネーション
- カテゴリ・タグ別表示
- ブックマーク機能

### 投稿詳細 (/blog/:slug)
- マークダウンレンダリング
- SEO最適化
- ソーシャルシェア対応
- 関連投稿表示

## 🔄 データフロー

1. **Zustand Store** - 中央状態管理
2. **Firebase Service** - データベース操作
3. **React Components** - UI表示
4. **Custom Hooks** - ロジック分離

## 🎨 スタイリング

- **Tailwind CSS** - ユーティリティファーストCSS
- **CSS Custom Properties** - テーマ変数
- **Responsive Design** - モバイルファースト
- **Dark Mode** - システム設定対応

## 🔐 セキュリティ

- **Firebase Security Rules** - データベースアクセス制御
- **環境変数** - 機密情報の保護
- **XSS対策** - dangerouslySetInnerHTML の適切な使用
- **CSRF対策** - SameSite Cookie設定

## 📊 パフォーマンス

- **Code Splitting** - 動的インポート
- **Lazy Loading** - コンポーネント遅延読み込み
- **Memoization** - React.memo, useMemo, useCallback
- **Bundle Optimization** - Vite による最適化

## 🧪 開発・テスト

### ESLint設定

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### TypeScript設定

- **厳密な型チェック** - strict モード有効
- **モジュール解決** - path mapping 設定
- **型定義** - インターフェースとユニオン型の活用

## 🚀 デプロイ

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### その他のホスティング
- **Vercel** - 自動デプロイ対応
- **Netlify** - 環境変数設定
- **GitHub Pages** - 静的サイト生成

## 📈 今後の拡張

- [ ] ユーザー認証機能
- [ ] コメント機能
- [ ] 投稿統計・分析
- [ ] PWA対応
- [ ] E2Eテスト実装
- [ ] 国際化（i18n）強化
- [ ] 画像最適化
- [ ] 全文検索（Algolia）

## 🤝 コントリビューション

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 ライセンス

MIT License

## 👤 作者

**Maoto Mikami**
- GitHub: [@your-github]
- Email: your-email@example.com

---

このプロジェクトは、モダンなReact開発のベストプラクティスを学習・実践するためのサンプルアプリケーションです。