import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Brain, 
  Target, 
  Users, 
  Zap,
  ExternalLink,
  Award,
  Globe,
  Shield,
  Heart,
  Code,
  Lightbulb
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { appConfig } from '../../config/app.config';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch } = useApp();

  const handleBack = () => {
    dispatch({ type: 'SET_VIEW', payload: 'home' });
  };

  const features = [
    {
      icon: Brain,
      title: t('about.features.ai.title'),
      description: t('about.features.ai.description'),
      color: 'text-personio-blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Target,
      title: t('about.features.precision.title'),
      description: t('about.features.precision.description'),
      color: 'text-personio-green',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: Zap,
      title: t('about.features.speed.title'),
      description: t('about.features.speed.description'),
      color: 'text-personio-orange',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      icon: Shield,
      title: t('about.features.security.title'),
      description: t('about.features.security.description'),
      color: 'text-personio-red',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    }
  ];

  const teamValues = [
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Users,
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description')
    },
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Globe,
      title: t('about.values.accessibility.title'),
      description: t('about.values.accessibility.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-personio-gray-50 to-blue-50 dark:from-personio-gray-900 dark:to-personio-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-personio-blue hover:text-personio-darkBlue transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('common.back')}</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-personio-blue to-personio-lightBlue rounded-3xl mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-personio-gray-900 dark:text-white mb-4">
              {t('about.title')}
            </h1>
            <p className="text-xl text-personio-gray-600 dark:text-personio-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-personio-gray-900 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-8 h-8 text-personio-blue" />
              <h2 className="text-2xl font-bold text-personio-gray-900 dark:text-white">
                {t('about.mission.title')}
              </h2>
            </div>
            <p className="text-personio-gray-600 dark:text-personio-gray-300 leading-relaxed">
              {t('about.mission.description')}
            </p>
          </div>

          <div className="bg-white dark:bg-personio-gray-900 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <Lightbulb className="w-8 h-8 text-personio-green" />
              <h2 className="text-2xl font-bold text-personio-gray-900 dark:text-white">
                {t('about.vision.title')}
              </h2>
            </div>
            <p className="text-personio-gray-600 dark:text-personio-gray-300 leading-relaxed">
              {t('about.vision.description')}
            </p>
          </div>
        </div>

        {/* Características principales */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-personio-gray-900 dark:text-white mb-4">
              {t('about.featuresTitle')}
            </h2>
            <p className="text-xl text-personio-gray-600 dark:text-personio-gray-300 max-w-3xl mx-auto">
              {t('about.featuresSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`p-6 ${feature.bgColor} rounded-2xl hover:bg-white dark:hover:bg-personio-gray-800 hover:shadow-xl transition-all duration-300 border border-personio-gray-200 dark:border-personio-gray-700`}
                >
                  <div className={`w-12 h-12 ${feature.color} bg-white dark:bg-personio-gray-800 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-personio-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-personio-gray-600 dark:text-personio-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Valores del equipo */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-personio-gray-900 dark:text-white mb-4">
              {t('about.valuesTitle')}
            </h2>
            <p className="text-xl text-personio-gray-600 dark:text-personio-gray-300 max-w-3xl mx-auto">
              {t('about.valuesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-personio-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-personio-blue/10 rounded-xl flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-personio-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-personio-gray-900 dark:text-white mb-3">
                        {value.title}
                      </h3>
                      <p className="text-personio-gray-600 dark:text-personio-gray-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Información técnica */}
        <div className="bg-white dark:bg-personio-gray-900 rounded-2xl p-8 shadow-xl mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <Code className="w-8 h-8 text-personio-orange" />
            <h2 className="text-2xl font-bold text-personio-gray-900 dark:text-white">
              {t('about.technical.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-personio-gray-900 dark:text-white mb-4">
                {t('about.technical.frontend')}
              </h3>
              <ul className="space-y-2 text-personio-gray-600 dark:text-personio-gray-300">
                <li>• React 18 + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Vite</li>
                <li>• React i18next</li>
                <li>• Lucide React Icons</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-personio-gray-900 dark:text-white mb-4">
                {t('about.technical.features')}
              </h3>
              <ul className="space-y-2 text-personio-gray-600 dark:text-personio-gray-300">
                <li>• {t('about.technical.multiLanguage')}</li>
                <li>• {t('about.technical.darkMode')}</li>
                <li>• {t('about.technical.responsive')}</li>
                <li>• {t('about.technical.accessibility')}</li>
                <li>• {t('about.technical.performance')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Información de Raona */}
        <div className="bg-gradient-to-br from-personio-blue to-personio-lightBlue rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <img 
                src="/files_572887-1751748844310-image.png" 
                alt="Raona Enginyers" 
                className="w-24 h-24 rounded-2xl bg-white p-4"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">{t('about.raona.title')}</h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                {t('about.raona.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a 
                  href="https://www.raona.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>{t('about.raona.visitWebsite')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                
                <div className="flex items-center space-x-2 text-blue-100">
                  <Heart className="w-5 h-5 text-personio-red animate-pulse" />
                  <span>{t('about.raona.madeWithLove')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información de versión */}
        <div className="text-center mt-12 pt-8 border-t border-personio-gray-200 dark:border-personio-gray-700">
          <p className="text-personio-gray-500 dark:text-personio-gray-400">
            {appConfig.app.name} v{appConfig.app.version} • {t('about.version.buildDate')}: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;