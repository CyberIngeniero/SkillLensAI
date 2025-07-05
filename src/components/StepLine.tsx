import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Upload, 
  Loader2, 
  BarChart3,
  Check,
  Circle
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const StepLine: React.FC = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useApp();

  // No mostrar StepLine en la vista home
  if (state.currentView === 'home') {
    return null;
  }

  const steps = [
    {
      id: 0,
      title: t('steps.jobDescription'),
      icon: FileText,
      description: 'Definir la descripción del puesto'
    },
    {
      id: 1,
      title: t('steps.documentUpload'),
      icon: Upload,
      description: 'Cargar CVs de candidatos'
    },
    {
      id: 2,
      title: t('steps.processing'),
      icon: Loader2,
      description: 'Procesar y evaluar documentos'
    },
    {
      id: 3,
      title: t('steps.results'),
      icon: BarChart3,
      description: 'Ver resultados de evaluación'
    }
  ];

  const getStepStatus = (stepId: number) => {
    if (stepId < state.currentStep) return 'completed';
    if (stepId === state.currentStep) return 'active';
    return 'pending';
  };

  const canNavigateToStep = (stepId: number) => {
    // Puede navegar a pasos anteriores o al paso actual
    return stepId <= state.currentStep;
  };

  const handleStepClick = (stepId: number) => {
    if (canNavigateToStep(stepId)) {
      dispatch({ type: 'SET_STEP', payload: stepId });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Mobile view - Horizontal scroll */}
        <div className="block sm:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const IconComponent = step.icon;
              const isClickable = canNavigateToStep(step.id);

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    disabled={!isClickable}
                    className={`
                      relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 
                      ${status === 'completed' 
                        ? 'bg-green-500 hover:bg-green-600 cursor-pointer' 
                        : status === 'active' 
                        ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' 
                        : 'bg-gray-200 dark:bg-gray-700'
                      }
                      ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                      ${status === 'active' ? 'ring-4 ring-blue-500/20' : ''}
                    `}
                  >
                    {status === 'completed' ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : status === 'active' ? (
                      <IconComponent className={`w-5 h-5 text-white ${step.icon === Loader2 && state.isProcessing ? 'animate-spin' : ''}`} />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 mx-2">
                      <div className={`h-full transition-colors duration-300 ${
                        getStepStatus(step.id + 1) === 'completed' || getStepStatus(step.id) === 'completed'
                          ? 'bg-green-500' 
                          : getStepStatus(step.id) === 'active' 
                          ? 'bg-gradient-to-r from-blue-500 to-gray-200 dark:to-gray-700'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Current step info */}
          <div className="mt-3 text-center">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {steps[state.currentStep]?.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {steps[state.currentStep]?.description}
            </p>
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden sm:flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const IconComponent = step.icon;
            const isClickable = canNavigateToStep(step.id);

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Paso */}
                <div className="flex flex-col items-center relative">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    disabled={!isClickable}
                    className={`
                      relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 
                      ${status === 'completed' 
                        ? 'bg-green-500 hover:bg-green-600 cursor-pointer' 
                        : status === 'active' 
                        ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' 
                        : 'bg-gray-200 dark:bg-gray-700'
                      }
                      ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                      ${status === 'active' ? 'ring-4 ring-blue-500/20' : ''}
                    `}
                  >
                    {status === 'completed' ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : status === 'active' ? (
                      <IconComponent className={`w-6 h-6 text-white ${step.icon === Loader2 && state.isProcessing ? 'animate-spin' : ''}`} />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  
                  {/* Título y descripción */}
                  <div className="mt-3 text-center">
                    <h3 className={`text-sm font-medium ${
                      status === 'completed' || status === 'active' 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-32">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Línea conectora */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 mb-8">
                    <div className={`h-0.5 w-full transition-colors duration-300 ${
                      getStepStatus(step.id + 1) === 'completed' || getStepStatus(step.id) === 'completed'
                        ? 'bg-green-500' 
                        : getStepStatus(step.id) === 'active' 
                        ? 'bg-gradient-to-r from-blue-500 to-gray-200 dark:to-gray-700'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Indicador de progreso */}
        {state.isProcessing && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Procesando documentos...</span>
              <span>{Math.round(state.processingProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${state.processingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepLine;