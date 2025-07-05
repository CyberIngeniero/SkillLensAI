import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Play, 
  FileText, 
  Users, 
  BarChart3, 
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
  Brain,
  Target,
  Clock,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { appConfig } from '../config/app.config';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    time: 0,
    precision: 0,
    candidates: 0,
    objectivity: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Animar estadísticas
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(interval);
          return;
        }

        const progress = currentStep / steps;
        setAnimatedStats({
          time: Math.round(80 * progress),
          precision: Math.round(95 * progress),
          candidates: Math.round(3 * progress * 10) / 10,
          objectivity: Math.round(100 * progress)
        });

        currentStep++;
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartProcess = () => {
    dispatch({ type: 'SET_VIEW', payload: 'process' });
    dispatch({ type: 'SET_STEP', payload: 0 });
  };

  const features = [
    {
      icon: Brain,
      title: 'IA Avanzada',
      description: 'Análisis inteligente de CVs con tecnología de última generación',
      color: 'text-personio-blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      delay: '0ms'
    },
    {
      icon: Target,
      title: 'Evaluación Precisa',
      description: 'Comparación detallada con criterios específicos del puesto',
      color: 'text-personio-green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      delay: '100ms'
    },
    {
      icon: Clock,
      title: 'Ahorro de Tiempo',
      description: 'Reduce el tiempo de selección en un 80%',
      color: 'text-personio-orange',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      delay: '200ms'
    },
    {
      icon: Shield,
      title: 'Seguro y Confiable',
      description: 'Datos protegidos con encriptación de nivel empresarial',
      color: 'text-personio-red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      delay: '300ms'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Descripción del Puesto',
      description: 'Define los criterios y requisitos del puesto de trabajo',
      icon: FileText,
      color: 'from-personio-blue to-personio-lightBlue'
    },
    {
      number: '02',
      title: 'Carga de CVs',
      description: 'Sube los documentos PDF de los candidatos',
      icon: Users,
      color: 'from-personio-green to-green-400'
    },
    {
      number: '03',
      title: 'Procesamiento IA',
      description: 'Nuestra IA analiza y extrae información relevante',
      icon: Zap,
      color: 'from-personio-orange to-yellow-400'
    },
    {
      number: '04',
      title: 'Resultados',
      description: 'Obtén evaluaciones detalladas y rankings de candidatos',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const benefits = [
    'Análisis automático de CVs en múltiples idiomas',
    'Evaluación objetiva basada en criterios específicos',
    'Ranking inteligente de candidatos',
    'Reportes detallados exportables',
    'Interfaz intuitiva y fácil de usar',
    'Procesamiento rápido y eficiente'
  ];

  const stats = [
    { 
      value: `${animatedStats.time}%`, 
      label: 'Reducción de tiempo', 
      icon: Clock,
      color: 'text-personio-blue'
    },
    { 
      value: `${animatedStats.precision}%`, 
      label: 'Precisión en evaluación', 
      icon: Target,
      color: 'text-personio-green'
    },
    { 
      value: `${animatedStats.candidates}x`, 
      label: 'Más candidatos evaluados', 
      icon: TrendingUp,
      color: 'text-personio-orange'
    },
    { 
      value: `${animatedStats.objectivity}%`, 
      label: 'Objetividad garantizada', 
      icon: Award,
      color: 'text-personio-red'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-personio-gray-50 via-white to-blue-50 dark:from-personio-gray-900 dark:via-personio-gray-900 dark:to-personio-gray-800">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-personio-blue/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-personio-green/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-personio-orange/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/10 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-personio-blue to-personio-lightBlue rounded-3xl shadow-2xl animate-glow">
                  <Brain className="w-12 h-12 text-white animate-pulse-slow" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-personio-green rounded-full flex items-center justify-center animate-bounce-gentle">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-personio-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-personio-blue via-personio-lightBlue to-personio-green bg-clip-text text-transparent">
                {appConfig.app.name}
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-personio-gray-600 dark:text-personio-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Revoluciona tu proceso de selección con inteligencia artificial. 
              <br className="hidden sm:block" />
              <span className="text-personio-blue font-semibold">Evalúa candidatos de forma objetiva y eficiente.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleStartProcess}
                className="group relative flex items-center px-10 py-5 bg-gradient-to-r from-personio-blue to-personio-lightBlue hover:from-personio-darkBlue hover:to-personio-blue text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Play className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
                Comenzar Evaluación
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center text-personio-gray-500 dark:text-personio-gray-400 bg-white/50 dark:bg-personio-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-personio-gray-200 dark:border-personio-gray-700">
                <Globe className="w-5 h-5 mr-2" />
                <span className="font-medium">Disponible en 3 idiomas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-personio-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-personio-gray-900 dark:text-white mb-6">
              ¿Por qué elegir <span className="text-personio-blue">{appConfig.app.name}</span>?
            </h2>
            <p className="text-xl text-personio-gray-600 dark:text-personio-gray-300 max-w-3xl mx-auto leading-relaxed">
              Nuestra plataforma combina inteligencia artificial avanzada con una interfaz intuitiva 
              para transformar tu proceso de reclutamiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`group p-8 ${feature.bgColor} rounded-2xl hover:bg-white dark:hover:bg-personio-gray-800 hover:shadow-2xl transition-all duration-500 border border-personio-gray-200 dark:border-personio-gray-700 transform hover:scale-105 animate-fade-in-up`}
                  style={{ animationDelay: feature.delay }}
                >
                  <div className={`w-16 h-16 ${feature.color} bg-white dark:bg-personio-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-personio-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-personio-gray-600 dark:text-personio-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-20 bg-gradient-to-br from-personio-gray-50 to-blue-50 dark:from-personio-gray-800 dark:to-personio-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-personio-gray-900 dark:text-white mb-6">
              Proceso Simple en <span className="text-personio-blue">4 Pasos</span>
            </h2>
            <p className="text-xl text-personio-gray-600 dark:text-personio-gray-300 max-w-3xl mx-auto leading-relaxed">
              Desde la definición del puesto hasta los resultados finales, 
              nuestro proceso está diseñado para ser eficiente y efectivo.
            </p>
          </div>

          <div className="relative">
            {/* Línea conectora mejorada */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1">
              <svg className="w-full h-full" viewBox="0 0 100 1" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0066cc" />
                    <stop offset="33%" stopColor="#22c55e" />
                    <stop offset="66%" stopColor="#ff9933" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
                <line 
                  x1="12.5" y1="0.5" x2="87.5" y2="0.5" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="0.2"
                  className="animate-draw-line"
                  style={{ strokeDasharray: '100', strokeDashoffset: isVisible ? '0' : '100' }}
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={index} 
                    className={`relative text-center animate-fade-in-up`}
                    style={{ animationDelay: `${600 + index * 150}ms` }}
                  >
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 transition-all duration-300 animate-float`} style={{ animationDelay: `${index * 0.5}s` }}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-white dark:bg-personio-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-personio-blue">
                        <span className="text-sm font-bold text-personio-blue">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-personio-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-personio-gray-600 dark:text-personio-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white dark:bg-personio-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`animate-slide-in-left`} style={{ animationDelay: '800ms' }}>
              <h2 className="text-4xl sm:text-5xl font-bold text-personio-gray-900 dark:text-white mb-8">
                Beneficios que <span className="text-personio-blue">Transforman</span> tu Reclutamiento
              </h2>
              <p className="text-xl text-personio-gray-600 dark:text-personio-gray-300 mb-10 leading-relaxed">
                Optimiza tu proceso de selección con herramientas avanzadas que te permiten 
                tomar decisiones más informadas y reducir significativamente el tiempo de contratación.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-4 animate-fade-in-up group`}
                    style={{ animationDelay: `${1000 + index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-personio-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-personio-gray-700 dark:text-personio-gray-300 leading-relaxed group-hover:text-personio-gray-900 dark:group-hover:text-white transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`relative animate-slide-in-right`} style={{ animationDelay: '1000ms' }}>
              <div className="bg-gradient-to-br from-personio-blue via-personio-lightBlue to-personio-green rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <BarChart3 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Resultados Comprobados</h3>
                    <p className="text-blue-100">Datos reales de nuestros clientes</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    {stats.map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <div 
                          key={index} 
                          className={`text-center animate-scale-in group`}
                          style={{ animationDelay: `${1200 + index * 150}ms` }}
                        >
                          <div className="flex justify-center mb-3">
                            <IconComponent className="w-6 h-6 text-blue-200 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="text-4xl font-bold mb-2 group-hover:scale-105 transition-transform">{stat.value}</div>
                          <div className="text-sm text-blue-100 leading-tight">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-personio-blue via-personio-lightBlue to-personio-green relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`animate-fade-in-up`} style={{ animationDelay: '1400ms' }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              ¿Listo para <span className="text-yellow-300">Revolucionar</span> tu Proceso de Selección?
            </h2>
            <p className="text-2xl text-blue-100 mb-12 leading-relaxed">
              Únete a las empresas que ya están transformando su reclutamiento con IA
            </p>
            <button
              onClick={handleStartProcess}
              className="group inline-flex items-center px-12 py-6 bg-white text-personio-blue font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-bounce-gentle"
            >
              <Play className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
              Comenzar Ahora
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;