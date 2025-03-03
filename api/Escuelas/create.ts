import { COLLECTIONS } from "@/constants/coleccions.fb";
import { db } from "@/utils/firebase";
import { EscuelaInput } from "@/types/ValidationTypes";
import { collection, doc, setDoc } from "firebase/firestore";

export default async function create(escuelaData: EscuelaInput) {
    try {
        // Referencia a la colección ESCUELAS
        const escuelasRef = collection(db, COLLECTIONS.ESCUELAS);

        // Crear una referencia a un nuevo documento con un ID generado automáticamente
        const newDocRef = doc(escuelasRef);

        // Agregar el ID generado al objeto escuelaData
        escuelaData.id = newDocRef.id;

        // Crear el documento en Firestore usando setDoc
        await setDoc(newDocRef, escuelaData);

        console.log("Documento creado con ID: ", newDocRef.id);
        return escuelaData; // Devolver el objeto con el ID incluido
    } catch (error) {
        console.error("Firebase Error al crear: ", error);
        throw error;
    }
}