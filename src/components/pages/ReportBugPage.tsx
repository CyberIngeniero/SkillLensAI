import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AlertTriangle, 
  Send, 
  ArrowLeft,
  Bug,
  Monitor,
  Smartphone,
  Globe,
  Upload,
  X
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ReportBugPage: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: '',
    expected: '',
    actual: '',
    severity: 'medium',
    browser: '',
    device: '',
    email: ''
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    dispatch({ type: 'SET_VIEW', payload: 'home' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(t('reportBug.reportSent'));
    setFormData({
      title: '',
      description: '',
      steps: '',
      expected: '',
      actual: '',
      severity: 'medium',
      browser: '',
      device: '',
      email: ''
    });
    setAttachments([]);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const severityOptions = [
    { value: 'low', label: t('reportBug.severityLow'), color: 'text-green-600' },
    { value: 'medium', label: t('reportBug.severityMedium'), color: 'text-yellow-600' },
    { value: 'high', label: t('reportBug.severityHigh'), color: 'text-orange-600' },
    { value: 'critical', label: t('reportBug.severityCritical'), color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-personio-gray-50 to-red-50 dark:from-personio-gray-900 dark:to-personio-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-personio-blue hover:text-personio-darkBlue transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('common.back')}</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-personio-red/10 rounded-2xl mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-personio-red" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-personio-gray-900 dark:text-white mb-4">
              {t('reportBug.title')}
            </h1>
            <p className="text-xl text-personio-gray-600 dark:text-personio-gray-300 max-w-3xl mx-auto">
              {t('reportBug.subtitle')}
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white dark:bg-personio-gray-900 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-8">
            <Bug className="w-8 h-8 text-personio-red" />
            <h2 className="text-2xl font-bold text-personio-gray-900 dark:text-white">
              {t('reportBug.reportForm')}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información básica */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-personio-gray-900 dark:text-white border-b border-personio-gray-200 dark:border-personio-gray-700 pb-2">
                {t('reportBug.basicInfo')}
              </h3>

              <div>
                <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                  {t('reportBug.bugTitle')} *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all"
                  placeholder={t('reportBug.bugTitlePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                  {t('reportBug.description')} *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all resize-none"
                  placeholder={t('reportBug.descriptionPlaceholder')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                    {t('reportBug.severity')} *
                  </label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all"
                  >
                    {severityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                    {t('reportBug.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all"
                    placeholder={t('reportBug.emailPlaceholder')}
                  />
                </div>
              </div>
            </div>

            {/* Pasos para reproducir */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-personio-gray-900 dark:text-white border-b border-personio-gray-200 dark:border-personio-gray-700 pb-2">
                {t('reportBug.reproductionSteps')}
              </h3>

              <div>
                <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                  {t('reportBug.stepsToReproduce')} *
                </label>
                <textarea
                  name="steps"
                  value={formData.steps}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all resize-none"
                  placeholder={t('reportBug.stepsPlaceholder')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                    {t('reportBug.expectedBehavior')} *
                  </label>
                  <textarea
                    name="expected"
                    value={formData.expected}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all resize-none"
                    placeholder={t('reportBug.expectedPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                    {t('reportBug.actualBehavior')} *
                  </label>
                  <textarea
                    name="actual"
                    value={formData.actual}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all resize-none"
                    placeholder={t('reportBug.actualPlaceholder')}
                  />
                </div>
              </div>
            </div>

            {/* Información del sistema */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-personio-gray-900 dark:text-white border-b border-personio-gray-200 dark:border-personio-gray-700 pb-2">
                {t('reportBug.systemInfo')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    {t('reportBug.browser')}
                  </label>
                  <input
                    type="text"
                    name="browser"
                    value={formData.browser}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all"
                    placeholder="Chrome 120.0, Firefox 121.0, Safari 17.0..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                    <Monitor className="w-4 h-4 inline mr-1" />
                    {t('reportBug.device')}
                  </label>
                  <input
                    type="text"
                    name="device"
                    value={formData.device}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all"
                    placeholder="Windows 11, macOS 14, iPhone 15, Android 14..."
                  />
                </div>
              </div>
            </div>

            {/* Adjuntos */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-personio-gray-900 dark:text-white border-b border-personio-gray-200 dark:border-personio-gray-700 pb-2">
                {t('reportBug.attachments')}
              </h3>

              <div>
                <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                  <Upload className="w-4 h-4 inline mr-1" />
                  {t('reportBug.uploadFiles')}
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.txt,.log"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-red focus:border-personio-red dark:bg-personio-gray-800 dark:text-white transition-all"
                />
                <p className="text-sm text-personio-gray-500 dark:text-personio-gray-400 mt-1">
                  {t('reportBug.fileTypes')}
                </p>
              </div>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-personio-gray-700 dark:text-personio-gray-300">
                    {t('reportBug.attachedFiles')}:
                  </h4>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-personio-gray-50 dark:bg-personio-gray-800 rounded-lg">
                      <span className="text-sm text-personio-gray-700 dark:text-personio-gray-300">
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-personio-red hover:text-personio-red/80 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-personio-red to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? t('reportBug.sending') : t('reportBug.sendReport')}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportBugPage;