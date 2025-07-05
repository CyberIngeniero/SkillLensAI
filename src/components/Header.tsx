import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings, 
  Sun, 
  Moon, 
  Globe, 
  ChevronDown,
  Brain,
  Menu,
  X
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';
import { appConfig } from '../config/app.config';
import SettingsModal from './SettingsModal';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { state, dispatch } = useApp();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const languages = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ca', label: 'Català', flag: '🏴󠁥󠁳󠁣󠁴󠁿' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLanguageMenu(false);
  };

  const handleHomeClick = () => {
    dispatch({ type: 'SET_VIEW', payload: 'home' });
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <>
      <header className="bg-white dark:bg-personio-gray-900 shadow-sm border-b border-personio-gray-200 dark:border-personio-gray-700 backdrop-blur-sm bg-white/95 dark:bg-personio-gray-900/95 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y Título */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleHomeClick}
                className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-personio-blue to-personio-lightBlue rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-personio-gray-900 dark:text-white">
                    {appConfig.app.name}
                  </h1>
                  <p className="text-sm text-personio-gray-500 dark:text-personio-gray-400">
                    v{appConfig.app.version}
                  </p>
                </div>
              </button>
            </div>

            {/* Controles */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Hamburger Menu */}
              <button
                onClick={() => setShowSidebar(true)}
                className="p-2 rounded-xl hover:bg-personio-gray-100 dark:hover:bg-personio-gray-800 transition-colors"
                title="Menú"
              >
                <Menu className="w-5 h-5 text-personio-gray-600 dark:text-personio-gray-400" />
              </button>

              {/* Selector de Idioma */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-xl hover:bg-personio-gray-100 dark:hover:bg-personio-gray-800 transition-colors"
                >
                  <Globe className="w-5 h-5 text-personio-gray-600 dark:text-personio-gray-400" />
                  <span className="text-sm font-medium text-personio-gray-700 dark:text-personio-gray-300 hidden sm:block">
                    {currentLanguage.flag}
                  </span>
                  <span className="text-sm font-medium text-personio-gray-700 dark:text-personio-gray-300 uppercase">
                    {currentLanguage.code}
                  </span>
                  <ChevronDown className="w-4 h-4 text-personio-gray-500 dark:text-personio-gray-400" />
                </button>

                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-personio-gray-800 rounded-xl shadow-xl border border-personio-gray-200 dark:border-personio-gray-700 z-50">
                    {languages.map(language => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-personio-gray-100 dark:hover:bg-personio-gray-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                          i18n.language === language.code
                            ? 'bg-personio-blue/10 text-personio-blue dark:text-personio-lightBlue'
                            : 'text-personio-gray-700 dark:text-personio-gray-300'
                        }`}
                      >
                        <span className="mr-3">{language.flag}</span>
                        {language.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggle Tema */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-personio-gray-100 dark:hover:bg-personio-gray-800 transition-colors"
                title={theme === 'light' ? t('header.dark') : t('header.light')}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-personio-gray-600 dark:text-personio-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-personio-gray-600 dark:text-personio-gray-400" />
                )}
              </button>

              {/* Configuración */}
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-xl hover:bg-personio-gray-100 dark:hover:bg-personio-gray-800 transition-colors"
                title={t('header.settings')}
              >
                <Settings className="w-5 h-5 text-personio-gray-600 dark:text-personio-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Overlay para cerrar menús */}
        {showLanguageMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowLanguageMenu(false)}
          />
        )}
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Modal de Configuración */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
};

export default Header;