export interface EscuelaInput {
    id?:string,
    nombre: string,
    periodo: string,
    estudiantes: number,
    secciones: number
}

export interface EstudianteInput {
    id: string;
    nombre: string;
    apellido: string;
    contacto?: string;
    grado: string; // Relación con el grado
    escuelaId: string; // Relación con la escuela
}

export interface PaqueteInput {
    id:string;
    nombre:string;
    paquete:string[]
}

export interface GradoInput {
    id: string;
    nombre: string;
}