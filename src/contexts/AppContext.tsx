import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface JobDescription {
  id: string;
  publicDescription: string;
  specialConditions: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  uploadedAt: string;
  status: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'error';
  processingProgress?: number;
  uuid: string;
  path: string;
}

export interface EvaluationResult {
  candidateId: string;
  candidateName: string;
  documentId: string;
  score: number;
  details: {
    experience: number;
    skills: number;
    education: number;
    compatibility: number;
  };
  extractedInfo: {
    name: string;
    email: string;
    phone: string;
    experience: string[];
    skills: string[];
    education: string[];
  };
}

export interface AppState {
  currentView: 'home' | 'process' | 'page';
  currentStep: number;
  currentPage?: string;
  jobDescription: JobDescription | null;
  documents: Document[];
  evaluationResults: EvaluationResult[];
  isProcessing: boolean;
  processingProgress: number;
}

type AppAction =
  | { type: 'SET_VIEW'; payload: 'home' | 'process' | 'page' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'SET_JOB_DESCRIPTION'; payload: JobDescription }
  | { type: 'ADD_DOCUMENT'; payload: Document }
  | { type: 'UPDATE_DOCUMENT'; payload: { id: string; updates: Partial<Document> } }
  | { type: 'REMOVE_DOCUMENT'; payload: string }
  | { type: 'SET_DOCUMENTS'; payload: Document[] }
  | { type: 'SET_EVALUATION_RESULTS'; payload: EvaluationResult[] }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_PROCESSING_PROGRESS'; payload: number }
  | { type: 'RESET_STATE' };

const initialState: AppState = {
  currentView: 'home',
  currentStep: 0,
  currentPage: undefined,
  jobDescription: null,
  documents: [],
  evaluationResults: [],
  isProcessing: false,
  processingProgress: 0,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_JOB_DESCRIPTION':
      return { ...state, jobDescription: action.payload };
    case 'ADD_DOCUMENT':
      return { ...state, documents: [...state.documents, action.payload] };
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id
            ? { ...doc, ...action.payload.updates }
            : doc
        ),
      };
    case 'REMOVE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.payload),
      };
    case 'SET_DOCUMENTS':
      return { ...state, documents: action.payload };
    case 'SET_EVALUATION_RESULTS':
      return { ...state, evaluationResults: action.payload };
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'SET_PROCESSING_PROGRESS':
      return { ...state, processingProgress: action.payload };
    case 'RESET_STATE':
      return { ...initialState, currentView: 'home' };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};