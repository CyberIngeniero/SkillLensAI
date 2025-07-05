import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, FileText, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const JobDescriptionStep: React.FC = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useApp();
  const [publicDescription, setPublicDescription] = useState('');
  const [specialConditions, setSpecialConditions] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (state.jobDescription) {
      setPublicDescription(state.jobDescription.publicDescription);
      setSpecialConditions(state.jobDescription.specialConditions);
    }
  }, [state.jobDescription]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!publicDescription.trim()) {
      newErrors.publicDescription = 'La descripción pública es requerida';
    }
    
    if (!specialConditions.trim()) {
      newErrors.specialConditions = 'Las condiciones especiales son requeridas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const jobDescription = {
        id: state.jobDescription?.id || Date.now().toString(),
        publicDescription,
        specialConditions,
        createdAt: state.jobDescription?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch({ type: 'SET_JOB_DESCRIPTION', payload: jobDescription });
      
      // Avanzar al siguiente paso
      dispatch({ type: 'SET_STEP', payload: 1 });
    } catch (error) {
      console.error('Error saving job description:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    dispatch({ type: 'SET_VIEW', payload: 'home' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-personio-gray-900 rounded-2xl shadow-xl border border-personio-gray-200 dark:border-personio-gray-700">
        <div className="p-6 border-b border-personio-gray-200 dark:border-personio-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-personio-blue to-personio-lightBlue rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-personio-gray-900 dark:text-white">
                {t('jobDescription.title')}
              </h2>
              <p className="text-sm text-personio-gray-500 dark:text-personio-gray-400 mt-1">
                Define la descripción del puesto y los criterios de evaluación
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Descripción Pública */}
          <div>
            <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-3">
              {t('jobDescription.publicDescription')}
            </label>
            <textarea
              value={publicDescription}
              onChange={(e) => setPublicDescription(e.target.value)}
              placeholder={t('jobDescription.publicDescriptionPlaceholder')}
              rows={8}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-personio-blue focus:border-personio-blue dark:bg-personio-gray-800 dark:border-personio-gray-600 dark:text-white transition-all duration-200 ${
                errors.publicDescription ? 'border-personio-red' : 'border-personio-gray-300'
              }`}
            />
            {errors.publicDescription && (
              <div className="mt-2 flex items-center text-sm text-personio-red">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.publicDescription}
              </div>
            )}
            <p className="mt-2 text-sm text-personio-gray-500 dark:text-personio-gray-400">
              Esta es la descripción que verán los candidatos cuando postulen al puesto.
            </p>
          </div>

          {/* Condiciones Especiales */}
          <div>
            <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-3">
              {t('jobDescription.specialConditions')}
            </label>
            <textarea
              value={specialConditions}
              onChange={(e) => setSpecialConditions(e.target.value)}
              placeholder={t('jobDescription.specialConditionsPlaceholder')}
              rows={6}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-personio-blue focus:border-personio-blue dark:bg-personio-gray-800 dark:border-personio-gray-600 dark:text-white transition-all duration-200 ${
                errors.specialConditions ? 'border-personio-red' : 'border-personio-gray-300'
              }`}
            />
            {errors.specialConditions && (
              <div className="mt-2 flex items-center text-sm text-personio-red">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.specialConditions}
              </div>
            )}
            <p className="mt-2 text-sm text-personio-gray-500 dark:text-personio-gray-400">
              Criterios especiales, competencias clave, o aspectos específicos que se evaluarán con mayor peso.
            </p>
          </div>

          {/* Acciones */}
          <div className="flex justify-between items-center pt-6 border-t border-personio-gray-200 dark:border-personio-gray-700">
            <button
              onClick={handleBack}
              className="px-6 py-3 text-personio-gray-700 dark:text-personio-gray-300 hover:bg-personio-gray-100 dark:hover:bg-personio-gray-800 rounded-xl transition-colors font-medium"
            >
              {t('common.back')}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-personio-blue to-personio-lightBlue hover:from-personio-darkBlue hover:to-personio-blue disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? t('common.loading') : t('jobDescription.saveDescription')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionStep;