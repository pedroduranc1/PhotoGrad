import { COLLECTIONS } from "@/constants/coleccions.fb";
import { db } from "@/utils/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default async function create(escuelaData: any) {
    try {
        // Referencia a la colección Estudiante
        const EstudianteRef = collection(db, COLLECTIONS.ESTUDIANTES);

        // Crear una referencia a un nuevo documento con un ID generado automáticamente
        const newDocRef = doc(EstudianteRef);

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