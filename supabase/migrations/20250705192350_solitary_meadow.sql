-- Inicialización de base de datos para HR Platform
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de descripciones de trabajo
CREATE TABLE job_descriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_description TEXT NOT NULL,
    special_conditions TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de documentos
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    size INTEGER NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'uploaded',
    uuid UUID NOT NULL UNIQUE,
    path VARCHAR(500) NOT NULL,
    content_type VARCHAR(100),
    job_description_id UUID REFERENCES job_descriptions(id)
);

-- Tabla de lotes de procesamiento
CREATE TABLE processing_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_description_id UUID REFERENCES job_descriptions(id),
    status VARCHAR(50) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    documents_total INTEGER DEFAULT 0,
    documents_processed INTEGER DEFAULT 0,
    documents_error INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de candidatos
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    extracted_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de resultados de evaluación
CREATE TABLE evaluation_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES processing_batches(id),
    candidate_id UUID REFERENCES candidates(id),
    document_id UUID REFERENCES documents(id),
    score DECIMAL(3,2) NOT NULL,
    details JSONB NOT NULL,
    strengths TEXT[],
    weaknesses TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX idx_documents_job_description ON documents(job_description_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_uuid ON documents(uuid);
CREATE INDEX idx_candidates_document ON candidates(document_id);
CREATE INDEX idx_evaluation_results_batch ON evaluation_results(batch_id);
CREATE INDEX idx_evaluation_results_candidate ON evaluation_results(candidate_id);
CREATE INDEX idx_evaluation_results_score ON evaluation_results(score DESC);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_job_descriptions_updated_at 
    BEFORE UPDATE ON job_descriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de ejemplo
INSERT INTO job_descriptions (id, public_description, special_conditions) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'Buscamos un desarrollador Full Stack con experiencia en React y Node.js para unirse a nuestro equipo dinámico. El candidato ideal tendrá experiencia en desarrollo web moderno, APIs REST, y bases de datos.',
    '- Experiencia mínima de 3 años en desarrollo web
- Conocimiento avanzado de React, TypeScript, Node.js
- Experiencia con bases de datos SQL y NoSQL
- Conocimiento de metodologías ágiles
- Capacidad de trabajo en equipo
- Inglés nivel intermedio-avanzado'
);

-- Insertar documentos de ejemplo
INSERT INTO documents (id, filename, original_name, size, uuid, path, job_description_id) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440001',
    'cv-candidate-001.pdf',
    'Juan_Perez_CV.pdf',
    1024768,
    '550e8400-e29b-41d4-a716-446655440010',
    '550e8400-e29b-41d4-a716-446655440010/input',
    '550e8400-e29b-41d4-a716-446655440000'
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'cv-candidate-002.pdf',
    'Maria_Garcia_CV.pdf',
    856432,
    '550e8400-e29b-41d4-a716-446655440011',
    '550e8400-e29b-41d4-a716-446655440011/input',
    '550e8400-e29b-41d4-a716-446655440000'
);

-- Insertar lote de procesamiento
INSERT INTO processing_batches (id, job_description_id, status, progress, documents_total, documents_processed) VALUES (
    '550e8400-e29b-41d4-a716-446655440020',
    '550e8400-e29b-41d4-a716-446655440000',
    'completed',
    100,
    2,
    2
);

-- Insertar candidatos
INSERT INTO candidates (id, document_id, name, email, phone, extracted_info) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440030',
    '550e8400-e29b-41d4-a716-446655440001',
    'Juan Pérez',
    'juan.perez@email.com',
    '+34 612 345 678',
    '{"experience": ["Desarrollador Full Stack - TechCorp (2021-2024)", "Desarrollador Frontend - WebSolutions (2019-2021)"], "skills": ["React", "TypeScript", "Node.js", "PostgreSQL"], "education": ["Ingeniería Informática - Universidad Politécnica (2014-2018)"]}'
),
(
    '550e8400-e29b-41d4-a716-446655440031',
    '550e8400-e29b-41d4-a716-446655440002',
    'María García',
    'maria.garcia@email.com',
    '+34 678 901 234',
    '{"experience": ["Desarrolladora Frontend - DesignStudio (2022-2024)", "Desarrolladora Web - LocalBusiness (2020-2022)"], "skills": ["React", "JavaScript", "HTML5", "CSS3"], "education": ["Ingeniería en Sistemas - Universidad Central (2016-2020)"]}'
);

-- Insertar resultados de evaluación
INSERT INTO evaluation_results (batch_id, candidate_id, document_id, score, details, strengths, weaknesses) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440020',
    '550e8400-e29b-41d4-a716-446655440030',
    '550e8400-e29b-41d4-a716-446655440001',
    4.2,
    '{"experience": 4.5, "skills": 4.8, "education": 3.9, "compatibility": 3.7}',
    ARRAY['Amplia experiencia en React y TypeScript', 'Conocimiento sólido en desarrollo backend'],
    ARRAY['Poca experiencia con bases de datos NoSQL', 'Nivel de inglés no especificado claramente']
),
(
    '550e8400-e29b-41d4-a716-446655440020',
    '550e8400-e29b-41d4-a716-446655440031',
    '550e8400-e29b-41d4-a716-446655440002',
    3.8,
    '{"experience": 3.5, "skills": 4.2, "education": 4.1, "compatibility": 3.4}',
    ARRAY['Excelente conocimiento en frontend', 'Experiencia en diseño UX/UI'],
    ARRAY['Limitada experiencia en backend', 'Falta experiencia con TypeScript']
);

-- Comentarios sobre las tablas
COMMENT ON TABLE job_descriptions IS 'Almacena las descripciones de puestos de trabajo';
COMMENT ON TABLE documents IS 'Almacena información sobre los documentos CV subidos';
COMMENT ON TABLE processing_batches IS 'Gestiona los lotes de procesamiento de documentos';
COMMENT ON TABLE candidates IS 'Almacena información extraída de los candidatos';
COMMENT ON TABLE evaluation_results IS 'Almacena los resultados de evaluación de candidatos';