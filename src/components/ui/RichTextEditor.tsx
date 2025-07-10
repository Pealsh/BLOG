import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Upload, Image, Bold, Italic, Type, Palette, Quote, Code } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Write your content here..." 
}) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Image upload started');
    
    try {
      const file = event.target.files?.[0];
      console.log('File:', file);
      
      if (!file) {
        console.log('No file selected');
        return;
      }

      console.log('File details:', {
        name: file.name,
        size: file.size,
        type: file.type
      });

      // ファイルサイズチェック (2MB制限に縮小)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        console.log('File too large:', file.size);
        alert('ファイルサイズが大きすぎます。2MB以下のファイルを選択してください。');
        return;
      }

      // ファイルタイプチェック
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        console.log('Invalid file type:', file.type);
        alert('サポートされていないファイル形式です。JPEG、PNG、GIFファイルを選択してください。');
        return;
      }

      console.log('Starting file read...');
      setIsUploading(true);
      
      // より安全な方法で画像を処理
      const imageUrl = URL.createObjectURL(file);
      console.log('Created object URL:', imageUrl);
      
      const imageMarkdown = `![${file.name}](${imageUrl})`;
      onChange(value + '\n\n' + imageMarkdown);
      
      console.log('Image upload completed successfully');
      setIsUploading(false);
      
    } catch (error) {
      console.error('Critical error in handleImageUpload:', error);
      setIsUploading(false);
      alert('画像のアップロード中に予期しないエラーが発生しました。');
    } finally {
      // ファイル入力をリセット
      if (event.target) {
        event.target.value = '';
      }
      console.log('Image upload process finished');
    }
  };

  const handleImageUrlInsert = () => {
    if (imageUrl) {
      const imageMarkdown = `![Image](${imageUrl})`;
      onChange(value + '\n\n' + imageMarkdown);
      setImageUrl('');
      setShowImageUpload(false);
    }
  };

  const insertFormatting = (format: string) => {
    console.log('Button clicked:', format);
    
    // 簡単なテキスト追加方式に変更
    let newText = '';
    switch (format) {
      case 'bold':
        newText = `${value}**太字のテキスト**`;
        break;
      case 'italic':
        newText = `${value}*斜体のテキスト*`;
        break;
      case 'title':
        newText = `${value}<span style="font-size: 2rem; font-weight: bold;">タイトルサイズ</span>`;
        break;
      case 'subtitle':
        newText = `${value}<span style="font-size: 1.5rem; font-weight: 600;">サブタイトルサイズ</span>`;
        break;
      case 'color-red':
        newText = `${value}<span style="color: #ef4444; font-weight: 500;">赤いテキスト</span>`;
        break;
      case 'color-blue':
        newText = `${value}<span style="color: #3b82f6; font-weight: 500;">青いテキスト</span>`;
        break;
      case 'color-green':
        newText = `${value}<span style="color: #10b981; font-weight: 500;">緑のテキスト</span>`;
        break;
      case 'quote':
        newText = `${value}\n> 引用テキスト`;
        break;
      case 'code':
        newText = `${value}\`コード\``;
        break;
      default:
        return;
    }
    onChange(newText);
  };

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg border">
        {/* Test Button */}
        <button
          type="button"
          onClick={() => {
            console.log('Test button clicked!');
            onChange(value + 'テスト');
          }}
          className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          テスト
        </button>

        {/* Text Formatting */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertFormatting('bold');
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-background hover:bg-primary-500/10 rounded transition-colors"
            title="太字"
          >
            <Bold className="w-4 h-4" />
            <span className="text-sm">太字</span>
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertFormatting('italic');
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-background hover:bg-primary-500/10 rounded transition-colors"
            title="斜体"
          >
            <Italic className="w-4 h-4" />
            <span className="text-sm">斜体</span>
          </button>
        </div>
        
        <div className="border-l border-border mx-2"></div>
        
        {/* Text Sizes */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertFormatting('title');
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-background hover:bg-primary-500/10 rounded transition-colors"
            title="タイトルサイズ"
          >
            <Type className="w-5 h-5" />
            <span className="text-sm">タイトル</span>
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertFormatting('subtitle');
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-background hover:bg-primary-500/10 rounded transition-colors"
            title="サブタイトルサイズ"
          >
            <Type className="w-4 h-4" />
            <span className="text-sm">サブタイトル</span>
          </button>
        </div>
        
        <div className="border-l border-border mx-2"></div>
        
        {/* Colors */}
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">色:</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertFormatting('color-red');
            }}
            className="w-8 h-8 bg-red-500 rounded hover:ring-2 hover:ring-red-300 transition-all"
            title="赤色"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertFormatting('color-blue');
            }}
            className="w-8 h-8 bg-blue-500 rounded hover:ring-2 hover:ring-blue-300 transition-all"
            title="青色"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertFormatting('color-green');
            }}
            className="w-8 h-8 bg-green-500 rounded hover:ring-2 hover:ring-green-300 transition-all"
            title="緑色"
          />
        </div>
        
        <div className="border-l border-border mx-2"></div>
        
        {/* Quote and Code */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertFormatting('quote');
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-background hover:bg-primary-500/10 rounded transition-colors"
            title="引用"
          >
            <Quote className="w-4 h-4" />
            <span className="text-sm">引用</span>
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              insertFormatting('code');
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-background hover:bg-primary-500/10 rounded transition-colors"
            title="コード"
          >
            <Code className="w-4 h-4" />
            <span className="text-sm">コード</span>
          </button>
        </div>
        
        <div className="border-l border-border mx-2"></div>
        
        {/* Images */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="flex items-center space-x-1 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded transition-colors"
            title="画像を挿入"
          >
            <Image className="w-4 h-4" />
            <span className="text-sm">画像URL</span>
          </button>
          
          {/* 画像アップロード機能を一時的に無効化 */}
          <button
            type="button"
            disabled
            className="flex items-center space-x-1 px-3 py-2 bg-gray-400 text-white rounded cursor-not-allowed opacity-50"
            title="アップロード機能は一時的に無効です"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm">アップロード無効</span>
          </button>
          
          {/* デバッグ用: 隠しアップロード */}
          <label className={`hidden flex items-center space-x-1 px-3 py-2 rounded transition-colors cursor-pointer ${
            isUploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}>
            <Upload className="w-4 h-4" />
            <span className="text-sm">
              {isUploading ? 'アップロード中...' : '画像アップロード'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Image URL Input */}
      {showImageUpload && (
        <div className="p-4 bg-muted rounded-lg border">
          <h4 className="text-sm font-medium mb-3">画像URLを挿入</h4>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1 px-3 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={handleImageUrlInsert}
              className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
            >
              挿入
            </button>
            <button
              type="button"
              onClick={() => setShowImageUpload(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              キャンセル
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            画像のURLを入力してください。JPEG、PNG、GIF、WebPがサポートされています。
          </p>
        </div>
      )}

      {/* Markdown Editor with Live Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-3 py-2 border-b border-border">
            <h4 className="text-sm font-medium">編集エリア</h4>
          </div>
          <MDEditor
            value={value}
            onChange={(val) => onChange(val || '')}
            preview="edit"
            hideToolbar
            textareaProps={{
              placeholder,
              style: {
                fontSize: 14,
                lineHeight: 1.6,
                fontFamily: 'inherit',
                padding: '16px',
                minHeight: '400px',
                border: 'none',
                resize: 'vertical'
              }
            }}
          />
        </div>

        {/* Live Preview */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-3 py-2 border-b border-border">
            <h4 className="text-sm font-medium">🔄 リアルタイムプレビュー</h4>
          </div>
          <div className="p-4 bg-background min-h-[400px] max-h-[600px] overflow-y-auto">
            {value ? (
              <div 
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: value
                    // 基本的なマークダウン変換
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded text-sm">$1</code>')
                    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary-500 pl-4 italic my-2">$1</blockquote>')
                    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg shadow-md max-w-full h-auto my-2" />')
                    // HTMLスタイルタグをそのまま適用
                    .replace(/<span style="([^"]*)">(.*?)<\/span>/g, '<span style="$1">$2</span>')
                    // 改行を段落に変換
                    .split('\n\n')
                    .map(paragraph => paragraph.trim() ? `<p class="mb-4">${paragraph.replace(/\n/g, '<br />')}</p>` : '')
                    .join('')
                }}
              />
            ) : (
              <p className="text-muted-foreground">ここにリアルタイムプレビューが表示されます...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;