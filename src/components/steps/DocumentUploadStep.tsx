import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Upload, 
  FileText, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle,
  Loader2,
  Plus
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { appConfig } from '../../config/app.config';
import { v4 as uuidv4 } from 'uuid';

const DocumentUploadStep: React.FC = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter(file => {
      const isValidType = appConfig.processing.allowedExtensions.includes(
        file.name.split('.').pop()?.toLowerCase() || ''
      );
      const isValidSize = file.size <= appConfig.processing.maxFileSize;
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) {
      alert('No se encontraron archivos válidos. Solo se permiten archivos PDF de hasta 10MB.');
      return;
    }

    setUploading(true);

    for (const file of validFiles) {
      const documentId = uuidv4();
      const document = {
        id: documentId,
        filename: `${documentId}.pdf`,
        originalName: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'uploading' as const,
        uuid: documentId,
        path: `${documentId}/input`,
      };

      dispatch({ type: 'ADD_DOCUMENT', payload: document });

      try {
        // Simular upload
        await simulateUpload(file, documentId);
        
        dispatch({ 
          type: 'UPDATE_DOCUMENT', 
          payload: { 
            id: documentId, 
            updates: { status: 'uploaded' }
          }
        });
      } catch (error) {
        dispatch({ 
          type: 'UPDATE_DOCUMENT', 
          payload: { 
            id: documentId, 
            updates: { status: 'error' }
          }
        });
      }
    }

    setUploading(false);
  };

  const simulateUpload = async (file: File, documentId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Uploaded ${file.name} with ID: ${documentId}`);
        resolve();
      }, 2000);
    });
  };

  const handleRemoveDocument = (documentId: string) => {
    dispatch({ type: 'REMOVE_DOCUMENT', payload: documentId });
  };

  const handlePreviewDocument = (document: any) => {
    // Implementar preview del documento
    console.log('Preview document:', document);
  };

  const handleProceedToProcessing = () => {
    dispatch({ type: 'SET_STEP', payload: 2 });
    dispatch({ type: 'SET_PROCESSING', payload: true });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'uploaded':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading':
        return t('documentUpload.processing');
      case 'uploaded':
        return t('documentUpload.uploaded');
      case 'error':
        return t('documentUpload.error');
      default:
        return '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Upload className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('documentUpload.title')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Sube los CVs de los candidatos para su evaluación
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Zona de Upload */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('documentUpload.dragAndDrop')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('documentUpload.supportedFormats')} • {t('documentUpload.maxSize')}
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Documentos */}
          {state.documents.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('documentUpload.uploadedFiles')} ({state.documents.length})
              </h3>
              
              <div className="space-y-3">
                {state.documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(document.status)}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {document.originalName}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>{formatFileSize(document.size)}</span>
                          <span>{getStatusText(document.status)}</span>
                          <span>{new Date(document.uploadedAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePreviewDocument(document)}
                        className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                        title={t('documentUpload.preview')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveDocument(document.id)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                        title={t('common.delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
            <button
              onClick={() => dispatch({ type: 'SET_STEP', payload: 0 })}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {t('common.back')}
            </button>
            <button
              onClick={handleProceedToProcessing}
              disabled={state.documents.length === 0 || uploading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {t('common.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;