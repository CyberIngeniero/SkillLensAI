# HR Recruitment Platform

Una aplicación web moderna para la evaluación automática de candidatos mediante análisis de CVs y comparación con descripciones de puestos de trabajo.

## 🚀 Características

- **Interfaz multiidioma**: Soporte para Español, Catalán e Inglés
- **Modo dark/light**: Interfaz adaptable a las preferencias del usuario
- **Procesamiento de CVs**: Análisis automático de documentos PDF
- **Evaluación inteligente**: Comparación y puntuación de candidatos
- **Arquitectura parametrizada**: Configuración flexible y escalable
- **Diseño responsivo**: Optimizado para todos los dispositivos

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Internacionalización**: react-i18next
- **Iconos**: Lucide React
- **Build Tool**: Vite
- **Almacenamiento**: Azure Storage (configurable)
- **APIs**: REST endpoints para procesamiento

## 📋 Proceso de Evaluación

### 1. Descripción del Puesto
- Definición de descripción pública del puesto
- Especificación de criterios especiales de evaluación
- Guardado automático y validación de campos

### 2. Carga de Documentos
- Subida de CVs en formato PDF
- Validación de tamaño (máx. 10MB) y formato
- Vista previa y gestión de documentos
- Generación de UUID único por documento

### 3. Procesamiento
- Extracción automática de información mediante Logic Apps
- Análisis de habilidades, experiencia y educación
- Comparación con criterios del puesto
- Indicador de progreso en tiempo real

### 4. Resultados
- Matriz de evaluación con puntuación por candidato
- Detalles de puntuación por categorías
- Perfil completo de cada candidato
- Exportación de reportes

## 🔧 Configuración

### Variables de Entorno

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api

# Storage Configuration
REACT_APP_STORAGE_TYPE=azure|local
REACT_APP_AZURE_CONNECTION_STRING=your_connection_string
REACT_APP_AZURE_CONTAINER_NAME=cv-documents

# Processing Configuration
REACT_APP_QUEUE_NAME=cv-processing-queue
REACT_APP_MAX_FILE_SIZE=10485760
```

### Archivo de Configuración

La aplicación utiliza `src/config/app.config.ts` para todas las configuraciones:

```typescript
export const appConfig = {
  app: {
    name: 'HR Recruitment Platform',
    version: '1.0.0',
    logo: '/logo.svg',
    theme: { /* colores personalizables */ }
  },
  api: {
    baseUrl: 'http://localhost:3001/api',
    endpoints: { /* endpoints configurables */ }
  },
  storage: {
    type: 'azure|local',
    // configuraciones específicas
  },
  processing: {
    queueName: 'cv-processing-queue',
    maxFileSize: 10485760,
    allowedExtensions: ['pdf']
  }
};
```

## 📡 Endpoints API

### Job Description
- `GET /api/job-description/:id` - Obtener descripción del puesto
- `PUT /api/job-description` - Actualizar descripción del puesto

### Documents
- `POST /api/documents/upload` - Subir documento
- `GET /api/documents` - Listar documentos
- `GET /api/documents/:id` - Obtener documento específico
- `DELETE /api/documents/:id` - Eliminar documento

### Processing
- `POST /api/processing/start` - Iniciar procesamiento
- `GET /api/processing/status/:batchId` - Estado del procesamiento

### Evaluation
- `GET /api/evaluation/results/:batchId` - Resultados de evaluación
- `GET /api/evaluation/results/:batchId/report` - Descargar reporte

## 🏗️ Arquitectura

### Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── Header.tsx       # Encabezado con navegación
│   ├── StepLine.tsx     # Indicador de progreso
│   └── steps/           # Componentes por etapa
├── contexts/            # Contextos React
│   ├── AppContext.tsx   # Estado global de la aplicación
│   └── ThemeContext.tsx # Gestión de tema
├── config/              # Configuración
│   └── app.config.ts    # Configuración principal
├── i18n/               # Internacionalización
│   └── locales/        # Traducciones
├── services/           # Servicios API
│   └── api.ts          # Cliente API
└── types/              # Tipos TypeScript
```

### Flujo de Datos

1. **Upload**: Documentos → Azure Storage → UUID generado
2. **Processing**: Documento → Cola → Logic Apps → Extracción
3. **Evaluation**: Datos extraídos → Algoritmo → Puntuación
4. **Results**: Puntuaciones → Interfaz → Reporte

## 🐳 Docker

### Construcción

```bash
# Construir imagen
docker build -t hr-recruitment-platform .

# Ejecutar contenedor
docker run -p 3000:3000 hr-recruitment-platform
```

### Docker Compose

```yaml
version: '3.8'
services:
  hr-platform:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://api:3001/api
    depends_on:
      - api
  
  api:
    image: hr-api:latest
    ports:
      - "3001:3001"
    environment:
      - AZURE_STORAGE_CONNECTION_STRING=${AZURE_CONNECTION_STRING}
```

## 🚀 Despliegue

### Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Producción

```bash
# Usando Docker
docker build -t hr-platform .
docker run -p 80:80 hr-platform

# Usando servidor web estático
npm run build
# Servir carpeta dist/ con nginx, apache, etc.
```

## 📊 Monitoreo

### Métricas Clave

- Tiempo de procesamiento por documento
- Tasa de éxito de extracción
- Precisión de puntuación
- Uso de almacenamiento

### Logs

- Subida de documentos: `uploads.log`
- Procesamiento: `processing.log`
- Errores: `error.log`
- API calls: `api.log`

## 🔒 Seguridad

- Validación de tipos de archivo
- Límites de tamaño de archivo
- Sanitización de datos extraídos
- Autenticación para APIs
- Encriptación de datos sensibles

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico:
- Email: support@hr-platform.com
- Documentación: [docs.hr-platform.com](https://docs.hr-platform.com)
- Issues: [GitHub Issues](https://github.com/company/hr-platform/issues)

---

**Desarrollado con ❤️ para optimizar el proceso de selección de talento humano**