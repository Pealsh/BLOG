# 俺の作ったブログサイト 🚀

React とか TypeScript とか使って仕上げました

## これヤバくない？できること一覧 ✨

- **ブログ書ける** - 
- **リッチエディタ** - 
- **プレビュー機能** - 
- **日本語英語** - 
- **ダークモード** - 
- **検索機能** -
- **スマホ対応** -
- **SEO対策** -
- **Firebase** -
- **永続化** - 

## 使った技術たち 🛠️

### フロントエンド
- **React 19.1.0** - 
- **TypeScript** - 
- **Vite** - 
- **Tailwind CSS** - 
- **Zustand** - 
- **React Router** - 

### バックエンド
- **Firebase Firestore** - 
- **Firebase SDK** - 

### その他
- **@uiw/react-md-editor** - 
- **React Markdown** - 
- **Lucide React** - 
- **React Helmet** - 
- **date-fns** - 

## フォルダ構成 📁

```
src/
├── components/          # 部品たち
│   ├── blog/           # ブログ関連の部品
│   ├── layout/         # レイアウト部品
│   └── ui/             # UI部品
├── hooks/              # カスタムフック
├── lib/                # 外部ライブラリ設定
├── pages/              # ページたち
├── services/           # API関連
├── store/              # 状態管理
├── types/              # TypeScript の型
├── utils/              # 便利な関数
└── data/               # データ
```

## 使い方 🔧

### 1. インストール
```bash
npm install
```

### 2. Firebase 設定
`.env.local` ファイル作って Firebase の設定入れる：

```env
VITE_FIREBASE_API_KEY=あなたのAPIキー
VITE_FIREBASE_AUTH_DOMAIN=あなたのプロジェクト.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=あなたのプロジェクトID
VITE_FIREBASE_STORAGE_BUCKET=あなたのプロジェクト.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=あなたのセンダーID
VITE_FIREBASE_APP_ID=あなたのアプリID
```

### 3. 起動
```bash
npm run dev
```

### 4. ビルド
```bash
npm run build
```

## 主な機能 🎯

### メインページ (/)
- 記事一覧表示
- 検索・フィルタリング
- ページネーション
- カテゴリ・タグ別表示
- ブックマーク機能

### 記事詳細 (/blog/:slug)
- マークダウンで記事表示
- SEO 最適化
- シェア機能
- 関連記事表示

## 今後やりたいこと 📈

- [ ] いいね機能
- [ ] 多言語対応強化
- [ ] 画像最適化
- [ ] 全文検索

## 作った理由 💭

プログラミング始めてまだ日は浅いけど、とにかく何か作ってみたかった！
最初は HTML と CSS だけだったけど、だんだん JavaScript、React、TypeScript って順番覚えて
気がついたらこんなに本格的なサイトができてた。

Firebase とか使って本格的なデータベースも使えるようになったし、
SEO とかパフォーマンスとかも考えて作ったから、結構本格的だと思う。

まだまだ改善したいところはあるけど、ひとまず形になって嬉しい！

## 連絡先 📧

何か質問とかあったら気軽に連絡してください！

**Maoto Mikami**
- GitHub: [@Pealsh]
- Email: pengutobitai@gamil.com

---

見てくれてありがとう！ 🙏