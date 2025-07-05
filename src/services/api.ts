import { appConfig } from '../config/app.config';

export class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = appConfig.api.baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Job Description endpoints
  async getJobDescription(id: string) {
    return this.request(`${appConfig.api.endpoints.getJobDescription}/${id}`);
  }

  async updateJobDescription(data: any) {
    return this.request(appConfig.api.endpoints.updateJobDescription, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Document endpoints
  async uploadDocument(file: File, metadata: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    return this.request(appConfig.api.endpoints.uploadDocument, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async getDocuments() {
    return this.request(appConfig.api.endpoints.getDocuments);
  }

  async getDocument(id: string) {
    return this.request(`${appConfig.api.endpoints.getDocuments}/${id}`);
  }

  async deleteDocument(id: string) {
    return this.request(`${appConfig.api.endpoints.getDocuments}/${id}`, {
      method: 'DELETE',
    });
  }

  // Processing endpoints
  async getProcessingStatus(batchId: string) {
    return this.request(`${appConfig.api.endpoints.getProcessingStatus}/${batchId}`);
  }

  async startProcessing(documentIds: string[]) {
    return this.request(`${appConfig.api.endpoints.getProcessingStatus}/start`, {
      method: 'POST',
      body: JSON.stringify({ documentIds }),
    });
  }

  // Evaluation endpoints
  async getEvaluationResults(batchId: string) {
    return this.request(`${appConfig.api.endpoints.getEvaluationResults}/${batchId}`);
  }

  async downloadEvaluationReport(batchId: string, format: 'pdf' | 'excel' = 'pdf') {
    return this.request(`${appConfig.api.endpoints.getEvaluationResults}/${batchId}/report?format=${format}`);
  }
}

export const apiService = new ApiService();