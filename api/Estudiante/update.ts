import { COLLECTIONS } from "@/constants/coleccions.fb";
import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function update(escuelaId:string, escuelaData:any) {
    try {
        // Referencia al documento que se va a actualizar
        const escuelaRef = doc(db, COLLECTIONS.ESTUDIANTES, escuelaId);

        // Actualizar el documento
        await updateDoc(escuelaRef, {
            ...escuelaData
        });

        console.log("Documento actualizado con ID: ", escuelaId);
        return escuelaId; // Devolver el ID del documento actualizado
    } catch (error) {
        console.error("Firebase Error al actualizar: ", error);
        throw error;
    }
}