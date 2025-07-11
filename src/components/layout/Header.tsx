import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Sun, Moon, Laptop, ExternalLink } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { useState } from 'react';
import SearchModal from '../ui/SearchModal';

const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, isTranslating } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // 環境変数からポートフォリオURLを取得
  const portfolioUrl = import.meta.env.VITE_PORTFOLIO_URL || 'https://your-portfolio-site.com';

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'dark':
        return <Moon className="w-5 h-5 text-blue-400" />;
      default:
        return <Laptop className="w-5 h-5 text-gray-500" />;
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Navigation */}
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="flex items-center space-x-2 hover:text-primary-500 transition-colors"
              >
                <Home className="w-5 h-5" />
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  to="/"
                  className={`font-poppins font-semibold uppercase text-sm transition-colors ${
                    isActive('/') 
                      ? 'text-primary-500' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`font-poppins font-semibold uppercase text-sm transition-colors ${
                    isActive('/about') 
                      ? 'text-primary-500' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  About
                </Link>
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-poppins font-semibold uppercase text-sm transition-colors text-muted-foreground hover:text-foreground flex items-center justify-center space-x-1"
                >
                  <span>Profile</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </nav>
            </div>

            {/* Right side - Search and Theme */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  Search...
                </span>
              </button>
              
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-lg hover:bg-muted transition-all duration-300 hover:scale-105 active:scale-95 group"
                aria-label="Toggle theme"
              >
                <div className="transform transition-all duration-300 group-hover:rotate-12">
                  {getThemeIcon()}
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={toggleLanguage}
                disabled={isTranslating}
                className={`px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 font-semibold text-sm relative ${
                  isTranslating 
                    ? 'bg-primary-500/20 cursor-not-allowed' 
                    : 'hover:bg-muted'
                }`}
                aria-label="Toggle language"
              >
                {isTranslating ? (
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>...</span>
                  </div>
                ) : (
                  language === 'en' ? 'JP' : 'EN'
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-4">
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className={`font-poppins font-semibold uppercase text-sm transition-colors ${
                  isActive('/') 
                    ? 'text-primary-500' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`font-poppins font-semibold uppercase text-sm transition-colors ${
                  isActive('/about') 
                    ? 'text-primary-500' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                About
              </Link>
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppins font-semibold uppercase text-sm transition-colors text-muted-foreground hover:text-foreground flex items-center justify-center space-x-1"
              >
                <span>Profile</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Header;