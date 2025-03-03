import { GradosStoreTypes } from '@/types/StoreTypes';
import { create } from 'zustand';

// Crear el store con Zustand
const useGradoStore = create<GradosStoreTypes>((set) => ({
    grados: [], // Inicializar el array de grados vacío
    addGrado: (grado) => set((state) => ({ grados: [...state.grados, grado] })),
    setGrados: (grados) => set({ grados }), 
    updateGrado: (updatedGrado) => set((state) => ({
        grados: state.grados.map((grado) =>
            grado.id === updatedGrado.id ? updatedGrado : grado
        ),
    })),
    deleteGrado: (id) => set((state) => ({
        grados: state.grados.filter((grado) => grado.id !== id),
    })),
}));

export default useGradoStore;