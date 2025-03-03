import { COLLECTIONS } from "@/constants/coleccions.fb";
import { db } from "@/utils/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default async function remove(escuelaId:string) {
    try {
        // Referencia al documento que se va a eliminar
        const escuelaRef = doc(db, COLLECTIONS.ESTUDIANTES, escuelaId);

        // Eliminar el documento
        await deleteDoc(escuelaRef);

        console.log("Documento eliminado con ID: ", escuelaId);
        return escuelaId; // Devolver el ID del documento eliminado
    } catch (error) {
        console.error("Firebase Error al eliminar: ", error);
        throw error;
    }
}