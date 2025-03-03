// stores/useEscuelaStore.js
import { PaquetesStoreTypes } from '@/types/StoreTypes';
import { create } from 'zustand';

// Crear el store con Zustand
const usePaqueteStore = create<PaquetesStoreTypes>((set) => ({
    paquetes: [], // Inicializar el array de escuelas vacío
    addPaquete: (paquete) => set((state) => ({ paquetes: [...state.paquetes, paquete] })),
    setPaquetes: (paquetes) => set({ paquetes }), 
    updatePaquete: (updatedPaquete) => set((state) => ({
        paquetes: state.paquetes.map((paquete) =>
            paquete.id === updatedPaquete.id ? updatedPaquete : paquete
        ),
    })),
    deletePaquete: (id) => set((state) => ({
        paquetes: state.paquetes.filter((paquete) => paquete.id !== id),
    })),
}));

export default usePaqueteStore;