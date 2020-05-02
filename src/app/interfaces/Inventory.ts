export interface ModelInventory {
    id: number;
    miligramos: number;
    names: string;
    description: string;
    admissionDate: Date;
    expirationDate: Date;
    loteCode: string;
    quantity: number;
    price: number;
    laboratory_id: number;
    shelf_id: number;
    provider_id: number;
    provider_city_id: number;
    provider_department_id: number;
    typeProduct_id: number;

}