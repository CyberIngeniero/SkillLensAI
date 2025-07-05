import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ArrowLeft,
  ExternalLink,
  Clock,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    dispatch({ type: 'SET_VIEW', payload: 'home' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(t('contact.messageSent'));
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-personio-gray-50 to-blue-50 dark:from-personio-gray-900 dark:to-personio-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <h1 className="text-4xl sm:text-5xl font-bold text-personio-gray-900 dark:text-white mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-personio-gray-600 dark:text-personio-gray-300 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-personio-gray-900 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-personio-gray-900 dark:text-white mb-6">
                {t('contact.getInTouch')}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-personio-blue/10 rounded-xl">
                    <Mail className="w-6 h-6 text-personio-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-personio-gray-900 dark:text-white">
                      {t('contact.email')}
                    </h3>
                    <a 
                      href="mailto:support@skilllens.ai"
                      className="text-personio-blue hover:text-personio-darkBlue transition-colors"
                    >
                      support@skilllens.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-personio-green/10 rounded-xl">
                    <Phone className="w-6 h-6 text-personio-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-personio-gray-900 dark:text-white">
                      {t('contact.phone')}
                    </h3>
                    <a 
                      href="tel:+34932684946"
                      className="text-personio-blue hover:text-personio-darkBlue transition-colors"
                    >
                      +34 932 684 946
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-personio-orange/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-personio-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-personio-gray-900 dark:text-white">
                      {t('contact.address')}
                    </h3>
                    <p className="text-personio-gray-600 dark:text-personio-gray-300">
                      Carrer de Balmes, 191<br />
                      08006 Barcelona, España
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-xl">
                    <Clock className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-personio-gray-900 dark:text-white">
                      {t('contact.hours')}
                    </h3>
                    <p className="text-personio-gray-600 dark:text-personio-gray-300">
                      {t('contact.businessHours')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de Raona */}
            <div className="bg-gradient-to-br from-personio-blue to-personio-lightBlue rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="/files_572887-1751748844310-image.png" 
                  alt="Raona Enginyers" 
                  className="w-16 h-16 rounded-xl bg-white p-3"
                />
                <div>
                  <h3 className="text-xl font-bold">{t('contact.developedBy')}</h3>
                  <a 
                    href="https://www.raona.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-100 hover:text-white transition-colors"
                  >
                    <span>Raona Enginyers</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                {t('contact.raonaDescription')}
              </p>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white dark:bg-personio-gray-900 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <MessageCircle className="w-8 h-8 text-personio-blue" />
              <h2 className="text-2xl font-bold text-personio-gray-900 dark:text-white">
                {t('contact.sendMessage')}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-blue focus:border-personio-blue dark:bg-personio-gray-800 dark:text-white transition-all"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-blue focus:border-personio-blue dark:bg-personio-gray-800 dark:text-white transition-all"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                  {t('contact.subject')} *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-blue focus:border-personio-blue dark:bg-personio-gray-800 dark:text-white transition-all"
                  placeholder={t('contact.subjectPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-personio-gray-700 dark:text-personio-gray-300 mb-2">
                  {t('contact.message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-personio-gray-300 dark:border-personio-gray-600 rounded-xl focus:ring-2 focus:ring-personio-blue focus:border-personio-blue dark:bg-personio-gray-800 dark:text-white transition-all resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-personio-blue to-personio-lightBlue hover:from-personio-darkBlue hover:to-personio-blue disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? t('contact.sending') : t('contact.sendMessage')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;