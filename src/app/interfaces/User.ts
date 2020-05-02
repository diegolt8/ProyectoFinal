export interface ModelUsuario {
    id: number;
    rol_id: number;
    names: string;
    lastNames: string;
    documentType: string;
    documentNumber: number;
    gender: string;
    admissionDate: Date;
    age: number;
    birthDate: Date;
    points: number;
    city_id: number;
    department_id: number;
    password: string;
}