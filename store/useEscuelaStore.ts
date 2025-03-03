// stores/useEscuelaStore.js
import { EscuelasStoreTypes } from '@/types/StoreTypes';
import { create } from 'zustand';

// Crear el store con Zustand
const useEscuelaStore = create<EscuelasStoreTypes>((set) => ({
    escuelas: [], // Inicializar el array de escuelas vacío
    addEscuela: (escuela) => set((state) => ({ escuelas: [...state.escuelas, escuela] })),
    setEscuelas: (escuelas) => set({ escuelas }), 
    updateEscuela: (updatedEscuela) => set((state) => ({
        escuelas: state.escuelas.map((escuela) =>
            escuela.id === updatedEscuela.id ? updatedEscuela : escuela
        ),
    })),
    deleteEscuela: (id) => set((state) => ({
        escuelas: state.escuelas.filter((escuela) => escuela.id !== id),
    })),
}));

export default useEscuelaStore;