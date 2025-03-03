import { EscuelaInput, EstudianteInput,GradoInput, PaqueteInput } from "./ValidationTypes"

// Definir el tipo del store
export interface EscuelasStoreTypes {
    escuelas: EscuelaInput[]; // Array de objetos EscuelaInput
    addEscuela: (escuela: EscuelaInput) => void; // Función para agregar una escuela
    setEscuelas: (escuelas: EscuelaInput[]) => void; // Función para agregar una escuela
    updateEscuela: (updatedEscuela: EscuelaInput) => void; // Función para actualizar una escuela
    deleteEscuela: (id: string) => void;
}

export interface EstudiantesStoreTypes {
    estudiantes: EstudianteInput[]; // Array de objetos EstudianteInput
    addEstudiante: (estudiante: EstudianteInput) => void; // Función para agregar un estudiante
    setEstudiantes: (estudiantes: EstudianteInput[]) => void; // Función para establecer todos los estudiantes
    updateEstudiante: (updatedEstudiante: EstudianteInput) => void; // Función para actualizar un estudiante
    deleteEstudiante: (id: string) => void; // Función para eliminar un estudiante por ID
}

export interface GradosStoreTypes {
    grados: GradoInput[]; // Array de objetos GradoInput
    addGrado: (grado: GradoInput) => void; // Función para agregar un grado
    setGrados: (grados: GradoInput[]) => void; // Función para establecer todos los grados
    updateGrado: (updatedGrado: GradoInput) => void; // Función para actualizar un grado
    deleteGrado: (id: string) => void; // Función para eliminar un grado por ID
}

export interface PaquetesStoreTypes {
    paquetes: PaqueteInput[]; // Array de objetos EscuelaInput
    addPaquete: (paquete: PaqueteInput) => void; // Función para agregar una escuela
    setPaquetes: (paquete: PaqueteInput[]) => void; // Función para agregar una escuela
    updatePaquete: (updatedPaquete: PaqueteInput) => void; // Función para actualizar una escuela
    deletePaquete: (id: string) => void;
}