import { COLLECTIONS } from "@/constants/coleccions.fb";
import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function update(paqueteId:string, paqueteData:any) {
    try {
        // Referencia al documento que se va a actualizar
        const paqueteRef = doc(db, COLLECTIONS.PAQUETES, paqueteId);

        // Actualizar el documento
        await updateDoc(paqueteRef, {
            ...paqueteData
        });

        console.log("Documento actualizado con ID: ", paqueteId);
        return paqueteId; // Devolver el ID del documento actualizado
    } catch (error) {
        console.error("Firebase Error al actualizar: ", error);
        throw error;
    }
}