# Firebase 設定ガイド（初心者向け）

## 🔥 Firebase とは
Firebase は Google が提供するクラウドサービスで、データベースやホスティングなどを簡単に利用できます。

## 📋 設定手順

### 1. Firebaseコンソールにアクセス
1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. Googleアカウントでログイン

### 2. 新しいプロジェクトを作成
1. 「プロジェクトを作成」をクリック
2. プロジェクト名を入力（例：`my-blog-app`）
3. 「続行」をクリック
4. Google Analytics は「今は設定しない」を選択
5. 「プロジェクトを作成」をクリック

### 3. Webアプリを追加
1. プロジェクトのホーム画面で「Web」アイコン（</> マーク）をクリック
2. アプリのニックネームを入力（例：`Blog App`）
3. 「Firebase Hosting も設定する」はチェックしない
4. 「アプリを登録」をクリック

### 4. 設定情報をコピー
設定画面で以下のような情報が表示されます：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "my-blog-app.firebaseapp.com",
  projectId: "my-blog-app",
  storageBucket: "my-blog-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

### 5. 環境変数ファイルを作成
プロジェクトのルートディレクトリ（package.json があるフォルダ）に `.env.local` ファイルを作成し、以下の内容を貼り付けます：

```env
VITE_FIREBASE_API_KEY=AIzaSyAbc123...
VITE_FIREBASE_AUTH_DOMAIN=my-blog-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-blog-app
VITE_FIREBASE_STORAGE_BUCKET=my-blog-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
```

**⚠️ 重要**: 上記の値は例です。実際の値に置き換えてください。

### 6. Firestore データベースを有効化
1. Firebase Console の左メニューから「Firestore Database」をクリック
2. 「データベースの作成」をクリック
3. 「テストモードで開始」を選択
4. 「次へ」をクリック
5. ロケーションを選択（`asia-northeast1 (Tokyo)` を推奨）
6. 「完了」をクリック

### 7. セキュリティルールを設定
1. Firestore Database 画面で「ルール」タブをクリック
2. 以下の内容に変更：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogPosts/{document} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

3. 「公開」をクリック

**⚠️ 注意**: 上記のルールは開発用です。本番環境では適切な認証とアクセス制御が必要です。

## 🔄 設定確認

### 1. 開発サーバーを再起動
```bash
# 開発サーバーを停止（Ctrl+C）
# 再起動
npm run dev
```

### 2. ブラウザの開発者ツールで確認
1. ブラウザで F12 を押して開発者ツールを開く
2. 「Console」タブを確認
3. 「Firebase configured: true」と表示されていれば成功

### 3. 管理者画面で確認
1. `/admin` にアクセス
2. パスワード `mikan0420` でログイン
3. 「Migrate to Firebase」ボタンをクリック
4. 既存のデータが Firebase に移行されます

## 🚨 トラブルシューティング

### エラー: "Firebase not configured"
- `.env.local` ファイルが正しく作成されているか確認
- 環境変数の値が正しいか確認
- 開発サーバーを再起動

### エラー: "Permission denied"
- Firestore のセキュリティルールが正しく設定されているか確認
- プロジェクトIDが正しいか確認

### 投稿が表示されない
- 管理者画面で「Migrate to Firebase」を実行
- ブラウザの開発者ツールでエラーを確認

## 📱 設定完了後の機能

### ✅ 利用可能な機能
- ブログ投稿の永続化
- 複数デバイス間でのデータ同期
- リアルタイムでのデータ更新

### 🔧 追加設定（オプション）
- Firebase Authentication（ユーザー認証）
- Firebase Storage（画像保存）
- Firebase Hosting（サイト公開）

## 📞 サポート

設定で困った場合は、以下を確認してください：
1. Firebase Console でプロジェクトが作成されているか
2. `.env.local` ファイルが正しく作成されているか
3. 開発サーバーが再起動されているか
4. ブラウザの開発者ツールでエラーが出ていないか

---

この設定により、ブログの投稿データが Firebase に保存され、ページをリロードしても投稿が消えることがなくなります。