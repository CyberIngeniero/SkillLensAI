import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  AlertTriangle, 
  Info, 
  ExternalLink,
  Heart
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { appConfig } from '../config/app.config';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch } = useApp();

  const handlePageNavigation = (page: string) => {
    dispatch({ type: 'SET_VIEW', payload: 'page' as any });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page } as any);
  };

  const footerLinks = [
    {
      icon: Mail,
      label: t('footer.contact'),
      onClick: () => handlePageNavigation('contact')
    },
    {
      icon: AlertTriangle,
      label: t('footer.reportBug'),
      onClick: () => handlePageNavigation('report-bug')
    },
    {
      icon: Info,
      label: t('footer.about'),
      onClick: () => handlePageNavigation('about')
    }
  ];

  return (
    <footer className="bg-personio-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-personio-blue to-personio-lightBlue rounded-xl">
                <img 
                  src="/files_572887-1751748844310-image.png" 
                  alt="SkillLens AI" 
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">{appConfig.app.name}</h3>
                <p className="text-sm text-personio-gray-400">v{appConfig.app.version}</p>
              </div>
            </div>
            <p className="text-personio-gray-300 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.quickLinks')}</h4>
            <nav className="space-y-2">
              {footerLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={index}
                    onClick={link.onClick}
                    className="flex items-center space-x-2 text-personio-gray-300 hover:text-white transition-colors group"
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Información de Raona */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.developedBy')}</h4>
            <div className="flex items-center space-x-3">
              <img 
                src="/files_572887-1751748844310-image.png" 
                alt="Raona Enginyers" 
                className="w-12 h-12 rounded-lg bg-white p-2"
              />
              <div>
                <a 
                  href="https://www.raona.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-personio-lightBlue hover:text-white transition-colors flex items-center space-x-1 font-semibold"
                >
                  <span>Raona Enginyers</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-sm text-personio-gray-400">
                  {t('footer.raonaDescription')}
                </p>
              </div>
            </div>
            <div className="text-sm text-personio-gray-400">
              <p className="flex items-center space-x-1">
                <span>{t('footer.madeWith')}</span>
                <Heart className="w-4 h-4 text-personio-red animate-pulse" />
                <span>{t('footer.inBarcelona')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-personio-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-personio-gray-400">
              © {new Date().getFullYear()} {appConfig.app.name}. {t('footer.allRightsReserved')}
            </div>
            <div className="flex items-center space-x-6 text-sm text-personio-gray-400">
              <span>{t('footer.version')} {appConfig.app.version}</span>
              <span>•</span>
              <span>{t('footer.poweredBy')} Raona</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;