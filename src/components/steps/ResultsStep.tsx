import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  Download, 
  Eye, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase,
  Code,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ResultsStep: React.FC = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useApp();
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const sortedResults = [...state.evaluationResults].sort((a, b) => {
    if (sortBy === 'score') {
      return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
    } else {
      return sortOrder === 'desc' 
        ? b.candidateName.localeCompare(a.candidateName)
        : a.candidateName.localeCompare(b.candidateName);
    }
  });

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <Star className="w-5 h-5 text-gray-300 absolute" />
            <Star className="w-5 h-5 text-yellow-400 fill-current absolute" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-gray-300" />
        );
      }
    }

    return stars;
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600 dark:text-green-400';
    if (score >= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 4) return 'bg-green-50 dark:bg-green-900/20';
    if (score >= 3) return 'bg-yellow-50 dark:bg-yellow-900/20';
    return 'bg-red-50 dark:bg-red-900/20';
  };

  const handleViewProfile = (candidateId: string) => {
    setSelectedCandidate(candidateId);
  };

  const handleDownloadReport = () => {
    // Implementar descarga de reporte
    console.log('Downloading report...');
  };

  const handleStartNewProcess = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const selectedCandidateData = selectedCandidate 
    ? state.evaluationResults.find(result => result.candidateId === selectedCandidate)
    : null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('results.title')}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {state.evaluationResults.length} candidatos evaluados
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortBy(sortBy === 'score' ? 'name' : 'score')}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Ordenar por {sortBy === 'score' ? 'puntuación' : 'nombre'}</span>
                </button>
                <button
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={handleDownloadReport}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t('results.downloadReport')}</span>
              </button>
            </div>
          </div>
        </div>

        {state.evaluationResults.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('results.noResults')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              No se encontraron resultados de evaluación
            </p>
            <button
              onClick={handleStartNewProcess}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Iniciar nuevo proceso
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Lista de candidatos */}
            <div className="lg:col-span-2 space-y-4">
              {sortedResults.map((result) => (
                <div
                  key={result.candidateId}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    selectedCandidate === result.candidateId
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => handleViewProfile(result.candidateId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {result.candidateName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {result.extractedInfo.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        {renderStars(result.score)}
                      </div>
                      <p className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                        {result.score.toFixed(1)}/5.0
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Experiencia</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {result.details.experience.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Habilidades</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {result.details.skills.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Educación</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {result.details.education.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Compatibilidad</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {result.details.compatibility.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Panel de detalles */}
            <div className="lg:col-span-1">
              {selectedCandidateData ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Perfil del Candidato
                    </h3>
                    <button
                      onClick={() => setSelectedCandidate(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Información básica */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Información de Contacto
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedCandidateData.extractedInfo.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedCandidateData.extractedInfo.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedCandidateData.extractedInfo.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Habilidades */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <Code className="w-4 h-4 mr-2" />
                        Habilidades
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidateData.extractedInfo.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experiencia */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Experiencia
                      </h4>
                      <div className="space-y-2">
                        {selectedCandidateData.extractedInfo.experience.map((exp, index) => (
                          <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            • {exp}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Educación */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Educación
                      </h4>
                      <div className="space-y-2">
                        {selectedCandidateData.extractedInfo.education.map((edu, index) => (
                          <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            • {edu}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Puntuación detallada */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Puntuación Detallada
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(selectedCandidateData.details).map(([key, value]) => (
                          <div key={key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600 dark:text-gray-400 capitalize">
                                {key === 'experience' ? 'Experiencia' : 
                                 key === 'skills' ? 'Habilidades' :
                                 key === 'education' ? 'Educación' : 'Compatibilidad'}
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {value.toFixed(1)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(value / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                  <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Selecciona un candidato para ver su perfil detallado
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button
            onClick={() => dispatch({ type: 'SET_STEP', payload: 1 })}
            className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {t('common.back')}
          </button>
          <button
            onClick={handleStartNewProcess}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Iniciar Nuevo Proceso
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;