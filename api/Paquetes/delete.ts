import { COLLECTIONS } from "@/constants/coleccions.fb";
import { db } from "@/utils/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default async function remove(paqueteId:string) {
    try {
        // Referencia al documento que se va a eliminar
        const paqueteRef = doc(db, COLLECTIONS.PAQUETES, paqueteId);

        // Eliminar el documento
        await deleteDoc(paqueteRef);

        console.log("Documento eliminado con ID: ", paqueteId);
        return paqueteId; // Devolver el ID del documento eliminado
    } catch (error) {
        console.error("Firebase Error al eliminar: ", error);
        throw error;
    }
}