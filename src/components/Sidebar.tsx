import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  Home, 
  FileText, 
  Upload, 
  BarChart3, 
  Settings,
  Mail,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useApp();

  const handleNavigation = (view: 'home' | 'process', step?: number) => {
    dispatch({ type: 'SET_VIEW', payload: view });
    if (step !== undefined) {
      dispatch({ type: 'SET_STEP', payload: step });
    }
    onClose();
  };

  const handlePageNavigation = (page: string) => {
    dispatch({ type: 'SET_VIEW', payload: 'page' as any });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page } as any);
    onClose();
  };

  const menuItems = [
    {
      icon: Home,
      label: t('sidebar.home'),
      onClick: () => handleNavigation('home'),
      active: state.currentView === 'home'
    },
    {
      icon: FileText,
      label: t('sidebar.jobDescription'),
      onClick: () => handleNavigation('process', 0),
      active: state.currentView === 'process' && state.currentStep === 0
    },
    {
      icon: Upload,
      label: t('sidebar.uploadDocuments'),
      onClick: () => handleNavigation('process', 1),
      active: state.currentView === 'process' && state.currentStep === 1,
      disabled: !state.jobDescription
    },
    {
      icon: BarChart3,
      label: t('sidebar.results'),
      onClick: () => handleNavigation('process', 3),
      active: state.currentView === 'process' && state.currentStep === 3,
      disabled: state.evaluationResults.length === 0
    }
  ];

  const pageItems = [
    {
      icon: Mail,
      label: t('sidebar.contact'),
      onClick: () => handlePageNavigation('contact')
    },
    {
      icon: AlertTriangle,
      label: t('sidebar.reportBug'),
      onClick: () => handlePageNavigation('report-bug')
    },
    {
      icon: Info,
      label: t('sidebar.about'),
      onClick: () => handlePageNavigation('about')
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-personio-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-personio-gray-200 dark:border-personio-gray-700">
            <h2 className="text-xl font-bold text-personio-gray-900 dark:text-white">
              {t('sidebar.menu')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-personio-gray-100 dark:hover:bg-personio-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-personio-gray-500 dark:text-personio-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-personio-gray-500 dark:text-personio-gray-400 uppercase tracking-wider mb-3">
                {t('sidebar.navigation')}
              </h3>
              <nav className="space-y-2">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={item.onClick}
                      disabled={item.disabled}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        item.active
                          ? 'bg-personio-blue text-white'
                          : item.disabled
                          ? 'text-personio-gray-400 dark:text-personio-gray-600 cursor-not-allowed'
                          : 'text-personio-gray-700 dark:text-personio-gray-300 hover:bg-personio-gray-100 dark:hover:bg-personio-gray-800'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-personio-gray-200 dark:border-personio-gray-700">
              <h3 className="text-sm font-semibold text-personio-gray-500 dark:text-personio-gray-400 uppercase tracking-wider mb-3">
                {t('sidebar.support')}
              </h3>
              <nav className="space-y-2">
                {pageItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-personio-gray-700 dark:text-personio-gray-300 hover:bg-personio-gray-100 dark:hover:bg-personio-gray-800 transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-personio-gray-200 dark:border-personio-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <img 
                src="/files_572887-1751802393366-image.png" 
                alt="Raona Logo" 
                className="w-8 h-8"
              />
              <div>
                <p className="text-sm font-medium text-personio-gray-900 dark:text-white">
                  {t('sidebar.poweredBy')}
                </p>
                <a 
                  href="https://www.raona.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-personio-blue hover:text-personio-darkBlue flex items-center space-x-1"
                >
                  <span>Raona Enginyers</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <p className="text-xs text-personio-gray-500 dark:text-personio-gray-400">
              {t('sidebar.createdBy')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;