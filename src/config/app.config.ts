export interface AppConfig {
  app: {
    name: string;
    version: string;
    logo: string;
    theme: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
    };
  };
  api: {
    baseUrl: string;
    endpoints: {
      uploadDocument: string;
      getJobDescription: string;
      updateJobDescription: string;
      getDocuments: string;
      getProcessingStatus: string;
      getEvaluationResults: string;
    };
  };
  storage: {
    type: 'azure' | 'local';
    azureConfig?: {
      connectionString: string;
      containerName: string;
    };
    localConfig?: {
      basePath: string;
    };
  };
  processing: {
    queueName: string;
    maxFileSize: number;
    allowedExtensions: string[];
  };
  ui: {
    defaultLanguage: 'es' | 'ca' | 'en';
    defaultTheme: 'light' | 'dark';
    enableAnimations: boolean;
  };
}

export const appConfig: AppConfig = {
  app: {
    name: 'SkillLens AI',
    version: '1.0.0',
    logo: '/logo.svg',
    theme: {
      primary: '#0066cc',
      secondary: '#d946ef',
      accent: '#22c55e',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#1e293b',
    },
  },
  api: {
    baseUrl: import.meta.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    endpoints: {
      uploadDocument: '/documents/upload',
      getJobDescription: '/job-description',
      updateJobDescription: '/job-description',
      getDocuments: '/documents',
      getProcessingStatus: '/processing/status',
      getEvaluationResults: '/evaluation/results',
    },
  },
  storage: {
    type: 'local',
    localConfig: {
      basePath: './uploads',
    },
  },
  processing: {
    queueName: 'cv-processing-queue',
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedExtensions: ['pdf'],
  },
  ui: {
    defaultLanguage: 'es',
    defaultTheme: 'light',
    enableAnimations: true,
  },
};