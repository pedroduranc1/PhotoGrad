import { COLLECTIONS } from "@/constants/coleccions.fb";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function get() {
    try {
        // Obtener los documentos de la colección
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.PRUEBA));
        
        // Mapear los documentos a un array de objetos
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        // Devolver los datos
        return data;
    } catch (error) {
        console.error("Firebase Error: " + COLLECTIONS.PRUEBA, error);
        throw error; // Opcional: lanzar el error para manejarlo en el componente que llama a esta función
    }
}