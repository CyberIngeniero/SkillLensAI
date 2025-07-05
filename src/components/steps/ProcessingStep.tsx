import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Loader2, 
  FileText, 
  Brain, 
  BarChart3, 
  CheckCircle
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ProcessingStep: React.FC = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useApp();
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    {
      id: 0,
      title: t('processing.analyzing'),
      description: 'Extrayendo información de los documentos',
      icon: FileText,
      duration: 3000,
    },
    {
      id: 1,
      title: t('processing.comparing'),
      description: 'Comparando perfiles con la descripción del puesto',
      icon: Brain,
      duration: 2000,
    },
    {
      id: 2,
      title: t('processing.evaluating'),
      description: 'Calculando puntuaciones y compatibilidad',
      icon: BarChart3,
      duration: 2000,
    },
    {
      id: 3,
      title: t('processing.completed'),
      description: 'Proceso completado exitosamente',
      icon: CheckCircle,
      duration: 500,
    },
  ];

  useEffect(() => {
    if (!state.isProcessing) return;

    let phaseTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const processPhase = (phaseIndex: number) => {
      if (phaseIndex >= phases.length) {
        // Generar resultados simulados
        generateMockResults();
        dispatch({ type: 'SET_PROCESSING', payload: false });
        dispatch({ type: 'SET_STEP', payload: 3 });
        return;
      }

      setCurrentPhase(phaseIndex);
      const phase = phases[phaseIndex];
      
      // Simular progreso durante la fase
      const startProgress = (phaseIndex / phases.length) * 100;
      const endProgress = ((phaseIndex + 1) / phases.length) * 100;
      const steps = 20;
      const stepDuration = phase.duration / steps;
      let currentStep = 0;

      progressInterval = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(progressInterval);
          return;
        }
        
        const progress = startProgress + (endProgress - startProgress) * (currentStep / steps);
        dispatch({ type: 'SET_PROCESSING_PROGRESS', payload: progress });
        currentStep++;
      }, stepDuration);

      phaseTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        processPhase(phaseIndex + 1);
      }, phase.duration);
    };

    processPhase(0);

    return () => {
      clearTimeout(phaseTimeout);
      clearInterval(progressInterval);
    };
  }, [state.isProcessing, dispatch]);

  const generateMockResults = () => {
    const mockResults = state.documents.map((doc, index) => ({
      candidateId: `candidate-${index + 1}`,
      candidateName: `Candidato ${index + 1}`,
      documentId: doc.id,
      score: Math.random() * 5,
      details: {
        experience: Math.random() * 5,
        skills: Math.random() * 5,
        education: Math.random() * 5,
        compatibility: Math.random() * 5,
      },
      extractedInfo: {
        name: `Candidato ${index + 1}`,
        email: `candidato${index + 1}@email.com`,
        phone: `+34 ${Math.floor(Math.random() * 900000000) + 100000000}`,
        experience: ['React', 'TypeScript', 'Node.js'],
        skills: ['JavaScript', 'HTML', 'CSS', 'Git'],
        education: ['Ingeniería Informática', 'Máster en Desarrollo Web'],
      },
    }));

    dispatch({ type: 'SET_EVALUATION_RESULTS', payload: mockResults });
  };

  const currentPhaseData = phases[currentPhase];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Loader2 className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('processing.title')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t('processing.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Fase actual */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full mx-auto mb-4">
              {React.createElement(currentPhaseData.icon, {
                className: `w-10 h-10 text-blue-600 dark:text-blue-400 ${
                  currentPhase < 3 ? 'animate-pulse' : ''
                }`,
              })}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {currentPhaseData.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentPhaseData.description}
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progreso general</span>
              <span>{Math.round(state.processingProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${state.processingProgress}%` }}
              />
            </div>
          </div>

          {/* Fases */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {phases.slice(0, -1).map((phase, index) => {
              const isActive = index === currentPhase;
              const isCompleted = index < currentPhase;
              const IconComponent = phase.icon;

              return (
                <div
                  key={phase.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : isCompleted
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'bg-blue-500'
                          : isCompleted
                          ? 'bg-green-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <IconComponent
                          className={`w-4 h-4 ${
                            isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-medium ${
                          isActive || isCompleted
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {phase.title}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Información de documentos */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Documentos procesándose
            </h4>
            <div className="space-y-2">
              {state.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{doc.originalName}</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {currentPhase < 3 ? 'Procesando...' : 'Completado'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStep;