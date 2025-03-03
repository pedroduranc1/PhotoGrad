import { COLLECTIONS } from "@/constants/coleccions.fb";
import { db } from "@/utils/firebase";
import { EscuelaInput } from "@/types/ValidationTypes";
import { collection, getDocs } from "firebase/firestore";

export default async function get() {
    try {
        // Obtener los documentos de la colección
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.ESCUELAS));
        
        // Mapear los documentos a un array de objetos
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        // Devolver los datos
        return data as EscuelaInput[];
    } catch (error) {
        console.error("Firebase Error: " + COLLECTIONS.ESCUELAS, error);
        throw error; // Opcional: lanzar el error para manejarlo en el componente que llama a esta función
    }
}