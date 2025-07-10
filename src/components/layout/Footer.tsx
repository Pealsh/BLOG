import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];


  return (
    <footer className="bg-muted/50 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">
          <p className="mb-2">© 2024 Maoto Mikami. All rights reserved.</p>
          <p className="text-sm">{t.developer} | {t.student}</p>
          
          {/* 隠し管理者リンク */}
          <div className="mt-4">
            <Link 
              to="/admin" 
              className="text-xs text-muted-foreground/50 hover:text-primary-500 transition-colors"
            >
              •
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;