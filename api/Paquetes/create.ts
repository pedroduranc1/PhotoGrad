import { COLLECTIONS } from "@/constants/coleccions.fb";
import { db } from "@/utils/firebase";
import { PaqueteInput } from "@/types/ValidationTypes";
import { collection, doc, setDoc } from "firebase/firestore";

export default async function create(paqueteData:PaqueteInput) {
    try {
        // Referencia a la colección ESCUELAS
        const escuelasRef = collection(db, COLLECTIONS.PAQUETES);

        // Crear una referencia a un nuevo documento con un ID generado automáticamente
        const newDocRef = doc(escuelasRef);

        // Agregar el ID generado al objeto escuelaData
        paqueteData.id = newDocRef.id;

        // Crear el documento en Firestore usando setDoc
        await setDoc(newDocRef, paqueteData);

        console.log("Documento creado con ID: ", newDocRef.id);
        return paqueteData; // Devolver el objeto con el ID incluido
    } catch (error) {
        console.error("Firebase Error al crear: ", error);
        throw error;
    }
}