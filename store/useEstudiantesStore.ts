import { EstudiantesStoreTypes } from '@/types/StoreTypes';
import { create } from 'zustand';

// Crear el store con Zustand
const useEstudianteStore = create<EstudiantesStoreTypes>((set) => ({
    estudiantes: [], // Inicializar el array de estudiantes vacío
    addEstudiante: (estudiante) => set((state) => ({ estudiantes: [...state.estudiantes, estudiante] })),
    setEstudiantes: (estudiantes) => set({ estudiantes }), 
    updateEstudiante: (updatedEstudiante) => set((state) => ({
        estudiantes: state.estudiantes.map((estudiante) =>
            estudiante.id === updatedEstudiante.id ? updatedEstudiante : estudiante
        ),
    })),
    deleteEstudiante: (id) => set((state) => ({
        estudiantes: state.estudiantes.filter((estudiante) => estudiante.id !== id),
    })),
}));

export default useEstudianteStore;